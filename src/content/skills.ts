import type { SkillGroup } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  EDIT YOUR SKILLS HERE                                           ║
 * ║  Framed as "what I build", each with its supporting technologies.║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Machine-learning systems",
    description:
      "Forecasting, feature engineering and model evaluation — with an emphasis on honest validation and models that hold up outside the notebook.",
    technologies: ["Python", "Machine Learning", "Time-Series Analysis", "Feature Engineering", "LLMs"],
  },
  {
    title: "Full-stack products",
    description:
      "APIs, background workers and interfaces, built end to end and deployed as coherent systems rather than disconnected pieces.",
    technologies: ["Flask", "FastAPI", "Vue.js", "Node.js", "Express.js", "Celery", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Data & infrastructure",
    description:
      "Schemas, queries and pipelines that make the rest possible — relational and document stores, caching, containers and version control.",
    technologies: ["SQL", "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "DBMS", "Docker", "Git", "GitHub", "Bash"],
  },
];

/** Flat list used where a compact set of tools is needed. Derived automatically. */
export const allTechnologies = Array.from(new Set(skillGroups.flatMap((g) => g.technologies)));
