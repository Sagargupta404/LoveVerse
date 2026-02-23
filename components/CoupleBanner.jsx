"use client";
import { useEffect, useState } from "react";

export default function CoupleBanner() {
  const [couple, setCouple] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("coupleId");
    if (!id) return;

    fetch("/api/couples/login", {
      method: "POST",
      body: JSON.stringify({ coupleId: id, pin: "temp" })
    });
  }, []);

  if (!couple) return null;

  return (
    <div className="fixed top-0 w-full bg-black text-pink-400 text-center py-2 z-50">
      ❤️ {couple.partner1} & {couple.partner2}
    </div>
  );
}