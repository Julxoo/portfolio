import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Lignes — Design",
  description:
    "Angles vifs, filets honnêtes, aucune ombre portée. La profondeur naît du blanc, du filet et de la couleur de fond — pas d'un flou gaussien.",
};

type Radius = {
  name: string;
  token: string;
  label: string;
  css: string;
  usage: string;
};

const RADII: Radius[] = [
  {
    name: "Aucun",
    token: "rounded-none",
    label: "0",
    css: "0",
    usage: "Défaut absolu. Images, cards, sections, boutons, inputs, tableaux.",
  },
  {
    name: "Hairline",
    token: "rounded-hairline",
    label: "2 px",
    css: "2px",
    usage: "Tags de catégorie, chips métadonnées, anneau de focus accessibilité.",
  },
  {
    name: "Pill",
    token: "rounded-pill",
    label: "9999 px",
    css: "9999px",
    usage: "Exception unique — avatar circulaire. Jamais sur un bouton.",
  },
];

type RuleRow = {
  cas: string;
  traitement: string;
};

const RULES: RuleRow[] = [
  { cas: "Séparation entre sections d'une même page", traitement: "border-t 1px sur toute la largeur, rule standard" },
  { cas: "Items d'une liste (projets, articles, services)", traitement: "border-b 1px sur chaque item, sauf le dernier" },
  { cas: "Tableaux (compétences, tarifs)", traitement: "border-t + border-b sur la table, filets entre lignes uniquement" },
  { cas: "Champs de formulaire", traitement: "border-b 1px uniquement — style fiche d'inscription musée" },
  { cas: "Cards projets", traitement: "Aucune bordure. Séparation par espace blanc et typo." },
  { cas: "Bouton primaire", traitement: "Fond surface kaki, aucune bordure" },
  { cas: "Lien / bouton secondaire", traitement: "border-b 1px sous le texte, ourlet typographique" },
  { cas: "Image", traitement: "Aucune bordure. Jamais." },
];

type InteractionRow = {
  intention: string;
  mecanique: string;
  code: string;
};

const INTERACTIONS: InteractionRow[] = [
  {
    intention: "Hover sur card projet",
    mecanique: "Translation verticale de −2 px + apparition d'un filet sous le titre",
    code: "translate-y-[-2px] + border-b",
  },
  {
    intention: "Hover sur bouton primaire",
    mecanique: "Inversion complète : le fond passe à ink, le texte à bg",
    code: "hover:bg-ink hover:text-bg",
  },
  {
    intention: "Hover sur lien souligné",
    mecanique: "Changement de couleur du filet vers accent-deep",
    code: "hover:border-accent-deep",
  },
  {
    intention: "Focus clavier (accessibilité)",
    mecanique: "Contour 2 px accent-deep avec offset de 3 px — pas de glow",
    code: "outline + outline-offset-[3px]",
  },
  {
    intention: "Header au scroll",
    mecanique: "Apparition d'un filet 1 px sous le header",
    code: "border-b border-rule",
  },
  {
    intention: "Modal / overlay",
    mecanique: "Backdrop ink/55 + filet 1 px autour du modal — pas de flou",
    code: "bg-ink/55 + border",
  },
];

