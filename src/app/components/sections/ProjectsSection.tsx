"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  _key: string;
  title?: string;
  description?: string;
  url?: string;
  github?: string;
  image?: { asset: { _ref: string } };
  tags?: string[];
};

type Props = {
  heading?: string;
  projects?: Project[];
};

export default function ProjectsSection({ heading = "Projects", projects = [] }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards?.length) return;

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        }
      );
    });
  }, [projects]);

  return (
    <section ref={sectionRef} className="max-w-3xl mx-auto px-6 pb-24">
      <div className="h-px mb-12" style={{ background: "linear-gradient(90deg, var(--barca-blue), transparent)" }} />
      <h2 className="text-2xl font-bold mb-8">
        {heading.split(" ").map((word, i, arr) =>
          i === arr.length - 1 ? (
            <span key={i} style={{ color: "var(--barca-gold)" }}>{word}</span>
          ) : (
            <span key={i}>{word} </span>
          )
        )}
      </h2>

      {projects.length === 0 ? (
        <p className="text-zinc-500 font-mono text-sm">
          {"// no projects yet — add them in "}
          <a href="/studio" className="text-barca-blue hover:underline">/studio</a>
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <li
              key={project._key}
              data-card
              className="rounded-xl overflow-hidden flex flex-col"
              style={{ background: "rgba(0,77,152,0.06)", border: "1px solid rgba(0,77,152,0.15)", opacity: 0 }}
            >
              {project.image && (
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={urlFor(project.image).width(600).height(320).url()}
                    alt={project.title ?? ""}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="font-semibold text-base">{project.title}</h3>
                {project.description && (
                  <p className="text-zinc-400 text-sm leading-relaxed flex-1">{project.description}</p>
                )}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full font-mono"
                        style={{ background: "rgba(0,77,152,0.2)", color: "var(--barca-gold)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4 mt-2">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono underline text-zinc-400 hover:text-white transition-colors"
                    >
                      live ↗
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono underline text-zinc-400 hover:text-white transition-colors"
                    >
                      github ↗
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
