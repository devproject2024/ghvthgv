import type { Certification, LeadershipItem } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  LEADERSHIP & CERTIFICATIONS                                     ║
 * ║  Separate from work experience — roles held and credentials.     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

export const leadership: LeadershipItem[] = [
  {
    title: "Team Founder & Project Manager",
    organisation: "Software Engineering, IIT Madras",
    year: "2026",
    detail: "Selected as one of 12 project leaders among 500+ peers to manage a cross-functional development team.",
  },
  {
    title: "Technical Executive",
    organisation: "Codemet Event, Antrium",
    year: "2023",
    detail: "Directed technical setup and operational schedules for a campus-wide coding hackathon.",
  },
];

export const certifications: Certification[] = [
  {
    title: "Diploma & Advanced Certificate in Programming & Data Science",
    issuer: "IIT Madras",
    year: "2025",
  },
  {
    title: "Advanced SQL for Data Scientists",
    issuer: "HackerRank",
    year: "2025",
  },
  {
    title: "SQL — Basic, Intermediate & Advanced",
    issuer: "HackerRank",
    year: "2024/2025",
  },
];
