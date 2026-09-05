import type { Business } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  BUSINESSES / VENTURES                                           ║
 * ║  Companies and ventures you have started, operate or are          ║
 * ║  involved with. Separate from technical projects (projects.ts).   ║
 * ║  Each entry gets a /ventures/<slug> page.                         ║
 * ║                                                                   ║
 * ║  OPTIONAL / PRIVACY: revenue, profit, team and outlet details are ║
 * ║  rendered ONLY if you provide them. `metrics` financial values    ║
 * ║  are gated by settings.finance.showRevenue / showProfit.          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
export const businesses: Business[] = [
  {
    slug: "restaurant",
    name: "[ADD RESTAURANT NAME]",
    category: "Restaurant · Food & hospitality",
    summary:
      "An operating restaurant business — margins, staffing, suppliers and customers, managed as a real commercial venture rather than a hobby.",
    description:
      "A restaurant business I help operate. It is the part of my work furthest from a screen: physical inventory, daily cash flow, a team on the floor and customers who judge the result in person — and it is where operational decisions are most concrete.",
    role: "Operations",
    status: "Operating",
    year: "Operating",
    featured: true,
    domain: "ventures",
    location: "India",

    // website: "https://…",
    // logo: { name: "Restaurant", src: "/images/logos/ventures/restaurant.png" },
    // cover: { src: "/images/ventures/restaurant/cover.jpg", alt: "Dining room", aspect: "16/9" },
    // gallery: [
    //   { src: "/images/ventures/restaurant/interior.jpg", alt: "Interior", span: "full", caption: "…" },
    //   { src: "/images/ventures/restaurant/food.jpg", alt: "A signature dish", span: "half" },
    // ],

    overview: [
      "Restaurants run on thin margins and immediate feedback. A pricing change, a staffing schedule or a supplier switch shows up in the week's numbers and in the room itself — there is nowhere for a bad decision to hide.",
      "That makes it a useful counterweight to software work: the same discipline of measuring, testing and iterating, applied to inventory, labour and service rather than to data pipelines.",
    ],
    story: [],
    operations: [
      "Day-to-day operations span staffing and rostering, supplier relationships and inventory, cost control and pricing, and the customer experience on the floor.",
    ],
    extraSections: [],

    /* Multi-location outlets. Fill in when the chain has locations to list;
       the section is hidden while this array is empty. All fields optional.
    outlets: [
      { name: "Flagship", city: "Mumbai", country: "India", address: "[ADD ADDRESS]", status: "Open",
        mapsUrl: "https://maps.google.com/?q=…", website: "https://…",
        image: { src: "/images/ventures/restaurant/outlet-mumbai.jpg", alt: "Mumbai outlet", aspect: "4/3" } },
      { name: "International", city: "Dubai", country: "UAE", status: "Opening soon", openingDate: "2027" },
    ],
    */
    outlets: [],

    /* OPTIONAL business metrics — add ONLY real, published figures.
       Financial metrics respect settings.finance.showRevenue / showProfit.
    metrics: [
      { value: 0, label: "Annual revenue", format: "currency", suffix: "+" },
      { value: 0, label: "Outlets", format: "number" },
    ],
    team: "",
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
    status: "Building",            // Operating | Active | Building | Pre-launch | Paused | Exited
    year: "2026",
    featured: false,
    domain: "ventures",
    location: "Remote",
    website: "https://…",
    logo: { name: "Venture Name", src: "/images/logos/ventures/new-venture.png" },
    cover: { src: "/images/ventures/new-venture/cover.jpg", alt: "…", aspect: "16/9" },
    gallery: [],
    overview: ["…"],
    story: ["…"],
    operations: ["…"],
    outlets: [],
    metrics: [{ value: 0, label: "Revenue", format: "currency" }],
    team: "",
  },
  ------------------------------------------------------------------ */
];

