# Editing this site

All personal content lives in this folder. The UI never hard-codes your information.

| I want to…                         | Edit this file                       |
| ---------------------------------- | ------------------------------------ |
| Change my name / headline / bio    | `profile.ts`                         |
| Change my email or résumé link     | `profile.ts` → `email`, `resume`     |
| Add or change my photos            | `profile.ts` → `photos`              |
| Add a project                      | `projects.ts` (copy the template)    |
| Add screenshots to a project       | `projects.ts` → `cover`, `gallery`   |
| Change a project's links           | `projects.ts` → `links`              |
| Add work experience                | `experience.ts`                      |
| Edit education or achievements     | `education.ts`                       |
| Edit investing / business items    | `ventures.ts`                        |
| Edit skills / technologies         | `skills.ts`                          |
| Change GitHub / LinkedIn / socials | `links.ts`                           |
| Reorder or rename navigation       | `links.ts` → `navigation`            |

## Files and images

Put static files in `/public`:

```
public/
  Daiwik-Rankawat-Resume.pdf
  images/
    daiwik-portrait.jpg
    projects/
      examination-platform/
        cover.png
        quiz.png
      cinema-audience-forecasting/
        cover.png
```

Reference them with a leading slash, e.g. `"/images/projects/examination-platform/cover.png"`.

## Design tokens

Colours, fonts and the type scale are in `src/index.css` under `@theme` and `@layer utilities`.

## SEO

Title, description and Open Graph tags are in `index.html`. `public/sitemap.xml` and `public/robots.txt` should be updated with your real domain.
