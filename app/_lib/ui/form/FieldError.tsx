import type { ReactNode } from "react";

type FieldErrorProps = {
  id: string;
  children: ReactNode;
};

/**
 * FieldError — message sous un champ invalide.
 *
 * Couleur : `ink` pur (pas rouge tomate — casse la DA kaki/lin).
 * Signalisation doublée par un trait vertical `accent-deep` 1 px à gauche
 * (respect WCAG 1.4.1 — ne pas reposer sur la couleur seule).
 *
 * L'id est référencé par `aria-describedby` sur l'input, et l'input porte
 * `aria-invalid="true"` quand une erreur est présente.
 */
export function FieldError({ id, children }: FieldErrorProps) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 pl-3 font-sans text-[13px] text-ink leading-snug border-l border-accent-deep"
    >
      {children}
    </p>
  );
}
