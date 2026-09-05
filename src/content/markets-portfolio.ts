import type { Investment, MarketStat } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  INVESTMENT PORTFOLIO DATA                                       ║
 * ║  Add / remove holdings as plain objects. Financial fields are     ║
 * ║  optional and privacy-gated (see settings.ts → finance).          ║
 * ║                                                                   ║
 * ║  ⚠  SAMPLE DATA                                                   ║
 * ║  The rows below are FICTITIOUS examples (SBIN/RIL/etc. with       ║
 * ║  made-up figures) that exist ONLY to demonstrate the table.       ║
 * ║  They are flagged `demo: true` and the page labels them as such.  ║
 * ║  Replace/remove them with your real holdings. Never publish these ║
 * ║  numbers as fact.                                                 ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

/** Year you started investing — used to compute "Investing since / X years". */
export const investmentStartYear = 2026;

/**
 * Overview metrics. Each is gated by a privacy flag. Numeric values animate
 * 0 → value on scroll. The figures below are SAMPLE placeholders (flagged on
 * the page) so the overview demonstrates correctly — replace them with real
 * values (or set the privacy flag false to hide the metric entirely).
 */
export const marketStats: MarketStat[] = [
  {
    label: "Net worth (sample)",
    value: 1500000, // ← replace with your real figure (1,500,000 → "₹1.5M+")
    format: "currency",
    suffix: "+",
    privacy: "showNetWorth",
    animate: true,
  },
  {
    label: "Investing since",
    value: investmentStartYear,
    format: "number",
    privacy: "showPerformance",
    animate: false,
  },
  {
    label: "Active investments",
    value: 0, // derived from the (non-demo) holdings count
    format: "number",
    privacy: "showPortfolioAllocation",
    animate: true,
  },
  {
    label: "Total invested (sample)",
    value: 5930000,
    format: "currency",
    privacy: "showInvestedAmount",
    animate: true,
  },
];

export const investments: Investment[] = [
  {
    slug: "sample-sbin",
    name: "State Bank of India",
    ticker: "SBIN",
    category: "Public equities",
    assetType: "Direct equity",
    status: "Active",
    shares: 30000,
    investedAmount: 2350000,
    currentValue: 2646000,
    profitLoss: 296000,
    profitLossPercentage: 12.6,
    website: "https://www.onlinesbi.com",
    thesis: "Sample holding — replace with your real position.",
    notes: "Fictitious figures for layout demonstration only.",
    demo: true,
  },
  {
    slug: "sample-reliance",
    name: "Reliance Industries",
    ticker: "RELIANCE",
    category: "Public equities",
    assetType: "Direct equity",
    status: "Active",
    shares: 12000,
    investedAmount: 3100000,
    currentValue: 2845000,
    profitLoss: -255000,
    profitLossPercentage: -8.2,
    website: "https://www.ril.com",
    thesis: "Sample holding — replace with your real position.",
    notes: "Fictitious figures for layout demonstration only.",
    demo: true,
  },
  {
    slug: "sample-nifty-sip",
    name: "Nifty 50 Index",
    ticker: "NIFTY 50",
    category: "SIP",
    assetType: "SIP",
    status: "Active",
    unitsLabel: "units",
    investedAmount: 480000,
    currentValue: 547000,
    profitLoss: 67000,
    profitLossPercentage: 14.0,
    notes: "Sample monthly SIP — figures are illustrative only.",
    demo: true,
  },
  {
    slug: "sample-startup",
    name: "Startup ABC",
    category: "Startups",
    assetType: "Startup",
    status: "Active",
    ownershipPercentage: 0,
    thesis: "Sample early-stage position — replace with a real company when you choose to publish one.",
    notes: "Illustrative. No real company is implied.",
    demo: true,
  },

  /* ------------------------------------------------------------------
     TEMPLATE — copy, fill with REAL data, and delete the demo rows.
  ------------------------------------------------------------------
  {
    slug: "hdfc-bank",
    name: "HDFC Bank",
    ticker: "HDFCBANK",
    category: "Public equities",     // public equities | SIP | start-ups | trading | …
    assetType: "Direct equity",      // Direct equity | SIP | Long-term | Trading | Startup | Venture | Fund | Other
    status: "Active",                // Active | Realized | Tracking | Exited
    shares: 0,                       // number of shares/units (optional)
    unitsLabel: "shares",
    investedAmount: 0,               // optional — gated by finance.showInvestedAmount
    currentValue: 0,                 // optional — gated by finance.showCurrentValue
    profitLoss: 0,                   // optional (+gain / −loss) — gated by finance.showProfitLoss
    profitLossPercentage: 0,         // optional — gated by finance.showProfitLoss
    ownershipPercentage: 0,          // optional — gated by finance.showOwnership
    website: "https://…",            // omit → "View company" button hides
    thesis: "One line on why.",
    // logo: { name: "HDFC Bank", src: "/images/logos/markets/hdfc.png" },
  },
  ------------------------------------------------------------------ */
];

