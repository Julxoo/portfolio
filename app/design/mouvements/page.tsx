import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Mouvements — Design",
  description:
    "Motion rare, brève, jamais démonstrative. Sept animations retenues, huit bannies, aucune dépendance JS. Curseur à 15/100 entre statique et Awwwards.",
};

type Duration = {
  name: string;
  token: string;
  value: string;
  usage: string;
  ms: number;
};

const DURATIONS: Duration[] = [
  {
    name: "Instant",
    token: "duration-instant",
    value: "100 ms",
    usage: "Focus ring, active state — feedback tactile pur.",
    ms: 100,
  },
  {
    name: "Quick",
    token: "duration-quick",
    value: "180 ms",
    usage: "Hover, changements d'état UI (lien, bouton, card).",
    ms: 180,
  },
  {
    name: "Standard",
    token: "duration-standard",
    value: "280 ms",
    usage: "Ouverture/fermeture de panneaux, transitions de page.",
    ms: 280,
  },
  {
    name: "Deliberate",
    token: "duration-deliberate",
    value: "480 ms",
    usage: "Image qui se substitue, menu plein écran, moments éditoriaux rares.",
    ms: 480,
  },
];

type Easing = {
  name: string;
  token: string;
  bezier: string;
  usage: string;
};

const EASINGS: Easing[] = [
  {
    name: "easeOutQuint",
    token: "ease-out-quint",
    bezier: "cubic-bezier(0.22, 1, 0.36, 1)",
    usage: "Défaut — démarre vite, finit doucement. 90 % des cas.",
  },
  {
    name: "easeOutCubic",
    token: "ease-out-cubic",
    bezier: "cubic-bezier(0.33, 1, 0.68, 1)",
    usage: "Translations discrètes — moins prononcé que quint.",
  },
  {
    name: "easeInOut",
    token: "ease-in-out",
    bezier: "cubic-bezier(0.65, 0, 0.35, 1)",
    usage: "Cas symétriques — menu qui s'ouvre ET se ferme à l'identique.",
  },
];

type Animation = {
  n: string;
  name: string;
  duration: string;
  easing: string;
  desc: string;
};

const ANIMATIONS: Animation[] = [
  {
    n: "01",
    name: "Hover sur card projet",
    duration: "180 ms",
    easing: "ease-out-quint",
    desc: "Translation −2 px + apparition d'un filet 1 px sous le titre. Aucune ombre, aucune échelle.",
  },
  {
    n: "02",
    name: "Hover sur lien texte",
    duration: "180 ms",
    easing: "ease-out-quint",
    desc: "Soulignement qui s'étend de gauche à droite — via background-size sur un linear-gradient sous-jacent, pas border-bottom animé.",
  },
  {
    n: "03",
    name: "Focus visible",
    duration: "100 ms",
    easing: "ease-out-quint",
    desc: "Outline accent-deep 2 px avec offset 3 px. Apparition instantanée, disparition en 180 ms.",
  },
  {
    n: "04",
    name: "Ouverture menu mobile",
    duration: "280 ms",
    easing: "ease-out-quint",
    desc: "Translation verticale plein écran (translateY: −100% → 0). Pas de stagger sur les items, pas de fade sur les liens — le bloc entier glisse.",
  },
  {
    n: "05",
    name: "Transition de page",
    duration: "280 ms",
    easing: "ease-out-quint",
    desc: "Crossfade via View Transitions API native. Aucun wipe, aucun slide. Fallback gracieux sans JS : navigation instantanée classique.",
  },
  {
    n: "06",
    name: "Chargement des fontes (FOUT)",
    duration: "180 ms",
    easing: "ease-out-quint",
    desc: "Body à opacity 0 pendant ~100 ms, puis fade-in à 1 quand Instrument Serif + Sans sont prêts. Évite le swap brutal.",
  },
  {
    n: "07",
    name: "Apparition d'image au scroll",
    duration: "480 ms",
    easing: "ease-out-quint",
    desc: "Opacité 0 → 1 uniquement. Sans translation, sans blur-up, sans clip-path. Déclenché via IntersectionObserver à 15 % de visibilité.",
  },
];

