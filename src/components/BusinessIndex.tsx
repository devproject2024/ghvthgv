import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Business } from "@/content/types";
import { businessNumber } from "@/content";
import { DOMAINS } from "@/content/domains";
import { cn } from "@/utils/cn";
import { Figure } from "./Figure";
import { Reveal } from "./Reveal";

interface BusinessIndexProps {
  businesses: Business[];
  preview?: boolean;
  className?: string;
}

/**
 * Venture / business index. Echoes the project index: numbered rows that
 * swap a sticky preview on the right (desktop) with a cursor-following
 * label; inline thumbnails on touch.
 */
export function BusinessIndex({ businesses, preview = true, className }: BusinessIndexProps) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const cursor = useCursorLabel("View venture");

  if (!businesses.length) return null;
  const current = businesses[active] ?? businesses[0];
  const domain = current.domain ?? "ventures";

  return (
    <div className={cn("grid grid-cols-12 gap-x-6", className)}>
      <div
        className={cn("col-span-12", preview && "lg:col-span-7")}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => {
          setHovering(false);
          cursor.hide();
        }}
        onPointerMove={cursor.move}
      >
        <ol className="border-t border-line">
          {businesses.map((b, i) => {
            const isActive = i === active;
            return (
              <li key={b.slug} className="border-b border-line">
                <Link
                  to={`/ventures/${b.slug}`}
                  onPointerEnter={() => {
                    setActive(i);
                    cursor.show();
                  }}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "group block py-6 transition-opacity duration-500 sm:py-7 lg:py-8",
                    hovering && !isActive ? "opacity-40" : "opacity-100"
                  )}
                >
                  {preview && (
                    <div className="mb-5 lg:hidden">
                      <Figure
                        media={b.cover ?? b.logo}
                        aspect="16/10"
                        placeholderLabel={b.name}
                        placeholderNote="Photograph to be added"
                        reveal={false}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-12 items-baseline gap-x-4">
                    <span className="text-label tabular col-span-2 text-ink-3 sm:col-span-1">
                      {businessNumber(b.slug)}
                    </span>
                    <h3
                      className={cn(
                        "text-h3 col-span-10 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] sm:col-span-7",
                        isActive && hovering && "lg:translate-x-2"
                      )}
                    >
                      {b.name}
                    </h3>
                    <div className="col-span-10 col-start-3 mt-2 flex items-center gap-3 sm:col-span-4 sm:col-start-9 sm:mt-0 sm:justify-end">
                      <span className="text-label text-ink-3">{b.category}</span>
                      <span className="text-label text-ink-3 tabular">{b.year}</span>
                    </div>
                    <p className="col-span-10 col-start-3 mt-3 max-w-[60ch] text-[15px] leading-relaxed text-ink-2 sm:col-span-9 sm:col-start-2">
                      {b.summary}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      {preview && (
        <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
          <div className="sticky top-28">
            <Reveal>
              <div className="relative overflow-hidden bg-paper-2" style={{ aspectRatio: "4/3" }}>
                {businesses.map((b, i) => (
                  <div
                    key={b.slug}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease-out-expo)]",
                      i === active ? "z-10 opacity-100 scale-100" : "z-0 opacity-0 scale-[1.02]"
                    )}
                    aria-hidden={i !== active}
                  >
                    <Figure
                      media={b.cover ?? b.logo}
                      aspect="4/3"
                      placeholderLabel={b.name}
                      placeholderNote="Photograph to be added"
                      reveal={false}
                      className="h-full"
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="mt-5 grid grid-cols-5 gap-x-4 border-t border-line pt-4">
              <div className="col-span-1 text-label text-ink-3">Role</div>
              <div className="col-span-4 text-[14px] text-ink-2">{current.role}</div>
              <div className="col-span-1 mt-2 text-label text-ink-3">Status</div>
              <div className="col-span-4 mt-2 flex items-center gap-2 text-[14px] text-ink-2">
                <span className={cn("inline-block h-1.5 w-1.5 rounded-full", DOMAINS[domain].dot)} />
                {current.status}
              </div>
              {current.location && (
                <>
                  <div className="col-span-1 mt-2 text-label text-ink-3">Based</div>
                  <div className="col-span-4 mt-2 text-[14px] text-ink-2">{current.location}</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {cursor.element}
    </div>
  );
}

/* Cursor label — fine pointer + motion allowed only, never blocks clicks. */
function useCursorLabel(label: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const frame = useRef<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mq.matches && !reduce.matches);
    update();
    mq.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  const move = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled) return;
      pos.current = { x: e.clientX, y: e.clientY };
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        if (ref.current) {
          ref.current.style.transform = `translate3d(${pos.current.x + 16}px, ${pos.current.y + 16}px, 0)`;
        }
      });
    },
    [enabled]
  );

  const show = useCallback(() => enabled && setVisible(true), [enabled]);
  const hide = useCallback(() => setVisible(false), []);

  const element = enabled ? (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[60] flex h-8 items-center bg-ink px-3 text-label text-paper transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      {label}
      <span className="ml-2">→</span>
    </div>
  ) : null;

  return { move, show, hide, element };
}
