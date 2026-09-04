# Daiwik Rankawat — Personal Platform (V2)

A production-grade personal portfolio covering **technology / data / AI**,
**investing & markets**, and **ventures / business**. Editorial, restrained,
content-driven — no gradients, no dashboards, no filler.

Built with **React 19, Vite, TypeScript and Tailwind CSS v4**.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run build      # production single-file build → dist/
npm run preview    # serve the production build
npm run cv:extract # parse cv/*.tex → cv/extracted.json (see cv/README.md)
```

## Content vs. presentation

All personal information lives in `src/content/*` — the UI never hard-codes
it. Add projects, investments, businesses, experience and links by editing
data, not components. See **[src/content/README.md](src/content/README.md)**
for the full editing guide and **[cv/README.md](cv/README.md)** for the
LaTeX résumé workflow.

## Structure

```
src/
  components/   UI (Layout, Nav, Footer, Figure, Reveal, ProjectIndex,
                BusinessIndex, SplitHeadline, Meta, Stats, primitives…)
  pages/        Home, Work, ProjectDetail, Markets, Ventures,
                VentureDetail, About, Experience, Contact, NotFound
  content/      profile, projects, experience, education, credentials,
                businesses, investments, markets, ventures, skills,
                links, settings, domains (all editable data)
  utils/        cn (classnames), format (K/M/B/T number formatter)
cv/             Canonical LaTeX résumé + extractor output
public/         Favicon, og.png, robots, sitemap, images/, résumé PDF
```

## Privacy

Financial figures are off by default. Enable them per-field in
`src/content/settings.ts` (`finance.*`). Nothing is published unless a flag is
explicitly switched on.

## Deploy

`dist/index.html` is fully self-contained (single-file build) and can be hosted
anywhere. The app uses `HashRouter` so it works from a static file; on a host
with SPA rewrites you can switch to `BrowserRouter` in `src/App.tsx`.