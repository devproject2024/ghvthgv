import { Link } from "react-router-dom";
import { profile, socialLinks } from "@/content";
import { Container } from "./primitives";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <p className="text-[15px] font-medium tracking-[-0.02em] text-ink">{profile.name}</p>
            <p className="mt-2 max-w-[34ch] text-[14px] leading-relaxed text-ink-3">{profile.tagline}</p>
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-7">
            <p className="text-label mb-4 text-ink-3">Site</p>
            <ul className="space-y-2.5">
              {[
                { label: "Work", to: "/work" },
                { label: "Markets", to: "/markets" },
                { label: "Ventures", to: "/ventures" },
                { label: "About", to: "/about" },
                { label: "Experience", to: "/experience" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-line text-[14px] text-ink-2 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="text-label mb-4 text-ink-3">Elsewhere</p>
            <ul className="space-y-2.5">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-line text-[14px] text-ink-2 hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`} className="link-line text-[14px] text-ink-2 hover:text-ink">
                  Email
                </a>
              </li>
              <li>
                <a
                  href={profile.resume.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-line text-[14px] text-ink-2 hover:text-ink"
                >
                  {profile.resume.label}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-mono-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          {profile.location && <p>{profile.location}</p>}
        </div>
      </Container>
    </footer>
  );
}
