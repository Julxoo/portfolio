import Link from "next/link";
import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  /** Si fourni, le tag devient un lien (catégorie cliquable). */
  href?: string;
  className?: string;
};

const base =
  "inline-flex items-center rounded-hairline border border-rule-strong " +
  "px-2 py-0.5 font-sans text-[11px] tracking-[0.04em] small-caps text-ink/70";

const interactive =
  "hover:border-ink hover:text-ink hover:bg-ink/5 " +
  "transition-colors duration-quick ease-out-quint " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent-deep " +
  "motion-reduce:transition-none";

/**
 * Tag — catégorie, année, ville, stack. Un seul style.
 * Filet 1px + radius 2px (rounded-hairline, seule exception radius autorisée),
 * small-caps Instrument Sans 11px. Aucun fond par défaut.
 * Deviens cliquable si `href` fourni.
 */
export function Tag({ children, href, className }: TagProps) {
  const classes = [base, href && interactive, className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
