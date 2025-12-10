import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.jpeg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // All menu items in ONE place
  const menu = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Appointment", path: "/appointment" },
    { name: "Ticket", path: "/ticket" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0a0a09] shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={Logo}
            alt="Logo"
            className="w-10 h-10 rounded-full border border-[#880404]"
          />
          <span className="text-white font-bold text-2xl">DtNation</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition duration-300 ${
                  isActive ? "bg-[#880404] text-white" : "hover:bg-[#880404]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0f0f0f] px-6 py-4 text-gray-300">
          <ul className="flex flex-col gap-4 text-lg">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive ? "bg-[#880404] text-white" : "hover:bg-[#880404]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
