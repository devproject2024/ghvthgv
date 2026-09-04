import type { Profile } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  EDIT YOUR PERSONAL INFORMATION HERE                             ║
 * ║  Name, headline, bio, photos, résumé, email, current focus.      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * PHOTOS
 * ------
 * Drop your photographs into /public/images/ and add them to `photos`.
 *   { src: "/images/daiwik-01.jpg", alt: "Daiwik Rankawat", aspect: "4/5", placement: "hero" }
 *   { src: "/images/daiwik-02.jpg", alt: "…", aspect: "3/2", placement: "about" }
 *   { src: "/images/daiwik-cutout.png", alt: "…", cutout: true }
 * The first photo with placement "hero" is used on the home page; photos with
 * placement "about" (or "any") are used on the About page. Empty array = placeholders.
 *
 * RÉSUMÉ
 * ------
 * Put the PDF in /public and point `resume.href` at it, or use an external URL.
 */
export const profile: Profile = {
  name: "Daiwik Rankawat",
  firstName: "Daiwik",
  shortName: "Daiwik",

  headline: "Technology, data, business —\nand the things I'm building around them.",
  subheadline:
    "I build software and machine-learning systems, and I work across investing, trading and a family restaurant business. Currently studying Data Science at IIT Madras.",

  tagline: "Software, machine learning, investing — and the things being built around them.",

  location: "India",
  email: "hello@daiwikrankawat.com", // ← replace with your real email

  currently: [
    { label: "Studying", value: "BS Data Science & Applications, IIT Madras" },
    { label: "Building", value: "Software products and ML systems" },
    { label: "Operating", value: "Investing, trading and a restaurant business" },
  ],

  aboutIntro:
    "I'm a student, a builder and an operator. Most of my time goes into software, data and machine learning — the rest goes into markets, businesses and understanding how things actually work.",

  bio: [
    "I'm currently studying Data Science and Applications at the Indian Institute of Technology Madras, after a first degree in Biology. That route — from the life sciences to programming and statistics — shapes how I approach problems: start with the system, understand the data, then build.",
    "On the technology side I've worked as an AI & ML researcher and as a product analyst, and I've shipped full-stack products end to end — from data pipelines and models to the interfaces people actually use.",
    "Outside of software I trade and invest, I'm involved in venture investing, and I help run a restaurant business. These aren't side hobbies; they're where I learn how decisions, capital and operations behave in the real world, and that feeds back into what I build.",
  ],

  facts: [
    { label: "Based in", value: "India" },
    { label: "Studying", value: "IIT Madras, BS Data Science" },
    { label: "Background", value: "Biology → Data → Software" },
    { label: "Working on", value: "ML systems, products, ventures" },
  ],

  interests: [
    "Machine learning and LLM systems",
    "Time-series and forecasting",
    "Markets and capital allocation",
    "Early-stage companies",
    "Operating physical businesses",
    "Product analytics",
  ],

  photos: [
    // Add your photographs here. Examples:
    // { src: "/images/daiwik-portrait.jpg", alt: "Daiwik Rankawat", aspect: "4/5", placement: "hero" },
    // { src: "/images/daiwik-working.jpg", alt: "Daiwik at his desk", aspect: "3/2", placement: "about" },
  ],

  resume: {
    href: "/Daiwik-Rankawat-Resume.pdf", // ← place the PDF in /public or use a URL
    label: "Résumé",
    note: "PDF · updated 2026",
  },

  availability: "Open to conversations about roles, collaborations and interesting problems.",
  contactStatement:
    "If you're building something serious — a product, a company, a research problem — I'd like to hear about it.",
};
