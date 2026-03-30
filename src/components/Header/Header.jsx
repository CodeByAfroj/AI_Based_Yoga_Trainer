import Logo from "./../../assets/icons/logo.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinkStyle =
    "relative text-gray-700 hover:text-blue-600 transition duration-200";

  const activeStyle = "text-blue-600 font-semibold";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200">

      <div className="flex items-center justify-between h-20 px-6 md:px-16 max-w-7xl mx-auto">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-2">
          <img className="w-10" src={Logo} alt="logo" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            YOG<span className="text-rose-500">AI</span>
          </span>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">

          <NavLink
            to="/poses"
            className={({ isActive }) =>
              `${navLinkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Learn
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navLinkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            AI Coach
          </NavLink>

          <NavLink
            to="/guide"
            className={({ isActive }) =>
              `${navLinkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Guide
          </NavLink>

          {/* CTA BUTTON */}
          <NavLink to="/instructions">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
              Start Session 🚀
            </button>
          </NavLink>

        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="flex flex-col gap-6 p-6">

          <NavLink to="/poses" onClick={() => setSidebarOpen(false)}>
            Learn Yoga
          </NavLink>

          <NavLink to="/dashboard" onClick={() => setSidebarOpen(false)}>
            AI Coach
          </NavLink>

          <NavLink to="/guide" onClick={() => setSidebarOpen(false)}>
            Step Guide
          </NavLink>

          <NavLink to="/instructions">
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg mt-4">
              Start Session
            </button>
          </NavLink>

        </div>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;