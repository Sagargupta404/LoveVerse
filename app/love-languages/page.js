"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const questions = [
  {
    question: "When your partner is upset, what do you do?",
    options: [
      { text: "Listen and comfort them patiently", score: 5 },
      { text: "Try to fix the problem quickly", score: 4 },
      { text: "Give them space", score: 3 },
      { text: "Tell them not to overreact", score: 2 },
      { text: "Ignore it", score: 1 },
    ],
  },
  {
    question: "What matters most in your relationship?",
    options: [
      { text: "Trust and emotional safety", score: 5 },
      { text: "Communication", score: 4 },
      { text: "Fun and adventure", score: 3 },
      { text: "Physical attraction", score: 2 },
      { text: "Convenience", score: 1 },
    ],
  },
  {
    question: "If you fight, how do you handle it?",
    options: [
      { text: "Talk calmly and solve together", score: 5 },
      { text: "Apologize first to fix it", score: 4 },
      { text: "Wait until things cool down", score: 3 },
      { text: "Prove your point", score: 2 },
      { text: "Stop talking", score: 1 },
    ],
  },
  {
    question: "How do you show love?",
    options: [
      { text: "Support their dreams", score: 5 },
      { text: "Spend quality time", score: 4 },
      { text: "Give gifts", score: 3 },
      { text: "Say 'I love you'", score: 2 },
      { text: "Only on special days", score: 1 },
    ],
  },
  {
    question: "If distance separates you?",
    options: [
      { text: "Stay loyal and connected", score: 5 },
      { text: "Plan visits often", score: 4 },
      { text: "Stay busy and adjust", score: 3 },
      { text: "Feel insecure often", score: 2 },
      { text: "Move on easily", score: 1 },
    ],
  },
];

export default function LoveQuiz() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (score) => {
    const newScore = totalScore + score;
    setTotalScore(newScore);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const lovePercent = Math.round((totalScore / 25) * 100);

  const getResultData = () => {
    if (lovePercent >= 85)
      return {
        title: "Soulmates 💍",
        message:
          "This is rare, deep, emotional love. You truly understand each other.",
      };
    if (lovePercent >= 65)
      return {
        title: "Strong Love 💖",
        message:
          "A beautiful connection built on trust and care.",
      };
    if (lovePercent >= 45)
      return {
        title: "Growing Love 🌱",
        message:
          "Your bond is developing. Keep nurturing it.",
      };
    return {
      title: "Needs More Understanding 💭",
      message:
        "Love grows with communication and effort.",
    };
  };

  const result = getResultData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-black to-pink-900 text-white flex flex-col items-center justify-center px-6 relative">

      {/* Back */}
      <button
        onClick={() => router.push("/journey")}
        className="fixed top-6 left-6 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition"
      >
        <FaArrowLeft />
        Back
      </button>

      {!finished ? (
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold mb-8">
            Question {current + 1} of 5
          </h2>

          <p className="text-xl mb-8 text-pink-300">
            {questions[current].question}
          </p>

          <div className="space-y-4">
            {questions[current].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.score)}
                className="w-full bg-white/10 border border-white/20 p-4 rounded-xl hover:bg-pink-600 transition"
              >
                {option.text}
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-xl bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20"
        >
          <FaHeart className="text-7xl text-pink-400 mx-auto mb-6 animate-pulse" />

          <h2 className="text-4xl font-bold mb-4">
            {result.title}
          </h2>

          <div className="text-6xl font-extrabold text-pink-300 mb-6">
            {lovePercent}%
          </div>

          <p className="text-lg text-gray-300 mb-8">
            {result.message}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-pink-600 rounded-full hover:bg-pink-700 transition"
          >
            Take Quiz Again 💞
          </button>
        </motion.div>
      )}
    </div>
  );
}