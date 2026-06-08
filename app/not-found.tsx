import type { Metadata } from "next";
import { ButtonLink } from "./_lib/ui/Button";
import { SlideLink } from "./_lib/ui/Link";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou plus.",
};

/**
 * not-found.tsx — 404 global.
 *
 * Déclenché automatiquement pour toute URL non matchée, OU manuellement via
 * `notFound()` dans une page (quand un slug n'existe pas).
 *
 * Respecte la grille standard du site — même layout que les heros.
 * Glyphe « 404 » Instrument Serif italique XL, kaki à 40 %, au-dessus du
 * message. Deux CTAs ; pas de search, pas de liste populaires.
 */
export default function NotFound() {
  return (
    <section className="flex-1 flex flex-col justify-center px-gutter py-section-xl bg-bg">
      <div className="max-w-default mx-auto w-full">
        <div
          aria-hidden
          className="font-display italic text-accent-deep/40 text-[clamp(8rem,18vw,14rem)] leading-none mb-8"
        >
          404
        </div>

        <h1 className="font-display text-display text-ink max-w-[18ch] mb-8">
          Cette page <em className="italic text-surface">n&apos;existe pas</em>
          {" — ou plus."}
        </h1>

        <p className="font-display text-lead text-ink/75 max-w-[52ch] mb-10">
          Elle a peut-être changé d&apos;adresse, peut-être disparu tout
          simplement. Le sommaire est resté là.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href="/" trailingArrow>
            Revenir au sommaire
          </ButtonLink>
          <SlideLink href="/projets">Parcourir les projets</SlideLink>
        </div>
      </div>
    </section>
  );
}
