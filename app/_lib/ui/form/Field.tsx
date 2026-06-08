import type { ReactNode } from "react";
import { FieldError } from "./FieldError";

type FieldProps = {
  /** Id partagé label ↔ input. Doit matcher l'id posé sur l'input. */
  id: string;
  label: string;
  /** Si vrai, affiche « (facultatif) » après le label. Par défaut, tous les champs sont requis. */
  optional?: boolean;
  /** Message d'erreur sous le champ. Absent si vide. */
  error?: string;
  /** Aide contextuelle sous le label, au-dessus du champ. */
  hint?: string;
  children: ReactNode;
};

/**
 * Field — wrapper label + input + erreur.
 *
 * - Label Instrument Serif 14 px toujours visible (jamais placeholder-as-label : WCAG 1.3.1).
 * - « (facultatif) » en Instrument Sans 13 px ink/50 après le label — inversion logique
 *   SaaS « required* » → on assume requis par défaut, on signale l'exception.
 * - Erreur en Instrument Sans 13 px ink + trait vertical accent-deep à gauche
 *   (double signalisation sans casser la DA kaki/lin).
 */
export function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: FieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="font-display text-[14px] text-ink mb-1.5"
      >
        {label}
        {optional && (
          <span className="font-sans text-[13px] text-ink/50 ml-2">
            (facultatif)
          </span>
        )}
      </label>

      {hint && (
        <p
          id={hintId}
          className="font-sans text-[13px] text-ink/60 mb-2 leading-relaxed"
        >
          {hint}
        </p>
      )}

      {children}

      {error && <FieldError id={errorId!}>{error}</FieldError>}
    </div>
  );
}
