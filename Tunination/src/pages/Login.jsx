import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle input fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Login Submit
const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  console.log("LOGIN FORM DATA:", form);

  try {
    const res = await fetch("http://localhost:5173/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    if (!data.success) {
      setError(data.message || "Invalid login credentials");
      return;
    }

    // Store FULL user object in localStorage
    const userInfo = {
      userId: data.userId,
      fullName: data.userName,
      role: data.role,
    };

    localStorage.setItem("user", JSON.stringify(userInfo));
    onLogin(userInfo.role); // Notify App about role change

    // Redirect based on role
    if (data.role === "User") {
      navigate("/userdashboard");
    } else {
      navigate("/admindashboard");
    } 
  } catch (err) {
    console.error(err);
    setError("Something went wrong.");
  }
};

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e] px-4">
        <div className="bg-[#111111] p-8 rounded-xl shadow-lg w-full max-w-md border border-[#1f1f1f]">

          {/* Title */}
          <h2 className="text-white text-3xl font-bold text-center mb-6">Welcome Back</h2>
          <p className="text-gray-400 text-center mb-8">Log in to continue to your account</p>

          {/* Login Form */}
          <form  className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="p-3 rounded-lg bg-[#161616] text-white border border-[#262626] focus:outline-none focus:ring-2 focus:ring-[#880404]"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="p-3 rounded-lg bg-[#161616] text-white border border-[#262626] focus:outline-none focus:ring-2 focus:ring-[#880404]"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-linear-to-r from-[#880404] to-[#259802] text-white font-semibold hover:scale-[1.02] transition-transform"
            onClick={handleLogin}
            
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-gray-400 text-center text-sm mt-3">
            Don’t have an account?
            <span
              className="text-[#880404] hover:underline cursor-pointer ml-1"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
</>

  );
}
