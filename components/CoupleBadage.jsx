"use client";
import { useEffect, useState } from "react";

export default function CoupleBadge() {
  const [couple, setCouple] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("coupleId");
    if (!id) return;

    fetch("/api/couples/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coupleId: id, pin: "" })
    })
      .then(res => res.json())
      .then(data => setCouple(data));
  }, []);

  if (!couple) return null;

  return (
    <div className="fixed top-4 right-4 text-pink-400">
      ❤️ {couple.partner1} & {couple.partner2}
    </div>
  );
}