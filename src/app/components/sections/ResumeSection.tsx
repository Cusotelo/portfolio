"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Role = { _key?: string; title?: string; dates?: string; bullets?: string[] };
type Employer = { _key?: string; company?: string; location?: string; dateRange?: string; roles?: Role[] };
type SkillGroup = { _key?: string; level?: number; items?: string[] };
type ToolGroup = { _key?: string; items?: string[] };
type School = { _key?: string; institution?: string; program?: string; dates?: string; bullets?: string[] };

type Props = {
  heading?: string;
  objective?: string;
  experience?: Employer[];
  skillGroups?: SkillGroup[];
  toolGroups?: ToolGroup[];
  education?: School[];
};

const DEFAULT_OBJECTIVE =
  "Creative software developer with over 4 years of experience. Contributed to over 10 client projects, working in multiple agile teams with various tech stacks. Expertise in front end development lifecycle, with a proficient understanding of back end development and a strong desire to grow in DevOps and Cloud Computing.";

const DEFAULT_EXPERIENCE: Employer[] = [
  {
    _key: "ascedia",
    company: "Ascedia",
    location: "Milwaukee, WI",
    dateRange: "2022 – Present",
    roles: [
      {
        _key: "r1",
        title: "Front End Developer",
        dates: "October 2022 – Present",
        bullets: [
          "Lead front end developer in two major client project migrations — Wisconsin Department of Tourism from a legacy CMS to Kentico 13 ASP.NET MVC, and Baker Tilly from Prismic/GraphQL to a headless Next.JS Prismic Slice-Machine.",
          "Collaborated in 8 client redesigns from concept designs through development and delivery in C# ASP.NET Core/MVC environments.",
          "Developed a subscription and sign-in modal using GraphQL in a React environment for Baker Tilly.",
          "Contributed to inhouse boilerplate to create reusable components and design concepts that saved hours of development.",
        ],
      },
    ],
  },
  {
    _key: "crescendo",
    company: "Crescendo Collective",
    location: "Milwaukee, WI",
    dateRange: "2019 – 2022",
    roles: [
      {
        _key: "r2",
        title: "Front End Developer",
        dates: "December 2020 – September 2022",
        bullets: [
          "Implemented front end web enhancements for Invesco US Scrum team improving functionality, accessibility, and mobile responsiveness across three repositories, six websites, and 100+ pages.",
          "Oversaw front end development team in a product center redesign for the Invesco US retail site.",
          "Initiated the migration from legacy Angular 1 into AlpineJS by updating the front end build from Gulp to Webpack.",
          "Transitioned LP-Legal team from a waterfall methodology into a high performance agile team.",
        ],
      },
      {
        _key: "r3",
        title: "Junior Front End Developer",
        dates: "December 2019 – December 2020",
        bullets: [
          "Mentored and supervised 6 new front end developer interns.",
          "Migrated front end components from a decommissioned WEM-CMS into Magnolia-CMS to allow the content entry team to manage data in a user-friendly CMS.",
          "Performed split A/B testing using VWO to track which variation of a component or landing page should be used.",
        ],
      },
      {
        _key: "r4",
        title: "Front End Developer Intern",
        dates: "July 2019 – December 2019",
        bullets: [
          "Collaborated with the Invesco UX Marketing team to implement content entry updates for multiple websites and microsites using Magnolia-CMS, Oracle UCM, WEM, and Wordpress.",
          "Partnered with lead developer in building a NCAA-themed Vue SPA for Invesco - QQQ.",
        ],
      },
    ],
  },
];

const DEFAULT_SKILL_GROUPS: SkillGroup[] = [
  { _key: "s1", level: 5, items: ["HTML", "SCSS/CSS", "Javascript", "Bootstrap", "Gulp", "Webpack", "Next.JS"] },
  { _key: "s2", level: 4, items: ["Node.JS", "React", "Angular", "Vue", "TypeScript", "REST API"] },
  { _key: "s3", level: 3, items: ["JAVA", "C# ASP.NET", "AWS", "GraphQL", "CI/CD"] },
];

const DEFAULT_TOOL_GROUPS: ToolGroup[] = [
  { _key: "t1", items: ["Prismic", "Kentico", "Magnolia", "WEM", "Wordpress", "FileZilla"] },
  { _key: "t2", items: ["Agile", "GIT", "Jira", "Teamwork", "TeamCity", "Eclipse", "Visual Studio", "Figma", "Adobe XD", "VWO Dashboard"] },
];

const DEFAULT_EDUCATION: School[] = [
  {
    _key: "e1",
    institution: "i.c.stars",
    program: "Technology Bootcamp",
    dates: "September 2018 – February 2019",
    bullets: [
      "Rigorous four-month technology and leadership training program.",
      "Developed a hybrid web app for ADHD America using Ionic, AWS-Cognito, AWS-DynamoDB, AWS-Lambda, and AWS-API Gateway.",
    ],
  },
];

