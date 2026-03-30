import Logo from "./../../assets/icons/logo.svg";
import githubIcon from "../../assets/icons/github.png";
import emailIcon from "../../assets/icons/email.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-blue-50 border-t border-gray-200 mt-20">

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT - BRAND */}
          <div>
            <NavLink to="/" className="flex items-center gap-2">
              <img className="w-10" src={Logo} alt="logo" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                YOG<span className="text-rose-500">AI</span>
              </span>
            </NavLink>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              AI-powered yoga trainer helping you improve posture,
              flexibility, and mental wellness with real-time feedback.
            </p>
          </div>

          {/* MIDDLE - LINKS */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Quick Links</h4>

            <div className="flex flex-col gap-2 text-gray-600">
              <NavLink to="/poses" className="hover:text-blue-600 transition">
                Learn Yoga
              </NavLink>

              <NavLink to="/instructions" className="hover:text-blue-600 transition">
                Start Session
              </NavLink>

              <NavLink to="/dashboard" className="hover:text-blue-600 transition">
                AI Dashboard
              </NavLink>

              <NavLink to="/guide" className="hover:text-blue-600 transition">
                Step Guide
              </NavLink>
            </div>
          </div>

          {/* RIGHT - SOCIAL */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Connect</h4>

            <div className="flex gap-4">

              <a href="#" target="_blank" rel="noreferrer">
                <img
                  className="w-8 h-8 p-1 rounded-lg hover:bg-gray-200 hover:scale-110 transition duration-300"
                  src={githubIcon}
                  alt="GitHub"
                />
              </a>

              <a href="#" target="_blank" rel="noreferrer">
                <img
                  className="w-8 h-8 p-1 rounded-lg hover:bg-gray-200 hover:scale-110 transition duration-300"
                  src={emailIcon}
                  alt="Email"
                />
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <img
                  className="w-8 h-8 p-1 rounded-lg hover:bg-gray-200 hover:scale-110 transition duration-300"
                  src={linkedinIcon}
                  alt="LinkedIn"
                />
              </a>

            </div>

            <p className="mt-6 text-sm text-gray-500">
              Made with ❤️ by <span className="font-medium">CodeFlux</span>
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
          © {currentYear} YOGAI. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;