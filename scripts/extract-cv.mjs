#!/usr/bin/env node
/**
 * LAREX → STRUCTURED DATA EXTRACTOR
 * -----------------------------------------------------------------
 * A deliberately simple, dependency-free parser for the specific résumé
 * LaTeX template used in cv/Daiwik-Rankawat-CV.tex (the sb2nov style with
 * \resumeSubheading / \resumeProjectHeading / \resumeItem).
 *
 * It does NOT attempt to parse arbitrary LaTeX in the browser — that is
 * neither reliable nor necessary. Instead it gives you a best-effort
 * structured extraction (cv/extracted.json) that you reconcile into
 * src/content/*.ts by hand. The website's source of truth at runtime is
 * the TypeScript content files.
 *
 *   npm run cv:extract          # parse cv/*.tex → cv/extracted.json
 *
 * Reconcile the printed diff into the matching content file
 * (experience.ts, education.ts, projects.ts, credentials.ts).
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cvDir = join(__dirname, "..", "cv");

/** Strip the common LaTeX commands/markup to leave readable text. */
function clean(latex) {
  return latex
    .replace(/\\textbf\{([^}]*)\}/g, "$1")
    .replace(/\\emph\{([^}]*)\}/g, "$1")
    .replace(/\\underline\{([^}]*)\}/g, "$1")
    .replace(/\\href\{([^}]*)\}\{([^}]*)\}/g, "$2 ($1)")
    .replace(/\\&/g, "&")
    .replace(/\\%/g, "%")
    .replace(/\$\\%\$/g, "%")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Split a {...} argument list from a macro invocation into raw braces. */
function splitBraces(str) {
  const out = [];
  let depth = 0;
  let cur = "";
  for (const ch of str) {
    if (ch === "{") {
      depth++;
      if (depth === 1) {
        cur = "";
        continue;
      }
    }
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        out.push(cur);
        cur = "";
        continue;
      }
    }
    if (depth >= 1) cur += ch;
  }
  return out;
}

function extractItems(block) {
  const items = [];
  const re = /\\resumeItem\{([\s\S]*?)\}\s*(?=\\resumeItem|\\resumeItemListEnd)/g;
  let m;
  while ((m = re.exec(block))) items.push(clean(m[1]));
  return items;
}

function parse(tex) {
  const result = { education: [], experience: [], achievements: [], projects: [], skills: [] };

  // Education & Experience: \resumeSubheading {org}{loc}{role/dates}{dates}
  const subRe = /\\resumeSubheading\s*\{([\s\S]*?)\}\s*\{([\s\S]*?)\}\s*\{([\s\S]*?)\}\s*\{([\s\S]*?)\}([\s\S]*?)(?=\\resumeSubheading|\\resumeSubHeadingListEnd)/g;
  let sm;
  const context = { section: "" };
  const lines = tex.split("\n");
  let currentSection = "";
  // Track section by scanning; simpler: run subRe within each \section block.
  const sectionRe = /\\section\{([^}]*)\}([\s\S]*?)(?=\\section|\\end\{document\})/g;
  let sec;
  while ((sec = sectionRe.exec(tex))) {
    const name = sec[1].trim();
    const body = sec[2];
    if (name === "Education" || name === "Experience") {
      const r = new RegExp(subRe.source, "g");
      while ((sm = r.exec(body))) {
        const [, a, b, c, d, rest] = sm;
        const entry = {
          place: clean(a),
          placeMeta: clean(b),
          line3: clean(c),
          line4: clean(d),
          items: extractItems(rest),
        };
        (name === "Education" ? result.education : result.experience).push(entry);
      }
    }
    if (name === "Competitive Achievements" || name === "Projects" || name === "Leadership & Certifications") {
      const projRe = /\\resumeProjectHeading\s*\{([\s\S]*?)\}\s*\{([\s\S]*?)\}([\s\S]*?)(?=\\resumeProjectHeading|\\resumeSubHeadingListEnd)/g;
      let pm;
      while ((pm = projRe.exec(body))) {
        const heading = clean(pm[1]);
        const right = clean(pm[2]);
        const items = extractItems(pm[3]);
        result[/Achievements/.test(name) ? "achievements" : /Projects/.test(name) ? "projects" : "projects"].push({
          heading,
          meta: right,
          items,
        });
      }
    }
    if (name === "Technical Skills") {
      const skillRe = /\\textbf\{([^}]*)\}\{?:?\s*([^\\]*)/g;
      let km;
      const cleaned = body.replace(/\s+/g, " ");
      const parts = cleaned.split("\\\\").map((p) => clean(p)).filter(Boolean);
      result.skills = parts;
    }
  }
  void context;
  void lines;
  void currentSection;
  return result;
}

const texFiles = readdirSync(cvDir).filter((f) => f.endsWith(".tex"));
if (texFiles.length === 0) {
  console.error("No .tex files found in cv/");
  process.exit(1);
}

const all = {};
for (const f of texFiles) {
  const tex = readFileSync(join(cvDir, f), "utf8");
  all[f] = parse(tex);
}

const outPath = join(cvDir, "extracted.json");
writeFileSync(outPath, JSON.stringify(all, null, 2) + "\n");
console.log(`Extracted ${texFiles.join(", ")} → cv/extracted.json`);
console.log("Reconcile the values into src/content/{experience,education,projects,credentials}.ts");
