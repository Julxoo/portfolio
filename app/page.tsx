import type { Metadata } from "next";
import { ButtonLink } from "./_lib/ui/Button";
import { SlideLink, InlineLink } from "./_lib/ui/Link";
import { EmailLink } from "./_components/EmailLink";
import { ProjectScene, type SceneProject } from "./_components/ProjectScene";
import { ContrastMask } from "./_components/ContrastMask";
import { Overture } from "./_components/Overture";
import { Manifeste } from "./_components/Manifeste";
import { ScrollMarquee } from "./_components/ScrollMarquee";
import { MethodeHome } from "./_components/MethodeHome";
import { Terrain } from "./_components/Terrain";
import { PourQui } from "./_components/PourQui";
import { Services } from "./_components/Services";
import { Temoignages } from "./_components/Temoignages";
import { Tarifs } from "./_components/Tarifs";
import { Faq } from "./_components/Faq";

export const metadata: Metadata = {
  title: {
    absolute: "Jules Toussenel — Sites sur-mesure, Aix-en-Provence",
  },
  description:
    "Développeur freelance basé à Aix-en-Provence. Sites sur-mesure pour artisans, commerces premium et PME. Chaque projet dessiné depuis zéro, aucun template.",
  alternates: { canonical: "/" },
};

// Projets featured du défilé home. Captures réelles dans /public/projets/ ;
// la card ouvre le site live (url). ORA est un serveur MCP sans visuel de
// site → repli kaki avec libellé dédié (imageLabel).
const FEATURED: SceneProject[] = [
  {
    slug: "louma-pilates",
    eyebrow: "Studio",
    title: "LOUMA Pilates",
    year: "2026",
    teaser:
      "Studio de Pilates Reformer et Mat à Sisteron. Un sanctuaire du mouvement, cours présentés et réservation en ligne.",
    tags: ["Vitrine", "Réservation"],
    imageSrc: "/projets/louma.jpg",
    imageAlt: "Page d'accueil du site LOUMA Pilates",
    url: "https://loumapilates.fr/",
  },
  {
    slug: "swipe-up-agency",
    eyebrow: "Agence",
    title: "Swipe Up Agency",
    year: "2026",
    teaser:
      "Agence de communication et marketing. Portfolio éditorial en accordéon, campagnes mises en scène, sans template.",
    tags: ["Portfolio", "Éditorial"],
    imageSrc: "/projets/swipe-up.jpg",
    imageAlt: "Page d'accueil du site de Swipe Up Agency",
    url: "https://0013-anahe-sabatie.vercel.app/",
  },
  {
    slug: "redroom",
    eyebrow: "Studio",
    title: "RedRoom",
    year: "2026",
    teaser:
      "Studio fitness réservé aux femmes à Dubaï. Cardio, barre Pilates et méditation, une image premium prête pour l'ouverture.",
    tags: ["Premium", "Réservation"],
    imageSrc: "/projets/redroom.jpg",
    imageAlt: "Page d'accueil du site RedRoom",
    url: "https://redroom.ae/",
  },
  {
    slug: "le-vieux-tonneau",
    eyebrow: "Restauration",
    title: "Le Vieux Tonneau",
    year: "2025",
    teaser:
      "Bar à vins, tapas et truffes au cœur du vieil Aix. Site éditorial, carte vivante, mise à jour en autonomie.",
    tags: ["Vitrine", "Éditorial"],
    imageSrc: "/projets/vieux-tonneau.jpg",
    imageAlt: "Page d'accueil du site Le Vieux Tonneau",
    url: "https://levieuxtonneau.fr/",
  },
  {
    slug: "ora",
    eyebrow: "Produit · MCP",
    title: "ORA",
    year: "2026",
    teaser:
      "Serveur MCP pour un salon de coiffure : ses outils de gestion branchés directement à l'IA.",
    tags: ["MCP", "IA"],
    imageLabel: "Serveur MCP",
    url: "https://mcp.oracoiffure.fr",
  },
];

