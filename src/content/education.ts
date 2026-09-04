import type { Achievement, Education } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  EDIT YOUR EDUCATION AND ACHIEVEMENTS HERE                       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
export const education: Education[] = [
  {
    institution: "Indian Institute of Technology Madras",
    degree: "BS",
    field: "Data Science and Applications",
    start: "2023",
    end: "May 2028",
    endNote: "Expected",
    credentials: [{ title: "Official Diploma in Programming & Data Science", year: "2025" }],
  },
  {
    institution: "Jai Narayan Vyas University",
    degree: "BSc",
    field: "Biology",
    start: "2020",
    end: "2023",
  },
];

/**
 * Achievements are rendered as a number-led editorial grid.
 * `figure` is the large number; `prefix` and `suffix` sit around it.
 */
export const achievements: Achievement[] = [
  {
    prefix: "Rank",
    figure: "1",
    suffix: "/ 1,900+",
    label: "Kaggle competition",
    detail: "Top 1%",
  },
  {
    prefix: "Rank",
    figure: "28",
    suffix: "/ 2,500+",
    label: "Kaggle competition",
    detail: "Top 1%",
  },
  {
    prefix: "Rank",
    figure: "31",
    suffix: "/ 3,800+",
    label: "Modern App Development",
    detail: "Top 2%",
  },
];
