import { client } from "@/sanity/lib/client";
import Hero from "./components/Hero";
import SectionRenderer from "./components/sections/SectionRenderer";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string | null;
  excerpt: string | null;
  mainImage: { asset: { _ref: string } } | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Section = { _type: string; _key: string } & Record<string, any>;

type PageData = {
  sections?: Section[];
};

const PAGE_QUERY = `*[_type == "page" && _id == "singleton-home"][0]{
  sections[]{
    ...,
    _type,
    _key
  }
}`;

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc){
  _id, title, slug, publishedAt, excerpt, mainImage
}`;

export default async function Home() {
  const [page, posts] = await Promise.all([
    client.fetch<PageData>(PAGE_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch<Post[]>(POSTS_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  return (
    <div style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}>
      {page?.sections?.length ? (
        <SectionRenderer sections={page.sections} posts={posts} />
      ) : (
        // fallback when no page is configured in Sanity yet
        <Hero />
      )}
    </div>
  );
}