type Banned = {
  name: string;
  reason: string;
};

const BANNED: Banned[] = [
  { name: "Scroll-reveal fade-up 20 px", reason: "Signature portfolio dev, immédiatement reconnaissable. L'image apparaît en opacity seul, sans translation." },
  { name: "Parallax (fond, image, texte)", reason: "Sensation d'app marketing, brise la stabilité du plan. Le site n'est pas une démo WebGL." },
  { name: "Curseur custom (point qui suit)", reason: "Esthétique agence 2021 — cercle qui suit, texte « view » au survol. Retenue éditoriale oblige." },
  { name: "Texte révélé lettre par lettre", reason: "SplitText, <span> animés par mot. Démonstratif, lent à la lecture, signe l'agence créative." },
  { name: "Loading spinner / preloader", reason: "Site vitrine, pas une SPA. Si chargement perçu, c'est un problème de perf — pas d'UX à compenser." },
  { name: "Magnetic buttons / hover elastic", reason: "Bouton qui suit le curseur avec effet gravité. Passager, déjà daté." },
  { name: "Scroll hijacking (Lenis, Locomotive)", reason: "Casse la vitesse système et impose un rythme étranger. Le scroll natif est parfait." },
  { name: "Marquee de logos en boucle", reason: "Esthétique SaaS 2023. Un témoignage vaut mille logos défilants." },
];

// Démo interactive : une pastille qui traverse toute la largeur du rail au hover.
// Durée et courbe en inline style — le namespace --duration-* de Tailwind v4 ne
// génère pas les utilitaires custom, on passe donc par style pour fiabilité 100 %.
function DemoTrack({
  durationMs,
  timingFunction,
}: {
  durationMs: number;
  timingFunction: string;
}) {
  return (
    <div className="relative h-[3px] bg-ink/10 w-full">
      <div
        className="absolute -top-[3px] size-[9px] bg-surface left-0 group-hover:left-[calc(100%-9px)]"
        style={{
          transitionProperty: "left",
          transitionDuration: `${durationMs}ms`,
          transitionTimingFunction: timingFunction,
        }}
      />
    </div>
  );
}

