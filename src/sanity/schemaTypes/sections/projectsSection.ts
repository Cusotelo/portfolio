import { defineField, defineType } from "sanity";

export const projectsSectionType = defineType({
  name: "projectsSection",
  title: "Projects",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Projects" }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "url", title: "Live URL", type: "url" }),
            defineField({ name: "github", title: "GitHub URL", type: "url" }),
            defineField({
              name: "image",
              title: "Screenshot",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "tags",
              title: "Tags",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description", media: "image" },
          },
        },
      ],
    }),
  ],
  preview: { select: { title: "heading" } },
});
