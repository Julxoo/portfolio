import type { ReactNode } from "react";

type EmptyStateProps = {
  /** Titre, sans ponctuation finale (Cloudscape). Instrument Serif italique. */
  title: string;
  /** Description optionnelle — une phrase courte, pas plus. */
  description?: string;
  /** Un seul CTA au plus. */
  action?: ReactNode;
  /** Heading level — par défaut h2. h3 si imbriqué dans une section avec h2 déjà. */
  as?: "h2" | "h3";
  className?: string;
};

/**
 * EmptyState — bloc pour liste vide, recherche sans résultat, carnet avant publication.
 *
 * Aligné à gauche comme les heros. Typographie pure : aucun pictogramme,
 * aucune illustration, aucune incitation exclamative.
 */
export function EmptyState({
  title,
  description,
  action,
  as: Heading = "h2",
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col gap-4 max-w-[52ch] ${className}`}>
      <Heading className="font-display italic text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-ink">
        {title}
      </Heading>
      {description && (
        <p className="font-sans text-[15px] text-ink/70 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
