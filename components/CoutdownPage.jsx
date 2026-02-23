"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function CountdownPage() {
  const router = useRouter();
  const [targetDate, setTargetDate] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const savedDate = localStorage.getItem("loveDate");
    if (savedDate) setTargetDate(savedDate);
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    localStorage.setItem("loveDate", targetDate);

    const interval = setInterval(() => {
      const difference = new Date(targetDate) - new Date();

      if (difference <= 0) {
        setTimeLeft("Forever Begins ❤️");
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        );
        const minutes = Math.floor(
          (difference / (1000 * 60)) % 60
        );
        const seconds = Math.floor(
          (difference / 1000) % 60
        );

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative px-6">

      {/* Back Button */}
      <button
        onClick={() => router.push("/journey")}
        className="fixed top-6 left-6 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition"
      >
        <FaArrowLeft />
        Back
      </button>

      <h1 className="text-5xl font-bold mb-10 text-center">
        Your Forever Begins In ❤️
      </h1>

      {/* Date Picker */}
      <input
        type="datetime-local"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
        className="bg-gray-900 border border-gray-700 rounded-lg p-3 mb-10"
      />

      {/* Countdown Display */}
      {timeLeft && typeof timeLeft !== "string" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-2xl md:text-4xl font-semibold">
          <div className="bg-gray-900 p-6 rounded-xl">
            {timeLeft.days} <p className="text-sm">Days</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            {timeLeft.hours} <p className="text-sm">Hours</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            {timeLeft.minutes} <p className="text-sm">Minutes</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            {timeLeft.seconds} <p className="text-sm">Seconds</p>
          </div>
        </div>
      )}

      {timeLeft === "Forever Begins ❤️" && (
        <h2 className="text-4xl mt-10 text-pink-500">
          Forever Begins ❤️
        </h2>
      )}
    </div>
  );
}