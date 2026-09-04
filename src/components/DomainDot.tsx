import { DOMAINS } from "@/content/domains";
import type { Domain } from "@/content/types";
import { cn } from "@/utils/cn";

/** A small coloured dot that identifies a domain. Purely decorative. */
export function DomainDot({
  domain,
  dark,
  className = "",
}: {
  domain: Domain;
  dark?: boolean;
  className?: string;
}) {
  const meta = DOMAINS[domain];
  return (
    <span
      aria-hidden
      className={cn("inline-block h-1.5 w-1.5 rounded-full", dark ? meta.bright : meta.dot, className)}
    />
  );
}
