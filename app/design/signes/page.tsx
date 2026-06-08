import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";
import { IconMenu, IconPlay, IconSearch } from "../../_lib/icons";

export const metadata: Metadata = {
  title: "Signes — Design",
  description:
    "Iconographie du site — 80% de caractères typographiques, 20% de SVG custom, zéro librairie. Le mot avant le signe.",
};

type Glyph = {
  char: string;
  unicode: string;
  name: string;
  usage: string;
  demo: string;
};

const GLYPHS: Glyph[] = [
  {
    char: "→",
    unicode: "U+2192",
    name: "Flèche droite",
    usage: "Liens « Voir le projet », CTA, navigation suivant.",
    demo: "Lire le projet",
  },
  {
    char: "↓",
    unicode: "U+2193",
    name: "Flèche bas",
    usage: "Scroll indicator sous le hero.",
    demo: "Explorer",
  },
  {
    char: "↗",
    unicode: "U+2197",
    name: "Flèche haut-droite",
    usage: "Lien externe, ouvre dans un nouvel onglet.",
    demo: "Site client",
  },
  {
    char: "×",
    unicode: "U+00D7",
    name: "Multiplication",
    usage: "Fermer modal ou menu — préférer le mot « Fermer ».",
    demo: "Fermer",
  },
  {
    char: "+",
    unicode: "U+002B",
    name: "Plus",
    usage: "Ouvrir un panneau d'accordéon FAQ.",
    demo: "Déplier",
  },
  {
    char: "−",
    unicode: "U+2212",
    name: "Moins (mathématique)",
    usage: "Replier un panneau — pas le hyphen U+002D.",
    demo: "Replier",
  },
  {
    char: "·",
    unicode: "U+00B7",
    name: "Bullet médian",
    usage: "Séparateur inline, métadonnées, liste en ligne.",
    demo: "Article · 2026 · 4 min",
  },
  {
    char: "&",
    unicode: "U+0026",
    name: "Esperluette",
    usage: "Titres, coordinations éditoriales — superbe en Instrument Serif italique.",
    demo: "Savoir-faire & patience",
  },
];

type CustomIcon = {
  key: string;
  name: string;
  usage: string;
  svg: React.ComponentType<{ size?: number | string; "aria-label"?: string }>;
};

const CUSTOM_ICONS: CustomIcon[] = [
  {
    key: "search",
    name: "Search",
    usage: "Recherche dans la liste des projets ou des articles.",
    svg: IconSearch,
  },
  {
    key: "play",
    name: "Play",
    usage: "Vignette vidéo d'un projet client — jamais en bouton isolé.",
    svg: IconPlay,
  },
  {
    key: "menu",
    name: "Menu",
    usage: "Burger navigation mobile — préférer le mot « Menu » quand la place le permet.",
    svg: IconMenu,
  },
];

type Banned = {
  name: string;
  reason: string;
};

const BANNED: Banned[] = [
  { name: "Heroicons", reason: "Signature Tailwind UI / dashboard produit — lecture instantanée SaaS." },
  { name: "Lucide / Feather", reason: "Stroke round + style tech startup 2020. Incompatible avec nos angles vifs." },
  { name: "Phosphor", reason: "Multiples poids = dilution de la cohérence. Terminaisons arrondies." },
  { name: "Material / Google Icons", reason: "L'ADN Android — disqualifie toute prétention éditoriale." },
  { name: "Font Awesome", reason: "Glyphes remplis, esthétique Web 2.0 jamais sortie de 2012." },
  { name: "Logos réseaux en couleur d'origine", reason: "Meta bleu, Instagram dégradé rose-orange — casse la palette en 2 secondes." },
  { name: "Toute icône décorative", reason: "Si elle n'est ni cliquable ni informative, elle dégage. Pas de fioritures." },
  { name: "Font-icons (@font-face)", reason: "Surdimensionné pour 3 glyphes, casse l'a11y, rendu subpixel imprévisible." },
];

