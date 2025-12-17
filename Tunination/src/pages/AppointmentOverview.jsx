import React, { useEffect, useState } from "react";
import api from "../api/axios";
export default function AppointmentOverview() {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  // Fetch all appointments
  const loadAppointments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/Appointment/Appointment-Table");
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
    setLoading(false);
  };

  // Accept appointment
  const acceptAppointment = async (id) => {
    await api.post(`/Appointment/Accept-Appointment/${id}`);
    

    loadAppointments();
  };

  // Reject appointment
  const rejectAppointment = async (id) => {
    await api.post(`/Appointment/Reject-Appointment/${id}`);

    loadAppointments();
  };

  // Delete appointment
  const deleteAppointment = async (id) => {
    await api.post(`/Appointment/Delete-Appointment/${id}`);

    loadAppointments();
  };

  const tabs = [
    { key: "pending", label: "Incoming", color: "text-yellow-400" },
    { key: "accepted", label: "Accepted", color: "text-green-400" },
    { key: "rejected", label: "Declined", color: "text-red-400" },
  ];

  const filtered = appointments.filter((a) => {
    if (activeTab === "pending") return a.status === "Pending";
    if (activeTab === "accepted") return a.status === "Accepted";
    if (activeTab === "rejected") return a.status === "Rejected";
    return false;
  });

  const badgeColor = (status) => {
    const base = "px-3 py-1 rounded-full text-sm font-semibold";
    if (status === "Pending") return `${base} bg-yellow-500/20 text-yellow-400`;
    if (status === "Accepted") return `${base} bg-green-500/20 text-green-400`;
    return `${base} bg-red-500/20 text-red-400`;
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-center text-4xl font-bold mb-8">
        Appointment Overview
      </h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 mb-10">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`
              px-6 py-2 text-lg font-semibold rounded-lg transition-all
              ${activeTab === t.key ? "bg-red-600" : "bg-gray-900 hover:bg-gray-800"}
              ${t.color}
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-400 text-xl">Loading...</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-400 text-xl">
          No {activeTab} appointments.
        </p>
      )}

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((a) => (
          <div
            key={a.appointmentID}
            className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{a.serviceType}</h2>
              <span className={badgeColor(a.status)}>{a.status}</span>
            </div>

            <p className="text-gray-300 text-sm">
              <span className="text-gray-500">User ID:</span> {a.userID}
            </p>

            <p className="mt-2 text-gray-300">📅 {new Date(a.appointmentDate).toDateString()}</p>

            <p className="text-gray-300">🕒 {a.startTime} → {a.endTime}</p>

            {a.notes && (
              <p className="text-gray-400 italic mt-2">"{a.notes}"</p>
            )}

            {/* Action Buttons */}
            <div className="mt-6 space-y-2">

              {a.status === "Pending" && (
                <>
                  <button
                    onClick={() => acceptAppointment(a.appointmentID)}
                    className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => rejectAppointment(a.appointmentID)}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 py-2 rounded-lg font-semibold"
                  >
                    Reject
                  </button>
                </>
              )}

              <button
                onClick={() => deleteAppointment(a.appointmentID)}
                className="w-full bg-red-700 hover:bg-red-800 py-2 rounded-lg font-semibold"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
