import type { Experience } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  EDIT YOUR WORK EXPERIENCE HERE                                  ║
 * ║  Most recent first. Add a new object to add a role.              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * NOTE: The second organisation is named on the CV only as a "Higher
 * Education Institution". That name is kept as-is deliberately — replace
 * it if/when it can be shown.
 */
export const experience: Experience[] = [
  {
    organisation: "Evoastra Ventures Pvt Ltd",
    role: "AI & ML Researcher (Intern)",
    type: "Internship",
    start: "Jan 2026",
    end: "Mar 2026",
    location: "Remote",
    summary: [
      "Selected from 50+ applicants for a research-driven internship, building intelligent business systems using generative AI and machine learning across three live use-cases.",
      "Contributed across software development, data engineering and applied ML workflows within a five-member cross-functional team, improving delivery turnaround by 20%.",
    ],
    technologies: ["Python", "Machine Learning", "Generative AI", "LLMs", "Data Engineering"],
  },
  {
    organisation: "Higher Education Institution",
    role: "Product Analyst (Intern)",
    type: "Internship",
    start: "May 2024",
    end: "Sept 2025",
    location: "Jodhpur, India",
    summary: [
      "Analysed data from 1,500+ students to uncover usage patterns and engagement trends.",
      "Identified a $10 million revenue gap tied to student-dropout trends across core services.",
      "Formulated a three-stage planning framework adopted by leadership to improve retention for FY 2024–25.",
      "Partnered with cross-functional teams to clean and validate data, refine analytics models and align outcomes with company goals.",
    ],
    technologies: ["SQL", "Python", "Data Analysis", "Product Analytics"],
  },
];
