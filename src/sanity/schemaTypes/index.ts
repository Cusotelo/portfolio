import { SchemaTypeDefinition } from "sanity";
import { pageType } from "./page";
import { postType } from "./post";
import { heroSectionType } from "./sections/heroSection";
import { terminalSectionType } from "./sections/terminalSection";
import { projectsSectionType } from "./sections/projectsSection";
import { postsSectionType } from "./sections/postsSection";

export const schemaTypes: SchemaTypeDefinition[] = [
  pageType,
  postType,
  heroSectionType,
  terminalSectionType,
  projectsSectionType,
  postsSectionType,
];