function SkillDots({ level = 0 }: { level?: number }) {
  return (
    <span className="flex gap-1 shrink-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: i < level ? "var(--barca-gold)" : "rgba(255,255,255,0.12)" }}
        />
      ))}
    </span>
  );
}

export default function ResumeSection({
  heading = "Resume",
  objective,
  experience,
  skillGroups,
  toolGroups,
  education,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  const activeExperience = experience?.length ? experience : DEFAULT_EXPERIENCE;
  const activeSkills = skillGroups?.length ? skillGroups : DEFAULT_SKILL_GROUPS;
  const activeTools = toolGroups?.length ? toolGroups : DEFAULT_TOOL_GROUPS;
  const activeEducation = education?.length ? education : DEFAULT_EDUCATION;
  const activeObjective = objective ?? DEFAULT_OBJECTIVE;

  useEffect(() => {
    const blocks = sectionRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    blocks?.forEach((el) => {
      gsap.fromTo(el, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="max-w-3xl mx-auto px-6 pb-24">
      <div className="h-px mb-12" style={{ background: "linear-gradient(90deg, var(--barca-blue), transparent)" }} />

      <h2 className="text-2xl font-bold mb-10" data-reveal style={{ opacity: 0 }}>
        {heading.split(" ").map((word, i, arr) =>
          i === arr.length - 1
            ? <span key={i} style={{ color: "var(--barca-gold)" }}>{word}</span>
            : <span key={i}>{word} </span>
        )}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12">

        {/* ── LEFT: skills, tools, education ── */}
        <div className="flex flex-col gap-8">

          {activeObjective && (
            <div data-reveal style={{ opacity: 0 }}>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">Summary</p>
              <p className="text-zinc-400 text-sm leading-relaxed">{activeObjective}</p>
            </div>
          )}

          <div data-reveal style={{ opacity: 0 }}>
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">Skills</p>
            <div className="flex flex-col gap-4">
              {activeSkills.map((group, i) => (
                <div key={group._key ?? i} className="flex flex-col gap-1.5">
                  <SkillDots level={group.level} />
                  <p className="text-sm text-zinc-300">{group.items?.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal style={{ opacity: 0 }}>
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">Tools & Software</p>
            <div className="flex flex-wrap gap-2">
              {activeTools.flatMap((g) => g.items ?? []).map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{ background: "rgba(0,77,152,0.2)", color: "var(--barca-gold)" }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div data-reveal style={{ opacity: 0 }}>
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">Education</p>
            {activeEducation.map((school, i) => (
              <div key={school._key ?? i} className="mb-4">
                <p className="font-semibold text-sm text-white">{school.institution}</p>
                <p className="text-xs font-mono" style={{ color: "var(--barca-gold)" }}>{school.program}</p>
                <p className="text-zinc-500 text-xs mb-2 italic">{school.dates}</p>
                {school.bullets?.map((b, bi) => (
                  <p key={bi} className="text-xs text-zinc-400 leading-relaxed pl-3 relative before:content-['·'] before:absolute before:left-0" style={{ color: "inherit" }}>
                    <span className="absolute left-0" style={{ color: "var(--barca-gold)" }}>·</span>
                    <span className="pl-1">{b}</span>
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: timeline ── */}
        <div className="relative">
          {/* continuous vertical line */}
          <div
            className="absolute top-2 bottom-0 w-px"
            style={{ left: "140px", background: "rgba(255,255,255,0.08)" }}
          />

          <div className="flex flex-col gap-14">
            {activeExperience.map((employer, ei) => (
              <div key={employer._key ?? ei} data-reveal style={{ opacity: 0 }} className="flex gap-0">

                {/* date label */}
                <div className="w-36 shrink-0 text-right pr-6 pt-0.5">
                  <span className="text-xs font-mono text-zinc-500 leading-relaxed">
                    {employer.dateRange ?? employer.roles?.[0]?.dates ?? ""}
                  </span>
                </div>

                {/* dot */}
                <div className="shrink-0 w-4 flex flex-col items-center" style={{ marginTop: "4px" }}>
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: "var(--barca-gold)" }}
                  />
                </div>

                {/* content */}
                <div className="pl-6 flex flex-col gap-5">
                  <div>
                    <h4 className="text-xl font-bold text-white">{employer.company}</h4>
                    {employer.location && (
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">{employer.location}</p>
                    )}
                  </div>

                  {employer.roles?.map((role, ri) => (
                    <div key={role._key ?? ri}>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--barca-gold)" }}>
                        {role.title}
                      </p>
                      <p className="text-xs text-zinc-500 font-mono italic mb-2">{role.dates}</p>
                      {role.bullets && (
                        <ul className="flex flex-col gap-1.5">
                          {role.bullets.map((bullet, bi) => (
                            <li key={bi} className="text-sm text-zinc-300 leading-relaxed flex gap-2">
                              <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ background: "var(--barca-blue)" }} />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
