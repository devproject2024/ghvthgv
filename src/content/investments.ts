import type { Investment, PortfolioStat } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  INVESTMENTS — PORTFOLIO DATA                                    ║
 * ║  Add holdings here when you choose to publish them.              ║
 * ║                                                                  ║
 * ║  PRIVACY IS ON BY DEFAULT. Amounts, ownership, allocation, AUM   ║
 * ║  and net worth never render unless the matching flag in          ║
 * ║  settings.ts (`finance.*`) is switched to true. A holding with   ║
 * ║  no `website` simply shows no visit button.                      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * The array is intentionally empty to start with — nothing is fabricated.
 * Copy the template below to add a position.
 */
export const investments: Investment[] = [
  /* ------------------------------------------------------------------
     TEMPLATE — copy, uncomment, fill in.
  ------------------------------------------------------------------
  {
    slug: "startup-abc",                 // for a future /markets/<slug> page
    name: "Startup ABC",
    category: "Developer tools",         // sector
    type: "Angel",                       // "Angel" | "Venture fund" | "Syndicate" | "Public equity" | "Private" | "Other"
    status: "Active",                    // "Active" | "Realized" | "Tracking" | "Exited"
    date: "2026",
    thesis: "One or two lines on why — the thesis, not a price target.",
    description: "Optional longer note.",
    notes: "Optional private-style note you choose to make public.",
    // logo: { src: "/images/markets/startup-abc/logo.png", alt: "Startup ABC logo", aspect: "1/1" },
    // website: "https://…",            // omit entirely if there is no public site
    // links: [{ label: "Announcement", href: "https://…" }],

    // PRIVATE — rendered ONLY if settings.finance.showInvestmentAmounts === true
    // amount: 0,
    // ownership: "0.0%",
  },
  ------------------------------------------------------------------ */
];

/**
 * PORTFOLIO SUMMARY FIGURES
 * Each stat is gated by a privacy flag and stays hidden until that flag
 * is enabled in settings.ts. Leave the array empty until you want a
 * (privacy-respecting) summary on the Markets page.
 */
export const portfolioStats: PortfolioStat[] = [
  // { label: "Positions", value: 0, format: "compact", privacy: "showInvestmentAmounts" },
  // { label: "Public allocation", value: 0, format: "percent", privacy: "showPortfolioAllocation" },
];
