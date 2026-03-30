
import { useRef, useEffect, useState } from "react";

import ml5 from "ml5";
import p5 from "p5";
import axios from "axios";
import "./Posecam.scss";
import { NavLink, useLocation } from "react-router-dom";
import { refreshPage } from "./../../utils/helper.js";
import backIcon from "./../../assets/icons/back.png";

const PoseCam = ({ pose }) => {

  const { id, english_name, image, instructions } = pose;
  const canvasRef = useRef(null);
  
  const location = useLocation();

  const [poseLabel, setPoseLabel] = useState("Detecting Pose...");
  const [poseAccuracy, setPoseAccuracy] = useState(null);
  const [aiFeedback, setAiFeedback] = useState("");
  const [poseBenefits, setPoseBenefits] = useState("");
  const [motivationTip, setMotivationTip] = useState("");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true); // ✅ toggle for 
  

  // ✅ Speak utility using Web Speech API
  const speak = (text) => {
    if (!isVoiceEnabled || !window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.cancel(); // stop previous speech
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    let video, poseNet, poseInstance, skeleton, brain;

    const sketch = (p) => {
      p.setup = () => {
        const canvas = p.createCanvas(640, 480);
        if (canvasRef.current) {
          canvas.parent(canvasRef.current);
        }
        video = p.createCapture(p.VIDEO);
        video.hide();
        poseNet = ml5.poseNet(video, modelLoaded);
        poseNet.on("pose", gotPoses);

        const options = {
          inputs: 34,
          outputs: 7,
          task: "classification",
          debug: true,
        };
        brain = ml5.neuralNetwork(options);

        const modelInfo = {
          model: `/model-${id}/model.json`,
          metadata: `/model-${id}/model_meta.json`,
          weights: `/model-${id}/model.weights.bin`,
        };

        fetch(modelInfo.model)
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          })
          .then(() => {
            brain.load(modelInfo, brainLoaded);
          })
          .catch((err) => console.error("Error loading model:", err));
      };

      p.draw = () => {
        p.push();
        p.translate(video.width, 0);
        p.scale(-1, 1);
        p.image(video, 0, 0, video.width, video.height);

        if (poseInstance) {
          for (let i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            p.strokeWeight(2);
            p.stroke(0);
            p.line(a.position.x, a.position.y, b.position.x, b.position.y);
          }
          for (let i = 0; i < poseInstance.keypoints.length; i++) {
            let { x, y } = poseInstance.keypoints[i].position;
            p.fill(0);
            p.stroke(255);
            p.ellipse(x, y, 16, 16);
          }
        }

        p.pop();
      };
    };

    const myp5 = new p5(sketch);

    function modelLoaded() {
      console.log("PoseNet ready");
    }

    function brainLoaded() {
      console.log("Pose classification ready!");
      classifyPose();
    }

    function classifyPose() {
      if (poseInstance) {
        let inputs = [];
        for (let i = 0; i < poseInstance.keypoints.length; i++) {
          let { x, y } = poseInstance.keypoints[i].position;
          inputs.push(x, y);
        }
        brain.classify(inputs, gotResult);
      } else {
        setTimeout(classifyPose, 100);
      }
    }

    function gotResult(error, results) {
      if (results && results[0].confidence > 0.7) {
        const label = results[0].label;
        const confidence = results[0].confidence;

        setPoseLabel(label);
        setPoseAccuracy(Math.round(confidence * 100));

        if (label === "Great Form!") {
          document.body.classList.add("great-form");
        } else {
          document.body.classList.remove("great-form");
        }
      }
      classifyPose();
    }

    function gotPoses(poses) {
      if (poses.length > 0) {
        poseInstance = poses[0].pose;
        skeleton = poses[0].skeleton;
      }
    }

    return () => {
      if (video) video.remove();
      myp5.remove();
    };
  }, [id]);

  // ✅ Get feedback and speak it
  useEffect(() => {
    if (!poseLabel || poseLabel === "Detecting Pose...") return;

    const fetchFeedback = async () => {
      const OPENROUTER_API_KEY = "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";//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

      const prompt = `
You are an expert yoga coach AI. Based on the pose label "${poseLabel}", provide:
- a short correction suggestion if it's not 'Great Form!'
- a one-line benefit of the pose
- a motivation tip.

Format:
Correction: ...
Benefits:...
Tip: ...
`;

      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "openai/gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful yoga coach." },
              { role: "user", content: prompt },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const content = response.data.choices[0].message.content;
        const lines = content.split("\n").map((line) => line.trim());
        const correctionLine = lines.find((line) => line.startsWith("Correction:"));
        const motivation = lines.find((line) => line.startsWith("Tip:"));
        const benefits = lines.find((line) => line.startsWith("Benefits:"));
      

        setAiFeedback(correctionLine?.replace("Correction:", "").trim() || "");
        setPoseBenefits(benefits?.replace("Benefits:", "").trim() || "");
        setMotivationTip(motivation?.replace("Tip:", "").trim() || "");
      

        // ✅ Speak the feedback
        speak(
          `${correctionLine?.replace("Correction:", "") || ""}. 
           
           `
        );
      } catch (err) {
        console.error("AI feedback error:", err);
      }
    };

    fetchFeedback();
  }, [poseLabel]);

  const isPracticePath = /^\/practice\//.test(location.pathname);

  return (
    <>
      <div className="cam__header--practice" onClick={refreshPage}>
        {isPracticePath && (
          <NavLink to="/poses" className="cam__icon-link" onClick={refreshPage}>
            <img className="cam__button--back" src={backIcon} alt="back icon" />
          </NavLink>
        )}
        <h1>{english_name}</h1>
      </div>

      <div className="cam-container">
        <div className="cam__content--left">
          <div ref={canvasRef}></div>

          {/* ✅ Toggle Voice Feedback */}
          <button
            className="cam__toggle-voice"
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
          >
            {isVoiceEnabled ? "🔊 Voice On" : "🔇 Voice Off"}
          </button>

          <div
            className={`cam__feedback ${poseLabel === "Great Form!" ? "cam__feedback--success" : ""}`}
          >
            {poseLabel === "Great Form!" ? "✅" : "💡"} {poseLabel}
          </div>

          {poseAccuracy !== null && (
            <div className="cam__accuracy">
              Accuracy: <strong>{poseAccuracy}%</strong>
              <div className="cam__progress-bar">
                <div
                  className="cam__progress-fill"
                  style={{ width: `${poseAccuracy}%` }}
                ></div>
              </div>
            </div>
          )}

          {aiFeedback && (
            <div className="cam__ai-feedback">
              <h4>Correction:</h4>
              <p>{aiFeedback}</p>
              <h4>Benefits:</h4>
              <p>{poseBenefits}</p>
              <h4>Motivation:</h4>
              <p>{motivationTip}</p>
            </div>
          )}
        </div>

        <div className="cam__content--right">
          <img className="cam__img" src={image} alt={`${english_name} pose`} />
          <ol className="cam__instructions">
            <h4>Step by Step</h4>
            {instructions.map((step, i) => (
              <li className="cam__instructions-step" key={i}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default PoseCam;


