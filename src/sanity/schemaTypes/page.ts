import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "heroSection" },
        { type: "terminalSection" },
        { type: "projectsSection" },
        { type: "postsSection" },
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});
