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

// ✅ DATE DATA
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const years = Array.from({ length: 35 }, (_, i) => 1996 + i);

export default function LoveStoryPage() {
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // ✅ NEW STATES
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [finished, setFinished] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [customTitle, setCustomTitle] = useState("");

  const [customDay, setCustomDay] = useState("");
  const [customMonth, setCustomMonth] = useState("");
  const [customYear, setCustomYear] = useState("");

  // 🎆 CONFETTI
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

  // ✅ FORMAT DATE
  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const formatDate = (d, m, y) => {
    if (!d || !m || !y) return "";
    return `${d}${getOrdinal(d)} ${m} ${y}`;
  };

  const handleNext = () => {
    if (!day || !month || !year) return;

    const newEvent = {
      title: defaultSteps[currentStep].label,
      date: formatDate(day, month, year),
    };

    const updated = [...events, newEvent];
    setEvents(updated);

    setDay("");
    setMonth("");
    setYear("");

    if (currentStep + 1 < defaultSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setFinished(true);
      setTimeout(triggerBlast, 400);
    }
  };

  const addCustomEvent = () => {
    if (!customTitle || !customDay || !customMonth || !customYear) return;

    const updated = [
      ...events,
      {
        title: customTitle,
        date: formatDate(customDay, customMonth, customYear),
      },
    ];

    setEvents(updated);

    setCustomTitle("");
    setCustomDay("");
    setCustomMonth("");
    setCustomYear("");
    setShowAdd(false);

    triggerBlast();
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

  const progress = (events.length / defaultSteps.length) * 100;

  return (
    <div className="min-h-screen bg-black text-white px-8 py-20">

      {/* BACK BUTTON */}
      <button
        onClick={() => router.push("/journey")}
        className="fixed top-6 left-6 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-2 bg-white/10">
        <div
          className="h-full bg-pink-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!finished ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-center max-w-lg mx-auto">

          <FaHeart className="text-5xl text-pink-500 mb-6 animate-pulse" />

          <h2 className="text-5xl font-bold mb-10">
            {defaultSteps[currentStep].label}
          </h2>

          {/* ✅ NEW SELECT INPUT */}
          <div className="flex gap-4 mb-6">

  <select
    value={day}
    onChange={(e) => setDay(Number(e.target.value))}
    className="bg-white/10 text-white p-3 rounded-lg border border-white/20"
  >
    <option value="" className="text-black">Day</option>
    {days.map(d => (
      <option key={d} value={d} className="text-black">
        {d}
      </option>
    ))}
  </select>

  <select
    value={month}
    onChange={(e) => setMonth(e.target.value)}
    className="bg-white/10 text-white p-3 rounded-lg border border-white/20"
  >
    <option value="" className="text-black">Month</option>
    {months.map(m => (
      <option key={m} value={m} className="text-black">
        {m}
      </option>
    ))}
  </select>

  <select
    value={year}
    onChange={(e) => setYear(Number(e.target.value))}
    className="bg-white/10 text-white p-3 rounded-lg border border-white/20"
  >
    <option value="" className="text-black">Year</option>
    {years.map(y => (
      <option key={y} value={y} className="text-black">
        {y}
      </option>
    ))}
  </select>

</div>

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
              onClick={triggerBlast}
            >
              <div className="grid md:grid-cols-2 gap-10 items-center">

                {index % 2 === 0 ? (
                  <>
                    <div>
                      <h2 className="text-4xl md:text-6xl font-bold flex items-center gap-4">
                        {event.title}
                        <FaHeart className="text-pink-500" />
                      </h2>

                      <p className="mt-6 text-xl text-gray-300">
                        {getLine(event.title)}
                      </p>
                    </div>

                    <h3 className="text-4xl md:text-6xl text-pink-400 text-right">
                      {event.date}
                    </h3>
                  </>
                ) : (
                  <>
                    <h3 className="text-4xl md:text-6xl text-pink-400">
                      {event.date}
                    </h3>

                    <div className="text-right">
                      <h2 className="text-4xl md:text-6xl font-bold flex justify-end gap-4">
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

          {/* ✅ ADD FEATURE (UNCHANGED STYLE) */}
          <div className="pt-10 text-center">

            {!showAdd ? (
              <button
                onClick={() => setShowAdd(true)}
                className="px-10 py-3 bg-pink-600 rounded-full hover:bg-pink-700 transition"
              >
                ❤️ Add Another Beautiful Moment
              </button>
            ) : (
              <div className="max-w-md mx-auto mt-8 space-y-4">

                <input
                  type="text"
                  placeholder="Moment Title"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg"
                />

                <div className="flex gap-3">

                  <select onChange={(e) => setCustomDay(Number(e.target.value))}
                    className="bg-white/10 text-white p-2 rounded">
                    <option>Day</option>
                    {days.map(d => <option key={d}>{d}</option>)}
                  </select>

                  <select onChange={(e) => setCustomMonth(e.target.value)}
                    className="bg-white/10 text-white p-2 rounded">
                    <option>Month</option>
                    {months.map(m => <option key={m}>{m}</option>)}
                  </select>

                  <select onChange={(e) => setCustomYear(Number(e.target.value))}
                    className="bg-white/10 text-white p-2 rounded">
                    <option>Year</option>
                    {years.map(y => <option key={y}>{y}</option>)}
                  </select>

                </div>

                <button
                  onClick={addCustomEvent}
                  className="w-full py-3 bg-pink-600 rounded-lg hover:bg-pink-700 transition"
                >
                  Save Moment ❤️
                </button>

              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}