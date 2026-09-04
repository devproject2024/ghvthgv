import type { Business } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  BUSINESSES / VENTURES                                           ║
 * ║  Companies and ventures you have started, operate or are         ║
 * ║  involved with. Separate from technical projects (those live in  ║
 * ║  projects.ts). Each entry can have its own /ventures/<slug> page.║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Only include information that is true and public. Optional fields
 * (metrics, team, website, photos) render only when you provide them.
 * The restaurant below is a real operating venture — replace the
 * working name "[ADD RESTAURANT NAME]" with the public name, add a
 * website and photographs when ready.
 */
export const businesses: Business[] = [
  {
    slug: "restaurant",
    name: "[ADD RESTAURANT NAME]",
    category: "Restaurant · Food & hospitality",
    summary:
      "An operating restaurant business — margins, staffing, suppliers and customers, managed as a real commercial venture rather than a hobby.",
    description:
      "A restaurant business I help operate. It is the part of my work that is furthest from a screen: physical inventory, daily cash flow, a team on the floor and customers who judge the result in person — and it is where operational decisions are most concrete.",
    role: "Operations",
    status: "Operating",
    year: "Operating",
    featured: true,
    domain: "ventures",
    location: "India",

    // website: "https://…",         // ← add the public website; button hides until set
    // links: [],

    // logo:  { src: "/images/ventures/restaurant/logo.png", alt: "…", aspect: "1/1" },
    // cover: { src: "/images/ventures/restaurant/cover.jpg", alt: "Dining room", aspect: "16/9" },
    // gallery: [
    //   { src: "/images/ventures/restaurant/01.jpg", alt: "…", span: "full", caption: "" },
    //   { src: "/images/ventures/restaurant/02.jpg", alt: "…", span: "half" },
    // ],

    overview: [
      "Restaurants run on thin margins and immediate feedback. A pricing change, a staffing schedule or a supplier switch shows up in the week's numbers and in the room itself — there is nowhere for a bad decision to hide.",
      "That makes it a useful counterweight to software work: the same discipline of measuring, testing and iterating, applied to inventory, labour and service rather than to data pipelines.",
    ],
    story: [
      // Add the origin story, role and what the business is known for when ready.
    ],
    operations: [
      "Day-to-day operations span staffing and rostering, supplier relationships and inventory, cost control and pricing, and the customer experience on the floor.",
    ],
    extraSections: [],

    /* OPTIONAL — only display what is explicitly provided and true.
    metrics: [
      { value: 0, label: "Seats", format: "compact" },
    ],
    team: "[ADD TEAM DESCRIPTION]",
    */
  },

  /* ------------------------------------------------------------------
     TEMPLATE — copy to add another business / venture.
  ------------------------------------------------------------------
  {
    slug: "new-venture",
    name: "Venture Name",
    category: "Software · Fintech",
    summary: "One line on what it is.",
    description: "Two or three sentences for the detail page.",
    role: "Co-founder",
    status: "Building",            // "Operating" | "Active" | "Building" | "Pre-launch" | "Paused" | "Exited"
    year: "2026",
    featured: false,
    domain: "ventures",
    location: "Remote",
    website: "https://…",
    links: [{ label: "View company", href: "https://…" }],
    logo: { src: "/images/ventures/new-venture/logo.png", alt: "…", aspect: "1/1" },
    cover: { src: "/images/ventures/new-venture/cover.jpg", alt: "…", aspect: "16/9" },
    gallery: [],
    overview: ["…"],
    story: ["…"],
    operations: ["…"],
    metrics: [{ value: 0, label: "Customers", format: "compact" }],
    team: "",
  },
  ------------------------------------------------------------------ */
];
