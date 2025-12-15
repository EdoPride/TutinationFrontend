import React, { useEffect, useState } from "react";
import NavbarAdmin from "../component/NavbarAdmin";
export default function PaymentLink() {
    const [links, setLinks] = useState(null);
    const [loading, setLoading] = useState(true);

    const [podcast, setPodcast] = useState("");
    const [studio, setStudio] = useState("");

    useEffect(() => {
        async function loadLinks() {
            try {
                const res = await fetch("http://localhost:5173/api/PaymentLink/Get-All-Payment-Links");
                const text = await res.text();

                let data = [];
                try {
                    data = JSON.parse(text);
                } catch {
                    setLinks(null);
                    setLoading(false);
                    return;
                }

                if (!Array.isArray(data) || data.length === 0) {
                    setLinks(null);
                    setLoading(false);
                    return;
                }

                const first = data[0];
                setLinks(first);
                setPodcast(first.podcastPaymentLink || "");
                setStudio(first.studioPaymentLink || "");
            } catch (err) {
                console.error("Error:", err);
                setLinks(null);
            } finally {
                setLoading(false);
            }
        }

        loadLinks();
    }, []);

    const createLinks = async () => {
        const formData = new FormData();
        formData.append("PodcastPaymentLink", podcast);
        formData.append("StudioPaymentLink", studio);

        const res = await fetch("http://localhost:5173/api/PaymentLink/Add-PaymentLink", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            alert("Payment links created!");
            window.location.reload();
        }
    };

    const updatePodcast = async () => {
        const formData = new FormData();
        formData.append("PodcastPaymentLink", podcast);

        await fetch(`http://localhost:5173/api/PaymentLink/Update-PodcastPaymentLink/${links.id}`, {
            method: "PUT",
            body: formData,
        });

        alert("Podcast link updated!");
    };

    const updateStudio = async () => {
        const formData = new FormData();
        formData.append("StudioPaymentLink", studio);

        await fetch(`http://localhost:5173/api/PaymentLink/Update-StudioPaymentLink/${links.id}`, {
            method: "PUT",
            body: formData,
        });

        alert("Studio link updated!");
    };

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center text-white">
                Loading...
            </div>
        );
    }

    return (
        <>
            <NavbarAdmin />
            <div className="min-h-screen bg-black text-white flex justify-center pt-24 px-4">
                <div className="bg-[#111] p-8 rounded-2xl shadow-xl w-full max-w-3xl border border-[#1f1f1f]">
                    <h1 className="text-3xl font-bold text-center mb-10">Payment Links</h1>

                    {/* -------------------------------------------------------
                       MODE 1 → NO PAYMENT LINKS IN DATABASE
                    -------------------------------------------------------- */}
                    {!links && (
                        <div className="text-center">
                            <h2 className="text-xl font-semibold mb-6">Create Your Payment Links</h2>

                        {/* Podcast */}
                        <input
                            value={podcast}
                            onChange={(e) => setPodcast(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-[#333] mb-4"
                            placeholder="Enter Podcast Payment Link"
                        />

                        {/* Studio */}
                        <input
                            value={studio}
                            onChange={(e) => setStudio(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-[#333] mb-6"
                            placeholder="Enter Studio Payment Link"
                        />

                        <button
                            onClick={createLinks}
                            className="w-full py-3 rounded-lg font-semibold text-black bg-linear-to-r 
                            from-red-600 via-amber-500 to-yellow-400 hover:opacity-90 transition-all"
                        >
                            Create Payment Links
                        </button>
                    </div>
                )}

                {/* -------------------------------------------------------
                   MODE 2 → LINKS EXIST → UPDATE UI
                -------------------------------------------------------- */}
                {links && (
                    <>
                        {/* Podcast update */}
                        <h2 className="text-xl font-semibold mb-3 mt-6">Podcast Payment Link</h2>
                        <input
                            value={podcast}
                            onChange={(e) => setPodcast(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-[#333]"
                        />
                        <button
                            onClick={updatePodcast}
                            className="mt-4 w-full py-3 rounded-lg font-semibold text-black bg-linear-to-r 
                            from-red-600 via-amber-500 to-yellow-400 hover:opacity-90 transition-all"
                        >
                            Update Podcast Link
                        </button>

                        <hr className="border-[#222] my-8" />

                        {/* Studio update */}
                        <h2 className="text-xl font-semibold mb-3">Studio Payment Link</h2>
                        <input
                            value={studio}
                            onChange={(e) => setStudio(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-[#333]"
                        />
                        <button
                            onClick={updateStudio}
                            className="mt-4 w-full py-3 rounded-lg font-semibold text-black bg-linear-to-r 
                            from-red-600 via-amber-500 to-yellow-400 hover:opacity-90 transition-all"
                        >
                            Update Studio Link
                        </button>

                        {links.updatedAt && (
                            <div className="text-center text-gray-500 text-sm mt-8">
                                Last Updated: {new Date(links.updatedAt).toLocaleString()}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    </>
    );
}