export default function Signes() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Signes" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Le mot avant le signe.
          </p>
          <h1 className="font-display text-display text-ink max-w-[14ch] mb-10">
            Signes, <em className="italic text-surface">pas icônes.</em>
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Les sites qu&apos;on admire — Studio KO, Joseph Dirand, Van Duysen,
            Aesop, Ressource — partagent une discipline qu&apos;on méconnaît :
            ils n&apos;utilisent presque aucune icône. Une flèche qui sort du
            serif italique, le mot &laquo;&nbsp;Fermer&nbsp;&raquo; à la place
            d&apos;une croix, &laquo;&nbsp;Instagram&nbsp;&raquo; écrit au lieu
            d&apos;un logo. Le glyphe typographique fait l&apos;icône — et mieux.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>8 caractères Unicode</span>
            <span>3 SVG custom maison</span>
            <span>0 librairie d&apos;icônes</span>
            <span>Trait 1 px · linecap square</span>
          </div>
        </div>
      </section>

      {/* 01 — LE MOT AVANT LE SIGNE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Le mot avant le signe" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Avant de dessiner une icône, on se demande si un mot ne ferait
                pas mieux. La réponse est <em className="italic">oui</em> dans
                la majorité des cas. &laquo;&nbsp;Fermer&nbsp;&raquo; est plus
                lisible qu&apos;une croix, &laquo;&nbsp;Menu&nbsp;&raquo; plus
                universel qu&apos;un burger, &laquo;&nbsp;Instagram&nbsp;&raquo;
                plus élégant qu&apos;un logo dégradé.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Quand le mot ne peut pas, on utilise un{" "}
                <em className="italic">glyphe typographique</em> — Instrument
                Serif a des flèches, une esperluette et un bullet médian
                magnifiques qu&apos;on sous-exploiterait à avoir un set
                d&apos;icônes.
              </p>
            </div>

            <div className="flex flex-col border-t border-rule-strong">
              <div className="flex items-baseline justify-between py-6 border-b border-rule">
                <span className="font-display italic text-[1.4rem] text-ink/65 line-through decoration-[0.5px]">
                  ✕  burger  ▶
                </span>
                <span className="text-eyebrow uppercase text-ink/65">Écarté</span>
              </div>
              <div className="flex items-baseline justify-between py-6 border-b border-rule">
                <span className="font-display italic text-[1.4rem] text-ink">
                  Fermer &nbsp;·&nbsp; Menu &nbsp;·&nbsp; Lire
                </span>
                <span className="text-eyebrow uppercase text-accent-deep">
                  Retenu
                </span>
              </div>
              <div className="flex items-baseline justify-between py-6">
                <span className="font-display italic text-[1.8rem] text-surface">
                  → &nbsp; ↓ &nbsp; ↗ &nbsp; &amp;
                </span>
                <span className="text-eyebrow uppercase text-accent-deep">
                  Retenu
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — GLYPHES TYPOGRAPHIQUES */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Glyphes typographiques — 80% des besoins" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Huit caractères Unicode couvrent l&apos;essentiel. Ils héritent de
            la typo courante, se mettent à l&apos;échelle sans flou, et ne
            coûtent rien au bundle. Instrument Serif italique les rend
            particulièrement vivants — la flèche <em className="italic">→</em>{" "}
            n&apos;a rien d&apos;informatique, elle a un trait calligraphique.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[80px_1.2fr_1.4fr_1fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>Glyphe</div>
              <div>Nom · Unicode</div>
              <div>Usage</div>
              <div className="text-right">Démo</div>
            </div>
            {GLYPHS.map((g) => (
              <div
                key={g.unicode}
                className="grid md:grid-cols-[80px_1.2fr_1.4fr_1fr] gap-6 py-6 border-b border-rule last:border-b-0 items-center"
              >
                <div className="font-display italic text-surface text-[2.5rem] leading-none">
                  {g.char}
                </div>
                <div>
                  <div className="font-display italic text-[1.1rem] text-ink leading-tight">
                    {g.name}
                  </div>
                  <code className="font-mono text-caption text-ink/65 mt-1 block">
                    {g.unicode}
                  </code>
                </div>
                <div className="text-caption text-ink/75">{g.usage}</div>
                <div className="md:text-right font-display italic text-[1.1rem] text-accent-deep">
                  {g.demo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — SET CUSTOM */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Set custom — 3 SVG maison" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 mb-16">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Trois cas où le caractère ne suffit pas : la{" "}
                <em className="italic">loupe</em>, le{" "}
                <em className="italic">triangle de lecture</em>, le{" "}
                <em className="italic">burger mobile</em>. On les dessine à la
                main dans Figma sur une grille 24×24 et on les pose{" "}
                <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
                  inline
                </code>{" "}
                dans le JSX. Aucun fichier de lib, aucune font-icon, aucun
                sprite générique.
              </p>
              <div className="border-t border-rule-strong pt-6">
                <Eyebrow>Specs strictes</Eyebrow>
                <dl className="mt-4 flex flex-col gap-3 text-caption">
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink/70">Grille</dt>
                    <dd className="font-mono text-ink">24 × 24</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink/70">Trait</dt>
                    <dd className="font-mono text-ink">stroke-width: 1</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink/70">Terminaisons</dt>
                    <dd className="font-mono text-ink">linecap: square</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink/70">Jointures</dt>
                    <dd className="font-mono text-ink">linejoin: miter</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink/70">Remplissage</dt>
                    <dd className="font-mono text-ink">fill: none</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink/70">Couleur</dt>
                    <dd className="font-mono text-ink">currentColor</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink/70">Taille inline</dt>
                    <dd className="font-mono text-ink">1em</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="flex flex-col border-t border-rule-strong">
              {CUSTOM_ICONS.map((i) => {
                const Icon = i.svg;
                return (
                  <div
                    key={i.key}
                    className="flex items-center gap-8 py-8 border-b border-rule last:border-b-0"
                  >
                    <div className="w-24 shrink-0 flex items-center justify-center text-ink">
                      <Icon size={48} aria-label={i.name} />
                    </div>
                    <div className="flex-1">
                      <div className="font-display text-[1.35rem] leading-tight text-ink mb-1">
                        {i.name}
                      </div>
                      <code className="font-mono text-caption text-accent-deep">
                        {`<Icon${i.name} />`}
                      </code>
                      <p className="text-caption text-ink/70 mt-3 max-w-[40ch]">
                        {i.usage}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-rule-strong pt-10 grid md:grid-cols-3 gap-10">
            <div>
              <Eyebrow>Taille</Eyebrow>
              <p className="text-caption text-ink/75 mt-4 max-w-[36ch]">
                Toujours alignée sur la cap-height du texte adjacent.{" "}
                <code className="font-mono">1em</code> par défaut, jamais plus
                grande que le mot qu&apos;elle accompagne.
              </p>
            </div>
            <div>
              <Eyebrow>Couleur</Eyebrow>
              <p className="text-caption text-ink/75 mt-4 max-w-[36ch]">
                <code className="font-mono">currentColor</code> — hérite de la
                typo. <code className="font-mono">accent-deep</code> au hover
                d&apos;un lien, jamais en état repos.
              </p>
            </div>
            <div>
              <Eyebrow>Espacement</Eyebrow>
              <p className="text-caption text-ink/75 mt-4 max-w-[36ch]">
                0.4em minimum entre l&apos;icône et son texte. Alignement{" "}
                baseline pour les caractères, center optique (−1 px) pour les
                SVG.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — RÉSEAUX EN TOUTES LETTRES */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead
            n="04"
            label="Les réseaux en toutes lettres"
            onSurface
          />
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16">
            <div>
              <p className="text-body opacity-80 max-w-[48ch] mb-6">
                Mettre le logo Instagram en dégradé rose-orange ou le logo
                LinkedIn en bleu cobalt dans le footer, c&apos;est casser la
                palette en deux secondes et signer &laquo;&nbsp;startup
                2014&nbsp;&raquo;. Studio KO, Dirand, Van Duysen, Ressource,
                Aesop écrivent le nom du réseau en toutes lettres. C&apos;est
                ce qu&apos;on fait.
              </p>
              <p className="text-body opacity-75 max-w-[48ch]">
                Trois traitements selon la densité voulue — nom complet pour
                les pieds de page éditoriaux, initiales petites capitales pour
                les navs inline, abréviation quand la place manque vraiment.
              </p>
            </div>

            <div className="flex flex-col border-t border-surface-foreground/25">
              <div className="py-6 border-b border-surface-foreground/15">
                <div className="text-eyebrow uppercase text-accent-warm mb-3">
                  Traitement A · Nom complet
                </div>
                <div className="font-display italic text-[1.6rem] leading-tight">
                  Instagram &nbsp;·&nbsp; LinkedIn &nbsp;·&nbsp; Are.na
                </div>
              </div>
              <div className="py-6 border-b border-surface-foreground/15">
                <div className="text-eyebrow uppercase text-accent-warm mb-3">
                  Traitement B · Petites capitales
                </div>
                <div className="text-eyebrow uppercase tracking-[0.2em]">
                  IG &nbsp;·&nbsp; IN &nbsp;·&nbsp; AR
                </div>
              </div>
              <div className="py-6">
                <div className="text-eyebrow uppercase text-accent-warm mb-3">
                  Écarté · Logo officiel
                </div>
                <p className="text-caption opacity-70 max-w-[36ch]">
                  Le logo Meta ou LinkedIn en couleurs d&apos;origine trahit
                  la palette. Même désaturé, il reste reconnaissable et
                  évoque la tech — hors-sujet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — CE QU'ON BANNIT */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Ce qu'on bannit absolument" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            La liste n&apos;est pas polémique — elle est simplement
            conséquente. Chaque librairie ci-dessous a une signature visuelle
            forte qui devient la vôtre malgré vous, et aucune ne tient face à
            Instrument Serif.
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

          <p className="text-body text-ink/65 max-w-[58ch] mt-16">
            Les 3 SVG custom vivent dans{" "}
            <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
              app/_lib/icons.tsx
            </code>
            . Ajouter un glyphe, c&apos;est l&apos;exception, pas la règle —
            on ouvre Figma, on dessine sur la grille 24×24 aux specs
            ci-dessus, et on pose le SVG inline. Jamais un{" "}
            <code className="font-mono">npm install</code> d&apos;icônes.
          </p>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Relire — Lignes", href: "/design/lignes" }}
        next={{ label: "Lire ensuite — Mouvements", href: "/design/mouvements" }}
      />
    </div>
  );
}
