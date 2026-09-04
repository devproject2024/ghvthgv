import type { Experience } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  EDIT YOUR WORK EXPERIENCE HERE                                  ║
 * ║  Most recent first. Add a new object to add a role.              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
export const experience: Experience[] = [
  {
    organisation: "Evoastra Ventures Pvt Ltd",
    role: "AI & ML Researcher",
    type: "Internship",
    start: "Jan 2026",
    end: "Mar 2026",
    summary: [
      // Describe what you researched and built. Keep it concrete.
      "Applied machine-learning research and experimentation as part of the AI & ML team.",
    ],
    technologies: ["Python", "Machine Learning", "LLMs"],
  },
  {
    organisation: "Higher Education Institution",
    role: "Product Analyst",
    type: "Internship",
    start: "May 2024",
    end: "Sept 2025",
    summary: [
      // Describe the analytics work, data sources, and decisions you informed.
      "Product analytics — working with usage data to understand behaviour and inform product decisions.",
    ],
    technologies: ["SQL", "Python", "Data Analysis"],
  },
];
