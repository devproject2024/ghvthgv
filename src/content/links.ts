import type { SocialLink } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  EDIT YOUR SOCIAL LINKS HERE                                     ║
 * ║  Used in the navigation, footer, contact and about pages.        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/daiwik-project",
    handle: "github.com/daiwik-project",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/daiwikrankawat",
    handle: "linkedin.com/in/daiwikrankawat",
  },
  // { label: "Kaggle", href: "https://www.kaggle.com/…", handle: "kaggle.com/…" },
  // { label: "X", href: "https://x.com/…", handle: "@…" },
];

/**
 * Primary navigation. Reorder or rename freely.
 * `to` must match a route in src/App.tsx.
 */
export const navigation = [
  { label: "Work", to: "/work" },
  { label: "Markets", to: "/markets" },
  { label: "Ventures", to: "/ventures" },
  { label: "About", to: "/about" },
  { label: "Experience", to: "/experience" },
  { label: "Contact", to: "/contact" },
];
