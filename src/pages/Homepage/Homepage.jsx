// import { useEffect } from "react";
// import { NavLink } from "react-router-dom";

// const HomePage = () => {
//   const yogaIcons = [
//     "🧘‍♀️",
//     "🧘🏿‍♂️",
//     "🧘🏼‍♀️",
//     "🧘🏽‍♂️",
//     "🧘🏿‍♀️",
//     "🧘🏼‍♂️",
//     "🧘🏽‍♀️",
//     "🧘🏾‍♂️",
//     "🧘🏻‍♀️",
//     "🧘🏾‍♂️",
//     "🧘‍♀️",
//     "🧘🏿‍♂️",
//     "🧘🏼‍♀️",
//     "🧘🏽‍♂️",
//     "🧘🏿‍♀️",
//     "🧘🏼‍♂️",
//     "🧘🏽‍♀️",
//     "🧘🏾‍♂️",
//   ];

//   useEffect(() => {
//     let currentIndex = 0;
//     const heroIcon = document.getElementById("main__icon");
//     const interval = setInterval(() => {
//       heroIcon.innerHTML = yogaIcons[currentIndex];
//       currentIndex = (currentIndex + 1) % yogaIcons.length;
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [yogaIcons]);

//   return (
//     <>
//       <main className="h-full mx-6 mb-20 flex flex-col items-center justify-center md:flex-row md:p-12 md:gap-20 lg:h-[50vh] lg:max-w-[80rem] lg:px-32 lg:py-80 lg:mx-auto">
//         <div className="text-center order-2 md:text-left md:order-1">
//           <h5>Powered by AI 🌟</h5>
//           <h1 className="text-5xl font-bold mt-2">
//             Transform your day with your personal yoga trainer
//           </h1>
//           <p className="mt-4 text-lg">
//             Providing real-time feedback, guided sessions, and a library of
//             beginner yoga exercises to improve posture, and enhance well-being.
//           </p>

//           <div className="mt-6 flex flex-col items-center justify-center gap-4 md:mt-9 md:flex-row md:justify-start md:gap-8">
//             <NavLink to="/instructions">
//               <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
//                 Start Session
//               </button>
//             </NavLink>
//             <NavLink to="/poses" >
//             {/* <button className="group h-full w-full  relative px-6 py-2 overflow-hidden text-blue-600 text-lg rounded-lg  outline-1  ">
//                 <span className="absolute w-full h-full  transform scale-x-0 origin-left group-hover:scale-x-55 z-0 rounded-br-full rounded-tr-full transition-transform duration-400 ease-in-out inset-0 bg-blue-500 "
//               >Learn</span>
//                  Learn Yoga
//                <span className="absolute w-full h-full transform scale-x-0 origin-right group-hover:scale-x-55 z-0 rounded-bl-full rounded-tl-full transition-transform duration-400 ease-in-out inset-0 bg-blue-500 "
//               >Yoga</span>
//             </button> */}


//             <button className="group h-full w-full  relative px-6 py-2 overflow-hidden text-blue-600 text-md  font-semibold cursor-pointer rounded-lg  outline-1  ">
//                 {/* <span className="absolute bg-blue-500  transform translate-x-[-100%]  group-hover:translate-x-0 transition-transform duration-400 ease-in-out inset-0  "
//               ></span> */}
//                  Learn Yoga
//             </button> 



         
//             </NavLink>
//           </div>
//         </div>

//         <div
//           id="main__icon"
//           className="text-[75px] flex items-center justify-center order-1 md:order-2 md:text-[150px] md:w-[60%] lg:w-[50%] lg:text-[175px]"
//         >
//           🧘🏻‍♀️
//         </div>
//       </main>

//       <section className="mx-6 -mt-6 mb-16 md:mx-12 lg:max-w-[80rem] lg:px-32 lg:mx-auto lg:mb-16">
//         <h2 className="text-center text-2xl font-semibold mb-8">How it Works</h2>
//         <ul className="flex flex-col gap-6 text-center md:flex-row md:gap-9 md:justify-between">
//           <li className="bg-white p-6 rounded-[25px] border border-gray-400 md:w-1/2">
//             <div className="w-full text-[48px] mb-2">📚</div>
//             <h4 className="text-xl font-semibold mb-2">Learn Beginner Poses</h4>
//             <p>
//               We guide you through beginner yoga poses and educate you on their
//               benefits, making it easy for anyone to get started.
//             </p>
//           </li>
//           <li className="bg-white p-6 rounded-[25px] border border-gray-400 md:w-1/2">
//             <div className="w-full text-[48px] mb-2">✅</div>
//             <h4 className="text-xl font-semibold mb-2">Get Instant Feedback</h4>
//             <p>
//               Experience guided sessions with instant feedback, powered by AI,
//               to improve your posture and overall well-being right from your
//               fingertips.
//             </p>
//           </li>
//         </ul>
//       </section>
//     </>
//   );
// };

// export default HomePage;


import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const yogaIcons = [
    "🧘‍♀️","🧘🏿‍♂️","🧘🏼‍♀️","🧘🏽‍♂️",
    "🧘🏿‍♀️","🧘🏼‍♂️","🧘🏽‍♀️","🧘🏾‍♂️",
  ];

  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % yogaIcons.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">

      {/* HERO SECTION */}
      <main className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 max-w-7xl mx-auto">

        {/* LEFT */}
        <div className="text-center md:text-left max-w-xl">
          <h5 className="text-blue-600 font-semibold tracking-wide">
            Powered by AI ✨
          </h5>

          <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight">
            Your Smart
            <span className="text-blue-600"> Yoga Trainer</span> 🧘
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Real-time posture correction, guided sessions, and personalized
            yoga plans — all powered by AI to improve your health & focus.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            <NavLink to="/instructions">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                🚀 Start Session
              </button>
            </NavLink>

            <NavLink to="/poses">
              <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
                📖 Learn Yoga
              </button>
            </NavLink>

          </div>
        </div>

        {/* RIGHT ICON */}
        <div className="mt-10 md:mt-0 text-[120px] md:text-[180px] transition-all duration-500">
          {yogaIcons[iconIndex]}
        </div>
      </main>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-12">

        <h2 className="text-center text-3xl font-bold mb-12">
          How It Works ⚡
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* CARD 1 */}
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border">
            <div className="text-5xl mb-4">📚</div>
            <h4 className="text-xl font-semibold mb-3">
              Learn Beginner Poses
            </h4>
            <p className="text-gray-600">
              Step-by-step guidance for beginners with clear instructions
              and visual understanding.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border">
            <div className="text-5xl mb-4">🤖</div>
            <h4 className="text-xl font-semibold mb-3">
              Real-Time AI Feedback
            </h4>
            <p className="text-gray-600">
              Get instant posture correction using AI-powered pose detection
              and improve faster.
            </p>
          </div>

        </div>
      </section>

      {/* EXTRA CTA */}
      <section className="text-center py-16">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Transform Your Health?
        </h3>
        <NavLink to="/instructions">
          <button className="mt-4 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-xl hover:scale-105 transition duration-300">
            Start Your Journey 🌿
          </button>
        </NavLink>
      </section>

    </div>
  );
};

export default HomePage;