export default function Lignes() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Lignes" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Dessiné à la règle, pas au pinceau flou.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Angles vifs, <em className="italic text-surface">filets honnêtes.</em>
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Le site ne sera jamais arrondi par habitude. Il ne portera jamais
            d&apos;ombre pour faire flotter un bloc. La profondeur naît du
            blanc qu&apos;on laisse entre les choses, du filet 1&nbsp;px qui
            sépare sans enfermer, et d&apos;une surface kaki qui pose un bloc
            sans l&apos;élever.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>Radius 0 par défaut</span>
            <span>2 exceptions nommées</span>
            <span>Filets 1 px · ink/12&nbsp;%</span>
            <span>Aucune box-shadow</span>
          </div>
        </div>
      </section>

      {/* 01 — ANGLES VIFS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Angles vifs — le radius" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 mb-16">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                L&apos;arrondi est devenu la signature du produit numérique —
                Stripe, Linear, Notion. L&apos;esthétique éditoriale et
                architecturale repose au contraire sur l&apos;angle vif comme
                marque de rigueur : c&apos;est le pendant visuel du trait tiré
                au cordeau dans une élévation d&apos;architecte.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                On ne tient donc pas d&apos;échelle{" "}
                <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
                  sm / md / lg
                </code>
                . On garde le zéro comme défaut, et deux exceptions nommées
                pour des cas très précis.
              </p>
            </div>

            <div className="flex flex-col border-t border-rule-strong">
              {RADII.map((r) => (
                <div
                  key={r.token}
                  className="flex items-center gap-6 py-6 border-b border-rule last:border-b-0"
                >
                  <div className="w-28 shrink-0 flex items-center justify-center">
                    {r.token === "rounded-none" && (
                      <div className="size-16 bg-surface" aria-hidden />
                    )}
                    {r.token === "rounded-hairline" && (
                      <div
                        className="px-4 py-2 bg-surface text-surface-foreground text-eyebrow uppercase"
                        style={{ borderRadius: r.css }}
                        aria-hidden
                      >
                        Tag
                      </div>
                    )}
                    {r.token === "rounded-pill" && (
                      <div
                        className="size-16 bg-surface"
                        style={{ borderRadius: r.css }}
                        aria-hidden
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-[1.35rem] leading-none text-ink">
                        {r.name}
                      </span>
                      <code className="font-mono text-caption text-surface">
                        {r.label}
                      </code>
                    </div>
                    <code className="font-mono text-caption text-accent-deep">
                      {r.token}
                    </code>
                    <p className="text-caption text-ink/75">{r.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16 border-t border-rule-strong pt-10">
            <div>
              <Eyebrow>Écarté — Échelle 4/8/12/16</Eyebrow>
              <p className="text-caption text-ink/70 mt-4">
                Transforme instantanément le site en dashboard. Contredit la
                rigueur d&apos;Instrument Serif.
              </p>
            </div>
            <div>
              <Eyebrow>Écarté — Radius asymétriques</Eyebrow>
              <p className="text-caption text-ink/70 mt-4">
                Effet « design-forward 2023 » sans précédent dans
                l&apos;archi-édition. Vieillit vite.
              </p>
            </div>
            <div>
              <Eyebrow>Écarté — Boutons pill</Eyebrow>
              <p className="text-caption text-ink/70 mt-4">
                Signature Jacquemus / DTC fashion. Aesop eux-mêmes ont des
                boutons rectangulaires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — FILETS HONNÊTES */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Filets honnêtes — les bordures" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 mb-16">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                La bordure éditoriale est un{" "}
                <em className="italic">filet typographique</em> — héritage du
                print. Elle <strong>sépare</strong>, elle{" "}
                <strong>n&apos;enferme pas</strong>. On bannit donc les
                bordures-cadres autour des cards : c&apos;est la signature du
                CRM, de Notion, de Linear.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch] mb-6">
                Épaisseur unique : <strong>1 px</strong>. Pas de 0,5 px
                hairline — sur écran non-Retina ou en zoom, il disparaît ou
                clignote. Le print premium travaille en 0,5 pt, mais son
                substrat est le papier, pas le pixel. Sur web, 1 px est la
                valeur honnête.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Trois couleurs sémantiques — un filet standard, un filet fort
                pour les moments pivots, un filet chaud pour les surfaces
                kaki.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="border-t border-rule pt-4 bg-bg p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <code className="font-mono text-caption text-accent-deep">
                    border-rule · ink/12%
                  </code>
                  <span className="text-eyebrow uppercase text-ink/65">
                    Standard
                  </span>
                </div>
                <p className="text-caption text-ink/70">
                  Séparateurs entre sections, lignes de liste, champs de
                  formulaire.
                </p>
              </div>
              <div className="border-t border-rule-strong pt-4 bg-bg p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <code className="font-mono text-caption text-accent-deep">
                    border-rule-strong · ink/25%
                  </code>
                  <span className="text-eyebrow uppercase text-ink/65">
                    Éditorial fort
                  </span>
                </div>
                <p className="text-caption text-ink/70">
                  H1 de chapitre, pied de page, transition de section pivot.
                </p>
              </div>
              <div className="border-t border-rule-warm pt-4 bg-surface p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <code className="font-mono text-caption text-accent-warm">
                    border-rule-warm
                  </code>
                  <span className="text-eyebrow uppercase opacity-55 text-surface-foreground">
                    Sur surface
                  </span>
                </div>
                <p className="text-caption text-surface-foreground/75">
                  Filet à utiliser dans un bloc sombre — accent-deep/20% pour
                  rester lisible sans cramer le kaki.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-rule-strong">
            <div className="grid md:grid-cols-[1fr_2fr] gap-6 py-4 border-b border-rule">
              <div className="text-eyebrow uppercase text-ink/65">Cas</div>
              <div className="text-eyebrow uppercase text-ink/65">
                Traitement
              </div>
            </div>
            {RULES.map((r) => (
              <div
                key={r.cas}
                className="grid md:grid-cols-[1fr_2fr] gap-6 py-5 border-b border-rule last:border-b-0"
              >
                <div className="font-display italic text-[1.1rem] text-ink">
                  {r.cas}
                </div>
                <div className="text-body text-ink/80">{r.traitement}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — L'OMBRE BANNIE */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="L'ombre bannie — les élévations" onSurface />
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 mb-16">
            <div>
              <p className="text-body opacity-80 max-w-[48ch] mb-6">
                Aucune <code className="font-mono">box-shadow</code> portée.
                Zéro. L&apos;ombre douce post-Material est l&apos;empreinte
                digitale du SaaS B2B 2015-2024 — Linear, Notion, Stripe. On
                sort complètement de cette convention.
              </p>
              <p className="text-body opacity-75 max-w-[48ch] mb-6">
                Les sites premium archi-mode-musée n&apos;en utilisent{" "}
                <strong>pas</strong>. Aesop, Loewe, Studio KO, Joseph Dirand,
                Vincent Van Duysen, muse.art — tous strictement plats. La
                planéité totale est devenue, depuis 2020, une marque de luxe.
              </p>
              <p className="text-body opacity-70 max-w-[48ch]">
                L&apos;élévation se signale autrement : par le blanc, par le
                filet qui apparaît, par l&apos;inversion de couleur, par la
                translation. Jamais par un flou gaussien.
              </p>
            </div>

            <div className="flex flex-col border-t border-surface-foreground/25">
              <div className="py-6 border-b border-surface-foreground/15">
                <Eyebrow>
                  <span className="text-accent-warm">Écarté · Soft shadows</span>
                </Eyebrow>
                <p className="text-caption opacity-70 mt-3">
                  <code className="font-mono">shadow-sm</code> à{" "}
                  <code className="font-mono">shadow-2xl</code> — signature
                  Tailwind UI / Linear. Disqualifie le positionnement.
                </p>
              </div>
              <div className="py-6 border-b border-surface-foreground/15">
                <Eyebrow>
                  <span className="text-accent-warm">Écarté · Shadow colorée</span>
                </Eyebrow>
                <p className="text-caption opacity-70 mt-3">
                  Accent-deep en blur étendu — effet « neon premium » agence
                  2022. Trop tendance, vieillit mal.
                </p>
              </div>
              <div className="py-6">
                <Eyebrow>
                  <span className="text-accent-warm">Écarté · Glow au focus</span>
                </Eyebrow>
                <p className="text-caption opacity-70 mt-3">
                  Remplacé par un <code className="font-mono">outline</code>{" "}
                  solide avec offset — plus lisible, plus accessible.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-bg text-ink p-8">
              <Eyebrow>Profondeur par le blanc</Eyebrow>
              <div className="mt-6 flex flex-col gap-2">
                <div className="h-2 bg-ink/15 w-3/4" />
                <div className="h-2 bg-ink/15 w-1/2" />
              </div>
              <p className="text-caption text-ink/70 mt-6">
                L&apos;espace vide autour d&apos;un bloc fait plus pour sa
                présence qu&apos;une ombre jamais ne le ferait.
              </p>
            </div>
            <div className="bg-accent-warm text-ink p-8">
              <Eyebrow>Profondeur par la couleur</Eyebrow>
              <div className="mt-6 h-12 bg-surface" />
              <p className="text-caption text-ink/70 mt-6">
                Changer de fond (bg → surface) suffit à signaler une
                hiérarchie — sans ajouter de flou.
              </p>
            </div>
            <div className="bg-bg text-ink p-8 border-t border-rule-strong">
              <Eyebrow>Profondeur par le filet</Eyebrow>
              <div className="mt-6 flex flex-col gap-2">
                <div className="h-2 bg-ink/15 w-3/4" />
                <div className="border-t border-rule mt-2 pt-3">
                  <div className="h-2 bg-ink/15 w-1/2" />
                </div>
              </div>
              <p className="text-caption text-ink/70 mt-6">
                Un filet 1 px sépare et structure, sans jamais enfermer ni
                faire flotter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — SIGNALER L'INTERACTION */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Signaler l'interaction — sans ombre" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Puisqu&apos;on s&apos;interdit l&apos;ombre, il faut une grammaire
            propre pour dire &laquo;&nbsp;cet élément est cliquable&nbsp;&raquo;,
            &laquo;&nbsp;tu es focus dessus&nbsp;&raquo;, &laquo;&nbsp;ceci
            flotte au-dessus du reste&nbsp;&raquo;. Six mécaniques couvrent
            tous les cas.
          </p>

          <div className="border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[1.2fr_2fr_1.3fr] gap-6 py-4 border-b border-rule">
              <div className="text-eyebrow uppercase text-ink/65">Intention</div>
              <div className="text-eyebrow uppercase text-ink/65">Mécanique</div>
              <div className="text-eyebrow uppercase text-ink/65">Code</div>
            </div>
            {INTERACTIONS.map((i) => (
              <div
                key={i.intention}
                className="grid md:grid-cols-[1.2fr_2fr_1.3fr] gap-6 py-6 border-b border-rule last:border-b-0"
              >
                <div className="font-display italic text-[1.1rem] text-ink">
                  {i.intention}
                </div>
                <div className="text-body text-ink/80">{i.mecanique}</div>
                <code className="font-mono text-caption text-accent-deep self-center">
                  {i.code}
                </code>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-6">
            <div className="bg-accent-warm/25 p-10">
              <Eyebrow>Démo — hover primaire</Eyebrow>
              <p className="text-caption text-ink/70 mt-3 mb-8 max-w-[36ch]">
                Inversion complète. Aucune ombre, aucun dégradé. Le bloc
                kaki devient le bloc encre.
              </p>
              <button
                type="button"
                className="font-display italic text-lead bg-surface text-surface-foreground px-8 py-4 hover:bg-ink hover:text-bg transition-colors"
              >
                Discutons du projet
              </button>
            </div>
            <div className="bg-accent-warm/25 p-10">
              <Eyebrow>Démo — focus accessibilité</Eyebrow>
              <p className="text-caption text-ink/70 mt-3 mb-8 max-w-[36ch]">
                Clique puis appuie sur Tab pour voir le contour décalé —
                jamais de halo flou.
              </p>
              <button
                type="button"
                className="font-display italic text-lead text-ink border-b border-ink hover:border-accent-deep focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-[3px] transition-colors"
              >
                Voir une étude de cas
              </button>
            </div>
          </div>

          <p className="text-body text-ink/65 max-w-[58ch] mt-16">
            Définis dans{" "}
            <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
              app/globals.css
            </code>{" "}
            via <code className="font-mono">@theme inline</code>. Les tokens{" "}
            <code className="font-mono">--r-*</code> et{" "}
            <code className="font-mono">--rule-*</code> alimentent les
            utilitaires Tailwind <code className="font-mono">rounded-*</code>{" "}
            et <code className="font-mono">border-rule-*</code>. Toute
            exception doit être nommée, jamais systématisée en échelle.
          </p>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Relire — Grille", href: "/design/grille" }}
        next={{ label: "Lire ensuite — Signes", href: "/design/signes" }}
      />
    </div>
  );
}
