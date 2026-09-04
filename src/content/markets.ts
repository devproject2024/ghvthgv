import type { MarketsContent } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  MARKETS — editorial framing for the /markets page.              ║
 * ║  Tone: private-investment-office / research publication, not     ║
 * ║  trading content. No performance figures, no calls to action.    ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
export const markets: MarketsContent = {
  eyebrow: "Investing & markets",
  title: "Capital allocation, treated like research.",
  intro: [
    "I invest and trade my own capital, and I'm involved in early-stage venture. This is a record of how I think about those decisions — the discipline, the theses and, where appropriate, the positions themselves.",
    "There are no performance figures, price targets or signals here. Specific holdings and amounts are private by default; what is shown is the framework and any positions I choose to make public.",
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
      body: "Running a physical business keeps the investing grounded: margins, people and execution show up faster and more honestly than in a slide deck.",
    },
  ],
  portfolioHeading: "Positions",
  portfolioNote:
    "Holdings and amounts are private by default. Positions I choose to make public will appear here; nothing is shown that isn't deliberately published.",
};
