/**
 * SITE-WIDE SETTINGS & FINANCIAL PRIVACY
 * -----------------------------------------------------------------
 * Flags the UI reads before deciding whether to render sensitive
 * information. Everything personal/financial defaults to PRIVATE —
 * nothing is shown unless you explicitly switch the flag to true.
 */
import type { FinancePrivacy } from "./types";

/**
 * Financial privacy. Everything defaults to PRIVATE.
 *
 * The flags below are ON only so the sample/demo rows in
 * markets-portfolio.ts can demonstrate the amount & return columns. The
 * page labels every figure as SAMPLE data. When you replace the demo rows
 * with your real holdings, set these back to false for anything you want
 * to keep private.
 */
export const financePrivacy: FinancePrivacy = {
  showNetWorth: true, // demo only — set false + a real value to publish
  showInvestedAmount: true, // demo columns
  showCurrentValue: true, // demo columns
  showProfitLoss: true, // demo columns
  showOwnership: false,
  showRevenue: false,
  showProfit: false,
  showPortfolioAllocation: true, // powers the "active investments" count
  showPerformance: true, // powers "investing since"
};

export interface SiteSettings {
  /** Public website URL (canonical, sitemap, OG). No trailing slash. */
  siteUrl: string;
  /** Financial privacy — all false by default. */
  finance: FinancePrivacy;
  /** Currency symbol used whenever amounts are enabled. */
  currencySymbol: string;
}

export const settings: SiteSettings = {
  siteUrl: "https://daiwikrankawat.com",

  finance: financePrivacy,

  currencySymbol: "₹",
};

