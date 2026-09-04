import type { SocialLink } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  EDIT YOUR SOCIAL LINKS HERE                                     ║
 * ║  Used in the navigation footer, contact page and About page.     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/", handle: "github.com/…" }, // ← replace
  { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "linkedin.com/in/…" }, // ← replace
  // { label: "X", href: "https://x.com/…", handle: "@…" },
  // { label: "Kaggle", href: "https://www.kaggle.com/…", handle: "kaggle.com/…" },
];

/**
 * Primary navigation. Reorder or rename freely.
 * `to` must match a route in src/App.tsx.
 */
export const navigation = [
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Experience", to: "/experience" },
  { label: "Contact", to: "/contact" },
];
