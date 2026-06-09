import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .id("page")
        .child(
          S.document()
            .schemaType("page")
            .documentId("singleton-home")
        ),
      S.divider(),
      S.documentTypeListItem("post").title("Posts"),
    ]);
