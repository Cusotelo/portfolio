import { defineField, defineType } from "sanity";

export const resumeSectionType = defineType({
  name: "resumeSection",
  title: "Resume",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Resume" }),
    defineField({
      name: "objective",
      title: "Objective / Summary",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      of: [
        {
          type: "object",
          name: "employer",
          fields: [
            defineField({ name: "company", title: "Company", type: "string" }),
            defineField({ name: "location", title: "Location", type: "string" }),
            defineField({ name: "dateRange", title: "Date Range (e.g. 2022 – Present)", type: "string" }),
            defineField({
              name: "roles",
              title: "Roles",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "role",
                  fields: [
                    defineField({ name: "title", title: "Title", type: "string" }),
                    defineField({ name: "dates", title: "Dates", type: "string" }),
                    defineField({
                      name: "bullets",
                      title: "Bullet Points",
                      type: "array",
                      of: [{ type: "string" }],
                    }),
                  ],
                  preview: { select: { title: "title", subtitle: "dates" } },
                },
              ],
            }),
          ],
          preview: { select: { title: "company", subtitle: "dateRange" } },
        },
      ],
    }),
    defineField({
      name: "skillGroups",
      title: "Skill Groups",
      type: "array",
      of: [
        {
          type: "object",
          name: "skillGroup",
          fields: [
            defineField({ name: "level", title: "Proficiency (1–5)", type: "number", validation: (R) => R.min(1).max(5) }),
            defineField({
              name: "items",
              title: "Skills",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            }),
          ],
          preview: {
            select: { level: "level", items: "items" },
            prepare({ level, items }) {
              return { title: `${"★".repeat(level ?? 0)}${"☆".repeat(5 - (level ?? 0))}`, subtitle: (items ?? []).join(", ") };
            },
          },
        },
      ],
    }),
    defineField({
      name: "toolGroups",
      title: "Tools & Software",
      type: "array",
      of: [
        {
          type: "object",
          name: "toolGroup",
          fields: [
            defineField({
              name: "items",
              title: "Tools",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            }),
          ],
          preview: {
            select: { items: "items" },
            prepare({ items }) {
              return { title: (items ?? []).join(", ") };
            },
          },
        },
      ],
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          name: "school",
          fields: [
            defineField({ name: "institution", title: "Institution", type: "string" }),
            defineField({ name: "program", title: "Program", type: "string" }),
            defineField({ name: "dates", title: "Dates", type: "string" }),
            defineField({
              name: "bullets",
              title: "Bullet Points",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: { select: { title: "institution", subtitle: "program" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "heading" } },
});
