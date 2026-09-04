import type { Media } from "@/content/types";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

interface FigureProps {
  media?: Media;
  /** Fallback aspect ratio if the media doesn't specify one. */
  aspect?: string;
  /** Label shown in the placeholder (e.g. project title). */
  placeholderLabel?: string;
  placeholderNote?: string;
  className?: string;
  /** Slow zoom on hover. */
  hover?: boolean;
  /** Animate in with a clip reveal. */
  reveal?: boolean;
  dark?: boolean;
  /** Show the caption below the figure. */
  showCaption?: boolean;
  priority?: boolean;
  /** Render a transparent cutout without a background surface. */
  cutout?: boolean;
}

/**
 * The single place images and videos are rendered.
 * - Reserves space with aspect-ratio so nothing jumps.
 * - Crops with object-fit: cover.
 * - Renders a quiet, honest placeholder when no media is provided yet.
 */
export function Figure({
  media,
  aspect = "16/10",
  placeholderLabel,
  placeholderNote = "Image to be added",
  className,
  hover,
  reveal = true,
  dark,
  showCaption,
  priority,
  cutout,
}: FigureProps) {
  const ratio = media?.aspect ?? aspect;

  const body = (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        hover && "img-hover",
        !media && (dark ? "placeholder-surface-dark" : "placeholder-surface"),
        media && !cutout && (dark ? "bg-carbon-2" : "bg-paper-2")
      )}
      style={{ aspectRatio: ratio }}
    >
      {media ? (
        media.type === "video" ? (
          <video
            src={media.src}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-label={media.alt}
          />
        ) : (
          <img
            src={media.src}
            alt={media.alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={cn("absolute inset-0 h-full w-full", cutout ? "object-contain" : "object-cover")}
          />
        )
      ) : (
        <Placeholder label={placeholderLabel} note={placeholderNote} dark={dark} />
      )}
    </div>
  );

  const caption = showCaption && media?.caption && (
    <figcaption className={cn("text-mono-sm mt-3", dark ? "text-chalk-2" : "text-ink-3")}>{media.caption}</figcaption>
  );

  if (!reveal) {
    return (
      <figure className={className}>
        {body}
        {caption}
      </figure>
    );
  }

  return (
    <figure className={className}>
      <Reveal variant="clip">{body}</Reveal>
      {caption}
    </figure>
  );
}

function Placeholder({ label, note, dark }: { label?: string; note: string; dark?: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col justify-between p-4 sm:p-5",
        dark ? "text-chalk-2" : "text-ink-3"
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between">
        <span className={cn("text-label", dark ? "bg-carbon-2" : "bg-paper-2")}>{note}</span>
        <span className={cn("block h-1.5 w-1.5", dark ? "bg-chalk-2" : "bg-ink-3")} />
      </div>
      {label && (
        <span className={cn("text-label max-w-[70%] truncate", dark ? "bg-carbon-2" : "bg-paper-2")}>{label}</span>
      )}
    </div>
  );
}

/**
 * Editorial gallery: full-width and half-width images, in order.
 * Consecutive "half" items pair up in a two-column grid.
 */
export function Gallery({ items, dark, className }: { items: Media[]; dark?: boolean; className?: string }) {
  if (!items.length) return null;
  return (
    <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8", className)}>
      {items.map((m, i) => (
        <Figure
          key={m.src + i}
          media={m}
          aspect={m.span === "half" ? "4/3" : "16/9"}
          dark={dark}
          showCaption
          className={cn(m.span === "half" ? "md:col-span-1" : "md:col-span-2")}
        />
      ))}
    </div>
  );
}
