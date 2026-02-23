"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaHeart,
  FaCalendarAlt,
  FaClock,
  FaInfinity,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function LoveTracker() {
  const router = useRouter();

  const [startDate, setStartDate] = useState("");
  const [names, setNames] = useState("");
  const [stats, setStats] = useState(null);
  const [nextAnniversary, setNextAnniversary] = useState(null);

  useEffect(() => {
    const savedDate = localStorage.getItem("loveStartDate");
    const savedNames = localStorage.getItem("loveNames");

    if (savedDate) setStartDate(savedDate);
    if (savedNames) setNames(savedNames);
  }, []);

  useEffect(() => {
    if (!startDate) return;

    localStorage.setItem("loveStartDate", startDate);
    localStorage.setItem("loveNames", names);

    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(startDate);
      const diff = now - start;

      if (diff < 0) return;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor(diff / (1000 * 60));
      const heartbeats = Math.floor(minutes * 70);

      setStats({ days, hours, minutes, heartbeats });

      const nextYear = new Date(
        now.getFullYear(),
        start.getMonth(),
        start.getDate()
      );

      if (nextYear < now) {
        nextYear.setFullYear(now.getFullYear() + 1);
      }

      const diffAnniversary = nextYear - now;
      const daysToAnniversary = Math.ceil(
        diffAnniversary / (1000 * 60 * 60 * 24)
      );

      setNextAnniversary(daysToAnniversary);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, names]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-black to-rose-900 text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Floating Background Hearts */}
      <FaHeart className="absolute top-10 left-10 text-pink-500 opacity-20 text-6xl animate-pulse" />
      <FaHeart className="absolute bottom-20 right-10 text-rose-400 opacity-20 text-5xl animate-bounce" />

      {/* Back Button */}
      <button
        onClick={() => router.push("/journey")}
        className="fixed top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-bold text-center mb-8"
      >
        Since The Day We Met ❤️
      </motion.h1>

      {/* Input Section */}
      <div className="flex flex-col gap-4 mb-10 w-full max-w-md bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">

        <input
          type="text"
          placeholder="SAGAR & PREETI"
          value={names}
          onChange={(e) => setNames(e.target.value)}
          className="bg-black/40 border border-white/20 rounded-lg p-3 text-center"
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-black/40 border border-white/20 rounded-lg p-3 text-center"
        />
      </div>

      {/* Stats Section */}
      {stats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <StatCard
            icon={<FaCalendarAlt />}
            value={stats.days}
            label="Days Together"
          />
          <StatCard
            icon={<FaClock />}
            value={stats.hours}
            label="Hours"
          />
          <StatCard
            icon={<FaInfinity />}
            value={stats.minutes}
            label="Minutes"
          />
          <StatCard
            icon={<FaHeart />}
            value={stats.heartbeats}
            label="Heartbeats"
          />
        </motion.div>
      )}

      {/* Anniversary */}
      {nextAnniversary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-xl text-pink-300"
        >
          🎉 Next Anniversary in{" "}
          <span className="font-bold text-white">
            {nextAnniversary} days
          </span>
        </motion.div>
      )}
    </div>
  );
}

/* Stat Card Component */
function StatCard({ icon, value, label }) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:scale-105 transition duration-300">
      <div className="text-3xl text-pink-400 mb-3 flex justify-center">
        {icon}
      </div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-gray-300 mt-1">{label}</div>
    </div>
  );
}