import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function PaymentConfirmation() {
  const [event, setEvent] = useState(null);
  const [hasPaid, setHasPaid] = useState(null);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("pendingPaymentEvent");
    if (saved) setEvent(JSON.parse(saved));
  }, []);

  if (!event) {
    return <p className="text-white text-center mt-10">No pending payment.</p>;
  }

  const submitProof = async () => {
    const formData = new FormData();
    formData.append("eventId", event.eventID);
    formData.append("amount", event.price);
    formData.append("receipt", receipt);
    formData.append("userId", JSON.parse(localStorage.getItem("user")).userId);


    await api.postForm("/Events/purchase", formData);

    alert("Payment proof submitted. Awaiting confirmation.");
    localStorage.removeItem("pendingPaymentEvent");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white px-6 py-20">
      <div className="max-w-lg mx-auto bg-[#151515] p-8 rounded-xl border border-[#242424]">

        <h1 className="text-2xl font-bold mb-6">Payment Confirmation</h1>

        <p className="text-gray-400 mb-6">
          Have you completed the payment for <b>{event.title}</b>?
        </p>

        {hasPaid === null && (
          <div className="flex gap-4">
            <button
              onClick={() => setHasPaid(true)}
              className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg"
            >
              Yes, I have paid
            </button>

            <button
              onClick={() => setHasPaid(false)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg"
            >
              Not yet
            </button>
          </div>
        )}

        {hasPaid && (
          <>
            <label className="block mt-6 mb-2 text-sm text-gray-400">
              Upload proof of payment
            </label>

            <input
              type="file"
              onChange={(e) => setReceipt(e.target.files[0])}
              className="w-full bg-[#0b0b0b] border border-[#242424] rounded-lg p-3"
            />

            <button
              onClick={submitProof}
              disabled={!receipt}
              className="w-full mt-6 bg-red-600 hover:bg-red-700 py-3 rounded-lg disabled:opacity-50"
            >
              Submit Proof
            </button>
          </>
        )}
      </div>
    </div>
  );
}
