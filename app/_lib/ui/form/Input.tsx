import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

const base =
  "w-full font-sans text-[16px] text-ink placeholder:text-ink/30 " +
  "bg-transparent border-0 border-b border-solid " +
  "py-3 px-0 " +
  "transition-[border-color,border-width] duration-quick ease-out-quint " +
  "focus:outline-none " +
  "disabled:opacity-50 disabled:cursor-not-allowed " +
  "motion-reduce:transition-none";

/**
 * Input — `border-b 1px` uniquement (pas de cadre fermé).
 * Style « fiche d'inscription musée » décidé dans /design/voix.
 *
 * - Default : `border-b-[1px] border-ink/30`
 * - Focus : `border-b-2 border-accent-deep` (épaississement = signal)
 * - Invalid : `border-b-[1px] border-accent-deep` + trait vertical dans FieldError
 *
 * Le focus-visible global (outline accent-deep) est désactivé sur l'input
 * au click souris pour ne pas doubler le feedback — l'épaississement suffit.
 */
export function Input({ invalid, className, ...rest }: InputProps) {
  const borderState = invalid
    ? "border-accent-deep focus:border-b-2"
    : "border-ink/30 focus:border-b-2 focus:border-accent-deep";

  return (
    <input
      aria-invalid={invalid || undefined}
      className={[base, borderState, className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}
