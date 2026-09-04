// Generates a clean, valid resume PDF at public/resume/resume.pdf so the
// Resume button always opens a real, working PDF. Replace it with your own
// rendered PDF (e.g. from cv/*.tex) at the same path — no code changes needed.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "public", "resume", "resume.pdf");
mkdirSync(dirname(out), { recursive: true });

const esc = (s) =>
  String(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN_X = 60;
const TOP = PAGE_H - 60;
const BOTTOM = 60;
const REG = 10.2;
const LINE = 15.5;

// [text, size, bold]
const blocks = [
  ["Daiwik Rankawat", 23, true],
  ["daiwikrankawat21062003@gmail.com   |   linkedin.com/in/daiwikrankawat   |   github.com/daiwik-project", 9, false],
  ["", 6, false],
  ["EDUCATION", 12.5, true],
  ["Indian Institute of Technology Madras — BS, Data Science & Applications (2022 – expected May 2028)", REG, true],
  ["Credential: Official Diploma in Programming & Data Science, completed 2025.", 9.6, false],
  ["Jai Narayan Vyas University — BSc in Biology (2020 – 2023).", 9.6, false],
  ["", 6, false],
  ["EXPERIENCE", 12.5, true],
  ["Evoastra Ventures Pvt Ltd — AI & ML Researcher, Intern  ·  Jan 2026 – Mar 2026  ·  Remote", REG, true],
  ["Selected from 50+ applicants; built intelligent business systems with generative AI and ML across three live use-cases.", 9.6, false],
  ["Contributed across software, data engineering and applied ML in a five-member team; improved delivery turnaround by 20%.", 9.6, false],
  ["Higher Education Institution — Product Analyst, Intern  ·  May 2024 – Sept 2025  ·  Jodhpur", REG, true],
  ["Analysed data for 1,500+ students; identified a $10M revenue gap tied to dropout trends across core services.", 9.6, false],
  ["Built a three-stage retention planning framework adopted by leadership for FY 2024-25.", 9.6, false],
  ["", 6, false],
  ["PROJECTS", 12.5, true],
  ["Full-Stack Examination Platform — Flask, Vue.js, Redis, Celery", REG, true],
  ["50+ REST APIs; Redis caching reduced database load 40% with sub-200ms responses; OTP + OAuth 2.0 over 50+ endpoints.", 9.6, false],
  ["Cinema Audience Forecasting Model — Python, Pandas, LightGBM, XGBoost", REG, true],
  ["Forecast attendance from 300,000+ rows; engineered 25+ features (rolling windows, lags); reached MAE 14.8 with time-aware validation.", 9.6, false],
  ["", 6, false],
  ["COMPETITIVE ACHIEVEMENTS", 12.5, true],
  ["Rank 1 / 1,900+ (Top 1%) — Kaggle ML Competition, Jan 2026.", 9.6, false],
  ["Rank 28 / 2,500+ (Top 1%) — Kaggle ML Capstone, Sept 2025.", 9.6, false],
  ["Rank 31 / 3,800+ (Top 2%) — Modern App Development Project, May 2025.", 9.6, false],
  ["", 6, false],
  ["LEADERSHIP & SKILLS", 12.5, true],
  ["Team Founder & Project Manager, Software Engineering, IIT Madras (2026) — one of twelve leaders from 500+ peers.", 9.6, false],
  ["Technical Executive, Codemet hackathon, Antrium (2023).", 9.6, false],
  ["Python, SQL, Flask, FastAPI, Vue.js, Node.js, Express, Celery, PostgreSQL, MySQL, MongoDB, Redis, Docker, Git; ML, time-series, LLM systems.", 9.6, false],
];

// Lay text into pages using absolute positioning.
const pageOps = [];
let ops = [];
let y = TOP;
for (const [text, size, bold] of blocks) {
  const step = size >= 12 ? size + 9 : LINE;
  if (y - step < BOTTOM) {
    pageOps.push(ops);
    ops = [];
    y = TOP;
  }
  if (text) ops.push(`BT /${bold ? "F2" : "F1"} ${size} Tf 1 0 0 1 ${MARGIN_X} ${y.toFixed(1)} Tm (${esc(text)}) Tj ET`);
  y -= step;
}
pageOps.push(ops);

// Build object table explicitly.
// 1: Catalog, 2: Pages, then for each page: a Page object + a Contents object,
// then Font F1 (Helvetica), Font F2 (Helvetica-Bold).
const N = pageOps.length;
const FONT_OBJ = 2 + N * 2 + 1; // F1
const FONT_OBJ2 = FONT_OBJ + 1; // F2

const pageObjNum = (i) => 3 + i * 2; // 3,5,7...
const contentsObjNum = (i) => 4 + i * 2; // 4,6,8...

const objs = new Array(2 + N * 2 + 2);
objs[0] = "<< /Type /Catalog /Pages 2 0 R >>";
objs[1] = `<< /Type /Pages /Kids [${Array.from({ length: N }, (_, i) => `${pageObjNum(i)} 0 R`).join(" ")}] /Count ${N} >>`;
pageOps.forEach((stream, i) => {
  objs[pageObjNum(i) - 1] =
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
    `/Resources << /Font << /F1 ${FONT_OBJ} 0 R /F2 ${FONT_OBJ2} 0 R >> >> ` +
    `/Contents ${contentsObjNum(i)} 0 R >>`;
  objs[contentsObjNum(i) - 1] =
    `<< /Length ${Buffer.byteLength(stream.join("\n"), "utf8")} >>\nstream\n${stream.join("\n")}\nendstream`;
});
objs[FONT_OBJ - 1] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
objs[FONT_OBJ2 - 1] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

let pdf = "%PDF-1.4\n";
const offsets = [];
objs.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf, "utf8"));
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = Buffer.byteLength(pdf, "utf8");
pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

writeFileSync(out, pdf, "utf8");
console.log(`Wrote ${out} (${N} page(s), ${Buffer.byteLength(pdf, "utf8")} bytes)`);

