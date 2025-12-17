import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Appointment() {
  // State variables
  const [appointmentDate, setAppointmentDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [serviceType, setServiceType] = useState("Music Studio");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  // Get logged in user
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to book an appointment.");
      return;
    }

    const formData = new FormData();
    formData.append("UserId", user.userId);
    formData.append("AppointmentDate", appointmentDate);
    formData.append("StartTime", startTime);
    formData.append("EndTime", endTime);
    formData.append("ServiceType", serviceType);
    formData.append("Notes", notes);

    try {
      const res = await api.post("/Appointment/Book-Appointment", formData);

      if (!res.ok) {
        alert("Failed to book appointment");
        return;
      }

      alert("Appointment booked successfully!");
      console.log("Created Appointment:", res.data);
      navigate("/userdashboard");

    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-[#0d0d0d] rounded-2xl shadow-2xl border border-[#1f1f1f] p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Book Your Appointment
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Appointment Date */}
          <div>
            <label className="text-gray-300 font-medium">Appointment Date</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full p-3 mt-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-white"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="text-gray-300 font-medium">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-3 mt-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-white"
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label className="text-gray-300 font-medium">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-3 mt-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-white"
              required
            />
          </div>

          {/* Service Type */}
          <div>
            <label className="text-gray-300 font-medium">Service Type</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full p-3 mt-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-white"
            >
              <option value="Music Studio">Music Studio</option>
              <option value="Podcast">Podcast</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="text-gray-300 font-medium">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe your appointment details..."
              className="w-full p-3 mt-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-white h-24"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-linear-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white py-3 rounded-lg font-semibold transition-all"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
