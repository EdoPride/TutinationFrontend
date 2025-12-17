import React, { useEffect, useState } from "react";
import NavbarUser from "../component/NavbarUser";
import api from "../api/axios";
export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Load user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  if (!user) return null;


  const updateEmail = async () => {
    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("email", email);

    await api.putForm("/Auth/change-email", formData);

    alert("Email updated successfully");
  };


  const updatePassword = async () => {
    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("newPassword", newPassword);

    await api.putForm("/Auth/change-password", formData);

    alert("Password updated successfully");
  };

  return (
    <>
      <NavbarUser />

      <div className="min-h-screen bg-[#0b0b0b] text-white px-6 py-14">
        <div className="max-w-2xl mx-auto space-y-8">

          {/* Header */}
          <div>
            <h1 className="text-3xl font-semibold">Account Settings</h1>
            <p className="text-gray-400 mt-1">
              Manage your personal information & security
            </p>
          </div>

          {/* Profile */}
          <div className="bg-linear-to-br from-[#151515] to-[#0f0f0f]
                          border border-[#242424] rounded-2xl p-6">
            <h2 className="text-lg font-medium mb-4">Profile</h2>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Full Name</span>
              <span>{user.fullName}</span>
            </div>

            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-400">User ID</span>
              <span>{user.userId}</span>
            </div>
          </div>

          {/* Change Email */}
          <div className="bg-[#151515] border border-[#242424] rounded-2xl p-6">
            <h2 className="text-lg font-medium mb-4">Change Email</h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email"
              className="w-full bg-[#0b0b0b] border border-[#242424]
                         rounded-lg px-4 py-3 mb-4
                         focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              onClick={updateEmail}
              className="w-full bg-red-600 hover:bg-red-700
                         transition rounded-lg py-3 font-medium"
            >
              Update Email
            </button>
          </div>

          {/* Change Password */}
          <div className="bg-[#151515] border border-[#242424] rounded-2xl p-6">
            <h2 className="text-lg font-medium mb-4">Change Password</h2>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full bg-[#0b0b0b] border border-[#242424]
                         rounded-lg px-4 py-3 mb-4
                         focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              onClick={updatePassword}
              className="w-full bg-red-600 hover:bg-red-700
                         transition rounded-lg py-3 font-medium"
            >
              Update Password
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
