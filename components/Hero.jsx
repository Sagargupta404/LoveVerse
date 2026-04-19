"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaHeart, FaMusic } from "react-icons/fa";

import LoveWordDance from "@/components/LoveWordDance";
import { useRouter } from "next/navigation";

export default function Hero() {
  const text = "Where two souls meet, destiny begins...";
  const [displayedText, setDisplayedText] = useState("");
  const [musicOn, setMusicOn] = useState(false);
  const [dance, setDance] = useState(false);
  const audioRef = useRef(null);
 const [visitors, setVisitors] = useState(0);
const [partner1, setPartner1] = useState("");
const [partner2, setPartner2] = useState("");
const [pin, setPin] = useState("");
const router = useRouter();

const [showRegister, setShowRegister] = useState(true);



const [showHint, setShowHint] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowHint(false);
  }, 3000); // disappears after 3s

  return () => clearTimeout(timer);
}, []);
useEffect(() => {
  const updateVisit = async () => {
    try {
      const res = await fetch("/api/visit", {
        method: "POST",
      });
      const data = await res.json();
      setVisitors(data.count);
    } catch (err) {
      console.error("Visitor error", err);
    }
  };

  updateVisit();
}, []);



  // Typewriter Effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);
const handlePinSubmit = async () => {
  const res = await fetch("/api/couples/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      coupleId: selectedCouple,
      pin: pin,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("coupleId", data._id);
    router.push("/journey");
  } else {
    setError("Invalid PIN");
  }
   };
  // Music Toggle
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (musicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusicOn(!musicOn);
  };

  

  // Scroll Click Handler
  const handleScrollClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setDance(true);

    // Auto return after 8 seconds
    setTimeout(() => {
      setDance(false);
    }, 8000);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">

      {/* Star Particles */}
    <motion.button
  onClick={() => router.push("/love-guru")}
  whileHover={{ scale: 1.05 }}
  className="
    absolute top-5 right-5 z-50
    flex items-center gap-2

    px-3 py-2 md:px-5 md:py-3

    text-xs md:text-sm

    border border-pink-500 text-pink-400
    rounded-full

    bg-black/40 backdrop-blur-md

    hover:bg-pink-500 hover:text-white

    transition-all duration-300
  "
>
  <span>💬</span>

  {/* Mobile text */}
  <span className="md:hidden">
    LoveGuru
  </span>

  {/* Desktop text */}
  <span className="hidden md:inline">
    Chat with Love-Guru
  </span>
</motion.button>
      {/* Romantic Glow */}
      <div className="absolute w-[700px] h-[700px] bg-pink-600 rounded-full blur-[250px] opacity-20"></div>

      {/* MAIN CONTENT (Hidden when dance = true) */}
      {!dance && (
        <div className="z-10 text-center px-6">

          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-pink-400 via-red-500 to-purple-500 text-transparent bg-clip-text"
          >
            LoveVerse
          </motion.h1>

          

          <p className="mt-6 text-xl md:text-2xl text-gray-300 min-h-[40px]">
            {displayedText}
          </p>
          <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
  className="mt-3 text-sm md:text-lg text-pink-400 tracking-wide"
>
  💖 Loved by {visitors} souls
</motion.p>

          {/* Beating Heart */}
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="flex justify-center mt-10"
          >
            <FaHeart className="text-pink-500 text-7xl drop-shadow-[0_0_40px_rgba(255,0,128,0.8)]" />
          </motion.div>

          {/* Buttons */}
          <div className="mt-10 flex justify-center gap-6">
            <div className="mt-16 space-y-3 text-center">
 
</div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => router.push("/journey")}
              className="px-10 py-4 border border-pink-500 rounded-full hover:bg-pink-500 hover:shadow-[0_0_40px_rgba(255,0,128,0.6)] transition-all duration-500"
            >
              Begin the Journey ❤️
            </motion.button>


            <button
              onClick={toggleMusic}
              className="px-6 py-4 border border-white rounded-full hover:bg-white hover:text-black transition-all"
            >
              <FaMusic />
            </button>
    
          </div>

          {/* Scroll Indicator */}
          <motion.div
            onClick={handleScrollClick}
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mt-20 text-gray-400 cursor-pointer hover:text-pink-400 transition"
          >
            ↓ Scroll to Explore
          </motion.div>

        </div>
      )}

      {/* Floating Love Words */}
      {dance && <LoveWordDance trigger={dance} />}

      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src="/music/r1.mpeg" type="audio/mpeg" />
      </audio>
     
      
    </section>
  );
}