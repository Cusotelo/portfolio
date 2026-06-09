import { defineField, defineType } from "sanity";

export const terminalSectionType = defineType({
  name: "terminalSection",
  title: "Terminal Intro",
  type: "object",
  fields: [
    defineField({
      name: "lines",
      title: "Lines",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "isCommand",
              title: "Is Command (vs output)",
              type: "boolean",
              initialValue: true,
            }),
            defineField({ name: "text", title: "Text", type: "string" }),
          ],
          preview: {
            select: { title: "text", isCommand: "isCommand" },
            prepare({ title, isCommand }) {
              return { title: `${isCommand ? ">" : " "} ${title}` };
            },
          },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Terminal Intro" }) },
});
