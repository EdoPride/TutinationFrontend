import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      if (form.password !== e.target.value && form.confirmPassword !== "") {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      passwordHash: form.password,
      role: "User",
      dateRegistered: new Date().toISOString()
    };

    try {
      const res = await fetch("http://localhost:5173/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log("REGISTER RESULT:", data);

      alert("Registration Successful!");

    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0908] px-6">
      <div className="bg-[#111] p-10 rounded-xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Create Account
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="p-3 rounded-md bg-[#1a1a1a] text-white focus:ring-2 focus:ring-[#38040E] outline-none"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded-md bg-[#1a1a1a] text-white focus:ring-2 focus:ring-[#38040E] outline-none"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="p-3 rounded-md bg-[#1a1a1a] text-white focus:ring-2 focus:ring-[#38040E] outline-none"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`p-3 rounded-md bg-[#1a1a1a] text-white focus:ring-2 outline-none ${
              error ? "border border-red-500" : "focus:ring-[#38040E]"
            }`}
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`p-3 rounded-md bg-[#1a1a1a] text-white focus:ring-2 outline-none ${
              error ? "border border-red-500" : "focus:ring-[#38040E]"
            }`}
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm -mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="mt-4 w-full py-3 rounded-lg bg-linear-to-r from-[#38040E] to-[#250902] text-white font-semibold hover:scale-[1.02] transition-transform"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
}