export default function Home() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* =================================================================
        OVERTURE — preloader + transition + hero, choreographiés (Motion).
        « Le lever de toile » : panneau kaki, le mot « dessinés » prend de
        l'encre (axe variable Clash), puis les colonnes se lèvent et révèlent
        le hero. Le hero (nom, métier, ville, pitch) vit dans ce composant.
      ================================================================= */}
      <Overture />

      {/* NOUVELLE ARBORESCENCE (entonnoir) — sections 🆕 en placeholder,
          à retravailler une à une. Ordre : Hero → Pour qui → Services →
          Projets → Témoignages → Manifeste → Méthode → Tarifs → Terrain →
          À propos/Carnet → FAQ → CTA. */}

      {/* =================================================================
        POUR QUI — « La plume choisit » : liste de qualification, les
        audiences acceptées s'encrent, les refusées sont biffées au scroll.
      ================================================================= */}
      <PourQui />

      {/* =================================================================
        SERVICES — « Le tunnel de caractères » : section épinglée, chaque
        métier fonce du fond de la scène vers le visiteur, puis l'index
        se pose, lisible. Pur CSS scroll-driven.
      ================================================================= */}
      <Services />

      {/* =================================================================
        PROJETS — « Le défilé de l'atelier » : galerie horizontale
        scroll-driven (desktop) / scroll-snap natif (tactile).
      ================================================================= */}
      <ProjectScene projects={FEATURED} />

      <ScrollMarquee />

      {/* =================================================================
        TÉMOIGNAGES — « À voix haute » : scène épinglée, une voix à la fois
        en encre pleine, les autres en murmures. Verbatims factices à
        remplacer par les vrais. Scroll lissé (Tempus), zéro saut.
      ================================================================= */}
      <Temoignages />

      <Manifeste />

      <MethodeHome />

      {/* 🆕 placeholder — prix à définir (A/B/C) */}
      <Tarifs />

      <Terrain />

      {/* =================================================================
        À PROPOS + CARNET — deux blocs côte à côte, texte court, lien
        vers la page concernée.
      ================================================================= */}
      <section className="px-gutter py-section-lg border-t border-rule">
        <div className="max-w-default mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <div className="text-eyebrow uppercase text-ink/60 mb-3">
                À propos
              </div>
              <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-ink mb-6">
                Une personne, un atelier.
              </h2>
              <p className="font-display text-body text-ink/85 leading-[1.75] max-w-[46ch] mb-6">
                Je travaille seul, depuis Aix-en-Provence. Avant
                d&apos;être freelance, j&apos;étais en alternance chez
                ATC Immobilier. Ma stack est tenue courte —{" "}
                <InlineLink href="/design">
                  une charte vivante documente les choix
                </InlineLink>
                {" "}qui précèdent chaque projet.
              </p>
              <SlideLink href="/a-propos">En savoir plus</SlideLink>
            </div>

            <div>
              <div className="text-eyebrow uppercase text-ink/60 mb-3">
                Carnet
              </div>
              <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-ink mb-6">
                Les notes qu&apos;on publie.
              </h2>
              <p className="font-display text-body text-ink/85 leading-[1.75] max-w-[46ch] mb-6">
                Des textes sur ce qui fait un site tenu — typographie,
                design système, choix de stack. On écrit quand une idée
                tient sur plusieurs jours, jamais pour remplir un
                calendrier éditorial. Premières entrées au printemps.
              </p>
              <SlideLink href="/carnet">Voir le carnet</SlideLink>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
        BRISURE CHROMATIQUE — voile kaki qui fade-in À L'ENTRÉE de la CTA puis
        fade-out à la sortie (transitoire), pour que la CTA prenne tout l'écran
        en kaki sans recouvrir la FAQ qui suit. Placé ici (pas dans layout) pour
        rester dans le stacking context de <main>. La CTA porte
        data-contrast-mask-target et un z-index supérieur.
      ================================================================= */}
      <ContrastMask maxOpacity={1} />

      {/* =================================================================
        CTA — « Un mot, une réponse sous deux jours. » Bloc plein écran
        (min-h-[100svh] = arrivée en "flip" kaki), placé AVANT la FAQ.
        relative z-[25] pour rester au-dessus du ContrastMask (z:15).
      ================================================================= */}
      <section
        data-contrast-mask-target
        className="relative z-[25] min-h-[100svh] flex items-center px-gutter py-section-lg bg-surface text-surface-foreground"
      >
        <div className="max-w-default mx-auto w-full">
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16 items-end">
            <div>
              <p className="font-display italic text-lead text-accent-warm mb-6">
                Un mot, une réponse sous deux jours.
              </p>
              <h2 className="font-display text-display text-bg max-w-[16ch] leading-[0.95]">
                Un <em className="italic text-accent-warm">projet</em> ?
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              <p className="font-display text-lead opacity-85 max-w-[42ch]">
                Écrivez directement, ou passez par le formulaire —
                c&apos;est la même boîte mail au bout.
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href="/contact" trailingArrow>
                  Ouvrir le formulaire
                </ButtonLink>
                <span className="font-sans text-[15px] text-bg">
                  <EmailLink />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — désormais en clôture de page (SEO longue-traîne + objections). */}
      <Faq />
    </div>
  );
}
