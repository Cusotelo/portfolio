import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string | null;
  excerpt: string | null;
  mainImage: { asset: { _ref: string } } | null;
};

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, publishedAt, excerpt, mainImage
}`;

export default async function Home() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, { next: { revalidate: 60 } });

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-zinc-500 mb-12 text-sm">
        Manage posts at{" "}
        <a href="/studio" className="underline hover:text-zinc-800">
          /studio
        </a>
      </p>

      {posts.length === 0 ? (
        <p className="text-zinc-400">
          No posts yet. Create one in the{" "}
          <a href="/studio" className="underline">
            Sanity Studio
          </a>
          .
        </p>
      ) : (
        <ul className="flex flex-col gap-10">
          {posts.map((post) => (
            <li key={post._id} className="flex gap-6 items-start">
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
                <h2 className="text-xl font-semibold">{post.title}</h2>
                {post.publishedAt && (
                  <p className="text-xs text-zinc-400 mt-1">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                {post.excerpt && (
                  <p className="mt-2 text-zinc-600 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
