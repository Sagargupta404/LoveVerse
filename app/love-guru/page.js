"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";


export default function LoveGuru() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Tell me what your heart is feeling… ❤️",
    },
  ]);
  const router = useRouter();
const [step, setStep] = useState("mood"); 
const [selectedMood, setSelectedMood] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const moods = [
  { label: "Happy", emoji: "😊" },
  { label: "Sad", emoji: "😢" },
  { label: "Confused", emoji: "😕" },
  { label: "Angry", emoji: "😡" },
  { label: "In Love", emoji: "💖" },
];

const questionsByMood = {
  Sad: ["Why do I feel ignored?", "How to handle heartbreak?"],
  Confused: ["Do they love me?", "What should I do next?"],
  Happy: ["How to make relationship stronger?"],
  Angry: ["How to fix after fight?"],
  "In Love": ["How to express love better?"],
};
  // 🔊 sound
  const playSound = () => {
    const audio = new Audio("/sounds/pop.mp3");
    audio.play();
  };

  // auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/love-guru", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
  messages: newMessages,
  mood: selectedMood,   // 👈 ADD THIS LINE
}),
    });

    const data = await res.json();

    const updated = [
      ...newMessages,
      { role: "assistant", content: data.reply },
    ];

    setMessages(updated);
    setLoading(false);

    playSound(); // 🔊 SOUND HERE
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0f14] to-black text-white flex flex-col">
<button
  onClick={() => router.push("/")}
  className="
    fixed top-5 left-5 z-70
    flex items-center gap-2

    px-3 py-2 md:px-5 md:py-3
    text-xs md:text-sm

    border border-white/20
    bg-black/40 backdrop-blur-md
    text-white

    rounded-full

    hover:bg-white hover:text-black
    transition-all duration-300
  "
>
  Back 

  {/* Hide text on small screens */}
  <span className="hidden md:inline">
    Home
  </span>
</button>


<div className="
  sticky top-0 z-50
  p-4 text-center text-4xl font-semibold
  border-b border-pink-500/20
  bg-black/80 backdrop-blur-md
">
  💖 Love Guru
</div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[75%] shadow-md ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                  : "bg-white/10 text-gray-200 backdrop-blur-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-gray-400 animate-pulse">Love Guru is thinking…</p>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-pink-500/20 flex gap-2 bg-black/50 backdrop-blur-md">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your feelings..."
          className="flex-1 p-3 rounded-xl bg-white/10 outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400"
        />

        <button
          onClick={sendMessage}
          className="px-5 bg-pink-200 hover:bg-pink-800 rounded-xl"
        >
          ❤️
        </button>

      </div>
    </div>
  );
}