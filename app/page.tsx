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
import { Chiffres } from "./_components/Chiffres";
import { Terrain } from "./_components/Terrain";

export const metadata: Metadata = {
  title: {
    absolute: "Jules Toussenel — Sites sur-mesure, Aix-en-Provence",
  },
  description:
    "Développeur freelance basé à Aix-en-Provence. Sites sur-mesure pour artisans, commerces premium et PME. Chaque projet dessiné depuis zéro, aucun template.",
  alternates: { canonical: "/" },
};

// Projets featured pour la scène 3D home — 4 projets existants sur
// julestoussenel.com. À compléter avec des captures WebP dans /public/projets/
// au fur et à mesure des études de cas publiées. Tant qu'imageSrc est absent,
// la carte affiche un aplat kaki.
const FEATURED: SceneProject[] = [
  {
    slug: "le-vieux-tonneau",
    eyebrow: "Restauration",
    title: "Le Vieux Tonneau",
    year: "2025",
    teaser:
      "Site vitrine éditorial pour un restaurant de cuisine bistronomique — carte animée, agenda saisonnier, réservation.",
    tags: ["Next.js", "Sanity", "Éditorial"],
  },
  {
    slug: "soma-pilates",
    eyebrow: "Studio",
    title: "SOMA Pilates",
    year: "2025",
    teaser:
      "Studio de pilates à Sisteron. Prise de rendez-vous en ligne, présentation des cours, tarifs transparents.",
    tags: ["Next.js", "Booking", "Design"],
  },
  {
    slug: "tracker-analytics",
    eyebrow: "Produit",
    title: "Tracker Analytics",
    year: "2024",
    teaser:
      "Plateforme d’analytics légère pour sites éditoriaux. Aucun cookie, données agrégées côté serveur.",
    tags: ["SaaS", "Dashboard", "Node.js"],
  },
  {
    slug: "telegram-bots",
    eyebrow: "Produit",
    title: "Telegram Bots Platform",
    year: "2024",
    teaser:
      "Plateforme de création et supervision de bots Telegram pour automatiser communication et support client.",
    tags: ["Node.js", "Admin"],
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

      <Manifeste />

      {/* =================================================================
        PROJETS — « Le défilé de l'atelier » : intro éditoriale + galerie
        horizontale. Desktop = balayage scroll-driven épinglé (HUD index +
        progression). Tactile = scroll-snap natif (swipe), buttery iOS.
        Le titre + le compteur vivent dans le composant (un seul bloc).
      ================================================================= */}
      <ProjectScene projects={FEATURED} />

      <ScrollMarquee />

      <section className="px-gutter pt-section-md pb-section-lg">
        <div className="max-w-default mx-auto max-w-[52ch]">
          <p className="font-sans text-[15px] text-ink/70 leading-relaxed">
            Les études de cas complètes s&apos;écrivent au fur et à mesure.
            En attendant, le travail se montre par email — captures,
            références directes, discussion.
          </p>
          <div className="mt-5">
            <SlideLink href="/contact">Écrire pour voir</SlideLink>
          </div>
        </div>
      </section>

      <MethodeHome />

      <Chiffres />

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
        BRISURE CHROMATIQUE — voile kaki qui fade-in au passage de la CTA.
        Placé ici dans la page (pas dans layout) pour rester dans le
        stacking context de <main>. La section CTA qui suit porte
        data-contrast-mask-target et un z-index supérieur pour passer
        devant le voile quand il est opaque.
      ================================================================= */}
      <ContrastMask />

      {/* =================================================================
        CTA FINAL — bloc éditorial sobre avec email direct.
        min-h-screen pour que l'arrivée soit un "flip" plein écran kaki.
        relative z-[25] pour rester au-dessus du ContrastMask (z:15).
      ================================================================= */}
      <section
        data-contrast-mask-target
        className="relative z-[25] min-h-[100svh] flex items-center px-gutter py-section-xl bg-surface text-surface-foreground border-t border-rule"
      >
        <div className="max-w-default mx-auto w-full">
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-16 items-end">
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
    </div>
  );
}
