import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
export default function AddEvents() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    price: "",
    capacity: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const eventData = new FormData();
    Object.keys(form).forEach((key) => {
      eventData.append(key, form[key]);
    });

    try {
      const res = await api.post("https://figure-cartoons-isle-relief.trycloudflare.com/api/Events/add", {
        method: "POST",
        body: eventData,
      });

      if (!res.ok) throw new Error("Failed to create event");
      const data = await res.json();

      setMessage("✅ Event created successfully!");

      setTimeout(() => {
        navigate("/admindashboard");
      }, 1200);
    } catch (err) {
      setMessage("❌ Error creating event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000b0b] text-white px-6 pt-24  py-12">
      <div className="max-w-3xl mx-auto bg-[#111] p-8 rounded-xl shadow-xl border border-[#242424]">
        <h1 className="text-3xl font-bold mb-2 text-center">Add New Event</h1>
        <p className="text-gray-400 text-center mb-8">
          Create and publish new events for your platform.
        </p>

        {message && (
          <div className="mb-4 p-3 rounded-md text-center bg-gray-800 border border-gray-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-300 mb-2">Event Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500"
              placeholder="E.g., Summer Festival 2025"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500"
              placeholder="Describe the event details..."
            ></textarea>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-300 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500"
              placeholder="City, venue, etc."
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Price + Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Ticket Price (Euros)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500"
                placeholder="E.g., 20"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Max Capacity</label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500"
                placeholder="E.g., 150"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-300 mb-2">Event Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full text-gray-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-md text-lg font-semibold transition"
          >
            {loading ? "Saving..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
