/**
 * CONTENT TYPES
 * -----------------------------------------------------------------
 * These types describe every piece of editable content on the site.
 * You should rarely need to change this file — edit the content files
 * (profile.ts, projects.ts, businesses.ts, investments.ts, …) instead.
 */

/** The four "areas of work" the site is organised around. */
export type Domain = "tech" | "markets" | "ventures" | "editorial";

/** A single image or video used anywhere on the site. */
export interface Media {
  /** Path relative to /public (e.g. "/images/projects/exam-platform/dashboard.png") or a full URL. */
  src: string;
  /** Required for accessibility. Describe what the image shows. */
  alt: string;
  /** Optional caption shown under the image on project pages. */
  caption?: string;
  /** "image" (default) | "video". Videos should be mp4/webm; they autoplay muted and loop. */
  type?: "image" | "video";
  /** Aspect ratio used to reserve space before load and to crop consistently. e.g. "16/10", "4/5", "1/1". */
  aspect?: string;
  /** Layout hint for galleries: "full" spans the whole width, "half" sits in a two-column grid. */
  span?: "full" | "half";
}

export interface Link {
  label: string;
  href: string;
  /** Opens in a new tab when true (default for external links). */
  external?: boolean;
}

export type ProjectCategory =
  | "AI / ML"
  | "Data"
  | "Software"
  | "Technology"
  | "Business"
  | "Investing"
  | "Experiments"
  | "Other";

export type ProjectStatus = "Live" | "Completed" | "In progress" | "Archived" | "Concept";

export interface ProjectMetric {
  /** The headline number/figure, e.g. "40%" or "sub-200ms". */
  value: string;
  label: string;
}

export interface ProjectSection {
  heading: string;
  /** Each string becomes a paragraph. */
  body: string[];
}

export interface Project {
  /** URL slug — becomes /work/<slug>. Lowercase, hyphenated, unique. */
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Displayed as "2025" or "2024 — 2025". */
  year: string;
  /** One line. Shown in the project index. */
  summary: string;
  /** Two or three sentences. Shown at the top of the project page. */
  description: string;
  role: string;
  status: ProjectStatus;
  /** Set to true to feature in the large editorial block on the Work page. */
  featured?: boolean;
  /** Set true to pin into the home "Selected work" set. */
  onHome?: boolean;
  technologies: string[];
  /** Optional measured results, rendered as evidence on the project page. */
  metrics?: ProjectMetric[];

  /** Hero image / screenshot for the project page and the home index. Optional — a placeholder renders if absent. */
  cover?: Media;
  /** Additional screenshots, diagrams, videos. Optional. */
  gallery?: Media[];

  /** Case-study content. Every section is optional — omit what you don't have. */
  overview?: string[];
  problem?: string[];
  solution?: string[];
  approach?: string[];
  architecture?: string[];
  details?: string[];
  outcomes?: string[];
  /** Any extra sections you want to add beyond the standard ones. */
  extraSections?: ProjectSection[];

  /** Links — add as many as you like. Each renders as its own action. */
  links?: {
    live?: string;
    github?: string;
    caseStudy?: string;
    external?: string;
    /** Any other links: { label: "Paper", href: "…" } */
    other?: Link[];
  };
}

export interface Experience {
  organisation: string;
  role: string;
  /** e.g. "Jan 2026" */
  start: string;
  /** e.g. "Mar 2026" or "Present" */
  end: string;
  location?: string;
  type?: "Internship" | "Full-time" | "Part-time" | "Contract" | "Freelance" | "Founder";
  /** Short paragraphs or bullet-like sentences. */
  summary: string[];
  technologies?: string[];
  url?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  start: string;
  end: string;
  /** e.g. "Expected" — displayed next to the end date. */
  endNote?: string;
  location?: string;
  notes?: string[];
  /** Credentials earned along the way. */
  credentials?: { title: string; year: string }[];
  url?: string;
}

export interface Achievement {
  /** The headline figure, e.g. "1" for Rank 1. */
  figure: string;
  /** Text placed before the figure, e.g. "Rank". */
  prefix?: string;
  /** Text placed after the figure, e.g. "/ 1,900+". */
  suffix?: string;
  /** Short description, e.g. "Kaggle ML competition". */
  label: string;
  /** Supporting detail, e.g. "Top 1%". */
  detail?: string;
  /** One-sentence context of what was done. */
  description?: string;
  year?: string;
  /** e.g. "Jan 2026" — shown where a precise date is useful. */
  date?: string;
  url?: string;
}

/** Short, factual list of "pursuits" used on the home & about pages. */
export interface Venture {
  /** e.g. "Investing", "Trading", "Venture", "Restaurant" */
  name: string;
  /** Your role or relationship: "Operator", "Partner", "Personal", … */
  role: string;
  /** A short, factual description. */
  description: string;
  /** Optional longer explanation for the About page. */
  detail?: string[];
  since?: string;
  status?: "Active" | "Paused" | "Exited";
  domain?: Domain;
  url?: string;
}

/* ------------------------------------------------------------------ */
/* Businesses / ventures (dedicated /ventures pages)                   */
/* ------------------------------------------------------------------ */

export type BusinessStatus =
  | "Operating"
  | "Active"
  | "Building"
  | "Pre-launch"
  | "Paused"
  | "Exited";

