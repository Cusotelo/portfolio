import { defineField, defineType } from "sanity";

export const postsSectionType = defineType({
  name: "postsSection",
  title: "Blog Posts",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Latest Posts",
    }),
  ],
  preview: { select: { title: "heading" } },
});
