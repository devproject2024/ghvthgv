import { useEffect } from "react";
import { profile, settings } from "@/content";

interface MetaProps {
  /** Page title (without the site name suffix). Omit for the home title. */
  title?: string;
  description?: string;
  /** Path for the canonical/OG URL, e.g. "/work". Omit for home. */
  path?: string;
}

/**
 * Per-page SEO: sets <title>, meta description, canonical and Open Graph
 * tags in place. Tags that don't exist yet are created once.
 */
export function Meta({ title, description, path = "" }: MetaProps) {
  useEffect(() => {
    const siteName = profile.name;
    const fullTitle = title ? `${title} — ${siteName}` : `${siteName} — Technology, data and business`;
    const desc =
      description ??
      "Daiwik Rankawat builds software and machine-learning systems and works across investing, trading and business. Studying Data Science at IIT Madras.";
    const url = `${settings.siteUrl}${path}`;

    document.title = fullTitle;

    setTag("meta[name='description']", "name", "description", desc);
    setTag("meta[property='og:title']", "property", "og:title", fullTitle);
    setTag("meta[property='og:description']", "property", "og:description", desc);
    setTag("meta[property='og:url']", "property", "og:url", url);
    setTag("meta[name='twitter:title']", "name", "twitter:title", fullTitle);
    setTag("meta[name='twitter:description']", "name", "twitter:description", desc);

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path]);

  return null;
}

function setTag(selector: string, attr: string, attrVal: string, content: string) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