export interface BusinessMetric {
  /** Raw numeric value — rendered through the number formatter when `format` is "compact". */
  value: string | number;
  label: string;
  /** "compact" applies K/M/B formatting to numeric values. */
  format?: "text" | "compact";
}

export interface Business {
  /** URL slug — becomes /ventures/<slug>. */
  slug: string;
  name: string;
  /** Display name used before the real name is added. */
  category: string;
  /** One line for the index. */
  summary: string;
  /** Two or three sentences for the detail page header. */
  description: string;
  role: string;
  status: BusinessStatus;
  /** Year or "Year — present". */
  year: string;
  /** Set true to render the large editorial block at the top of /ventures. */
  featured?: boolean;
  domain?: Domain;

  /** Physical or operating location. */
  location?: string;
  /** Website — omitted (or empty) and no button is rendered. */
  website?: string;
  /** Any other external links. */
  links?: Link[];

  /** Logo / cover / photographs. Placeholders render when absent. */
  logo?: Media;
  cover?: Media;
  gallery?: Media[];

  /** Case-study style narrative sections. */
  overview?: string[];
  story?: string[];
  operations?: string[];
  extraSections?: ProjectSection[];

  /** OPTIONAL — only displayed if you provide AND privacy allows. Never invent. */
  metrics?: BusinessMetric[];
  team?: string;
}

/* ------------------------------------------------------------------ */
/* Investments / markets (dedicated /markets page)                     */
/* ------------------------------------------------------------------ */

export type InvestmentType =
  | "Angel"
  | "Venture fund"
  | "Syndicate"
  | "Public equity"
  | "Private"
  | "Other";

export type InvestmentStatus = "Active" | "Realized" | "Tracking" | "Exited";

export interface Investment {
  /** URL slug — reserved for future /markets/<slug> detail pages. */
  slug: string;
  /** Company or fund name. */
  name: string;
  /** Sector / category, e.g. "Developer tools", "Fintech". */
  category: string;
  type: InvestmentType;
  status: InvestmentStatus;
  /** Date text, e.g. "2025" or "Q2 2026". */
  date?: string;

  /** Short thesis — why, in one or two lines. */
  thesis: string;
  description?: string;
  notes?: string;

  /** Logo / image. Placeholder renders when absent. */
  logo?: Media;
  website?: string;
  links?: Link[];

  /* PRIVATE — rendered only if settings.finance.showInvestmentAmounts is true. */
  amount?: number;
  ownership?: string;
}

/** Portfolio summary figures. Every value is gated by the privacy flags. */
export interface PortfolioStat {
  label: string;
  /** Numeric for compact formatting, or a string to render verbatim. */
  value: string | number;
  /** Compact (K/M/B) for numeric values. */
  format?: "text" | "compact" | "percent";
  /** Which privacy flag must be on for this to render. */
  privacy: "showInvestmentAmounts" | "showPortfolioAllocation" | "showNetWorth" | "showPerformance";
}

export interface MarketsContent {
  eyebrow: string;
  title: string;
  intro: string[];
  /** Approach / philosophy bullets. */
  approach: { title: string; body: string }[];
  /** Headline shown over the portfolio list. */
  portfolioHeading: string;
  /** Copy shown while no investments are listed (default — privacy). */
  portfolioNote: string;
}

/* ------------------------------------------------------------------ */
/* Leadership & certifications                                         */
/* ------------------------------------------------------------------ */

export interface LeadershipItem {
  title: string;
  organisation: string;
  year: string;
  detail?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  url?: string;
}

/* ------------------------------------------------------------------ */

export interface SkillGroup {
  /** What you build — e.g. "Machine learning systems" */
  title: string;
  description: string;
  technologies: string[];
}

export interface Photo extends Media {
  /** Optional: where the photo is used. "hero" | "about" | "any" */
  placement?: "hero" | "about" | "any";
  /** Set to true if the file is a transparent cutout (PNG/WebP). It will render without a background crop. */
  cutout?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  /** Short handle shown next to the label, e.g. "@daiwik" */
  handle?: string;
}

export interface Profile {
  name: string;
  firstName: string;
  /** Short, used in the navigation and footer. */
  shortName: string;
  /** Editorial positioning statement shown in the hero. Use "\n" to control line breaks. */
  headline: string;
  /** One or two sentences under the headline. */
  subheadline: string;
  /** A single short line used in the footer and social previews. */
  tagline: string;
  location?: string;
  email: string;
  /** A list of what you're doing right now. Shown in the hero and About page. */
  currently: { label: string; value: string }[];
  /** Paragraphs for the About page. */
  bio: string[];
  /** A sentence that summarises how you describe yourself. Used in the About intro. */
  aboutIntro: string;
  /** Interests / facts list for the About page. */
  facts: { label: string; value: string }[];
  interests: string[];
  /** Photos for the hero and About page. Leave the array empty to render tasteful placeholders. */
  photos: Photo[];
  resume: {
    /** Path (e.g. "/Daiwik-Rankawat-Resume.pdf") or URL. */
    href: string;
    label: string;
    /** e.g. "Updated March 2026" */
    note?: string;
  };
  /** Availability note shown on the contact page. */
  availability?: string;
  /** Closing line for the contact page. */
  contactStatement: string;
}
