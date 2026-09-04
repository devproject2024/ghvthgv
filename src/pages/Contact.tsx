import { useState } from "react";
import { profile, socialLinks } from "@/content";
import { Meta } from "@/components/Meta";
import { SplitHeadline } from "@/components/SplitHeadline";
import { Container, Eyebrow } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <>
      <Meta title="Contact" path="/contact" description={`Contact Daiwik Rankawat — ${profile.email}`} />
      <section className="pt-12 lg:pt-24">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <Reveal className="col-span-12 lg:col-span-3">
              <Eyebrow>Contact</Eyebrow>
            </Reveal>
            <div className="col-span-12 lg:col-span-9">
              <SplitHeadline as="h1" text={profile.contactStatement} className="text-h1 max-w-[18ch] text-ink" />
              {profile.availability && (
                <Reveal delay={350}>
                  <p className="text-lead mt-6 max-w-[46ch] text-ink-2">{profile.availability}</p>
                </Reveal>
              )}
            </div>
          </div>

        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-14 pb-24 lg:mt-32 lg:pb-40">
          {/* Email */}
          <Reveal className="col-span-12 lg:col-span-9 lg:col-start-4">
            <Eyebrow className="mb-4">Email</Eyebrow>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <a
                href={`mailto:${profile.email}`}
                className="link-line break-all text-[clamp(1.5rem,3.6vw,3rem)] font-medium tracking-[-0.03em] text-ink"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copy}
                className="text-mono-sm text-ink-3 transition-colors hover:text-ink"
                aria-live="polite"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </Reveal>

          {/* Social */}
          <Reveal delay={80} className="col-span-12 lg:col-span-9 lg:col-start-4">
            <Eyebrow className="mb-4">Elsewhere</Eyebrow>
            <ul className="divide-y divide-line border-y border-line">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group grid grid-cols-12 items-baseline gap-x-6 py-5"
                  >
                    <span className="col-span-5 text-[1.125rem] font-medium tracking-[-0.015em] text-ink sm:col-span-3">
                      {s.label}
                    </span>
                    <span className="col-span-6 text-mono-sm text-ink-3 sm:col-span-8">{s.handle ?? s.href}</span>
                    <span className="arrow-shift col-span-1 text-right text-ink-3" aria-hidden>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resume.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group grid grid-cols-12 items-baseline gap-x-6 py-5"
                >
                  <span className="col-span-5 text-[1.125rem] font-medium tracking-[-0.015em] text-ink sm:col-span-3">
                    {profile.resume.label}
                  </span>
                  <span className="col-span-6 text-mono-sm text-ink-3 sm:col-span-8">{profile.resume.note ?? "PDF"}</span>
                  <span className="arrow-shift col-span-1 text-right text-ink-3" aria-hidden>
                    ↗
                  </span>
                </a>
              </li>
            </ul>
          </Reveal>

          {profile.location && (
            <Reveal delay={120} className="col-span-12 lg:col-span-9 lg:col-start-4">
              <p className="text-mono-sm text-ink-3">
                Based in {profile.location}. Comfortable working across time zones.
              </p>
            </Reveal>
          )}
        </div>
        </Container>
      </section>
    </>
  );
}
