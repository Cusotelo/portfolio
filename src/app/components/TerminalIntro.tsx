"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type TerminalLine = {
  _key?: string;
  isCommand?: boolean;
  text?: string;
};

type Props = {
  lines?: TerminalLine[];
};

const DEFAULT_LINES: TerminalLine[] = [
  { isCommand: true, text: " whoami" },
  { isCommand: false, text: "  Cesar Sotelo — Full Stack Developer" },
  { isCommand: true, text: " location" },
  { isCommand: false, text: "  Based in the US. Building on the internet." },
  { isCommand: true, text: " stack" },
  { isCommand: false, text: "  Next.js · TypeScript · React · Sanity · Node" },
  { isCommand: true, text: " status" },
  { isCommand: false, text: "  Open to opportunities. ¡Visca el Barça!" },
];

export default function TerminalIntro({ lines }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLines = lines?.length ? lines : DEFAULT_LINES;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lineEls = el.querySelectorAll<HTMLElement>("[data-line]");
    lineEls.forEach((line, i) => {
      const delay = i * 0.55;
      gsap.fromTo(line, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, delay, ease: "power2.out" });

      const textEl = line.querySelector<HTMLElement>("[data-text]");
      if (textEl && activeLines[i]?.isCommand) {
        const full = textEl.dataset.full ?? "";
        textEl.textContent = "";
        full.split("").forEach((char, ci) => {
          gsap.delayedCall(delay + 0.1 + ci * 0.045, () => {
            textEl.textContent += char;
          });
        });
      }
    });
  }, [activeLines]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl font-mono text-sm leading-7 p-6"
      style={{
        background: "rgba(0,0,0,0.55)",
        border: "1px solid rgba(0,77,152,0.3)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex gap-2 mb-5">
        <span className="w-3 h-3 rounded-full bg-[#a50044] opacity-80" />
        <span className="w-3 h-3 rounded-full bg-[#edbb00] opacity-80" />
        <span className="w-3 h-3 rounded-full bg-[#004d98] opacity-80" />
      </div>

      {activeLines.map((line, i) => (
        <div key={line._key ?? i} data-line style={{ opacity: 0 }} className="flex gap-2">
          {line.isCommand ? (
            <>
              <span className="text-[var(--barca-gold)] select-none">{">"}</span>
              <span data-text data-full={line.text} className="text-[#60a5fa]" />
            </>
          ) : (
            <span className="text-zinc-300">{line.text}</span>
          )}
        </div>
      ))}

      <div className="flex gap-2 mt-1">
        <span className="text-[var(--barca-gold)]">{">"}</span>
        <span
          className="w-2 h-5 inline-block bg-[var(--barca-gold)] opacity-80"
          style={{ animation: "blink 1s step-end infinite" }}
        />
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}
