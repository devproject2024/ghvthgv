# Résumé / CV workflow

The résumé (LaTeX) and the website are kept **separate by design**. The
LaTeX file is a job-oriented document; the website is the broader personal
platform. They share data but neither renders the other directly.

## Files

| File | Role |
| --- | --- |
| `cv/Daiwik-Rankawat-CV.tex` | The canonical résumé source. Edit this when your CV changes. |
| `cv/extracted.json` | Generated. Best-effort structured extraction (do not edit by hand). |
| `scripts/extract-cv.mjs` | Parses the `.tex` into `extracted.json`. |
| `src/content/*.ts` | What the website actually renders. |

## Updating your CV → the website

1. Update `cv/Daiwik-Rankawat-CV.tex` as usual (Overleaf/your editor).
2. Run the extractor:

   ```bash
   npm run cv:extract
   ```

   This writes `cv/extracted.json` with education, experience,
   achievements, projects and skills parsed into plain objects.
3. Reconcile any changed values into the matching content file — the
   website supports far more structure (case-study sections, links,
   metrics, privacy flags) than a one-page résumé, so this step is a
   deliberate human review, not an automatic overwrite:

   | Résumé section | Content file |
   | --- | --- |
   | Education | `src/content/education.ts` |
   | Experience | `src/content/experience.ts` |
   | Competitive Achievements | `src/content/education.ts` → `achievements` |
   | Projects | `src/content/projects.ts` |
   | Leadership & Certifications | `src/content/credentials.ts` |
   | Contact / links | `src/content/links.ts`, `src/content/profile.ts` |

## Why not parse LaTeX at runtime?

Arbitrary LaTeX cannot be reliably or safely converted in the browser. A
single-page résumé template *can* be parsed deterministically, which is what
`extract-cv.mjs` does offline. Keeping that step out of the runtime means the
site stays fast and the content layer remains explicit, typed and reviewable.

> The architecture guarantees the stated goal: **you never redesign the site
> because the CV changed** — you only edit data.
