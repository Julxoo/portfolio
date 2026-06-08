import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

const base =
  "w-full font-sans text-[16px] text-ink placeholder:text-ink/30 leading-relaxed " +
  "bg-transparent border-0 border-b border-solid " +
  "py-3 px-0 resize-none field-sizing-content " +
  "transition-[border-color,border-width] duration-quick ease-out-quint " +
  "focus:outline-none " +
  "disabled:opacity-50 disabled:cursor-not-allowed " +
  "motion-reduce:transition-none";

/**
 * Textarea — même style que Input : `border-b 1 px` uniquement, pas de cadre.
 *
 * - `field-sizing: content` (utility custom) : la textarea grandit avec son
 *   contenu, sans JavaScript. Support Chrome 123+, Safari 18+, Firefox 136+.
 *   `rows` sert uniquement de hauteur initiale.
 * - `resize-none` désactive le coin de resize manuel (signal app, pas éditorial).
 */
export function Textarea({
  invalid,
  className,
  rows = 4,
  ...rest
}: TextareaProps) {
  const borderState = invalid
    ? "border-accent-deep focus:border-b-2"
    : "border-ink/30 focus:border-b-2 focus:border-accent-deep";

  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={[base, borderState, className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}
