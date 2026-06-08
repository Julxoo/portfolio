import type { Metadata } from "next";
import { InlineLink, SlideLink } from "../_lib/ui/Link";
import { Parcours } from "../_components/Parcours";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Jules Toussenel, développeur freelance basé à Aix-en-Provence. Sites sur-mesure pour artisans, commerces et PME. Next.js, Vercel, aucun template.",
};

export default function APropos() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-section-md">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Une personne, un atelier, quelques projets par an.
          </p>
          <h1 className="font-display text-display text-ink max-w-[14ch] mb-10">
            À propos.
          </h1>
        </div>
      </section>

      <section className="px-gutter pb-section-md">
        <div className="max-w-default mx-auto">
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-16 items-start">
            <div className="flex flex-col gap-6 font-display text-body text-ink/85 leading-[1.75] max-w-[58ch]">
              <p>
                Je m&apos;appelle Jules Toussenel. Je conçois et je
                développe des sites sur-mesure pour des artisans, des
                commerces premium et des PME — des maisons qui ont quelque
                chose à montrer et qui ne veulent pas d&apos;un template
                WordPress qui ressemble à celui du voisin.
              </p>
              <p>
                Je travaille seul, depuis Aix-en-Provence. L&apos;entreprise
                est jeune — les premières études de cas arrivent à
                l&apos;automne 2026. En attendant, je choisis les projets un
                par un. Faire peu, bien, c&apos;est le seul cadre que je
                tienne pour l&apos;instant.
              </p>
              <p className="font-display italic text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.3] text-surface max-w-[32ch] py-2">
                Des sites pensés pour durer — qu&apos;on relit dans cinq
                ans comme au premier jour.
              </p>
              <p>
                Ma stack est tenue courte — Next.js, TypeScript,
                Tailwind, Vercel. Aucune dépendance qui ne se justifie.
                Je documente mes choix{" "}
                <InlineLink href="/design">
                  sur une charte vivante
                </InlineLink>{" "}
                — typographie, palette, espace, grille — qui précède
                chaque projet et se défend à l&apos;oral.
              </p>
              <p>
                Avant d&apos;être freelance, j&apos;ai été en alternance
                chez ATC Immobilier, à Marseille. J&apos;y ai appris la
                rigueur des fichiers livrés à l&apos;heure, des clients
                qu&apos;on rappelle le lundi matin, et des factures
                qu&apos;on envoie la même semaine. Ça n&apos;a pas changé.
              </p>
            </div>

            <aside className="flex flex-col gap-10 border-t md:border-t-0 md:border-l border-rule md:pl-10 pt-8 md:pt-0">
              <div>
                <div className="text-eyebrow uppercase text-ink/60 mb-4">
                  Lieu
                </div>
                <div className="font-display italic text-[1.3rem] leading-tight text-ink">
                  Aix-en-Provence
                </div>
                <p className="text-caption text-ink/65 mt-2 max-w-[32ch]">
                  Je me déplace pour les premiers rendez-vous en
                  Provence, en Occitanie, à Paris. Tout le reste se fait
                  à distance.
                </p>
              </div>

              <div>
                <div className="text-eyebrow uppercase text-ink/60 mb-4">
                  Outils
                </div>
                <ul className="flex flex-col gap-1.5 font-sans text-[14px] text-ink/80 leading-relaxed">
                  <li>— Figma pour le design</li>
                  <li>— Next.js 16 + TypeScript pour le code</li>
                  <li>— Tailwind v4 pour le style</li>
                  <li>— Vercel pour l&apos;hébergement</li>
                  <li>— Pas de CMS par défaut — au cas par cas</li>
                </ul>
              </div>

              <div>
                <div className="text-eyebrow uppercase text-ink/60 mb-4">
                  Clients récents
                </div>
                <p className="text-caption text-ink/65 max-w-[32ch]">
                  Les premières études de cas paraissent à l&apos;automne
                  2026. En attendant, les références se donnent par
                  téléphone.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Parcours />

      <section className="px-gutter pb-section-xl">
        <div className="max-w-default mx-auto border-t border-rule-strong pt-12">
          <div className="grid md:grid-cols-2 gap-10 items-baseline">
            <p className="font-display italic text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.3] text-surface max-w-[36ch]">
              Un projet, une question, un simple bonjour — tous les
              messages sont lus, tous reçoivent une réponse sous deux
              jours.
            </p>
            <div className="flex gap-8 items-baseline">
              <SlideLink href="/contact">Écrire</SlideLink>
              <SlideLink href="/methode">Lire la méthode</SlideLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
