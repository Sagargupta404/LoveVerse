"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaArrowLeft, FaPlay, FaPause } from "react-icons/fa";

const stories = [
  {
    name: "Radha ❤️ Krishna",
    image: "/love/KR.avif",
    story:
      "Radha and Krishna shared a love beyond marriage, beyond possession, beyond worldly boundaries. Their playful affection carried deep spiritual meaning. Though destiny separated them physically, their connection endured through devotion, music, and memory. Radha’s unwavering devotion and Krishna’s divine charm transformed their bond into an eternal symbol of love that survives distance, silence, and time itself.",
    learning:
      "Love deepens through spiritual understanding, patience, emotional intimacy, and freedom without possession.",
    reflections: [
      "Can love exist without ownership?",
      "Does distance weaken connection?",
      "Is spiritual intimacy enough?"
    ]
  },
  {
    name: "Ram ❤️ Sita",
    image: "/love/RS.jpg",
    story:
      "Ram and Sita’s love endured exile, war, and painful separation. Their bond was not built on comfort but on duty, loyalty, and shared values. Even under public judgment and hardship, their devotion remained steady. Their relationship teaches that love anchored in responsibility and honor survives even when life becomes unpredictable and harsh.",
    learning:
      "Loyalty, sacrifice, resilience, and shared values protect love during hardship.",
    reflections: [
      "Would you endure exile together?",
      "Is loyalty unconditional?",
      "Can love survive judgment?"
    ]
  },
  {
    name: "Shiv ❤️ Parvati",
    image: "/love/sp.jpg",
    story:
      "Parvati’s intense devotion and years of penance softened Shiva’s detachment. Their union symbolizes harmony between strength and calmness, destruction and creation. Love for them was not instant passion but spiritual alignment and balance. Together they represent mature connection built through patience and inner growth.",
    learning:
      "Balance, patience, maturity, and spiritual growth sustain long-term love.",
    reflections: [
      "Have you grown individually?",
      "Is your love balanced?",
      "Does patience guide you?"
    ]
  },
  {
    name: "Heer ❤️ Ranjha",
    image: "/love/hr.jpg",
    story:
      "Heer and Ranjha chose love despite family opposition and societal pressure. Betrayal and separation tested their devotion repeatedly. Their story became legend because they valued emotional truth over comfort. Their courage reminds us that love often demands bravery.",
    learning:
      "Courage and emotional honesty protect love against social resistance.",
    reflections: [
      "Would you defy society?",
      "Is comfort more important?",
      "Can love break tradition?"
    ]
  },
  {
    name: "Romeo ❤️ Juliet",
    image: "/love/rj.jpg",
    story:
      "Romeo and Juliet fell in love despite family rivalry. Their passion was intense and fearless but impulsive. Misunderstanding and haste led to tragedy. Their story remains powerful because it reflects how love without patience can collapse under emotional pressure.",
    learning:
      "Passion must align with patience, maturity, and thoughtful decisions.",
    reflections: [
      "Is your love mature?",
      "Do emotions overpower logic?",
      "Can wisdom protect passion?"
    ]
  },
  {
    name: "Laila ❤️ Majnu",
    image: "/love/lm.avif",
    story:
      "Majnu’s devotion for Laila transformed into consuming obsession. Separation blurred the line between identity and love. His longing became spiritual intensity. Their story warns that love must elevate the soul, not destroy balance.",
    learning:
      "Healthy love requires boundaries, balance, identity, and emotional stability.",
    reflections: [
      "Does love define you?",
      "Is devotion balanced?",
      "Can obsession become unhealthy?"
    ]
  },
  {
    name: "Cleopatra ❤️ Antony",
    image: "/love/ca.jpg",
    story:
      "Cleopatra and Antony united political power with passionate devotion. Their loyalty reshaped history but cost them kingdoms. Choosing each other over ambition, they faced downfall together. Their story shows how love can rival empires yet demand sacrifice.",
    learning:
      "Love challenges ego, ambition, pride, and external pressures.",
    reflections: [
      "Would you risk power?",
      "Is loyalty stronger than ambition?",
      "Can love change destiny?"
    ]
  },
  {
    name: "Orpheus ❤️ Eurydice",
    image: "/love/asa.jpg",
    story:
      "Orpheus descended into the underworld to reclaim Eurydice. His music softened darkness, yet doubt cost him her forever. Their story echoes how trust determines love’s survival when fear interferes.",
    learning:
      "Trust, belief, and emotional control sustain love during uncertainty.",
    reflections: [
      "Do you trust completely?",
      "Does fear guide decisions?",
      "Can doubt destroy love?"
    ]
  },
  {
    name: "Tristan ❤️ Isolde",
    image: "/love/ti.jpg",
    story:
      "Tristan and Isolde were bound by forbidden desire and fate. Their love defied loyalty and morality, unfolding in secrecy and sacrifice. Though tragic, their devotion became legendary. Their story explores passion, destiny, and consequence.",
    learning:
      "Desire must align with integrity, responsibility, and awareness.",
    reflections: [
      "Is destiny stronger than choice?",
      "Can love break vows?",
      "Does passion justify risk?"
    ]
  }
];

export default function LegendaryStories() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0f14] to-[#12070b] text-white relative">

      {/* Fixed Controls */}
      <div className="fixed top-6 left-6 z-50 flex gap-4">
        <button
          onClick={() => router.back()}
          className="bg-black/70 px-4 py-2 rounded-full border border-pink-500 text-pink-400 flex items-center gap-2"
        >
          <FaArrowLeft /> Back
        </button>

        <button
          onClick={toggleMusic}
          className="bg-black/70 px-4 py-2 rounded-full border border-pink-500 text-pink-400 flex items-center gap-2"
        >
          {playing ? <FaPause /> : <FaPlay />}
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      <audio ref={audioRef} loop>
        <source src="/music/love-theme.mp3" type="audio/mpeg" />
      </audio>

      {/* Hero */}
      <div className="text-center py-24">
        <h1 className="text-5xl md:text-6xl font-bold text-pink-500">
          Eternal Echoes of Love
        </h1>
        <p className="text-gray-400 mt-4">
          Nine legendary stories. One timeless emotion.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 pb-24">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelected(story)}
            className="cursor-pointer rounded-2xl overflow-hidden border border-pink-500/40 shadow-xl"
            style={{
              backgroundImage: `url(${story.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: "1/1"
            }}
          >
            <div className="bg-black/60 h-full flex items-center justify-center text-center p-4">
              <h2 className="text-lg font-semibold">{story.name}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          >
            <div className="w-full max-w-6xl h-[80vh] bg-[#140a0f] rounded-3xl flex overflow-hidden">

              <div
                className="w-1/2"
                style={{
                  backgroundImage: `url(${selected.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />

              <div className="w-1/2 p-10 overflow-y-auto relative">

                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 text-xl"
                >
                  <FaTimes />
                </button>

                <h2 className="text-5xl font-bold text-pink-400 mb-6">
                  {selected.name}
                </h2>

                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  {selected.story}
                </p>

                <p className="text-xl text-pink-300 mb-6">
                  {selected.learning}
                </p>

                <ul className="text-xl text-gray-400 space-y-2">
                  {selected.reflections.map((q, i) => (
                    <li key={i}>• {q}</li>
                  ))}
                </ul>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}