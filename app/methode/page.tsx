import type { Metadata } from "next";
import { SlideLink } from "../_lib/ui/Link";

export const metadata: Metadata = {
  title: "Méthode",
  description:
    "Quatre phases sur trois semaines — échange, conception, développement, livraison. Révisions incluses, CGV annexées au devis.",
};

type Phase = {
  num: string;
  name: string;
  duration: string;
  body: string;
  deliverables: string[];
};

const PHASES: Phase[] = [
  {
    num: "1.",
    name: "Échange",
    duration: "3 jours",
    body:
      "Deux appels, un questionnaire court. Je comprends votre maison, vos clients, votre calendrier. Pas de brief gonflé de buzzwords, pas de fiche persona générique — on parle de ce que vous vendez, de qui l'achète, et de ce que le site doit faire.",
    deliverables: [
      "Un compte-rendu écrit de la conversation",
      "La direction artistique proposée (palette, typographie, références)",
      "Un planning clair avec dates de jalons",
    ],
  },
  {
    num: "2.",
    name: "Conception",
    duration: "8 jours",
    body:
      "Maquettes Figma, un prototype cliquable sur desktop et mobile, trois aller-retours inclus. On tranche la direction artistique avant d'écrire une ligne de code. Vous voyez le site comme il sera, pas une version abstraite.",
    deliverables: [
      "Fichier Figma partagé, organisé par pages",
      "Prototype cliquable (desktop + mobile)",
      "Guide typographique et palette en tokens",
    ],
  },
  {
    num: "3.",
    name: "Développement",
    duration: "14 jours",
    body:
      "Le site se construit page par page, publié au fur et à mesure sur une URL privée. Relecture à chaque chapitre. Pas de grande révélation finale — vous voyez le site grandir, vous commentez sur la version vivante.",
    deliverables: [
      "Code source sur un dépôt privé GitHub",
      "URL de preview mise à jour à chaque commit",
      "CMS léger pour modifier les textes sans moi",
    ],
  },
  {
    num: "4.",
    name: "Livraison",
    duration: "2 jours",
    body:
      "Mise en ligne, connexion du domaine, formation une heure sur l'admin. Un mois de garantie — je corrige les bugs et les coquilles éditoriales sans compter. Ensuite, on peut continuer ensemble sur d'autres projets — ou pas, et c'est très bien aussi.",
    deliverables: [
      "Site en ligne sur votre domaine, HTTPS actif",
      "Analytics installées si vous le souhaitez (sans Google)",
      "Documentation de maintenance",
    ],
  },
];

export default function Methode() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-section-md">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Trois semaines, quatre étapes, une règle.
          </p>
          <h1 className="font-display text-display text-ink max-w-[14ch] mb-10">
            Méthode.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Chaque projet suit la même structure — échange, conception,
            développement, livraison. Trois semaines ouvrées au total
            pour un site vitrine complet. La règle qui tient l&apos;ensemble&nbsp;:
            vous voyez le site avancer en permanence, jamais de grande
            révélation finale.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>4 phases · 3 semaines</span>
            <span>Publication progressive</span>
            <span>Relecture à chaque chapitre</span>
            <span>Garantie 1 mois</span>
          </div>
        </div>
      </section>

      <section className="px-gutter pb-section-xl">
        <div className="max-w-default mx-auto">
          <ol className="flex flex-col border-t border-rule-strong">
            {PHASES.map((p) => (
              <li
                key={p.num}
                className="grid md:grid-cols-[1fr_2fr_1.2fr] gap-6 md:gap-16 py-12 border-b border-rule last:border-b-0"
              >
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-sans tabular-nums text-[13px] text-accent-deep tracking-[0.08em]">
                      {p.num}
                    </span>
                    <span className="text-eyebrow uppercase text-ink/60">
                      {p.duration}
                    </span>
                  </div>
                  <h2 className="font-display italic text-[clamp(1.8rem,3.5vw,2.4rem)] leading-tight text-ink">
                    {p.name}
                  </h2>
                </div>

                <div>
                  <p className="text-body text-ink/85 leading-relaxed max-w-[48ch]">
                    {p.body}
                  </p>
                </div>

                <div>
                  <div className="text-eyebrow uppercase text-ink/60 mb-3">
                    Livrables
                  </div>
                  <ul className="flex flex-col gap-2 font-sans text-[14px] text-ink/80 leading-relaxed">
                    {p.deliverables.map((d) => (
                      <li key={d}>— {d}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-gutter pb-section-xl">
        <div className="max-w-default mx-auto border-t border-rule-strong pt-12">
          <p className="font-display italic text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.3] text-surface max-w-[42ch] mb-8">
            Les CGV et le détail budget sont annexés au devis — jamais
            exposés en vitrine.
          </p>
          <SlideLink href="/contact">
            Écrire pour un devis
          </SlideLink>
        </div>
      </section>
    </div>
  );
}
