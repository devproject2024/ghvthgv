import type { Domain, ProjectCategory } from "./types";

/**
 * DOMAIN MARKS
 * -----------------------------------------------------------------
 * The site is organised around four areas of work, each with a small,
 * muted solid accent. The accent is used ONLY as a tiny mark — a dot,
 * a selected underline, a tag — never as a large coloured background.
 */

export interface DomainMeta {
  id: Domain;
  label: string;
  /** Solid dot / small mark on a light surface. */
  dot: string;
  /** Tinted surface (paper-based). */
  soft: string;
  /** Brightened dot/line on a dark (carbon) surface. */
  bright: string;
}

export const DOMAINS: Record<Domain, DomainMeta> = {
  tech: {
    id: "tech",
    label: "Technology",
    dot: "bg-tech",
    soft: "bg-tech-soft",
    bright: "bg-tech-bright",
  },
  markets: {
    id: "markets",
    label: "Markets",
    dot: "bg-markets",
    soft: "bg-markets-soft",
    bright: "bg-markets-bright",
  },
  ventures: {
    id: "ventures",
    label: "Ventures",
    dot: "bg-ventures",
    soft: "bg-ventures-soft",
    bright: "bg-ventures-bright",
  },
  editorial: {
    id: "editorial",
    label: "Editorial",
    dot: "bg-ink",
    soft: "bg-paper-3",
    bright: "bg-chalk",
  },
};

/** Map a project category to one of the four domains. */
const CATEGORY_DOMAIN: Record<ProjectCategory, Domain> = {
  "AI / ML": "tech",
  Data: "tech",
  Software: "tech",
  Technology: "tech",
  Investing: "markets",
  Business: "ventures",
  Experiments: "tech",
  Other: "editorial",
};

export function projectDomain(category: ProjectCategory): Domain {
  return CATEGORY_DOMAIN[category] ?? "editorial";
}
