# How to update this website

Everything personal lives in `src/content/` and `public/images/`. You should
not need to touch components to change your information. Replace files at the
paths below and they appear automatically.

---

## Add / replace your profile photo

Drop files at these exact paths (JPG, PNG, WebP or AVIF — keep the filename
extension in sync inside `src/content/profile.ts → photos`):

| Where it shows | File path |
| --- | --- |
| **Home page** portrait | `public/images/profile/home-portrait.jpg` |
| **About page** large photo | `public/images/profile/about-portrait.jpg` |
| **About page** secondary photo | `public/images/profile/about-secondary.jpg` |

Until a file exists, a tasteful placeholder renders (never a broken image).
Recommended crops: home portrait is tall (`4/5`), about large is wide (`3/2`),
secondary is tall (`4/5`). The site crops responsively — images are never
stretched. To add more photos, append objects to `profile.photos`.

---

## Add a company / university / business logo

Put the image in `public/images/logos/…` (PNG/SVG/WebP, ideally square,
transparent background) and point the `logo.src` at it:

- **Experience:** `src/content/experience.ts` → `logo: { name, src }`
- **Education:** `src/content/education.ts` → `logo: { name, src }`
- **Investments:** `src/content/markets-portfolio.ts` → `logo: { name, src }`
- **Ventures:** `src/content/businesses.ts` → `logo: { name, src }`

If no logo is set (or a file fails to load), a clean **text monogram**
(e.g. “SB”) renders automatically — there is never a broken image.

---

## Add / edit an investment (holding)

Edit `src/content/markets-portfolio.ts` → `investments`. Add one object:

```ts
{
  slug: "hdfc-bank",
  name: "HDFC Bank",
  ticker: "HDFCBANK",
  category: "Public equities",     // Public equities | SIP | Startups | Trading | …
  assetType: "Direct equity",
  status: "Active",
  shares: 30000,                    // → "30K shares" (animated / compact)
  investedAmount: 2350000,         // optional
  currentValue: 2646000,           // optional
  profitLoss: 296000,              // +gain / −loss → coloured ↑ / ↓
  profitLossPercentage: 12.6,      // optional
  website: "https://…",            // optional — hides the button if absent
  thesis: "One line on why.",
  logo: { name: "HDFC Bank", src: "/images/logos/markets/hdfc.png" },
}
```

Positive returns show a muted green **↑ +x%**, losses a muted red **↓ −x%**.
The table collapses into cards on mobile. **Delete the sample rows** (the
ones with `demo: true`) when you add real holdings.

## Turn financial visibility on/off

`src/content/settings.ts → finance`

```
showNetWorth · showInvestedAmount · showCurrentValue · showProfitLoss
showOwnership · showRevenue · showProfit · showPortfolioAllocation
```

Set a flag to `true` to publish that figure; `false` hides the column/metric
everywhere. Nothing is shown unless explicitly enabled.

## Change net worth / overview numbers

`src/content/markets-portfolio.ts → marketStats`. Enter raw numbers — the
formatter compacts them (`10000 → 10K`, `1500000 → 1.5M`, `1B`, `1T`) and they
count up when scrolled into view. Change `investmentStartYear` for
“investing since”.

---

## Add a venture / business

Edit `src/content/businesses.ts` — copy the template object. Fields include
`name`, `category`, `summary`, `description`, `role`, `status`, `year`,
`website`, `logo`, `cover`, `gallery`, narrative sections, `metrics`, and
`outlets`. It automatically gets a `/ventures/<slug>` page.

### Add revenue / profit / outlets

```ts
metrics: [
  { value: 10000000, label: "Annual revenue", format: "currency", suffix: "+" },
  { value: 3,        label: "Outlets",        format: "number" },
],
```

Financial metrics respect `finance.showRevenue` / `showProfit`. Locations are
grouped **country → city** automatically:

```ts
outlets: [
  { name: "Flagship", city: "Mumbai", country: "India", address: "…",
    status: "Open", mapsUrl: "https://maps.google.com/?q=…",
    image: { src: "/images/ventures/restaurant/mumbai.jpg", alt: "Mumbai", aspect: "4/3" } },
],
```

The locations section is hidden until you add at least one outlet.

---

## Add a project

Edit `src/content/projects.ts` (copy the template). Screenshots go in
`public/images/projects/<slug>/…` and are referenced via `cover` / `gallery`.
Links (`live`, `github`, `caseStudy`, `external`) hide their button if absent.

## Add a blog / research article

Edit `src/content/blogs.ts` — copy the template object. It appears on `/blog`
and gets its own page at `/blog/<slug>` automatically. The body is an array of
blocks, each one rendered automatically:

```ts
content: [
  { kind: "heading", text: "Methodology" },
  { kind: "text", paragraphs: ["…"] },
  { kind: "list", items: ["…"] },              // ordered: true for numbered
  { kind: "quote", text: "…", cite: "…" },
  { kind: "code", language: "python", code: "…" },
  { kind: "metrics", items: [{ value: "14.8", label: "MAE" }] },
  { kind: "chart", chart: {                     // rendered as real SVG
      type: "line",                             // "line" | "bar"
      accent: "tech",                           // tech | markets | ventures | editorial
      labels: ["Mon","Tue"],
      series: [{ name: "Observed", data: [42, 40] }],
      caption: "Figure 01", source: "Demo data" } },
  { kind: "table", table: { headers: ["A","B"], rows: [["1","2"]] } },
  { kind: "image", media: { src: "/images/blog/figure.jpg", alt: "…" } },
]
```

- Charts render as crisp, responsive **SVG from data** — no image needed.
- Cover/figure images live in `public/images/blog/…`; a placeholder shows until
  you add the file.
- Mark a clearly-fictional piece with `demo: true` and `status: "Demo"` so it’s
  labelled as sample content. Link off-site instead with `externalUrl`.

## Replace the résumé PDF

Drop your PDF at **`public/resume/resume.pdf`** (overwrite the placeholder). The
Résumé button points there in `src/content/profile.ts → resume.href` and opens it
in a new tab — no code changes needed to update it.

## Change the résumé

- Replace the link/PDF: `src/content/profile.ts → resume.href` (drop the PDF
  in `public/`).
- Update structured data: edit the content files.
- From LaTeX: keep `cv/Daiwik-Rankawat-CV.tex` current, run `npm run cv:extract`,
  and reconcile `cv/extracted.json` into the content files (see `cv/README.md`).

## Contact & socials

`src/content/links.ts` → `socialLinks`; `src/content/profile.ts → email`.
The Markets “Submit an opportunity” button target lives in
`src/content/markets.ts → pitch` (currently an email link; point it at a
future `/apply` page when built).

---

**Rules of thumb:** put images under `public/images/…`, edit data under
`src/content/…`, and run `npm run build` to verify. Placeholder values are
written like `[ADD RESTAURANT NAME]` so they are easy to find.