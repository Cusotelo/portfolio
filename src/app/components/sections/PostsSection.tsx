"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string | null;
  excerpt: string | null;
  mainImage: { asset: { _ref: string } } | null;
};

type Props = {
  heading?: string;
  posts?: Post[];
};

export default function PostsSection({ heading = "Latest Posts", posts = [] }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll<HTMLElement>("[data-post]");
    if (!items?.length) return;

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%" },
        }
      );
    });
  }, [posts]);

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

      {posts.length === 0 ? (
        <p className="text-zinc-500 font-mono text-sm">
          {"// no posts yet — create one at "}
          <a href="/studio" className="text-barca-blue hover:underline">/studio</a>
        </p>
      ) : (
        <ul className="flex flex-col gap-6">
          {posts.map((post) => (
            <li
              key={post._id}
              data-post
              className="flex gap-5 items-start p-5 rounded-xl"
              style={{ background: "rgba(0,77,152,0.06)", border: "1px solid rgba(0,77,152,0.15)", opacity: 0 }}
            >
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).width(120).height(80).url()}
                  alt={post.title}
                  width={120}
                  height={80}
                  className="rounded-lg object-cover shrink-0"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                {post.publishedAt && (
                  <p className="text-xs text-zinc-500 font-mono mt-1">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                {post.excerpt && (
                  <p className="mt-2 text-zinc-400 text-sm leading-relaxed">{post.excerpt}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
