import type { Outlet } from "@/content/types";
import { Figure } from "./Figure";
import { Eyebrow } from "./primitives";
import { Reveal } from "./Reveal";

/**
 * Locations / outlets for a multi-location venture (e.g. a restaurant chain).
 * Grouped by country → city, editorial rather than map-heavy. Hidden entirely
 * when no outlets are provided.
 */
export function Outlets({ outlets }: { outlets: Outlet[] }) {
  if (!outlets || outlets.length === 0) return null;

  // Group country → outlets (preserving insertion order).
  const byCountry = new Map<string, Outlet[]>();
  for (const o of outlets) {
    const list = byCountry.get(o.country) ?? [];
    list.push(o);
    byCountry.set(o.country, list);
  }

  return (
    <section className="pb-20 lg:pb-32">
      <div className="border-t border-line pt-14 lg:pt-20">
        <Eyebrow className="mb-10">Locations · {outlets.length}</Eyebrow>

        <div className="space-y-16 lg:space-y-24">
          {[...byCountry.entries()].map(([country, list], ci) => (
            <Reveal key={country} delay={ci * 60}>
              <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                <div className="col-span-12 lg:col-span-3">
                  <p className="text-label text-ink-3">{String(ci + 1).padStart(2, "0")}</p>
                  <h3 className="text-h2 mt-2 text-ink">{country}</h3>
                </div>
                <ol className="col-span-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-9">
                  {list.map((o) => (
                    <li key={o.name + o.city} className="border-t border-line pt-5">
                      {o.image && (
                        <Figure media={o.image} aspect="4/3" placeholderLabel={o.name} reveal={false} className="mb-5" />
                      )}
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-mono-sm tabular text-ink-3">
                          {country} · {o.city}
                        </p>
                        {o.status && (
                          <span className="text-label text-ink-3">
                            {o.status === "Open" ? "Open" : o.status}
                            {o.openingDate && o.status !== "Open" ? ` ${o.openingDate}` : ""}
                          </span>
                        )}
                      </div>
                      <h4 className="text-h3 mt-2 text-ink">{o.name}</h4>
                      {o.address && <p className="mt-1.5 text-[14px] text-ink-2">{o.address}</p>}
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                        {o.mapsUrl && (
                          <a
                            href={o.mapsUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="link-line inline-flex items-center gap-1 text-[13px] font-medium text-ink"
                          >
                            Map <span aria-hidden>↗</span>
                          </a>
                        )}
                        {o.website && (
                          <a
                            href={o.website}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="link-line inline-flex items-center gap-1 text-[13px] font-medium text-ink"
                          >
                            Website <span aria-hidden>↗</span>
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

