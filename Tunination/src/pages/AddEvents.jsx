import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // your API wrapper
import { AiOutlineCalendar, AiOutlineEuro, AiOutlineLink } from "react-icons/ai";
import { IoImageOutline } from "react-icons/io5";

export default function AddEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    price: "",
    capacity: "",
    paymentLink: "",
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
    setMessage("");

    const fd = new FormData();
    Object.keys(form).forEach((key) => {
      fd.append(key, form[key]);
    });

    try {
      const res = await api.postForm("/Events/add", fd);

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed to create event");
      }

      setMessage("✔ Event created successfully!");
      setTimeout(() => navigate("/events"), 1500);

    } catch (err) {
      console.log(err);
      setMessage("❌ Error creating event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex justify-center px-6 py-12 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#111111] border border-gray-800 rounded-xl shadow-xl p-10"
      >
        <h1 className="text-3xl font-semibold text-center mb-2">Add New Event</h1>
        <p className="text-gray-400 text-center mb-8">
          Create and publish an event for the DTNation platform.
        </p>

        {/* Success/Error message */}
        {message && (
          <div
            className={`mb-4 p-3 text-center rounded-md ${
              message.includes("✔")
                ? "bg-green-600/20 text-green-400"
                : "bg-red-600/20 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        {/* Inputs */}
        <div className="space-y-6">

          {/* Title */}
          <div>
            <label className="block mb-1 text-gray-300">Event Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="E.g., Summer Festival 2025"
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-gray-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the event..."
              rows={4}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            ></textarea>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 text-gray-300">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="City, venue, etc."
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-gray-300">Start Date</label>
              <div className="relative">
                <AiOutlineCalendar className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="datetime-local"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-gray-300">End Date</label>
              <div className="relative">
                <AiOutlineCalendar className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="datetime-local"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Price & Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-gray-300">Ticket Price (EUR)</label>
              <div className="relative">
                <AiOutlineEuro className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="E.g., 29"
                  className="w-full pl-10 px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-gray-300">Max Capacity</label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="E.g., 150"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          {/* Payment Link */}
          <div>
            <label className="block mb-1 text-gray-300">Payment Link</label>
            <div className="relative">
              <AiOutlineLink className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="paymentLink"
                value={form.paymentLink}
                onChange={handleChange}
                placeholder="Enter payment link"
                className="w-full pl-10 px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-gray-300">Event Image</label>
            <div className="flex items-center gap-3 bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-3">
              <IoImageOutline className="text-gray-400 text-xl" />
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleChange}
                className="text-gray-400"
              />
            </div>
          </div>

        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
