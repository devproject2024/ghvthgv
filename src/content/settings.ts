/**
 * SITE-WIDE SETTINGS & FINANCIAL PRIVACY
 * -----------------------------------------------------------------
 * Flags the UI reads before deciding whether to render sensitive
 * information. Everything here defaults to PRIVATE — nothing personal
 * or financial is shown unless you explicitly switch it on.
 *
 *   showNetWorth / showInvestmentAmounts / showPortfolioAllocation
 *
 * flip to true only when (and if) you choose to publish that detail.
 */

export interface SiteSettings {
  /** Public website URL (canonical, sitemap, OG). No trailing slash. */
  siteUrl: string;
  /** Financial privacy — all false by default. */
  finance: {
    /** Reveal net-worth figures anywhere. */
    showNetWorth: boolean;
    /** Reveal per-investment amounts and cheque sizes. */
    showInvestmentAmounts: boolean;
    /** Reveal allocation percentages, portfolio totals and AUM. */
    showPortfolioAllocation: boolean;
    /** Reveal portfolio / fund performance numbers. */
    showPerformance: boolean;
  };
  /** Currency symbol used whenever amounts are enabled. */
  currencySymbol: string;
}

export const settings: SiteSettings = {
  siteUrl: "https://daiwikrankawat.com",

  finance: {
    showNetWorth: false,
    showInvestmentAmounts: false,
    showPortfolioAllocation: false,
    showPerformance: false,
  },

  currencySymbol: "₹",
};
