import React, { useEffect, useState } from "react";
import api from "../api/axios";
export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
 const user = JSON.parse(localStorage.getItem("user"));
const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
        const res = await api.post(`/Events/Delete-Event/${eventId}`);

        if (!res.ok) {
            alert("Failed to delete event.");
            return;
        }

        alert("Event deleted!");

        // Remove from UI without refresh
        setEvents(events.filter(ev => ev.eventID !== eventId));

    } catch (err) {
        console.error("Delete error:", err);
        alert("Something went wrong.");
    }
};

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/Events/All-Events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white px-6 pt-24 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Events</h1>
      
          {/* 👉 Show message if no events exist */}
    {events.length === 0 && !loading && (
      <div className="text-center text-gray-400 text-xl py-10">
        No events found
      </div>
    )}


{
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {events.map((ev) => (
          <div
            key={ev.eventID}
            className="bg-[#151515] p-4 rounded-xl shadow-lg border border-[#242424] hover:scale-[1.02] transition-all duration-200"
          >
            {/* Event Image */}
            {ev.imageBytes ? (
              <img
                src={`data:image/jpeg;base64,${ev.imageBytes}`}
                alt={ev.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Event Content */}
            <h2 className="text-2xl font-bold">{ev.title}</h2>
            <p className="text-gray-400 mt-2">{ev.description}</p>

            <p className="text-gray-300 mt-3">
              📍 {ev.location}
            </p>

            <p className="text-gray-300">
              🗓 {new Date(ev.startDate).toLocaleString()} →{" "}
              {new Date(ev.endDate).toLocaleString()}
            </p>

            <p className="text-red-500 font-semibold mt-3">
              €{ev.price}
            </p>

            <button  className="mt-2 w-full bg-[#b91c1c] hover:bg-[#991b1b] 
               text-white rounded-lg py-2 font-semibold transition-all"
  >
              Purchase Ticket
            </button>
       {user?.role === "Admin" && (
  <button
    onClick={() => handleDelete(ev.eventID)}
    className="mt-2 w-full bg-[#111827] hover:bg-[#1F2937] 
               text-[#F3F4F6] rounded-lg py-2 font-semibold transition-all"
  >
    Delete Event
  </button>
)}
        
     </div>
   ))}
 </div>
}
</div>
);
}
