/**
 * CONTENT ENTRY POINT
 * -----------------------------------------------------------------
 * Everything the UI displays comes from these files:
 *
 *   profile.ts      → name, headline, bio, photos, résumé, email
 *   projects.ts     → all projects (and their screenshots / links)
 *   experience.ts   → work experience
 *   education.ts    → education + competitive achievements
 *   credentials.ts  → leadership roles + certifications
 *   businesses.ts   → companies / ventures (restaurant, etc.)
 *   markets-portfolio.ts → holdings + overview stats + demo rows (privacy-gated)
 *   markets.ts      → framing copy for the investing / markets area
 *   ventures.ts     → short "pursuits" list for home & about
 *   blogs.ts        → blog / research articles (with charts & figures)
 *   skills.ts       → what you build + technologies
 *   links.ts        → social links + navigation
 *   settings.ts     → site URL + financial privacy flags
 *
 * The components in src/components and src/pages never contain
 * personal information — they only read from here.
 */
export { profile } from "./profile";
export { projects } from "./projects";
export { experience } from "./experience";
export { education, achievements } from "./education";
export { leadership, certifications } from "./credentials";
export { businesses } from "./businesses";
export { investments, marketStats, investmentStartYear } from "./markets-portfolio";

// export { investments, portfolioStats } from "./investments";
export { markets } from "./markets";
export { ventures, venturesIntro } from "./ventures";
export { blogs } from "./blogs";
export { skillGroups, allTechnologies } from "./skills";
export { socialLinks, navigation } from "./links";
export { settings } from "./settings";
export { DOMAINS, projectDomain } from "./domains";
export * from "./types";

import { projects } from "./projects";
import { businesses } from "./businesses";
import { blogs } from "./blogs";
import type { Project, Business } from "./types";

/* ----- Projects ----- */

export const featuredProjects = (): Project[] => {
  const pinned = projects.filter((p) => p.onHome);
  if (pinned.length > 0) return pinned;
  const featured = projects.filter((p) => p.featured);
  return featured.length > 0 ? featured : projects.slice(0, 4);
};

/** The large editorial feature block(s) on the Work page. */
export const workFeatures = (): Project[] => projects.filter((p) => p.featured);

export const getProject = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);

export const projectIndex = (slug: string): number => projects.findIndex((p) => p.slug === slug);

export const projectNumber = (slug: string): string => String(projectIndex(slug) + 1).padStart(2, "0");

export const nextProject = (slug: string): Project | undefined => {
  if (projects.length < 2) return undefined;
  const i = projectIndex(slug);
  return projects[(i + 1) % projects.length];
};

export const projectCategories = (): string[] => Array.from(new Set(projects.map((p) => p.category)));

/* ----- Businesses ----- */

export const getBusiness = (slug: string): Business | undefined => businesses.find((b) => b.slug === slug);

export const businessIndex = (slug: string): number => businesses.findIndex((b) => b.slug === slug);

export const businessNumber = (slug: string): string => String(businessIndex(slug) + 1).padStart(2, "0");

export const nextBusiness = (slug: string): Business | undefined => {
  if (businesses.length < 2) return undefined;
  const i = businessIndex(slug);
  return businesses[(i + 1) % businesses.length];
};

/* ----- Blog / writing ----- */

/** Published articles, newest first (featured float to the top). */
export const sortedBlogs = (): BlogPost[] =>
  [...blogs]
    .filter((b) => b.status !== "Draft")
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date));

export const getBlog = (slug: string): BlogPost | undefined => blogs.find((b) => b.slug === slug);

export const blogCategories = (): string[] => Array.from(new Set(blogs.map((b) => b.category)));

export const relatedBlogs = (slug: string, limit = 2): BlogPost[] => {
  const current = getBlog(slug);
  if (!current) return [];
  return sortedBlogs()
    .filter((b) => b.slug !== slug)
    .sort((a, b) => shareCount(current, b) - shareCount(current, a))
    .slice(0, limit);
};

function shareCount(a: BlogPost, b: BlogPost): number {
  const tags = new Set(a.tags);
  return b.tags.filter((t) => tags.has(t)).length + (a.category === b.category ? 1 : 0);
}