import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16", className)}>{children}</div>;
}

/** Thin editorial hairline. */
export function Rule({ className, dark }: { className?: string; dark?: boolean }) {
  return <hr className={cn("border-0 border-t", dark ? "border-carbon-line" : "border-line", className)} />;
}

/** Small mono uppercase label, e.g. "01 — Selected work" */
export function Eyebrow({
  children,
  className,
  dark,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return <p className={cn("text-label", dark ? "text-chalk-2" : "text-ink-3", className)}>{children}</p>;
}

/**
 * Standard section header: eyebrow on the left, title + optional lead on the right.
 * Used across pages to keep rhythm identical.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
  dark,
  className,
  action,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div className={cn("grid grid-cols-12 gap-x-6 gap-y-6", className)}>
      <div className="col-span-12 flex items-baseline gap-4 lg:col-span-3">
        {index && (
          <span className={cn("text-label tabular", dark ? "text-chalk-2" : "text-ink-3")}>{index}</span>
        )}
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      </div>
      <div className="col-span-12 lg:col-span-8 lg:col-start-4 xl:col-span-7">
        <h2 className={cn("text-h2 max-w-[18ch]", dark ? "text-chalk" : "text-ink")}>{title}</h2>
        {lead && (
          <p className={cn("text-lead mt-6 max-w-[52ch]", dark ? "text-chalk-2" : "text-ink-2")}>{lead}</p>
        )}
        {action && <div className="mt-8">{action}</div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Links                                                               */
/* ------------------------------------------------------------------ */

type ArrowLinkProps = {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
  /** "up-right" for external, "right" for internal navigation. */
  direction?: "up-right" | "right" | "down";
  size?: "sm" | "md" | "lg";
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/** Text link with a small arrow. Internal (`to`) or external (`href`). */
export function ArrowLink({
  to,
  href,
  children,
  className,
  dark,
  direction,
  size = "md",
  ...rest
}: ArrowLinkProps) {
  const dir = direction ?? (href ? "up-right" : "right");
  const arrow = dir === "up-right" ? "↗" : dir === "down" ? "↓" : "→";
  const classes = cn(
    "group inline-flex items-center gap-2 font-medium tracking-[-0.01em] transition-colors",
    size === "sm" && "text-sm",
    size === "md" && "text-[15px]",
    size === "lg" && "text-lg",
    dark ? "text-chalk hover:text-chalk-2" : "text-ink hover:text-ink-2",
    className
  );
  const inner = (
    <>
      <span className="link-line">{children}</span>
      <span className={cn("tabular", dir === "right" ? "arrow-shift-x" : "arrow-shift")} aria-hidden>
        {arrow}
      </span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={classes} {...rest}>
      {inner}
    </a>
  );
}

/** Solid button-style link — used for primary actions like Résumé and Email. */
export function Button({
  to,
  href,
  children,
  className,
  variant = "solid",
  dark,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: "solid" | "outline";
  dark?: boolean;
}) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center gap-2 px-5 text-[14px] font-medium tracking-[-0.01em] transition-colors duration-300 rounded-[2px]",
    variant === "solid" &&
      (dark ? "bg-chalk text-carbon hover:bg-white" : "bg-ink text-paper hover:bg-carbon-2"),
    variant === "outline" &&
      (dark
        ? "border border-carbon-line text-chalk hover:border-chalk-2"
        : "border border-line-2 text-ink hover:border-ink"),
    className
  );
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  const external = href?.startsWith("http");
  return (
    <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
      {children}
    </a>
  );
}

/** Small mono tag used for technologies. */
export function Tag({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "text-mono-sm inline-flex h-7 items-center border px-2.5",
        dark ? "border-carbon-line text-chalk-2" : "border-line text-ink-2"
      )}
    >
      {children}
    </span>
  );
}
