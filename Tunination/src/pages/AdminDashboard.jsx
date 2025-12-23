import React, { useEffect, useState } from "react";
import NavbarAdmin from "../component/NavbarAdmin";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function AdminDashboard() {
 const [admin, setAdmin] = useState(null);
const [payments, setPayments] = useState([]);
const [selectedTicket, setSelectedTicket] = useState(null);
const [ticketImage, setTicketImage] = useState(null);

useEffect(() => {
  api.get("/Events/payments-tickets").then(res => {
    setPayments(res.data);
  });
}, []);
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

  const updateStatus = async (paymentID, status, userID) => {
  const formData = new FormData();

  // ✅ MUST MATCH BACKEND PARAM NAMES
  formData.append("PaymentID", paymentID);
  formData.append("status", status);
  formData.append("userId", userID);

  await api.putForm("/Events/payments-tickets/status", formData);

  setPayments(prev =>
    prev.map(p =>
      p.paymentID === paymentID
        ? { ...p, paymentStatus: status }
        : p
    )
  );
};

const uploadTicketImage = async () => {
  if (!selectedTicket || !ticketImage) return;

  const formData = new FormData();
  formData.append("ticket", ticketImage); // MUST MATCH backend param

  await api.postForm(
    `/Events/send-ticket-email/${selectedTicket.userID}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    }
  );

  alert("Ticket sent to user successfully");

  setSelectedTicket(null);
  setTicketImage(null);
};





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







{/* Payment Tickets Section */}
<section className="mt-20">
  <h2 className="text-2xl font-bold mb-8 text-center">
    Payment Tickets
  </h2>

  {payments.length === 0 && (
    <p className="text-gray-400 text-center">
      No payment tickets available
    </p>
  )}

  {/* CENTER CONTAINER */}
  <div className="flex justify-center">
    <div className="grid gap-8 place-items-center max-w-4xl w-full">
      {payments.map(p => (
        <div
          key={p.paymentID}
          className="w-full max-w-md bg-[#151515] border border-[#242424] rounded-2xl p-6 shadow-lg transition"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-400">
              Ticket #{p.paymentID}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold
                ${p.paymentStatus === "Pending" && "bg-yellow-600/20 text-yellow-400"}
                ${p.paymentStatus === "Accepted" && "bg-green-600/20 text-green-400"}
                ${p.paymentStatus === "Declined" && "bg-red-600/20 text-red-400"}
              `}
            >
              {p.paymentStatus}
            </span>
          </div>

          {/* DETAILS */}
          <div className="space-y-1 text-sm text-gray-300 mb-5">
            <p>User ID: {p.userID}</p>
            <p>Event ID: {p.eventID}</p>
            <p>Amount: €{p.amount}</p>
          </div>

          {/* ACTIONS */}
          {p.paymentStatus === "Pending" && (
            <div className="flex gap-4">
              <button
          onClick={() => {
             updateStatus(p.paymentID, "Accepted", p.userID);
             setSelectedTicket({ ...p, paymentStatus: "Accepted" });
            }}
         className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
           >
  Accept
</button>


              <button
                onClick={() => updateStatus(p.paymentID, "Declined", p.userID)}
                className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition"
              >
                Decline
              </button>
            </div>
          )}

          {/* ACCEPTED UPLOAD SECTION */}
{selectedTicket && selectedTicket.paymentStatus === "Accepted" && (
  <div className="mt-8 max-w-md mx-auto border border-[#242424] rounded-2xl p-6 bg-[#151515] shadow-lg">
    <p className="text-sm text-gray-400 mb-4 text-center">
      If you confirmed this payment, upload the ticket proof below
    </p>

    <input
      type="file"
      accept="image/*"
      onChange={(e) => setTicketImage(e.target.files[0])}
      className="w-full mb-4 text-sm text-gray-300
        file:bg-[#242424] file:border-0
        file:px-4 file:py-2 file:rounded-lg
        file:text-sm file:text-white
        hover:file:bg-[#303030]"
    />

    <div className="flex gap-3">
      <button
        onClick={uploadTicketImage}
        disabled={!ticketImage}
        className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold disabled:opacity-40 transition"
      >
        Upload Ticket
      </button>

      <button
        onClick={() => {
          setSelectedTicket(null);
          setTicketImage(null);
        }}
        className="flex-1 bg-gray-700 hover:bg-gray-800 py-2 rounded-lg transition"
      >
        Cancel
      </button>
    </div>
  </div>
)}

        </div>
      ))}
    </div>
  </div>
</section>










    </div>




      </>

  );
}
