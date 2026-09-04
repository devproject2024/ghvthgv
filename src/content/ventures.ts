import type { Venture } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  EDIT YOUR BUSINESS / INVESTING ACTIVITIES HERE                  ║
 * ║  Shown under "Beyond software" on the home and About pages.      ║
 * ║  Keep it factual. Add `url` to link out, `detail` for more copy. ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
export const ventures: Venture[] = [
  {
    name: "Investing",
    role: "Personal portfolio",
    status: "Active",
    description:
      "Long-horizon public-market investing. Research-led, position-sized, and reviewed against a written thesis.",
  },
  {
    name: "Trading",
    role: "Personal",
    status: "Active",
    description:
      "Shorter-horizon trading with a systematic bias — the same discipline around data, testing and risk that goes into the models I build.",
  },
  {
    name: "Venture",
    role: "Venture investing",
    status: "Active",
    description:
      "Involved in early-stage venture investing — evaluating founders, products and markets at the point where most of the risk is still technical.",
  },
  {
    name: "Restaurant business",
    role: "Operations",
    status: "Active",
    description:
      "Involved in running a restaurant business — the day-to-day of margins, staffing, suppliers and customers, where decisions have physical consequences.",
  },
  {
    name: "Products & ideas",
    role: "Builder",
    status: "Active",
    description:
      "Software products and business ideas in various stages — from notes to prototypes to things people use.",
  },
];

/** Short framing copy for the section. Edit freely. */
export const venturesIntro = {
  eyebrow: "Beyond software",
  title: "Technology isn't the only thing I work on.",
  body: "I spend a meaningful part of my time in markets, early-stage companies and a physical business. They teach different things — capital, people, operations — and they make the software better.",
};
