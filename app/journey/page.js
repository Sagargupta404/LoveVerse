"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function JourneyPage() {
  const router = useRouter();

  const sections = [
    {
      title: "Love Countdown",
      path: "/countdown",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
    },
    {
      title: "Love Languages",
      path: "/love-languages",
      image:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },
    {
      title: "Your Love Story",
      path: "/timeline",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      title: "Legendary Stories",
      path: "/legendary-stories",
      image:
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
    },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden text-white">

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition"
      >
        <FaArrowLeft />
        Home
      </button>

      {/* Grid 2x2 */}
      <div className="grid grid-cols-2 grid-rows-2 h-full">

        {sections.map((section, index) => (
          <div
            key={index}
            onClick={() => router.push(section.path)}
            className="relative group cursor-pointer"
          >
            {/* Background */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${section.image})` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition duration-300"></div>

            {/* Title */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <h2 className="text-xl md:text-3xl font-bold group-hover:scale-110 transition">
                {section.title}
              </h2>
            </div>
          </div>
        ))}

      </div>

      {/* Center Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-black/50 backdrop-blur-lg px-6 py-4 rounded-full border border-white/20 shadow-lg">
          <h1 className="text-lg md:text-3xl font-semibold text-center">
            Start Your Journey ❤️
          </h1>
        </div>
      </div>
    </div>
  );
}