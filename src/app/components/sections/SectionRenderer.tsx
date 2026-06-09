import Hero from "@/app/components/Hero";
import TerminalIntro from "@/app/components/TerminalIntro";
import ProjectsSection from "./ProjectsSection";
import PostsSection from "./PostsSection";
import ResumeSection from "./ResumeSection";

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

type Props = {
  sections: Section[];
  posts: Post[];
};

export default function SectionRenderer({ sections, posts }: Props) {
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "heroSection":
            return (
              <Hero
                key={section._key}
                name={section.name}
                title={section.title}
                tagline={section.tagline}
                showGame={section.showGame ?? true}
                terminalLines={undefined}
              />
            );

          case "terminalSection":
            return (
              <div key={section._key} className="max-w-3xl mx-auto px-6 pb-12">
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">— about —</p>
                <TerminalIntro lines={section.lines} />
              </div>
            );

          case "projectsSection":
            return (
              <ProjectsSection
                key={section._key}
                heading={section.heading}
                projects={section.projects}
              />
            );

          case "postsSection":
            return (
              <PostsSection
                key={section._key}
                heading={section.heading}
                posts={posts}
              />
            );

          case "resumeSection":
            return (
              <ResumeSection
                key={section._key}
                heading={section.heading}
                objective={section.objective}
                experience={section.experience}
                skillGroups={section.skillGroups}
                toolGroups={section.toolGroups}
                education={section.education}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
