import type { Metadata } from "next";
import { SlideLink } from "../_lib/ui/Link";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Réalisez votre projet dès 500 €, mise en ligne comprise. Le détail des formules sur-mesure arrive bientôt.",
  alternates: { canonical: "/tarifs" },
};

export default function Tarifs() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-section-md">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Un prix d&apos;entrée clair, le sur-mesure au-dessus.
          </p>
          <h1 className="font-display text-display text-ink max-w-[14ch] mb-10">
            Tarifs.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[52ch]">
            Réalisez votre projet <strong>dès 500 €</strong>, mise en ligne
            comprise — nom de domaine, hébergement et déploiement inclus.
            Au-dessus, chaque site est dessiné depuis zéro, chiffré sur devis.
          </p>
        </div>
      </section>

      <section className="px-gutter pb-section-xl">
        <div className="max-w-default mx-auto border-t border-rule-strong pt-section-md">
          <div className="flex flex-col gap-4 max-w-[52ch]">
            <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-ink">
              La grille détaillée arrive bientôt
            </h2>
            <p className="font-sans text-[15px] text-ink/70 leading-relaxed">
              Formules, ce qui est compris ligne à ligne et délais types
              seront publiés ici. En attendant, le plus simple reste d&apos;en
              parler de vive voix — un devis gratuit, une réponse sous deux
              jours.
            </p>
            <div className="mt-4">
              <SlideLink href="/contact">Demander un devis gratuit</SlideLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