export default function Mouvements() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Mouvements" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Curseur à 15 sur 100.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Bouger juste <em className="italic text-surface">assez.</em>
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Entre le statique absolu et l&apos;Awwwards de 2022, on se place
            très près du premier. L&apos;animation sert à confirmer un clic, à
            lisser une rupture, à signaler qu&apos;un bouton a compris. Jamais à
            se faire remarquer. Si le mouvement attire le regard sur lui-même
            plutôt que sur le contenu, il est raté — on coupe.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>4 durées · 3 courbes</span>
            <span>7 animations retenues</span>
            <span>8 patterns bannis</span>
            <span>CSS natif · 0 lib</span>
          </div>
        </div>
      </section>

      {/* 01 — PHILOSOPHIE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Trois interdits fondateurs" />
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 border-t border-rule-strong pt-10">
            <div>
              <div className="font-display italic text-[2.5rem] text-surface leading-none mb-6">
                Pas d&apos;entrée
              </div>
              <p className="text-caption text-ink/75 max-w-[36ch]">
                Aucune animation d&apos;apparition théâtrale au premier chargement.
                Le site est déjà là quand la page est prête. Pas de reveal
                séquencé hero → blocs → footer.
              </p>
            </div>
            <div>
              <div className="font-display italic text-[2.5rem] text-surface leading-none mb-6">
                Pas de narration
              </div>
              <p className="text-caption text-ink/75 max-w-[36ch]">
                Pas de scrollytelling, pas de chapitrage qui se déploie au
                scroll. Le contenu est une page, pas un film. On lit à son
                rythme, pas à celui d&apos;un script.
              </p>
            </div>
            <div>
              <div className="font-display italic text-[2.5rem] text-surface leading-none mb-6">
                Pas de signature
              </div>
              <p className="text-caption text-ink/75 max-w-[36ch]">
                Aucun mouvement reconnaissable qui crie &laquo;&nbsp;c&apos;est
                un site fait par tel dev&nbsp;&raquo;. La signature, c&apos;est
                la typo et la palette — pas la façon dont les choses bougent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — DURÉES */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Quatre durées — sémantiques, pas numériques" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            On nomme les durées par <em className="italic">l&apos;intention</em>,
            pas par la valeur. Une durée comme{" "}
            <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
              duration-quick
            </code>{" "}
            survit à un ajustement ; <code className="font-mono">
              duration-200
            </code>{" "}
            devient absurde dès qu&apos;on change la valeur. Survole chaque
            ligne pour sentir la différence.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {DURATIONS.map((d) => (
              <div
                key={d.token}
                className="group grid md:grid-cols-[1fr_1.4fr_1.5fr] gap-6 py-6 border-b border-rule last:border-b-0 items-center cursor-default"
              >
                <div>
                  <div className="font-display italic text-[1.35rem] text-ink leading-tight">
                    {d.name}
                  </div>
                  <code className="font-mono text-caption text-accent-deep mt-1 block">
                    {d.token} · {d.value}
                  </code>
                </div>
                <p className="text-caption text-ink/75">{d.usage}</p>
                <DemoTrack
                  durationMs={d.ms}
                  timingFunction="cubic-bezier(0.22, 1, 0.36, 1)"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — COURBES */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Trois courbes — jamais ease générique" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Les easings par défaut (<code className="font-mono">ease</code>,{" "}
            <code className="font-mono">ease-in-out</code> standard) sont plats
            et techniques. Les sites premium utilisent des courbes qui
            démarrent vite et finissent doucement — comportement physique, pas
            démonstration de calcul. Survole pour voir.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {EASINGS.map((e) => (
              <div
                key={e.token}
                className="group grid md:grid-cols-[1fr_1.6fr_1.4fr] gap-6 py-6 border-b border-rule last:border-b-0 items-center cursor-default"
              >
                <div>
                  <div className="font-display italic text-[1.35rem] text-ink leading-tight">
                    {e.name}
                  </div>
                  <code className="font-mono text-caption text-accent-deep mt-1 block break-all">
                    {e.token}
                  </code>
                </div>
                <p className="text-caption text-ink/75">
                  <code className="font-mono text-[10px] block text-ink/65 mb-1">
                    {e.bezier}
                  </code>
                  {e.usage}
                </p>
                <DemoTrack
                  durationMs={900}
                  timingFunction={e.bezier}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — LES 7 ANIMATIONS */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Les sept animations retenues" onSurface />
          <p className="text-body opacity-80 max-w-[58ch] mb-16">
            Tout ce qui bouge sur le site passe par l&apos;une de ces sept
            animations. Pas une de plus. Trois sont démontrables ici (hover,
            focus), les quatre autres sont documentées pour implémentation.
          </p>

          <div className="flex flex-col border-t border-surface-foreground/25">
            {ANIMATIONS.map((a) => (
              <div
                key={a.n}
                className="grid md:grid-cols-[80px_1.3fr_2fr_1fr] gap-6 py-6 border-b border-surface-foreground/15 last:border-b-0 items-baseline"
              >
                <div className="text-eyebrow uppercase opacity-55">{a.n}</div>
                <div className="font-display italic text-[1.3rem] leading-tight">
                  {a.name}
                </div>
                <p className="text-body opacity-75">{a.desc}</p>
                <div className="flex flex-col gap-1 text-caption opacity-65">
                  <code className="font-mono">{a.duration}</code>
                  <code className="font-mono">{a.easing}</code>
                </div>
              </div>
            ))}
          </div>

          {/* Démos live — hover + focus */}
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            <div className="bg-bg text-ink p-10">
              <Eyebrow>Démo 01 · hover card</Eyebrow>
              <p className="text-caption text-ink/70 mt-3 mb-8 max-w-[36ch]">
                Survole le bloc — translation discrète et filet qui apparaît
                sous le titre. Aucune ombre.
              </p>
              <div className="group cursor-default">
                <div className="py-6 -translate-y-0 group-hover:-translate-y-[2px] transition-transform duration-quick ease-out-quint">
                  <div className="font-display italic text-[1.6rem] text-ink leading-tight mb-2">
                    Étude de cas — Panaille
                  </div>
                  <div className="h-px bg-transparent group-hover:bg-ink transition-colors duration-quick ease-out-quint" />
                  <p className="text-caption text-ink/60 mt-4">
                    Restaurant méditerranéen · 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-bg text-ink p-10">
              <Eyebrow>Démo 02 · hover lien</Eyebrow>
              <p className="text-caption text-ink/70 mt-3 mb-8 max-w-[36ch]">
                Soulignement qui s&apos;étend de gauche à droite — pas un
                border-bottom qui change de couleur.
              </p>
              <a
                href="#"
                className="relative font-display italic text-lead text-ink inline-block bg-[linear-gradient(var(--accent-deep),var(--accent-deep))] bg-no-repeat bg-left-bottom bg-[length:0%_1px] hover:bg-[length:100%_1px] transition-[background-size] duration-quick ease-out-quint pb-1"
              >
                Discutons du projet
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — CE QU'ON BANNIT */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Ce qu'on bannit absolument" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Ces huit patterns ne sont pas moralement mauvais — ils sont
            simplement <em className="italic">hors-sujet</em>. Chacun porte une
            esthétique reconnaissable (portfolio dev, agence créative 2022,
            SaaS B2B) qui contredit la posture éditoriale qu&apos;on défend.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {BANNED.map((b) => (
              <div
                key={b.name}
                className="grid md:grid-cols-[1fr_2.2fr] gap-6 py-5 border-b border-rule last:border-b-0"
              >
                <div className="font-display italic text-[1.15rem] text-ink">
                  {b.name}
                </div>
                <div className="text-body text-ink/75">{b.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — CHOIX TECHNIQUE + REDUCED MOTION */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="06" label="Choix technique — sans lib, sans excuse" />
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <Eyebrow>CSS natif pour 95 %</Eyebrow>
              <p className="text-body text-ink/80 max-w-[42ch] mt-4 mb-4">
                Les sept animations tiennent en{" "}
                <code className="font-mono text-accent-deep">transition</code>
                ,{" "}
                <code className="font-mono text-accent-deep">
                  @keyframes
                </code>{" "}
                et <code className="font-mono text-accent-deep">
                  IntersectionObserver
                </code>
                . Zéro dépendance runtime, zéro kilo-octet JS côté client.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                <strong>Ne pas installer</strong> framer-motion ni motion.dev.
                Surdimensionné pour ce besoin — et toute lib de motion pousse
                insidieusement vers &laquo;&nbsp;plus d&apos;animation&nbsp;&raquo;.
              </p>
            </div>

            <div>
              <Eyebrow>View Transitions API — natif</Eyebrow>
              <p className="text-body text-ink/80 max-w-[42ch] mt-4 mb-4">
                Pour les transitions entre pages : API navigateur stable sur
                Chrome, Edge, Safari 18+. Next.js 16 l&apos;expose via un
                opt-in côté router.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Fallback gracieux sans support : navigation instantanée
                classique. Aucune nécessité de polyfill.
              </p>
            </div>
          </div>

          <div className="border-t border-rule-strong mt-16 pt-10">
            <Eyebrow>prefers-reduced-motion — respecté globalement</Eyebrow>
            <p className="text-body text-ink/80 max-w-[58ch] mt-4 mb-6">
              Quand l&apos;utilisateur demande moins d&apos;animation, on
              respecte sans débat. Une règle globale dans{" "}
              <code className="font-mono text-accent-deep bg-bg px-1.5 py-0.5">
                app/globals.css
              </code>{" "}
              coupe toutes les transitions et animations à{" "}
              <code className="font-mono">0.01ms</code>. L&apos;état final
              compte, pas la transition qui y mène.
            </p>
            <pre className="font-mono text-caption text-ink/80 bg-bg p-6 overflow-x-auto leading-relaxed">
{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Relire — Signes", href: "/design/signes" }}
        next={{ label: "Lire ensuite — Voix", href: "/design/voix" }}
      />
    </div>
  );
}
