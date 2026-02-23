"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPlus, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const defaultSteps = [
  { key: "firstMeet", label: "First Meet" },
  { key: "firstDate", label: "First Date" },
  { key: "firstFight", label: "First Fight" },
  { key: "proposal", label: "Proposal" },
  { key: "anniversary", label: "Anniversary" },
];

export default function LoveStoryPage() {
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [tempDate, setTempDate] = useState("");
  const [finished, setFinished] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customDate, setCustomDate] = useState("");

  // 🎆 CONFETTI BLAST FUNCTION
  const triggerBlast = () => {
    const duration = 1200;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 60,
        spread: 100,
        startVelocity: 40,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }, 200);
  };

  const handleNext = () => {
    if (!tempDate) return;

    const newEvent = {
      title: defaultSteps[currentStep].label,
      date: tempDate,
    };

    const updated = [...events, newEvent];
    setEvents(updated);
    setTempDate("");

    if (currentStep + 1 < defaultSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setFinished(true);
      setTimeout(() => {
        triggerBlast(); // 🎆 Blast when full story completes
      }, 400);
    }
  };

  const addCustomEvent = () => {
    if (!customTitle || !customDate) return;

    const updated = [...events, { title: customTitle, date: customDate }];
    setEvents(updated);

    setCustomTitle("");
    setCustomDate("");
    setShowAdd(false);

    triggerBlast(); // 🎆 Blast when new memory added
  };

  const getLine = (title) => {
    const lower = title.toLowerCase();

    if (lower.includes("first meet"))
      return "Two strangers met… and destiny quietly began writing forever.";

    if (lower.includes("first date"))
      return "Where shy smiles turned into comfort and warmth.";

    if (lower.includes("first fight"))
      return "Even storms came, but love chose to stay stronger.";

    if (lower.includes("proposal"))
      return "A question asked with trembling hope… answered with eternity.";

    if (lower.includes("anniversary"))
      return "Another year of choosing each other, again and again.";

    return "A beautiful chapter in your love story.";
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-20">

      {/* Back Button */}
      <button
        onClick={() => router.push("/journey")}
        className="fixed top-6 left-6 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition"
      >
        <FaArrowLeft />
        Back
      </button>

      {!finished ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-center max-w-lg mx-auto">

          <FaHeart className="text-5xl text-pink-500 mb-6 animate-pulse" />

          <h2 className="text-5xl font-bold mb-10">
            {defaultSteps[currentStep].label}
          </h2>

          <input
            type="date"
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
            className="bg-white/10 border border-white/20 p-4 rounded-xl text-center mb-6"
          />

          <button
            onClick={handleNext}
            className="px-10 py-3 bg-pink-600 rounded-full hover:bg-pink-700 transition"
          >
            Continue ❤️
          </button>

          <p className="mt-6 text-gray-400">
            Step {currentStep + 1} of {defaultSteps.length}
          </p>

        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-32">

          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="border-b border-white/10 pb-20 cursor-pointer"
              onClick={triggerBlast} // 🎆 Blast when clicking ANY topic
            >
              <div className="grid md:grid-cols-2 gap-10 items-center">

                {index % 2 === 0 ? (
                  <>
                    <div>
                      <h2 className="text-6xl font-bold uppercase tracking-wide flex items-center gap-4">
                        {event.title}
                        <FaHeart className="text-pink-500" />
                      </h2>

                      <p className="mt-6 text-xl text-gray-300">
                        {getLine(event.title)}
                      </p>
                    </div>

                    <h3 className="text-5xl text-pink-400 font-semibold text-right">
                      {event.date}
                    </h3>
                  </>
                ) : (
                  <>
                    <h3 className="text-5xl text-pink-400 font-semibold">
                      {event.date}
                    </h3>

                    <div className="text-right">
                      <h2 className="text-6xl font-bold uppercase tracking-wide flex items-center justify-end gap-4">
                        <FaHeart className="text-pink-500" />
                        {event.title}
                      </h2>

                      <p className="mt-6 text-xl text-gray-300">
                        {getLine(event.title)}
                      </p>
                    </div>
                  </>
                )}

              </div>
            </motion.div>
          ))}

          {/* Add More Section */}
          <div className="pt-10 text-center">

            {!showAdd ? (
              <button
                onClick={() => setShowAdd(true)}
                className="px-10 py-3 bg-pink-600 rounded-full hover:bg-pink-700 transition"
              >
                ❤️ Add Another Beautiful Moment
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-md mx-auto mt-8 space-y-4"
              >
                <input
                  type="text"
                  placeholder="Moment Title"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg"
                />

                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg"
                />

                <button
                  onClick={addCustomEvent}
                  className="w-full py-3 bg-pink-600 rounded-lg hover:bg-pink-700 transition"
                >
                  Save Moment ❤️
                </button>
              </motion.div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}