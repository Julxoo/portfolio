import type { ReactNode } from "react";

type BadgeStatus = "available" | "waitlist" | "full";

type BadgeProps = {
  status?: BadgeStatus;
  children?: ReactNode;
  /** Override texte par défaut selon status. */
  label?: string;
  className?: string;
};

const base =
  "inline-flex items-center px-1.5 py-0.5 " +
  "font-sans text-[10px] tracking-[0.04em] font-medium small-caps";

const statusClasses: Record<BadgeStatus, string> = {
  available: "bg-accent-deep/10 text-accent-deep",
  waitlist: "bg-ink/8 text-ink/70",
  full: "bg-ink text-bg",
};

const defaultLabels: Record<BadgeStatus, string> = {
  available: "Disponible",
  waitlist: "Sur liste d'attente",
  full: "Complet",
};

/**
 * Badge — indicateur de statut ou de count.
 * Distinct du Tag : pas de filet, fond plein sobre, radius 0, small-caps 10px.
 * Les couleurs ne sont JAMAIS vertes/rouges/oranges vives — DA respectée.
 */
export function Badge({
  status = "available",
  label,
  children,
  className,
}: BadgeProps) {
  const classes = [base, statusClasses[status], className]
    .filter(Boolean)
    .join(" ");
  const content = children ?? label ?? defaultLabels[status];

  return <span className={classes}>{content}</span>;
}
