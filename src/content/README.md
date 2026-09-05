# Editing this site

All personal content lives in this folder. The UI never hard-codes your
information — components only read from here. **You should never need to
redesign the site to update your CV; you only edit data.**

| I want to…                            | Edit this file                       |
| ------------------------------------- | ------------------------------------ |
| Change name / headline / bio / email  | `profile.ts`                         |
| Change the résumé link                | `profile.ts` → `resume`              |
| Add or change photos                  | `profile.ts` → `photos`              |
| Update “currently doing”              | `profile.ts` → `currently`           |
| Add a project                         | `projects.ts` (copy the template)    |
| Add screenshots / video to a project  | `projects.ts` → `cover`, `gallery`   |
| Change a project’s links              | `projects.ts` → `links`              |
| Add measured results to a project     | `projects.ts` → `metrics`, `outcomes`|
| Add work experience                   | `experience.ts`                      |
| Edit education                        | `education.ts` → `education`         |
| Edit competitive achievements         | `education.ts` → `achievements`      |
| Add leadership / certifications        | `credentials.ts`                     |
| Add an investment / holding           | `investments.ts`                     |
| Edit investing framing copy           | `markets.ts`                         |
| Add a business / venture (restaurant) | `businesses.ts`                      |
| Edit the short “pursuits” list        | `ventures.ts`                        |
| Edit skills / technologies            | `skills.ts`                          |
| Change GitHub / LinkedIn / socials    | `links.ts` → `socialLinks`           |
| Reorder / rename navigation           | `links.ts` → `navigation`            |
| Turn financial figures on/off         | `settings.ts` → `finance`            |

## Financial privacy

Financial information is **off by default**. In `settings.ts`:

```
finance: { showNetWorth: false, showInvestmentAmounts: false,
           showPortfolioAllocation: false, showPerformance: false }
```

Amounts, ownership, allocation and performance only render when the matching
flag is explicitly `true`. Missing buttons (e.g. a company with no website)
are hidden automatically.

## Domains & colour marks

Four areas of work each have a small muted solid mark, mapped in
`domains.ts`: **tech** (slate blue), **markets** (forest green),
**ventures** (terracotta), **editorial** (ink). They appear as tiny dots
and selected states only — never large backgrounds. Project categories are
mapped to domains automatically.


## Files and images

Put static files in `/public`:

```
public/
  Daiwik-Rankawat-Resume.pdf
  og.png
  images/
    daiwik-portrait.jpg
    projects/
      examination-platform/
        cover.png  quiz.png
    ventures/
      restaurant/
        cover.jpg
```

Reference them with a leading slash, e.g.
`"/images/projects/examination-platform/cover.png"`.

## Numbers

`src/utils/format.ts` provides `compactNumber` (10_000 → “10K”, 1_500_000 →
“1.5M”, 1B / T supported), `compactCurrency` and `formatPercent`. Use these
rather than hard-coding display strings.

## Design tokens

Colours, fonts and the type scale are in `src/index.css` under `@theme` and
`@layer utilities`. No gradients are used.

## CV / résumé workflow

See `cv/README.md`. Update the LaTeX in `cv/`, run `npm run cv:extract`, and
reconcile the parsed `cv/extracted.json` into the content files above.

## SEO

`index.html` holds the base meta tags; per-page titles/descriptions/canonical
are set by the `<Meta />` component in each page. Update `public/sitemap.xml`
and `public/robots.txt` with your real domain.
