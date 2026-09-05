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

  headline: "Building software and ML systems —\nand operating across markets and business.",
  subheadline:
    "I work at the intersection of technology, data and the businesses around them — engineering full-stack and machine-learning systems, and operating in investing, trading and a restaurant venture.",

  tagline: "Software, machine learning, markets — and the things being built around them.",

  location: "India",
  email: "daiwikrankawat21062003@gmail.com",

  currently: [
    { label: "Studying", value: "BS Data Science & Applications, IIT Madras" },
    { label: "Building", value: "Software products and applied ML systems" },
    { label: "Research", value: "AI & ML — intelligent business systems" },
    { label: "Operating", value: "Investing, trading and a restaurant venture" },
  ],

  aboutIntro:
    "I'm a builder who works across both sides of the table — engineering software and machine-learning systems, and operating in markets and businesses.",

  bio: [
    "I'm currently studying Data Science and Applications at the Indian Institute of Technology Madras, alongside a first degree in Biology from Jai Narayan Vyas University. That route — from the life sciences into programming, statistics and machine learning — shapes how I approach problems: understand the system, work from the data, then build.",
    "On the technology side, I've worked as an AI & ML researcher and as a product analyst, and I've shipped full-stack products end to end — from data pipelines and gradient-boosted models to the APIs and interfaces people actually use. Competitive data-science work has sharpened that: a Rank 1 finish out of 1,900+ in a Kaggle machine-learning competition, and two more top-percentile results.",
    "Outside of software I invest and trade, I'm involved in early-stage venture, and I help operate a restaurant business. These aren't side hobbies. They're where I learn how decisions, capital and operations behave in the real world — and that feeds back into the technology I build.",
  ],

  facts: [
    { label: "Based in", value: "India" },
    { label: "Studying", value: "IIT Madras, BS Data Science & Applications" },
    { label: "Also", value: "BSc Biology, Jai Narayan Vyas University" },
    { label: "Background", value: "Biology → Data → Software" },
    { label: "Working on", value: "ML systems, products, markets, ventures" },
  ],

  interests: [
    "Machine learning and LLM systems",
    "Time-series and forecasting",
    "Applied feature engineering",
    "Markets and capital allocation",
    "Early-stage companies and founders",
    "Operating physical businesses",
    "Product analytics",
  ],

  /*
   * PHOTOS — drop your files at these exact paths and they appear automatically:
   *   HOME portrait  → /public/images/profile/home-portrait.jpg   (aspect 4/5)
   *   ABOUT large    → /public/images/profile/about-portrait.jpg  (aspect 3/2)
   *   ABOUT secondary→ /public/images/profile/about-secondary.jpg (aspect 4/5)
   * Until the file exists, a tasteful placeholder renders (never a broken image).
   * JPG/PNG/WebP/AVIF all work — just update the `src` extension if you use one.
   */
    photos: [
    {
      src: "/images/profile/home-portrait.jpg",
      alt: "Daiwik Rankawat",
      aspect: "4/5",
      placement: "hero",
    },
    {
      src: "/images/profile/about-portrait.jpg",
      alt: "Portrait of Daiwik Rankawat",
      aspect: "3/2",
      placement: "about",
    },
    {
      src: "/images/profile/about-secondary.jpg",
      alt: "Daiwik Rankawat",
      aspect: "4/5",
      placement: "about",
    },
  ],


  resume: {
    href: "/resume/resume.pdf", // ← place the PDF in /public or use a URL
    label: "Résumé",
    note: "PDF · updated 2026",
  },

  availability: "Open to conversations about engineering, research, data and interesting problems.",
  contactStatement: "If you're building something serious — a product, a system, a company — I'd like to hear about it.",
};
