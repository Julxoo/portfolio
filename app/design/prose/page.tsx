import type { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Prose — Design",
  description:
    "Blockquote, listes, tableaux, code, ornements, marginalia. Chaque élément non-textuel doit justifier son existence — sinon la phrase reprend la place.",
};

type Step = {
  num: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    num: "1.",
    title: "Discovery",
    body:
      "Deux appels, un questionnaire court. Je comprends votre maison, vos clients, votre calendrier. Pas de brief gonflé de buzzwords.",
  },
  {
    num: "2.",
    title: "Design",
    body:
      "Maquettes Figma, un prototype cliquable, trois aller-retours inclus. On tranche la direction artistique avant d'écrire une ligne de code.",
  },
  {
    num: "3.",
    title: "Développement",
    body:
      "Vous voyez le site avancer page par page, publié au fur et à mesure sur une URL privée. Relecture à chaque chapitre, pas de grande révélation finale.",
  },
  {
    num: "4.",
    title: "Livraison",
    body:
      "Mise en ligne, formation sur l'écriture du site dans l'admin, garantie un mois. Ensuite, on peut continuer ensemble — ou pas.",
  },
];

type Spec = {
  term: string;
  definition: string;
};

const SPECS: Spec[] = [
  { term: "Design", definition: "Maquettes Figma, prototype cliquable, guidelines" },
  { term: "Développement", definition: "Next.js 16, TypeScript, Tailwind v4, hébergement Vercel" },
  { term: "Contenu", definition: "CMS léger, formation à la rédaction dans la voix définie" },
  { term: "Performance", definition: "Core Web Vitals verts sur mobile et desktop" },
  { term: "Garantie", definition: "Un mois de support inclus · révisions mineures sans surcoût" },
];

type PriceRow = {
  phase: string;
  jours: string;
  prix: string;
};

const PRICES: PriceRow[] = [
  { phase: "Discovery", jours: "3", prix: "2 400 €" },
  { phase: "Design", jours: "8", prix: "6 400 €" },
  { phase: "Développement", jours: "14", prix: "11 200 €" },
  { phase: "Livraison", jours: "2", prix: "1 600 €" },
];

function Blockquote({
  children,
  cite,
}: {
  children: React.ReactNode;
  cite: string;
}) {
  return (
    <blockquote className="font-display italic text-[1.125em] leading-relaxed pl-10 my-8 text-ink max-w-[52ch]">
      <p>{children}</p>
      <cite className="block mt-3 not-italic font-sans text-caption text-ink/70">
        — {cite}
      </cite>
    </blockquote>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="border-y border-rule-strong py-10 my-12">
      <p className="font-display italic text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.25] text-surface text-center max-w-[32ch] mx-auto">
        {children}
      </p>
    </aside>
  );
}

