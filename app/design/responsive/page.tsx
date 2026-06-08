import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Responsive — Design",
  description:
    "Mobile-first, fluide d'abord, breakpoints ensuite. Cinq breakpoints Tailwind v4, container queries ciblées, dvh partout. Les breakpoints sont des moments éditoriaux, pas des seuils device.",
};

type Breakpoint = {
  prefix: string;
  value: string;
  usage: string;
  example: string;
};

const BREAKPOINTS: Breakpoint[] = [
  { prefix: "(aucun)", value: "< 40 rem", usage: "Mobile portrait. Stack complet, 1 colonne, nav en drawer.", example: "Header compact, grille projets 1 col, CTA pleine largeur" },
  { prefix: "sm:", value: "40 rem · 640 px", usage: "Mobile paysage, petites tablettes. Usage rare.", example: "Bloc meta 1 → 2 colonnes" },
  { prefix: "md:", value: "48 rem · 768 px", usage: "Pivot principal mobile → desktop.", example: "Header horizontal, nav déroulée, grille projets 2 col" },
  { prefix: "lg:", value: "64 rem · 1024 px", usage: "Desktop confortable.", example: "Grille 3 col, layout 2/3 + 1/3, hero multi-blocs" },
  { prefix: "xl:", value: "80 rem · 1280 px", usage: "Container-default atteint sa mesure max.", example: "Marges éditoriales confortables, grille 4 col denses" },
  { prefix: "2xl:", value: "96 rem · 1536 px", usage: "Écrans larges. Usage défensif.", example: "Augmente marges extérieures. PAS de nouvelle colonne." },
];

type ReadingMeasure = {
  name: string;
  value: string;
  usage: string;
};

const READING: ReadingMeasure[] = [
  { name: "Légende / micro-copy", value: "32ch", usage: "Légendes photo, notes de marge, crédits" },
  { name: "Corps d'article", value: "42ch", usage: "Articles du carnet, colonne de lecture longue" },
  { name: "Lead / description", value: "58ch", usage: "Chapô, descriptions projet, paragraphes hero" },
  { name: "Long-form exceptionnel", value: "80ch (max)", usage: "Pages méthode, mentions légales. Jamais au-delà — l'œil perd la ligne." },
];

type ContainerUse = {
  component: string;
  reason: string;
};

const CONTAINER_QUERIES_USE: ContainerUse[] = [
  { component: "CardProject", reason: "Même card dans home (1-3 col), index (2-4 col), « projets liés » bas de fiche (2 col étroit). Bascule image dessus/côté via @container." },
  { component: "ContactBlock", reason: "Dans le footer global vs dans une sidebar d'article — même composant, deux contextes de largeur." },
  { component: "NoteCard (carnet court)", reason: "Parfois seul pleine largeur, parfois en grille 3-up. Le composant s'adapte au parent." },
  { component: "Portail client — drive de projet", reason: "Densité variable selon sidebar ouverte/fermée." },
];

type Banned = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_RESPONSIVE: Banned[] = [
  { n: "01", title: "Breakpoints device-named (tablet, laptop, ultrawide)", reason: "Les devices se multiplient, les noms vieillissent. On reste sur sm/md/lg/xl/2xl universels." },
  { n: "02", title: "Système à 8+ breakpoints (Bootstrap 5 style)", reason: "Sur-complexe. Si on a besoin de plus de 5 seuils, c'est qu'un composant réclame une container query." },
  { n: "03", title: "vh nu (sans dvh)", reason: "Sur iOS Safari, 100vh inclut la barre URL — saute de 100px quand elle disparaît. Dette en 2026." },
  { n: "04", title: "Hover effects non gated", reason: "Sur touch, :hover fantôme persiste après tap — bug Sticky Hover. Toujours @media (hover: hover)." },
  { n: "05", title: "max-width en breakpoint principal", reason: "Pattern desktop-first — on conçoit mobile-first, jamais l'inverse." },
  { n: "06", title: "Container queries sur le layout racine", reason: "Le layout racine réagit au viewport, pas au parent. LogRocket : macro = media, micro = container." },
  { n: "07", title: "Valeurs arbitraires pour un breakpoint global", reason: "min-[912px]: une fois = fine. Trois fois = il manque un breakpoint sémantique. Refactoriser." },
  { n: "08", title: "Media query d'orientation (portrait/landscape) sauf cas précis", reason: "Sur mobile paysage, dvh + nav en drawer gèrent déjà. Orientation utile uniquement pour visualiseur plein écran." },
  { n: "09", title: "Grille qui passe de 4 à 1 colonne sans 2 ou 3 intermédiaire", reason: "Rupture brutale. Toujours prévoir les paliers 1 → 2 → 3 → 4." },
  { n: "10", title: "JavaScript pour détecter le breakpoint côté rendu", reason: "CSS suffit. JS pour breakpoints = hydration mismatch + flash au chargement." },
];

