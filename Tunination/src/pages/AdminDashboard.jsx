import React, { useEffect, useState } from "react";
import NavbarAdmin from "../component/NavbarAdmin";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function AdminDashboard() {
 const [admin, setAdmin] = useState(null);

  const [stats, setStats] = useState({
    countuser: 0,
    countappointment: 0,
    countevent: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setAdmin(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/Auth/Get-count");
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <NavbarAdmin />
    <div className="min-h-screen bg-[#0b0b0b] text-white px-6  pt-24 pb-10">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-bold">
          Admin Dashboard —{" "}
          <span className="text-red-500">{admin?.fullName || "Admin"}</span>
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your system, users, and activities.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <div className="bg-[#151515] p-6 rounded-xl shadow-lg border border-[#242424]">
            <h2 className="text-lg text-gray-300">Total Users </h2>
            <p className="text-3xl font-bold mt-3 text-red-500">{stats.countuser}</p>
          </div>

          <div className="bg-[#151515] p-6 rounded-xl shadow-lg border border-[#242424]">
            <h2 className="text-lg text-gray-300">Pending Tickets </h2>
            <p className="text-3xl font-bold mt-3 text-red-500">{stats.countappointment}</p>
          </div>

          <div className="bg-[#151515] p-6 rounded-xl shadow-lg border border-[#242424]">
            <h2 className="text-lg text-gray-300">Events Created</h2>
            <p className="text-3xl font-bold mt-3 text-red-500">{stats.countevent}</p>
          </div>
        </div>

        {/* Management Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

          {/* User Management */}
          <div className="bg-[#151515] p-6 rounded-xl border border-[#242424] shadow-lg">
            <h2 className="text-xl font-bold mb-4">User Management</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-[#242424]">
                <p className="text-gray-300">Add new Events</p>
                <button 
                onClick={() => navigate("/addevent")}
                className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm">
                  Add Event
                </button>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-[#242424]">
                <p className="text-gray-300">Appointment Overview</p>
                <button className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-sm"
                onClick={()=> navigate("/Appointment-Overview")}>
                     Check Appointment 
                </button>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-gray-300">Payment Overview</p>
                <button className="px-4 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-md text-sm"
                onClick={()=> navigate("/Payment-Link")}>
                     Manage
                </button>
              </div>
            </div>
          </div>

          {/* System Activity */}
          <div className="bg-[#151515] p-6 rounded-xl border border-[#242424] shadow-lg">
            <h2 className="text-xl font-bold mb-4">System Activity</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#242424]">
                <p className="text-gray-300">New user registered</p>
                <span className="text-gray-500 text-sm">10 mins ago</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-[#242424]">
                <p className="text-gray-300">Ticket #205 updated</p>
                <span className="text-gray-500 text-sm">1 hour ago</span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-gray-300">Event schedule modified</p>
                <span className="text-gray-500 text-sm">1 day ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="bg-[#151515] mt-12 p-6 rounded-xl border border-[#242424] shadow-lg">
          <h2 className="text-xl font-bold mb-4">Admin Information</h2>

          <div className="space-y-3">
            <p>
              <span className="text-gray-400">Full Name:</span>{" "}
              {admin?.fullName}
            </p>

            <p>
              <span className="text-gray-400">Admin ID:</span>{" "}
              {admin?.userId}
            </p>

            <p>
              <span className="text-gray-400">Role:</span>{" "}
              <span className="text-red-500 font-semibold">{admin?.role}</span>
            </p>
          </div>
        </div>

      </div>
    </div>
      </>

  );
}
