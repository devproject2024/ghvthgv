import type { MarketsContent } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  MARKETS — editorial framing + pitch-section copy.               ║
 * ║  Holdings/overview live in markets-portfolio.ts.                  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
export const markets: MarketsContent = {
  eyebrow: "Investing & markets",
  title: "Capital allocation, treated like research.",
  intro: [
    "I invest and trade my own capital, and I'm involved in early-stage venture. This is a record of how I approach those decisions — the discipline, the theses and, where appropriate, the positions themselves.",
    "There are no signals or price targets here. Financial figures are private by default; what is shown is the framework and anything I deliberately choose to make public.",
  ],
  approach: [
    {
      title: "Research-led",
      body: "Public-market positions start from a written thesis — what has to be true, and what would change my mind — sized against conviction rather than conviction against size.",
    },
    {
      title: "Systematic",
      body: "Shorter-horizon trading uses the same methods I build models with: explicit rules, tested on history they couldn't have seen, with risk decided before entry.",
    },
    {
      title: "Long-horizon venture",
      body: "Early-stage work concentrates where the risk is still technical — founders and products I can evaluate as a builder, at the stage where engineering judgment matters most.",
    },
    {
      title: "Operator's lens",
      body: "Running physical businesses keeps the investing grounded: margins, people and execution show up faster and more honestly than in a deck.",
    },
  ],
  portfolioHeading: "Portfolio",
  portfolioNote:
    "Holdings and amounts are private by default. The sample below only demonstrates how the table is structured — positions I choose to publish will replace it in src/content/markets-portfolio.ts.",

  pitch: {
    enabled: true,
    eyebrow: "Opportunities",
    title: "Building or raising something interesting?",
    body: "This space will eventually accept pitches from founders and investment opportunities for consideration. For now, the fastest way to reach me is email — share the company, stage and a line on what you're building.",
    ctaLabel: "Submit an opportunity",
    ctaHref: "mailto:daiwikrankawat21062003@gmail.com?subject=Opportunity%20for%20consideration",
    note: "Pitch intake opening later — email works today.",
  },
};