export default function Responsive() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Responsive" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Fluide d&apos;abord, breakpoints ensuite.
          </p>
          <h1 className="font-display text-display text-ink max-w-[18ch] mb-10">
            Des <em className="italic text-surface">moments</em>, pas des
            seuils device.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Les breakpoints ne sont pas{" "}
            <em className="italic">« mobile »</em>,{" "}
            <em className="italic">« tablette »</em>,{" "}
            <em className="italic">« desktop »</em>&nbsp;— ce sont des
            moments où la mise en page éditoriale décroche visuellement.
            Tout le reste glisse en{" "}
            <code className="font-mono text-accent-deep">clamp()</code>
            {" "}entre ces moments. Mobile-first, cinq breakpoints
            universels, container queries ciblées.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>5 breakpoints Tailwind v4</span>
            <span>Pivot principal : md: 48 rem</span>
            <span>Container queries sur 4 composants</span>
            <span>dvh partout</span>
          </div>
        </div>
      </section>

      {/* 01 — BREAKPOINTS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Cinq breakpoints — Tailwind v4 par défaut, pas d'ajout" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            On garde les défauts exactement. Ajouter un{" "}
            <code className="font-mono text-accent-deep">xs</code> ou un{" "}
            <code className="font-mono text-accent-deep">3xl</code>
            {" "}introduit du bruit sans gain éditorial. Si un composant a
            besoin de plus de 5 seuils, il réclame une container query,
            pas un breakpoint global.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[1fr_1.2fr_2fr_2.4fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>Préfixe</div>
              <div>Valeur</div>
              <div>Usage éditorial</div>
              <div>Exemples concrets</div>
            </div>
            {BREAKPOINTS.map((b) => (
              <div
                key={b.prefix}
                className="grid md:grid-cols-[1fr_1.2fr_2fr_2.4fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
              >
                <code className="font-mono text-caption text-accent-deep">
                  {b.prefix}
                </code>
                <code className="font-mono text-caption text-ink/80">
                  {b.value}
                </code>
                <div className="text-body text-ink/85">{b.usage}</div>
                <div className="text-caption text-ink/70">{b.example}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — MESURES DE LECTURE */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Mesures de lecture — en ch, pas en rem" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Les largeurs de texte se mesurent en caractères (
            <code className="font-mono text-accent-deep">ch</code>), pas en
            pixels — c&apos;est l&apos;œil qui compte, pas l&apos;écran.
            Quatre mesures retenues, aucune au-delà de 80ch (l&apos;œil
            perd la ligne).
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {READING.map((r) => (
              <div
                key={r.name}
                className="grid md:grid-cols-[1.3fr_1fr_2.2fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="font-display italic text-[1.1rem] text-ink">
                  {r.name}
                </div>
                <code className="font-mono text-caption text-accent-deep">
                  max-w-[{r.value}]
                </code>
                <div className="text-body text-ink/75">{r.usage}</div>
              </div>
            ))}
          </div>

          <p className="text-caption text-ink/60 max-w-[58ch] mt-12">
            Typographie et espaces sont déjà en{" "}
            <code className="font-mono text-accent-deep">clamp()</code>{" "}
            via les tokens{" "}
            <code className="font-mono text-accent-deep">--text-*</code>,{" "}
            <code className="font-mono text-accent-deep">--section-*</code>,{" "}
            <code className="font-mono text-accent-deep">--gutter</code>.
            Les breakpoints pilotent uniquement les{" "}
            <em className="italic">changements de layout</em> — nombre de
            colonnes, flux, position — pas les tailles.
          </p>
        </div>
      </section>

      {/* 03 — CONTAINER QUERIES */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Container queries — ciblées, quatre composants" />
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Tailwind v4 les supporte nativement (
                <code className="font-mono text-accent-deep">@container</code>
                {" "}+{" "}
                <code className="font-mono text-accent-deep">
                  @sm:
                </code>{" "}
                /{" "}
                <code className="font-mono text-accent-deep">@md:</code>).
                Baseline 2023, support ~96 % en 2026.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch] mb-6">
                Règle LogRocket 2026 :{" "}
                <em className="italic">
                  macro = media queries, micro = container queries
                </em>
                . Le layout racine réagit au viewport ; les composants
                isolés réagissent à leur parent.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                On ne les utilise ni sur le Header, ni sur le Footer, ni
                sur le layout racine. Uniquement sur des composants qui
                apparaissent dans plusieurs contextes de largeur.
              </p>
            </div>

            <div className="flex flex-col border-t border-rule-strong">
              {CONTAINER_QUERIES_USE.map((c) => (
                <div
                  key={c.component}
                  className="py-5 border-b border-rule last:border-b-0"
                >
                  <div className="font-display italic text-[1.15rem] text-ink mb-2">
                    {c.component}
                  </div>
                  <p className="text-body text-ink/75 max-w-[52ch]">
                    {c.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — VIEWPORT UNITS & PATTERNS */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="dvh, hover, print — trois patterns modernes" onSurface />
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 border-t border-surface-foreground/25 pt-10">
            <div>
              <Eyebrow>
                <span className="text-accent-warm">dvh partout</span>
              </Eyebrow>
              <p className="text-body opacity-80 max-w-[36ch] mt-4 mb-6">
                <code className="font-mono text-accent-warm">100dvh</code>{" "}
                partout où on aurait écrit{" "}
                <code className="font-mono text-accent-warm">100vh</code>,
                sans fallback. Baseline 2022, aucune raison de conserver
                l&apos;ancien pattern en 2026.
              </p>
              <p className="text-caption opacity-65 max-w-[36ch]">
                Concernés : hero plein écran, overlay menu mobile,{" "}
                <code className="font-mono">min-h-dvh</code> sur{" "}
                <code className="font-mono">&lt;main&gt;</code> pour
                éviter le saut iOS.
              </p>
            </div>

            <div>
              <Eyebrow>
                <span className="text-accent-warm">@media (hover: hover)</span>
              </Eyebrow>
              <p className="text-body opacity-80 max-w-[36ch] mt-4 mb-6">
                Toutes les micro-animations hover enveloppées dans{" "}
                <code className="font-mono text-accent-warm">
                  @media (hover: hover) and (pointer: fine)
                </code>
                . Sur touch&nbsp;: pas de hover fantôme.
              </p>
              <p className="text-caption opacity-65 max-w-[36ch]">
                Règle le bug « sticky hover » iOS sur les cards. Les états
                actifs deviennent <code className="font-mono">:active</code>{" "}
                avec transitions courtes (120&nbsp;ms).
              </p>
            </div>

            <div>
              <Eyebrow>
                <span className="text-accent-warm">@media print</span>
              </Eyebrow>
              <p className="text-body opacity-80 max-w-[36ch] mt-4 mb-6">
                La voix éditoriale défend le{" "}
                <em className="italic">« test du papier »</em> — on
                l&apos;applique littéralement. Trois surfaces
                imprimables&nbsp;:{" "}
                <code className="font-mono">/projets/[slug]</code>,{" "}
                <code className="font-mono">/methode</code>,{" "}
                <code className="font-mono">/contact</code> après envoi.
              </p>
              <p className="text-caption opacity-65 max-w-[36ch]">
                URLs expansées via{" "}
                <code className="font-mono">a[href]::after</code>,
                typographie conservée, images en qualité print.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — IMAGES SIZES */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Images responsive — trois patterns sizes" />
          <div className="flex flex-col border-t border-rule-strong">
            <div className="py-5 border-b border-rule">
              <div className="font-display italic text-[1.1rem] text-ink mb-2">
                Hero image
              </div>
              <pre className="font-mono text-caption text-accent-deep bg-accent-warm/25 p-4 leading-relaxed overflow-x-auto max-w-[52rem]">
                {`sizes="100vw"  preload={true}  fetchPriority="high"`}
              </pre>
            </div>
            <div className="py-5 border-b border-rule">
              <div className="font-display italic text-[1.1rem] text-ink mb-2">
                CardProject en grille
              </div>
              <pre className="font-mono text-caption text-accent-deep bg-accent-warm/25 p-4 leading-relaxed overflow-x-auto max-w-[52rem]">
                {`sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw"`}
              </pre>
            </div>
            <div className="py-5">
              <div className="font-display italic text-[1.1rem] text-ink mb-2">
                Image dans corps d&apos;article (mesure 58ch)
              </div>
              <pre className="font-mono text-caption text-accent-deep bg-accent-warm/25 p-4 leading-relaxed overflow-x-auto max-w-[52rem]">
                {`sizes="(min-width: 48rem) 58rem, 100vw"`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — BANNIS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="06" label="Dix patterns bannis" />
          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_RESPONSIVE.map((b) => (
              <div
                key={b.n}
                className="grid md:grid-cols-[60px_1.2fr_1.8fr] gap-6 py-6 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="text-eyebrow uppercase text-ink/65">{b.n}</div>
                <div className="font-display italic text-[1.15rem] text-ink leading-snug">
                  {b.title}
                </div>
                <div className="text-body text-ink/75">{b.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Relire — Clair", href: "/design/clair" }}
        next={{ label: "Lire ensuite — Accessibilité", href: "/design/accessibilite" }}
      /></div>
  );
}
