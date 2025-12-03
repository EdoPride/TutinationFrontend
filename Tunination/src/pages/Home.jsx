import React, { useState, useEffect } from "react";

import LogoWavy from "../assets/Logowavy.mp4";
import StudioVideo from "../assets/studio.mp4";
import PartyVideo from "../assets/Party.mp4";
import Promotion from "../assets/Promotion.png";
import OjbrownVid from "../assets/ojbrownVid.mp4";
import OjbrownDance1 from "../assets/ojbrownDance1.mp4";
import highlight1 from "../assets/ojbrown4.jpeg";
import highlight2 from "../assets/ojbrown5.jpeg";
import highlight3 from "../assets/ojbrown7.jpeg";  
export default function Home() {
  const slides = [
    {
      type: "video",
      src: LogoWavy,
      title: "Daddytutination",
      subtitle: "The pride of entertainment",
      buttons: [
        { text: "Login", link: "/login" },
        { text: "Sign Up", link: "/register" },
      ],
    },
    {
      type: "video",
      src: StudioVideo,
      title: "Book Studio Session",
      subtitle: "High-quality sound recording",
      buttons: [{ text: "Book Session", link: "/appointment" }],
    },
    {
      type: "video",
      src: PartyVideo,
      title: "Get Your Ticket",
      subtitle: "Experience the best nightlife",
      buttons: [{ text: "Buy Ticket", link: "/ticket" }],
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-screen overflow-hidden bg-black">

        {/* Background Video */}
        {slide.type === "video" && (
          <video
            src={slide.src}
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover brightness-[0.45] transition-all duration-1000"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/40 to-black/80 pointer-events-none"></div>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-xl animate-fade">
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="mt-4 text-lg md:text-2xl opacity-90 animate-fade-delayed">
              {slide.subtitle}
            </p>
          )}

          {/* Buttons */}
          {slide.buttons && (
            <div className="flex gap-4 mt-8 animate-fade-delayed">
              {slide.buttons.map((btn, i) => (
                <a
                  key={i}
                  href={btn.link}
                  className="px-7 py-3 text-lg rounded-lg bg-red-600 hover:bg-red-700 shadow-lg transition transform hover:scale-105"
                >
                  {btn.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* =============== END OF HERO SECTION =============== */}

      {/* =============== ABOUT SECTION ================= */}
      <section className="py-20 bg-black text-white text-center px-6">
        <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
        <p className="max-w-4xl mx-auto text-lg opacity-80 leading-relaxed">
          Daddytutination is the home of premium entertainment. From music
          recording to nightlife events, artist promotions, and high-quality
          content creation — we deliver unforgettable experiences powered by
          creativity and culture.
        </p>
      </section>

      {/* ================= OUR SERVICES ================= */}
      <section className="py-20 bg-linear-to-b from-black to-[#0a0a0a] px-6 text-white">
        <h2 className="text-4xl font-bold text-center mb-14">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Studio */}
          <div className="bg-[#111] p-7 rounded-xl shadow-lg hover:scale-105 transition">
            <video
              src={OjbrownDance1}
              className="w-full h-56 object-cover rounded-lg mb-4"
              autoPlay
              loop
              muted
            />
            <h3 className="text-2xl font-semibold mb-2">Recording Studio</h3>
            <p className="opacity-70 text-lg mb-4">
              World-class sessions with professional engineers and premium
              equipment.
            </p>
            <a
              href="/appointment"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              Book Session
            </a>
          </div>

          {/* Events */}
          <div className="bg-[#111] p-7 rounded-xl shadow-lg hover:scale-105 transition">
            <video
              src={OjbrownVid}
              className="w-full h-56 object-cover rounded-lg mb-4"
              autoPlay
              loop
              muted
            />
            <h3 className="text-2xl font-semibold mb-2">Events & Nightlife</h3>
            <p className="opacity-70 text-lg mb-4">
              Experience concerts, nightlife, and exclusive entertainment.
            </p>
            <a
              href="/ticket"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              Buy Ticket
            </a>
          </div>

          {/* Entertainment Hub */}
          <div className="bg-[#111] p-7 rounded-xl shadow-lg hover:scale-105 transition">
            <img
              src={Promotion}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">Entertainment Hub</h3>
            <p className="opacity-70 text-lg mb-4">
              Filming, branding, artist promotion — the full entertainment
              package.
            </p>
            <a
              href="/register"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              Join Us
            </a>
          </div>
        </div>
      </section>

      {/* ================= GALLERY SECTION ================= */}
      <section className="py-20 bg-black text-white px-6">
        <h2 className="text-4xl font-bold mb-14 text-center">Highlights</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <img
            src={highlight1}
            className="rounded-xl hover:scale-105 transition shadow-lg"
          />
          <img
            src={highlight2}
            className="rounded-xl hover:scale-105 transition shadow-lg"
          />
          <img
            src={highlight3}
            className="rounded-xl hover:scale-105 transition shadow-lg"
          />
        </div>
      </section>
    </>
  );
}
