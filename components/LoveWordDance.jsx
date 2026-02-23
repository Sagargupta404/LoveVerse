"use client";

import { useEffect, useState } from "react";

const loveWords = [
  "Affection","Trust","Loyalty","Devotion","Harmony","Passion",
  "Respect","Kindness","Patience","Connection","Commitment",
  "Intimacy","Care","Warmth","Compassion","Joy","Support",
  "Hope","Faith","Romance","Unity","Soulmate","Tenderness",
  "Gratitude","Honesty","Security","Belief","Togetherness",
  "Admiration","Empathy","Peace","Strength","Desire",
  "Appreciation","Friendship","Dreams","Bliss","Healing",
  "Spark","Chemistry","Promise","Serenity","Glow","Happiness",
  "Cherish","Belonging","Calm","Closeness","Acceptance",
  "Radiance","Inspiration","Magic","Forever","Encouragement",
  "Growth","Tender","Sincere","Flourish","Light","Smile",
  "Hug","Heart","Eternal","Believe","Kind","Pure","Gentle",
  "Passionate","United","Connected","Safe","Alive",
  "Blissful","Strong","Comforted","Secure","Cherished",
  "Faithful","Deep","Infinite"
];

const coreWords = [
  "Long Wait",
  "Understanding",
  "Forgiveness"
];

export default function LoveWordDance({ trigger }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">

      {/* CORE WORDS CENTER */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-12">

        {coreWords.map((word, index) => (
          <span
            key={index}
            className="text-red-300 font-extrabold text-3xl md:text-8xl tracking-wide"
          >
            {word}
          </span>
        ))}

      </div>

      {/* FLOATING BACKGROUND WORDS */}
      {loveWords.map((word, index) => (
        <span
          key={`float-${index}`}
          className="absolute text-white/40 font-medium animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 20}px`,
            animationDuration: `${4 + Math.random() * 6}s`
          }}
        >
          {word}
        </span>
      ))}

    </div>
  );
}