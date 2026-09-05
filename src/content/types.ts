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
  /** Company logo — monogram fallback renders if omitted. */
  logo?: Logo;
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  /** University logo — monogram fallback renders if omitted. */
  logo?: Logo;
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


export interface Logo {
  /** Path or URL to the logo image. If omitted, a text monogram is used. */
  src?: string;
  /** Optional dark-surface variant. */
  srcDark?: string;
  /** Alt text. */
  alt?: string;
  /** Text used for the monogram fallback (usually a company/university short name). */
  name: string;
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

/** A single outlet / location for a multi-location venture (e.g. a restaurant chain). */
export interface Outlet {
  name: string;
  city: string;
  country: string;
  address?: string;
  status?: "Open" | "Opening soon" | "Closed";
  openingDate?: string;
  website?: string;
  mapsUrl?: string;
  image?: Media;
}

export interface BusinessMetric {
  /** Raw numeric value — rendered through the number formatter / animated count. */
  value: string | number;
  label: string;
  /** "compact" applies K/M/B formatting; "currency" adds the symbol; "number" counts up. */
  format?: "text" | "compact" | "currency" | "number" | "percent";
  /** Optional prefix (e.g. currency symbol) for currency/number formats. */
  prefix?: string;
  /** Optional suffix (e.g. "+", "%", " outlets"). */
  suffix?: string;
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
  logo?: Logo;
  cover?: Media;
  gallery?: Media[];

  /** Case-study style narrative sections. */
  overview?: string[];
  story?: string[];
  operations?: string[];
  extraSections?: ProjectSection[];

  /** Multi-location outlets (e.g. a restaurant chain). Rendered only when provided. */
  outlets?: Outlet[];

  /** OPTIONAL — only displayed if you provide AND privacy allows. Never invent. */
  metrics?: BusinessMetric[];
  team?: string;
}

/* ------------------------------------------------------------------ */
/* Investments / markets (dedicated /markets page)                     */
/* ------------------------------------------------------------------ */

export type InvestmentType =
  | "Direct equity"
  | "SIP"
  | "Long-term"
  | "Trading"
  | "Startup"
  | "Venture"
  | "Fund"
  | "Other";

export type InvestmentStatus = "Active" | "Realized" | "Tracking" | "Exited";

/** A single holding. All financial fields are optional and privacy-gated. */
export interface Investment {
  /** URL slug — reserved for future /markets/<slug> detail pages. */
  slug: string;
  /** Company / instrument name, e.g. "State Bank of India". */
  name: string;
  /** Ticker / short code, e.g. "SBIN". */
  ticker?: string;
  /** Sector / category, e.g. "Public equities", "SIP", "Startups". */
  category: string;
  assetType: InvestmentType;
  status: InvestmentStatus;

  /** Number of shares/units (numeric enables the "30K shares" display). */
  shares?: number;
  /** Free-text units label, default "shares" (e.g. "units"). */
  unitsLabel?: string;
  /** Optional ownership percentage. */
  ownershipPercentage?: number;
  /** Invested cost basis. */
  investedAmount?: number;
  /** Current value. */
  currentValue?: number;
  /** Absolute profit/loss (positive = gain, negative = loss). */
  profitLoss?: number;
  /** Return percentage (positive/negative). */
  profitLossPercentage?: number;
  /** Currency symbol for this holding; defaults to the site setting. */
  currency?: string;

  /** Short note / thesis. */
  thesis?: string;
  notes?: string;

  /** Logo / image. Monogram fallback renders when absent. */
  logo?: Logo;
  website?: string;
  links?: Link[];
  /** Marks clearly-fictitious sample rows that only demonstrate the UI. */
  demo?: boolean;
}

/** Headline overview metric for the Markets page. Privacy-gated. */
export interface MarketStat {
  label: string;
  value: number;
  /** "compact" (10K/1M) | "currency" | "number" (count up) | "percent". */
  format?: "text" | "compact" | "currency" | "number" | "percent";
  prefix?: string;
  suffix?: string;
  /** Which privacy flag must be on for this to render. */
  privacy: keyof FinancePrivacy;
  /** When true the value counts up on scroll. */
  animate?: boolean;
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
  /** "Submit an opportunity" section copy. */
  pitch: {
    eyebrow: string;
    title: string;
    body: string;
    ctaLabel: string;
    /** Where the CTA points (e.g. mailto: or a future /apply route). */
    ctaHref: string;
    /** Show the section at all. */
    enabled: boolean;
    /** e.g. "Opening 2027" — shown only if set; never claims you're accepting now. */
    note?: string;
  };
}


export interface FinancePrivacy {
  /** Reveal net-worth figures anywhere. */
  showNetWorth: boolean;
  /** Reveal invested cost amounts. */
  showInvestedAmount: boolean;
  /** Reveal current value. */
  showCurrentValue: boolean;
  /** Reveal profit/loss amounts and percentages. */
  showProfitLoss: boolean;
  /** Reveal ownership percentages. */
  showOwnership: boolean;
  /** Reveal business revenue figures. */
  showRevenue: boolean;
  /** Reveal business profit figures. */
  showProfit: boolean;
  /** Reveal portfolio totals / allocation / AUM. */
  showPortfolioAllocation: boolean;
  /** Reveal performance figures. */
  showPerformance: boolean;
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

/* ------------------------------------------------------------------ */
/* Blog / writing / research                                           */
/* ------------------------------------------------------------------ */

export type BlogCategory =
  | "Research"
  | "AI / ML"
  | "Software"
  | "Markets"
  | "Business"
  | "Notes"
  | "Personal";

export type BlogStatus = "Published" | "Draft" | "Demo";

/* A chart block embedded in a research article. Pure data → rendered by the
   reusable Chart components (SVG, dependency-free). */
export interface ChartSpec {
  type: "line" | "bar";
  title?: string;
  caption?: string;
  source?: string;
  /** "tech" | "markets" | "ventures" | "editorial" — picks the accent colour. */
  accent?: Domain;
  /** x labels, e.g. ["Jan", "Feb", …]. */
  labels: string[];
  /** One or more series. */
  series: { name: string; data: number[] }[];
  /** Optional axis unit label, e.g. "audience (000s)". */
  unit?: string;
}

export interface BlogTable {
  title?: string;
  caption?: string;
  source?: string;
  headers: string[];
  rows: string[][];
}

export interface BlogMetric {
  value: string;
  label: string;
}

/** A single block in an article body — a tagged union the renderer maps. */
export type BlogBlock =
  | { kind: "text"; paragraphs: string[] }
  | { kind: "heading"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "code"; language?: string; code: string }
  | { kind: "image"; media: Media; full?: boolean }
  | { kind: "metrics"; items: BlogMetric[] }
  | { kind: "chart"; chart: ChartSpec }
  | { kind: "table"; table: BlogTable };

export interface BlogPost {
  slug: string;
  title: string;
  /** Subtitle / one-line summary shown under the title. */
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  /** ISO date, e.g. "2026-08-14". */
  date: string;
  /** Reading time in minutes. */
  readTime: number;
  author?: string;
  status: BlogStatus;
  /** Pin to the top of the blog index. */
  featured?: boolean;
  /** Marks clearly-fictional demonstration content. */
  demo?: boolean;
  cover?: Media;
  /** Optional external article (links out instead of an internal page). */
  externalUrl?: string;
  /** Body blocks. Ignored when externalUrl is set. */
  content?: BlogBlock[];
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
