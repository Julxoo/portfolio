/**
 * SkipLink — WCAG 2.4.1 (Bypass Blocks).
 * Invisible tant qu'on ne focus pas. Au focus clavier, apparaît en haut-gauche.
 * La cible `#main` est le <main> wrappant les children dans layout.tsx.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-bg focus:text-ink focus:border focus:border-rule-strong focus:px-4 focus:py-2 focus:font-sans focus:text-[14px] focus:outline-2 focus:outline-offset-[3px] focus:outline-accent-deep"
    >
      Aller au contenu
    </a>
  );
}
