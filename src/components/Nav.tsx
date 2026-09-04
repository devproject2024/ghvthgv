import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigation, profile, socialLinks } from "@/content";
import { cn } from "@/utils/cn";
import { Container } from "./primitives";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and lock scroll while it is open.
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
          scrolled || open ? "border-b border-line bg-paper" : "border-b border-transparent bg-transparent"
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between lg:h-[72px]" aria-label="Primary">
            <Link
              to="/"
              className="text-[15px] font-medium tracking-[-0.02em] text-ink"
              aria-label={`${profile.name} — home`}
            >
              {profile.shortName}
              <span className="font-normal text-ink-3"> {profile.name.replace(profile.shortName, "").trim()}</span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-8 md:flex">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "link-line text-[14px] tracking-[-0.01em] transition-colors",
                        isActive ? "is-active text-ink" : "text-ink-2 hover:text-ink"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <a
                href={profile.resume.href}
                target="_blank"
                rel="noreferrer noopener"
                className="hidden h-9 items-center border border-line-2 px-3.5 text-[13px] font-medium tracking-[-0.01em] text-ink transition-colors hover:border-ink md:inline-flex rounded-[2px]"
              >
                {profile.resume.label}
                <span className="ml-1.5 text-ink-3" aria-hidden>
                  ↗
                </span>
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="text-[14px] font-medium tracking-[-0.01em] text-ink md:hidden"
              >
                {open ? "Close" : "Menu"}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 bg-paper pt-16 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <Container className="flex h-full flex-col justify-between pb-8 pt-10">
          <ul className="space-y-1">
            {navigation.map((item, i) => (
              <li
                key={item.to}
                className={cn(
                  "border-b border-line transition-[opacity,transform] duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                )}
                style={{ transitionDelay: open ? `${60 + i * 50}ms` : "0ms" }}
              >
                <NavLink
                  to={item.to}
                  tabIndex={open ? 0 : -1}
                  className={({ isActive }) =>
                    cn(
                      "flex items-baseline justify-between py-5 text-[2rem] font-medium tracking-[-0.03em]",
                      isActive ? "text-ink" : "text-ink-2"
                    )
                  }
                >
                  {item.label}
                  <span className="text-label text-ink-3 tabular">0{i + 1}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="space-y-6">
            <a
              href={profile.resume.href}
              target="_blank"
              rel="noreferrer noopener"
              tabIndex={open ? 0 : -1}
              className="inline-flex h-11 items-center bg-ink px-5 text-[14px] font-medium text-paper rounded-[2px]"
            >
              {profile.resume.label} ↗
            </a>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    tabIndex={open ? 0 : -1}
                    className="text-[14px] text-ink-2"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1} className="text-[14px] text-ink-2">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </>
  );
}
