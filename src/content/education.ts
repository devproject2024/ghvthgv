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
    start: "2022",
    end: "May 2028",
    endNote: "Expected",
    location: "Chennai, India",
    credentials: [{ title: "Official Diploma in Programming & Data Science", year: "2025" }],
    // logo: { name: "IIT Madras", src: "/images/logos/education/iit-madras.png" },
  },
  {
    institution: "Jai Narayan Vyas University",
    degree: "BSc",
    field: "Biology",
    start: "2020",
    end: "2023",
    location: "Jodhpur, India",
    // logo: { name: "Jai Narayan Vyas University", src: "/images/logos/education/jnvu.png" },
  },
];

/**
 * Achievements are rendered as evidence — number-led, factual.
 * `figure` is the large number; `prefix` and `suffix` sit around it.
 */
export const achievements: Achievement[] = [
  {
    prefix: "Rank",
    figure: "1",
    suffix: "/ 1,900+",
    label: "Kaggle machine-learning competition",
    detail: "Top 1%",
    description: "Built predictive models that finished first among 1,900+ global competitors.",
    date: "Jan 2026",
  },
  {
    prefix: "Rank",
    figure: "28",
    suffix: "/ 2,500+",
    label: "Kaggle ML capstone",
    detail: "Top 1%",
    description: "Developed machine-learning architectures that placed 28th of 2,500+ participants.",
    date: "Sept 2025",
  },
  {
    prefix: "Rank",
    figure: "31",
    suffix: "/ 3,800+",
    label: "Modern App Development project",
    detail: "Top 2%",
    description: "Designed a scalable software application that ranked 31st among 3,800+ entries.",
    date: "May 2025",
  },
];
