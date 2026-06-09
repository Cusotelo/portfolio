"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import KeepyUppy from "./KeepyUppy";
import TerminalIntro from "./TerminalIntro";

type TerminalLine = { _key?: string; isCommand?: boolean; text?: string };

type Props = {
  name?: string;
  title?: string;
  tagline?: string;
  showGame?: boolean;
  terminalLines?: TerminalLine[];
};

export default function Hero({
  name = "César Sotelo",
  title = "Full Stack Developer",
  tagline = "Building fast, clean, well-crafted web experiences.",
  showGame = true,
  terminalLines,
}: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
      .fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
      .fromTo(dividerRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6 }, "-=0.3");
    if (gameRef.current) tl.fromTo(gameRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");
    if (termRef.current) tl.fromTo(termRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.3");
  }, []);

  const nameParts = name.trim().split(" ");
  const lastName = nameParts.pop() ?? "";
  const firstName = nameParts.join(" ");

  return (
    <section className="min-h-screen flex flex-col justify-center max-w-3xl mx-auto px-6 py-20 gap-12">
      <div>
        <h1
          ref={headingRef}
          className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-4"
          style={{ opacity: 0 }}
        >
          {firstName && <>{firstName} </>}
          <span
            style={{
              background: "linear-gradient(90deg, var(--barca-blue), var(--barca-red))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {lastName}
          </span>
        </h1>
        <p ref={subRef} className="text-zinc-400 text-lg" style={{ opacity: 0 }}>
          {title} · {tagline}
        </p>
      </div>

      <div
        ref={dividerRef}
        className="h-1 rounded-full origin-left"
        style={{
          opacity: 0,
          background: "linear-gradient(90deg, var(--barca-blue) 0%, var(--barca-red) 50%, var(--barca-gold) 100%)",
        }}
      />

      {showGame && (
        <div ref={gameRef} style={{ opacity: 0 }}>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">— warm up —</p>
          <KeepyUppy />
        </div>
      )}

      {terminalLines !== undefined && (
        <div ref={termRef} style={{ opacity: 0 }}>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">— about —</p>
          <TerminalIntro lines={terminalLines} />
        </div>
      )}
    </section>
  );
}
