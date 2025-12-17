import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpeg";

export default function NavbarUser() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user info from localStorage
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const menu = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Appointment", path: "/appointment" },
    { name: "Ticket", path: "/ticket" },
  
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0a0a0a] shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 text-white">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={Logo}
            className="h-10 w-10 rounded-full border border-[#880404]"
          />
          <span className="text-xl font-bold tracking-wide">DtNation</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-gray-300">
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

          {/* User display */}
          {user && (
            <span className="ml-4 text-[#ccc] italic">
              Hello, {user.fullName}
            </span>
          )}

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white transition"
            >
              Logout
            </button>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
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

            {/* User Name */}
            {user && (
              <p className="italic text-sm" onClick={()=> navigate("/userdashboard")}>Logged in as: {user.name}</p>
            )}

            {/* Logout */}
            {user && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white transition"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
