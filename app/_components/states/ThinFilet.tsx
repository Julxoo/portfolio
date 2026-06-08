/**
 * ThinFilet — indicateur de chargement en filet horizontal 1 px.
 *
 * Un rail kaki à 10 % d'opacité, une barre qui traverse en 1.2 s.
 * Pas de spinner, pas de skeleton — juste un souffle discret.
 *
 * - Pas d'`aria-live` (lecteur d'écran : bruit inutile ; si le loading
 *   modifie une liste, le contenu qui apparaît en `aria-live=polite`
 *   se charge de l'annonce).
 * - `prefers-reduced-motion: reduce` → le rail reste statique, le
 *   `.motion-reduce:animate-none` Tailwind neutralise l'animation.
 * - Seuil d'affichage recommandé : ne monter ce composant qu'après
 *   ~400 ms de loading réel (avant, silence).
 */
export function ThinFilet({ className = "" }: { className?: string }) {
  return (
    <div
      role="presentation"
      aria-hidden
      className={`relative h-px w-full bg-ink/10 overflow-hidden ${className}`}
    >
      <span
        className="absolute inset-y-0 left-0 w-1/3 bg-accent-deep/60 animate-filet-sweep motion-reduce:animate-none motion-reduce:w-full motion-reduce:bg-ink/20"
      />
    </div>
  );
}
