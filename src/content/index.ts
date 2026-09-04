/**
 * CONTENT ENTRY POINT
 * -----------------------------------------------------------------
 * Everything the UI displays comes from these files:
 *
 *   profile.ts     → name, headline, bio, photos, résumé, email
 *   projects.ts    → all projects (and their screenshots / links)
 *   experience.ts  → work experience
 *   education.ts   → education + achievements
 *   ventures.ts    → investing / trading / business activities
 *   skills.ts      → what you build + technologies
 *   links.ts       → social links + navigation
 *
 * The components in src/components and src/pages never contain
 * personal information — they only read from here.
 */
export { profile } from "./profile";
export { projects } from "./projects";
export { experience } from "./experience";
export { education, achievements } from "./education";
export { ventures, venturesIntro } from "./ventures";
export { skillGroups, allTechnologies } from "./skills";
export { socialLinks, navigation } from "./links";
export * from "./types";

import { projects } from "./projects";
import type { Project } from "./types";

/** Helpers used by the UI. */
export const featuredProjects = (): Project[] => {
  const featured = projects.filter((p) => p.featured);
  return featured.length > 0 ? featured : projects.slice(0, 4);
};

export const getProject = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);

export const projectIndex = (slug: string): number => projects.findIndex((p) => p.slug === slug);

export const projectNumber = (slug: string): string => String(projectIndex(slug) + 1).padStart(2, "0");

export const nextProject = (slug: string): Project | undefined => {
  if (projects.length < 2) return undefined;
  const i = projectIndex(slug);
  return projects[(i + 1) % projects.length];
};

export const projectCategories = (): string[] => Array.from(new Set(projects.map((p) => p.category)));