export default function Prose() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Prose" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Chaque élément doit justifier sa place.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Le <em className="italic text-surface">microscope</em> éditorial.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Un portfolio haut de gamme se joue dans les éléments les plus
            petits — la citation indentée, la liste qui n&apos;en est pas une,
            le tableau sans zèbre, la note en marge qui prolonge une pensée.
            La règle est simple : sobriété typographique et filets 1 px
            portent toute la hiérarchie. Si un élément n&apos;est pas
            nécessaire, la phrase pleine reprend sa place.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>Puces bannies · trois alternatives</span>
            <span>Tables Tufte-minimal</span>
            <span>Marginalia flottante</span>
            <span>Zéro ornement décoratif</span>
          </div>
        </div>
      </section>

      {/* 01 — CITATIONS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Citations — deux objets distincts" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Le <em className="italic">blockquote</em> cite une parole
                extérieure (témoignage client, extrait de livre). Le{" "}
                <em className="italic">pull quote</em> met en exergue une
                phrase <em className="italic">déjà présente</em> dans
                l&apos;article. On ne les confond jamais.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch] mb-6">
                Butterick est catégorique :{" "}
                <em className="italic">
                  &laquo;&nbsp;omit quotation marks — they&apos;re
                  redundant&nbsp;&raquo;
                </em>
                . L&apos;italique et l&apos;indentation disent déjà
                &laquo;&nbsp;ceci est une citation&nbsp;&raquo;. Double
                signalisation = bruit.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                L&apos;attribution se pose sur la ligne suivante, précédée
                d&apos;un em-dash <code className="font-mono">—</code>, en
                Instrument Sans non-italique. Pas de filet latéral gauche —
                signature CMS générique.
              </p>
            </div>

            <div className="flex flex-col border-t border-rule-strong pt-8">
              <Eyebrow>Blockquote — témoignage externe</Eyebrow>
              <Blockquote cite="Marie Durand, fondatrice de Château Saint-Pierre">
                Jules a tenu ses délais et sa parole. Le site ressemble
                enfin à notre maison, pas à un modèle téléchargé. Rare.
              </Blockquote>

              <div className="mt-4 border-t border-rule pt-8">
                <Eyebrow>Pull quote — mise en exergue interne</Eyebrow>
                <PullQuote>
                  Un site dessiné à la règle, pas au pinceau flou.
                </PullQuote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — LISTES */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Listes — trois alternatives aux puces" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            La voix bannit les puces disc en prose éditoriale. Trois formes
            de substitution, à choisir selon la charge sémantique du
            contenu — jamais par défaut.
          </p>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {/* Alternative 1 — prose intégrée */}
            <div className="flex flex-col border-t border-rule-strong pt-6">
              <Eyebrow>01 · Prose intégrée</Eyebrow>
              <p className="text-caption text-ink/70 mt-3 mb-8 max-w-[36ch]">
                Pour 2-3 éléments. Défaut absolu. La liste s&apos;évanouit
                dans la phrase.
              </p>
              <p className="font-display italic text-[1.05rem] text-ink leading-relaxed border-t border-rule pt-6">
                On commence par comprendre,{" "}
                <em className="not-italic">puis</em> on dessine,{" "}
                <em className="not-italic">enfin</em> on livre.
              </p>
            </div>

            {/* Alternative 2 — ol numérotée avec filets */}
            <div className="flex flex-col border-t border-rule-strong pt-6">
              <Eyebrow>02 · Liste numérotée</Eyebrow>
              <p className="text-caption text-ink/70 mt-3 mb-8 max-w-[36ch]">
                Pour 3 à 5 étapes. Chiffres arabes tabulaires, filets fins,
                pas de puces. Usage : méthode, livrables, jalons.
              </p>
              <ol className="flex flex-col border-t border-rule">
                {STEPS.map((s) => (
                  <li
                    key={s.num}
                    className="grid grid-cols-[2.5rem_1fr] gap-3 py-4 border-b border-rule"
                  >
                    <span className="font-sans tabular-nums text-caption text-accent-deep pt-1">
                      {s.num}
                    </span>
                    <div>
                      <div className="font-display italic text-[1.05rem] text-ink leading-tight mb-1">
                        {s.title}
                      </div>
                      <p className="text-caption text-ink/70">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Alternative 3 — dl specs */}
            <div className="flex flex-col border-t border-rule-strong pt-6">
              <Eyebrow>03 · Definition list</Eyebrow>
              <p className="text-caption text-ink/70 mt-3 mb-8 max-w-[36ch]">
                Pour specs, stack technique, mentions de livrables. Deux
                colonnes, small-caps à gauche, serif courant à droite.
              </p>
              <dl className="grid grid-cols-[7rem_1fr] gap-x-4 border-t border-rule">
                {SPECS.map((s) => (
                  <div
                    key={s.term}
                    className="contents [&>*]:border-b [&>*]:border-rule [&>*]:py-3"
                  >
                    <dt className="font-sans text-eyebrow uppercase text-ink/65 pt-4">
                      {s.term}
                    </dt>
                    <dd className="font-display text-caption text-ink/80">
                      {s.definition}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — TABLEAUX */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Tableaux — Tufte-minimal, zéro zèbre" />
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Filets horizontaux uniquement. Aucune bordure verticale,
                aucun fond alterné. Les chiffres tabulaires (
                <code className="font-mono text-accent-deep">tnum</code>)
                s&apos;alignent à droite ; le texte s&apos;aligne à gauche ;
                le thead prend les petites capitales.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Butterick :{" "}
                <em className="italic">
                  &laquo;&nbsp;start with no borders, then selectively add
                  them back&nbsp;&raquo;
                </em>
                . Le tableau n&apos;est jamais un cadre — c&apos;est une
                partition.
              </p>
            </div>

            <figure className="flex flex-col">
              <figcaption className="font-display italic text-caption text-ink/70 mb-4 leading-relaxed">
                Étude de cas type — ventilation d&apos;un projet portfolio
                + blog en quatre phases.
              </figcaption>
              <table className="w-full border-t-2 border-ink/80">
                <thead className="border-b border-rule-strong">
                  <tr>
                    <th className="text-left py-3.5 px-5 font-sans text-eyebrow uppercase text-ink/65 tracking-[0.08em]">
                      Phase
                    </th>
                    <th className="text-right py-3.5 px-5 font-sans text-eyebrow uppercase text-ink/65 tracking-[0.08em]">
                      Jours
                    </th>
                    <th className="text-right py-3.5 px-5 font-sans text-eyebrow uppercase text-ink/65 tracking-[0.08em]">
                      Budget
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICES.map((p) => (
                    <tr key={p.phase} className="border-b border-rule">
                      <td className="text-left py-3.5 px-5 font-display text-body text-ink">
                        {p.phase}
                      </td>
                      <td className="text-right py-3.5 px-5 font-sans tabular-nums text-body text-ink/80">
                        {p.jours}
                      </td>
                      <td className="text-right py-3.5 px-5 font-sans tabular-nums text-body text-ink">
                        {p.prix}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b-2 border-ink/80">
                    <td className="text-left py-3.5 px-5 font-display italic text-body text-ink">
                      Total
                    </td>
                    <td className="text-right py-3.5 px-5 font-sans tabular-nums text-body text-ink">
                      27
                    </td>
                    <td className="text-right py-3.5 px-5 font-sans tabular-nums text-body text-ink font-medium">
                      21 600 €
                    </td>
                  </tr>
                </tbody>
              </table>
            </figure>
          </div>
        </div>
      </section>

      {/* 04 — ORNEMENTS */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Ornements — code, séparateurs, figures" onSurface />

          <div className="grid md:grid-cols-2 gap-12">
            {/* Code inline + bloc */}
            <div className="flex flex-col border-t border-surface-foreground/25 pt-6">
              <Eyebrow>
                <span className="text-accent-warm">Code — rare, sobre</span>
              </Eyebrow>
              <p className="text-body opacity-80 max-w-[42ch] mt-4 mb-6">
                Monospace système (pas d&apos;Instrument Mono, qui
                n&apos;existe pas dans la famille). Fond <code className="font-mono">ink/5%</code>,{" "}
                radius 0, padding discret.
              </p>
              <p className="text-caption opacity-75 mb-6">
                Exemple inline : le site tourne sur{" "}
                <code className="font-mono text-[0.9em] bg-bg/10 px-1.5 py-0.5">
                  Next.js 16
                </code>{" "}
                avec{" "}
                <code className="font-mono text-[0.9em] bg-bg/10 px-1.5 py-0.5">
                  React 19
                </code>
                .
              </p>
              <pre className="font-mono text-caption bg-bg/10 p-5 border-y border-surface-foreground/15 leading-relaxed overflow-x-auto">
{`// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}`}
              </pre>
            </div>

            {/* HR variantes */}
            <div className="flex flex-col border-t border-surface-foreground/25 pt-6">
              <Eyebrow>
                <span className="text-accent-warm">
                  Séparateurs — trois variantes
                </span>
              </Eyebrow>
              <p className="text-body opacity-80 max-w-[42ch] mt-4 mb-8">
                Un séparateur a toujours une raison. Filet fort entre
                sections, ornement typographique entre chapitres de prose,
                filet fin en clôture.
              </p>

              <div className="flex flex-col gap-10">
                <div>
                  <code className="font-mono text-caption opacity-65 block mb-3">
                    .hr-strong — sections majeures
                  </code>
                  <hr className="border-t border-surface-foreground/30" />
                </div>
                <div>
                  <code className="font-mono text-caption opacity-65 block mb-3">
                    .ornament — chapitres de prose
                  </code>
                  <div className="text-center font-display text-surface-foreground/40 tracking-[0.6em] text-[1.2rem]">
                    ✳&nbsp;&nbsp;✳&nbsp;&nbsp;✳
                  </div>
                </div>
                <div>
                  <code className="font-mono text-caption opacity-65 block mb-3">
                    .hr-soft — clôture d&apos;article
                  </code>
                  <hr className="border-t border-surface-foreground/15" />
                </div>
              </div>
            </div>
          </div>

          {/* Figure + figcaption démo */}
          <div className="mt-16 border-t border-surface-foreground/25 pt-6">
            <Eyebrow>
              <span className="text-accent-warm">
                Figure + figcaption — la légende sous l&apos;image
              </span>
            </Eyebrow>
            <figure className="mt-6 grid md:grid-cols-[1.6fr_1fr] gap-8 items-end">
              <div className="aspect-[3/2] bg-accent-warm/50" aria-hidden />
              <figcaption className="font-display italic text-caption opacity-80 leading-relaxed max-w-[36ch]">
                Atelier du rez-de-chaussée, quelques heures avant la
                première réunion.{" "}
                <span className="font-sans not-italic text-[0.875em] opacity-65">
                  — Photographie Jules Toussenel
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 05 — MARGINALIA */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Marginalia — la note en marge" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Signature magazine premium, reprise de Tufte et Gwern.
            Les notes tangentes, les précisions techniques, les références
            bibliographiques n&apos;interrompent pas la prose — elles se
            tiennent en marge droite sur desktop, remontent en footnote
            basse sur mobile.
          </p>

          {/* Démo live marginalia */}
          <div className="grid lg:grid-cols-[minmax(0,58ch)_1fr] gap-10 lg:gap-20 items-start border-t border-rule-strong pt-10">
            <article className="font-display text-body text-ink/85 leading-[1.75] max-w-[58ch]">
              <p className="mb-6">
                Le site est bâti sur Next.js 16<sup className="font-sans text-[0.65em] text-accent-deep align-super ml-0.5">1</sup>,
                une version qui a changé le contrat des images. Les
                formats AVIF et WebP sont privilégiés par défaut, avec un
                fallback automatique pour les anciens navigateurs<sup className="font-sans text-[0.65em] text-accent-deep align-super ml-0.5">2</sup>.
              </p>
              <p>
                Le grading des photos passe par une passe chaude
                légère, ajustée pour cohabiter avec la palette kaki sans
                jurer<sup className="font-sans text-[0.65em] text-accent-deep align-super ml-0.5">3</sup>.
                Aucune LUT cinéma, aucun vignetage.
              </p>
            </article>

            <aside className="flex flex-col gap-6 lg:pt-2 border-t lg:border-t-0 lg:border-l border-rule pt-6 lg:pt-0 lg:pl-8">
              <div className="text-caption text-ink/65 leading-snug">
                <sup className="font-sans text-accent-deep mr-1">1</sup>
                Next.js 16, stable depuis octobre 2025. App Router
                uniquement — Pages Router n&apos;est plus envisagé sur
                les nouveaux projets.
              </div>
              <div className="text-caption text-ink/65 leading-snug">
                <sup className="font-sans text-accent-deep mr-1">2</sup>
                AVIF ~20 % plus léger que WebP, rendu identique à
                l&apos;œil nu. Encodage côté serveur, une seule fois à
                la build.
              </div>
              <div className="text-caption text-ink/65 leading-snug">
                <sup className="font-sans text-accent-deep mr-1">3</sup>
                Température +3 à +5 K, saturation −8 %, noirs relevés
                à <code className="font-mono">#1A1A1A</code> max. Jamais{" "}
                <code className="font-mono">#000</code> pur — on respecte
                la toile de lin.
              </div>
            </aside>
          </div>

          <p className="text-caption text-ink/60 max-w-[58ch] mt-12 border-t border-rule pt-6">
            Sur mobile et tablette, les marginalia remontent
            automatiquement en bas de l&apos;article, sous un filet fin.
            Ancrage par exposants numérotés <sup>1</sup>
            <sup>2</sup>
            <sup>3</sup> reliés aux notes via{" "}
            <code className="font-mono text-accent-deep">{`<a href="#note-1">`}</code>.
          </p>
        </div>
      </section>

      {/* 06 — DÉTAILS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="06" label="Détails — small caps, abréviations, exposants" />

          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            <div>
              <Eyebrow>Small caps</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-6">
                Activées via{" "}
                <code className="font-mono text-accent-deep">
                  font-variant: small-caps
                </code>{" "}
                sur Instrument Sans. Réservées aux sigles, siècles
                romains, thead de tableau et eyebrows.
              </p>
              <div className="border-t border-rule-strong pt-4 flex flex-col gap-2 text-body">
                <div>
                  Sigle :{" "}
                  <span className="small-caps tracking-[0.04em]">
                    RGPD
                  </span>{" "}
                  ·{" "}
                  <span className="small-caps tracking-[0.04em]">
                    PME
                  </span>{" "}
                  ·{" "}
                  <span className="small-caps tracking-[0.04em]">
                    SEO
                  </span>
                </div>
                <div>
                  Siècle :{" "}
                  <span className="small-caps tracking-[0.04em]">
                    xxi
                  </span>
                  <sup className="text-[0.7em]">e</sup> siècle
                </div>
              </div>
            </div>

            <div>
              <Eyebrow>Abréviations</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-6">
                Balise{" "}
                <code className="font-mono text-accent-deep">
                  {"<abbr title>"}
                </code>{" "}
                avec soulignement pointillé. Tooltip natif HTML — pas de
                JS custom. Survol au navigateur.
              </p>
              <div className="border-t border-rule-strong pt-4 text-body text-ink/85 leading-relaxed">
                Le règlement{" "}
                <abbr
                  title="Règlement général sur la protection des données"
                  className="underline decoration-dotted decoration-ink/50 underline-offset-[3px] cursor-help"
                >
                  RGPD
                </abbr>{" "}
                impose un registre des traitements pour toute{" "}
                <abbr
                  title="Petite ou moyenne entreprise"
                  className="underline decoration-dotted decoration-ink/50 underline-offset-[3px] cursor-help"
                >
                  PME
                </abbr>{" "}
                qui collecte des données clients.
              </div>
            </div>

            <div>
              <Eyebrow>Exposants footnote</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-6">
                Ancrage des marginalia dans le texte courant. Instrument
                Sans, taille{" "}
                <code className="font-mono text-accent-deep">0.65em</code>,
                couleur <code className="font-mono">accent-deep</code>,
                décalage <code className="font-mono">super</code>.
              </p>
              <div className="border-t border-rule-strong pt-4 text-body text-ink/85 leading-relaxed">
                Le site tient les Core Web Vitals verts
                <sup className="font-sans text-[0.65em] text-accent-deep align-super ml-0.5">
                  1
                </sup>
                , y compris sur mobile 3G simulé
                <sup className="font-sans text-[0.65em] text-accent-deep align-super ml-0.5">
                  2
                </sup>
                .
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSE — SOURCES */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto border-t border-rule-strong pt-12">
          <Eyebrow>Sources consultées</Eyebrow>
          <ul className="flex flex-col gap-2 mt-4">
            <li>
              <Link
                href="https://practicaltypography.com/block-quotations.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-accent-deep hover:text-ink transition-colors"
              >
                practicaltypography.com — Block quotations (Butterick) ↗
              </Link>
            </li>
            <li>
              <Link
                href="https://practicaltypography.com/tables.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-accent-deep hover:text-ink transition-colors"
              >
                practicaltypography.com — Tables (Butterick) ↗
              </Link>
            </li>
            <li>
              <Link
                href="https://gwern.net/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-accent-deep hover:text-ink transition-colors"
              >
                gwern.net/about — Marginalia pattern ↗
              </Link>
            </li>
            <li>
              <Link
                href="https://www.robinrendle.com/essays/newsletters/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-accent-deep hover:text-ink transition-colors"
              >
                robinrendle.com — Essai long-form référence ↗
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Relire — Imagerie", href: "/design/imagerie" }}
        next={{ label: "Lire ensuite — Composants", href: "/design/composants" }}
      />
    </div>
  );
}
