import React, { useEffect, useState } from "react";
import NavbarUser from "../component/NavbarUser";   
export default function UserDashboard() {
  const [user, setUser] = useState(null);
useEffect(() => {
  const saved = localStorage.getItem("user");
  if (saved) setUser(JSON.parse(saved));
}, []);


  return (
    <>
      <NavbarUser />
      <div className="min-h-screen bg-[#000b0b] text-white px-6 pt-24 pb-10">

        {/* Greeting Section */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">
            Welcome Back,{" "}
            <span className="text-red-500">
              {user?.fullName || "User"}
            </span>
          </h1>
        <p className="text-gray-400 mt-2">Here’s your dashboard overview.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <div className="bg-[#151515] p-6 rounded-xl shadow-lg border border-[#242424]">
            <h2 className="text-lg text-gray-300">Active Appointments</h2>
            <p className="text-3xl font-bold mt-3 text-red-500">3</p>
          </div>

          <div className="bg-[#151515] p-6 rounded-xl shadow-lg border border-[#242424]">
            <h2 className="text-lg text-gray-300">Messages</h2>
            <p className="text-3xl font-bold mt-3 text-red-500">12</p>
          </div>

          <div className="bg-[#151515] p-6 rounded-xl shadow-lg border border-[#242424]">
            <h2 className="text-lg text-gray-300">Pending Tickets</h2>
            <p className="text-3xl font-bold mt-3 text-red-500">1</p>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-[#151515] mt-12 p-6 rounded-xl shadow-lg border border-[#242424]">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#242424] pb-3">
              <p className="text-gray-300">You booked a new appointment</p>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#242424] pb-3">
              <p className="text-gray-300">Your ticket #104 was updated</p>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-300">You viewed new events</p>
              <span className="text-sm text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-[#151515] mt-12 p-6 rounded-xl shadow-lg border border-[#242424]">
          <h2 className="text-xl font-bold mb-4">Account Information</h2>

          <div className="space-y-3">
            <p>
              <span className="text-gray-400">Full Name:</span>{" "}
              {user?.fullName}
            </p>
            <p>
              <span className="text-gray-400">User ID:</span>{" "}
              {user?.userId}
            </p>
           
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
