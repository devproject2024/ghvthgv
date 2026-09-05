import type { BlogPost } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  BLOG / RESEARCH — add articles here.                             ║
 * ║  Each entry is a plain object; the index and detail pages render  ║
 * ║  automatically. Blocks are a tagged union (text/heading/list/quote/║
 * ║  code/image/metrics/chart/table) so research can embed real charts║
 * ║  and figures. External posts use `externalUrl` instead of blocks. ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
export const blogs: BlogPost[] = [
  {
    slug: "cinema-audience-time-series",
    title: "Understanding Cinema Audience Demand Through Time-Series Features",
    excerpt:
      "A demo research note: how rolling windows, lag variables and calendar features let gradient-boosted trees forecast cinema attendance.",
    category: "Research",
    tags: ["time-series", "forecasting", "lightgbm", "feature-engineering"],
    date: "2026-08-14",
    readTime: 8,
    author: "Daiwik Rankawat",
    status: "Demo",
    featured: true,
    demo: true,
    cover: {
      src: "/images/blog/cinema-demand-cover.jpg",
      alt: "Demo research figure — cinema audience demand",
      aspect: "16/10",
    },
    content: [
      {
        kind: "text",
        paragraphs: [
          "This is a sample research article used to demonstrate the writing and figure system. Every number below is illustrative, generated for the layout — it is not a published result. It mirrors the structure of a real forecasting study: from a noisy attendance signal to a model that generalises on periods it has never seen.",
        ],
      },
      { kind: "heading", text: "Abstract" },
      {
        kind: "text",
        paragraphs: [
          "Cinemas schedule staffing, concessions and screens around expected attendance, yet demand mixes slow seasonal structure with sharp opening-week jumps. We engineer a set of time-aware features and compare LightGBM and XGBoost under strict, time-ordered validation. On the demonstration data, tuned gradient boosting reduces forecast error substantially versus a naive seasonal baseline.",
        ],
      },
      {
        kind: "metrics",
        items: [
          { value: "300K+", label: "Rows of attendance history" },
          { value: "25+", label: "Engineered features" },
          { value: "14.8", label: "Mean absolute error (demo)" },
          { value: "32%", label: "Error reduction vs. baseline (demo)" },
        ],
      },
      { kind: "heading", text: "1 · Introduction" },
      {
        kind: "text",
        paragraphs: [
          "Attendance forecasting is an operational problem, not an academic one. A screen that is understaffed on a Saturday night costs as much as one over-staffed on a quiet Tuesday. The goal is a forecast good enough to plan against, evaluated honestly on the future rather than reshuffled history.",
          "The trap in this domain is leakage: anything computed using information unavailable at forecast time makes a model look brilliant in the lab and useless in production.",
        ],
      },
      { kind: "heading", text: "2 · Dataset" },
      {
        kind: "text",
        paragraphs: [
          "The demonstration dataset is a daily attendance log (over 300,000 rows in the real project) with calendar fields and film metadata. The chart below shows the strong weekly rhythm and the pronounced holiday peaks a model has to capture.",
        ],
      },
      {
        kind: "chart",
        chart: {
          type: "line",
          accent: "tech",
          title: "Daily attendance — observed vs. forecast (demo data)",
          unit: "audience (000s)",
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          series: [
            { name: "Observed", data: [42, 40, 45, 48, 78, 118, 96] },
            { name: "Forecast", data: [44, 42, 44, 49, 75, 112, 99] },
          ],
          caption: "Figure 01",
          source: "Demo dataset",
        },
      },
      { kind: "heading", text: "3 · Feature engineering" },
      {
        kind: "text",
        paragraphs: [
          "Three feature families carry most of the signal. Calendar features encode the predictable structure of a week and year; lag features carry recent momentum; rolling-window features summarise the recent level without over-fitting a single day.",
        ],
      },
      {
        kind: "list",
        items: [
          "Calendar: day-of-week, month, public-holiday and school-holiday flags.",
          "Lags: attendance 1, 7 and 28 days prior.",
          "Rolling windows: 7-day and 28-day means and standard deviations.",
          "Film features: opening-week indicator and title-level recent averages.",
        ],
      },
      {
        kind: "chart",
        chart: {
          type: "bar",
          accent: "markets",
          title: "Feature importance (demo)",
          unit: "relative gain",
          labels: ["Lag 7", "Rolling 28d", "Holiday", "Day of week", "Opening wk", "Lag 28"],
          series: [{ name: "Gain", data: [100, 82, 64, 58, 47, 33] }],
          caption: "Figure 02",
          source: "Demo model",
        },
      },
      { kind: "heading", text: "4 · Methodology" },
      {
        kind: "text",
        paragraphs: [
          "Validation is time-ordered: each fold trains on earlier windows and tests on a strictly later one, with early stopping on the most recent period. No fold ever sees the future. Both LightGBM and XGBoost are tuned on the same folds so the comparison is fair.",
        ],
      },
      {
        kind: "quote",
        text: "A model that has seen tomorrow is a model that will fail tomorrow.",
        cite: "A note to myself about leakage",
      },
      { kind: "heading", text: "5 · Results" },
      {
        kind: "table",
        table: {
          title: "Model comparison (demo)",
          headers: ["Model", "MAE", "RMSE", "Eval scheme"],
          rows: [
            ["Naive seasonal", "21.8", "29.4", "Time-ordered"],
            ["XGBoost", "15.6", "21.1", "Time-ordered"],
            ["LightGBM", "14.8", "20.2", "Time-ordered"],
          ],
          caption: "Table 01",
          source: "Demo dataset",
        },
      },
      {
        kind: "chart",
        chart: {
          type: "bar",
          accent: "tech",
          title: "Mean absolute error by model (lower is better, demo)",
          unit: "MAE",
          labels: ["Naive", "XGBoost", "LightGBM"],
          series: [{ name: "MAE", data: [21.8, 15.6, 14.8] }],
          caption: "Figure 03",
          source: "Demo model",
        },
      },
      { kind: "heading", text: "6 · Visual analysis" },
      {
        kind: "text",
        paragraphs: [
          "Residuals are largest around opening weeks and major holidays — exactly the moments where little history exists. The practical fix is not a more complex model but better external signals (confirmed release dates, pre-sales) blended in at forecast time.",
        ],
      },
      {
        kind: "image",
        full: true,
        media: {
          src: "/images/blog/cinema-residuals.jpg",
          alt: "Demo figure placeholder — residual analysis",
          aspect: "16/9",
          caption: "Figure 04 — residuals cluster around release events (placeholder image).",
        },
      },
      { kind: "heading", text: "7 · Conclusion" },
      {
        kind: "text",
        paragraphs: [
          "On the demonstration data, simple, honestly-validated features with gradient-boosted trees give a forecast accurate enough to plan against — and, more importantly, one whose failures are interpretable. The next steps are external release signals and a thin serving layer that produces the rolling features at inference time.",
          "Reminder: this article and all its figures are sample content demonstrating the research layout, not published findings.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------
     TEMPLATE — copy to add a real article.
  ------------------------------------------------------------------
  {
    slug: "my-note",
    title: "Title",
    excerpt: "One-line summary.",
    category: "Research",        // Research | AI / ML | Software | Markets | Business | Notes | Personal
    tags: ["tag"],
    date: "2026-09-01",
    readTime: 6,
    status: "Published",
    cover: { src: "/images/blog/my-note.jpg", alt: "…", aspect: "16/10" },
    content: [
      { kind: "heading", text: "Introduction" },
      { kind: "text", paragraphs: ["…"] },
      { kind: "chart", chart: { type: "line", labels: ["a","b"], series: [{ name: "S", data: [1,2] }] } },
    ],
    // externalUrl: "https://…"   // use instead of content for an off-site link
  },
  ------------------------------------------------------------------ */
];

