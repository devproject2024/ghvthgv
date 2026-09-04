import type { Venture } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  PURSUITS — short, factual list for the home & about pages.      ║
 * ║  Detailed businesses live in businesses.ts; investment detail    ║
 * ║  and framing live in investments.ts / markets.ts.                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
export const ventures: Venture[] = [
  {
    name: "Investing",
    role: "Public markets",
    status: "Active",
    domain: "markets",
    description:
      "Long-horizon, research-led public-market investing — position-sized against a written thesis and reviewed rather than traded on noise.",
    url: "/markets",
  },
  {
    name: "Trading",
    role: "Systematic",
    status: "Active",
    domain: "markets",
    description:
      "Shorter-horizon trading with a systematic bias — the same discipline around data, testing and risk that goes into the models I build.",
    url: "/markets",
  },
  {
    name: "Venture",
    role: "Early-stage",
    status: "Active",
    domain: "markets",
    description:
      "Involved in early-stage venture — evaluating founders, products and markets at the point where most of the risk is still technical.",
    url: "/markets",
  },
  {
    name: "Restaurant venture",
    role: "Operations",
    status: "Active",
    domain: "ventures",
    description:
      "Helping operate a restaurant business — the day-to-day of margins, staffing, suppliers and customers, where decisions have physical consequences.",
    url: "/ventures",
  },
  {
    name: "Products & ideas",
    role: "Builder",
    status: "Active",
    domain: "ventures",
    description:
      "Software products and business ideas in various stages — from notes to prototypes to things people use.",
    url: "/work",
  },
];

/** Short framing copy for the "Beyond software" section. Edit freely. */
export const venturesIntro = {
  eyebrow: "Beyond software",
  title: "Technology isn't the only thing I work on.",
  body: "A meaningful part of my time goes to markets, early-stage companies and a physical business. They teach different things — capital, people, operations — and they make the software better.",
};
