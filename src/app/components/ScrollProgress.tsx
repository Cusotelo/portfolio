"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 w-1 h-full z-50 pointer-events-none"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <div
        className="w-full origin-top transition-transform duration-75"
        style={{
          height: "100%",
          transform: `scaleY(${progress})`,
          background: "linear-gradient(to bottom, var(--barca-blue), var(--barca-red), var(--barca-gold))",
        }}
      />
    </div>
  );
}
