"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function JourneyPage() {
  const router = useRouter();

  const sections = [
    {
      title: "Love Countdown",
      description:
        "Count every heartbeat until your forever begins.",
      button: "Enter Countdown",
      path: "/countdown",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
    },
    {
      title: "Love Languages",
      description:
        "Discover how you and your partner truly express love.",
      button: "Start Test",
      path: "/love-languages",
      image:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },
    {
      title: "Your Love Story",
      description:
        "Create a timeline of your most beautiful memories.",
      button: "Create Story",
      path: "/timeline",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      title: "Legendary Love Stories",
      description:
        "Explore eternal tales that time could never erase.",
      button: "Read Stories",
      path: "/legendary-stories",
      image:
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
    },
  ];

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white">

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition"
      >
        <FaArrowLeft />
        Back
      </button>

      {sections.map((section, index) => (
        <section
          key={index}
          className="h-screen snap-start relative flex items-center justify-center text-center"
          style={{
            backgroundImage: `url(${section.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {section.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10">
              {section.description}
            </p>

            <button
              onClick={() => router.push(section.path)}
              className="px-8 py-3 bg-pink-600 hover:bg-pink-700 rounded-full transition text-lg font-medium"
            >
              {section.button}
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}