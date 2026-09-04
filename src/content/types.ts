/**
 * CONTENT TYPES
 * -----------------------------------------------------------------
 * These types describe every piece of editable content on the site.
 * You should rarely need to change this file — edit the content files
 * (profile.ts, projects.ts, experience.ts, …) instead.
 */

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
  /** Set to true to show the project on the home page. */
  featured?: boolean;
  technologies: string[];

  /** Hero image / screenshot for the project page and the home index. Optional — a placeholder renders if absent. */
  cover?: Media;
  /** Additional screenshots, diagrams, videos. Optional. */
  gallery?: Media[];

  /** Case-study content. Every section is optional — omit what you don't have. */
  overview?: string[];
  problem?: string[];
  solution?: string[];
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
  /** Short description, e.g. "Kaggle competition". */
  label: string;
  /** Supporting detail, e.g. "Top 1%". */
  detail?: string;
  year?: string;
  url?: string;
}

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
  url?: string;
}

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
