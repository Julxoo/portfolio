import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";
import { Button, ButtonLink } from "../../_lib/ui/Button";
import { InlineLink, SlideLink } from "../../_lib/ui/Link";
import { Tag } from "../../_lib/ui/Tag";
import { Badge } from "../../_lib/ui/Badge";

export const metadata: Metadata = {
  title: "Composants — Design",
  description:
    "Button, Link, Tag, Badge. Deux variantes de bouton, deux types de liens, un tag, trois badges. Composants discrets au service de la lecture — pas l'inverse.",
};

type Banned = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_UI: Banned[] = [
  { n: "01", title: "Gradients sur bouton", reason: "Contredit la radicalité plate du site. Signature DTC (direct-to-consumer)." },
  { n: "02", title: "Ombres portées au hover", reason: "Décision DA déjà actée — la profondeur naît du filet et du blanc, pas d'un flou." },
  { n: "03", title: "Radius ≥ 4px (pill, rounded-full)", reason: "On se démarque volontairement du monde SaaS et DTC. Notre radius est 0." },
  { n: "04", title: "Capitales larges « JE M'INSCRIS »", reason: "Ton propriétaire. La voix impose l'infinitif sec en casse normale." },
  { n: "05", title: "Emojis dans les libellés (🎯 ✨ 🚀)", reason: "Cible PME/artisans/restaurateurs — rupture de registre immédiate." },
  { n: "06", title: "Points d'exclamation", reason: "Décision voix déjà actée — « Sign Up! » vu chez Gentlewoman, non retenu." },
  { n: "07", title: "Ghost buttons shadcn", reason: "Transparent sans bordure, disparaît sur fond lin. Nuit à l'accessibilité." },
  { n: "08", title: "Tags colorés vifs type label GitHub", reason: "Casse la palette kaki/lin. Signature de développeur, pas d'éditorial." },
  { n: "09", title: "Bouton « hero » XL (py-6, text-xl)", reason: "Pas de hiérarchie HERO dans un portfolio éditorial. Une taille par rôle." },
  { n: "10", title: "focus { outline: none } sans remplacement", reason: "Violation WCAG SC 2.4.7 — bloquant pour l'accessibilité clavier." },
];

export default function Composants() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Composants" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Quatre composants, pas un de plus.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Discrets <em className="italic text-surface">sous le doigt</em>.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Les composants cliquables sont au service de la lecture, pas
            l&apos;inverse. Rectangle franc, filet 1&nbsp;px, typo
            Instrument Sans medium — on emprunte aux magazines éditoriaux
            (Kinfolk, Apartamento, Cabana) la sobriété de la forme, et non
            le pastiche SaaS (gradients, ombres, pilules arrondies).
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>2 buttons · 2 tailles</span>
            <span>2 liens selon contexte</span>
            <span>1 tag · 3 badges</span>
            <span>Focus outline accent-deep</span>
          </div>
        </div>
      </section>

      {/* 01 — BUTTONS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Boutons — primary + secondary" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Deux variantes. Le <em className="italic">primary</em> est
                un rectangle encre plein — contraste maximal avec le fond
                lin pour l&apos;action la plus engageante. Le{" "}
                <em className="italic">secondary</em> est un rectangle lin
                encadré d&apos;un filet 1&nbsp;px — discret, prévisible.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch] mb-6">
                Fond <strong>encre</strong>, pas kaki : le kaki est notre
                accent de marque réservé aux états et aux textes — jamais
                le fond d&apos;un bouton. Au hover du primary, le fond passe
                à <code className="font-mono text-accent-deep">accent-deep</code>
                {" "}avec une translation verticale de −1&nbsp;px.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Deux tailles seulement :{" "}
                <code className="font-mono text-accent-deep">default</code>{" "}
                (15&nbsp;px, px-5 py-3) et{" "}
                <code className="font-mono text-accent-deep">sm</code>{" "}
                (13&nbsp;px, px-3.5 py-2). Pas de XL, pas de{" "}
                <em className="italic">hero button</em>.
              </p>
            </div>

            <div className="flex flex-col border-t border-rule-strong">
              <div className="py-8 border-b border-rule">
                <Eyebrow>Primary — default</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button>Écrire</Button>
                  <Button trailingArrow>Voir le projet</Button>
                  <Button disabled>Disponible bientôt</Button>
                </div>
              </div>

              <div className="py-8 border-b border-rule">
                <Eyebrow>Primary — sm</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button size="sm">Répondre</Button>
                  <Button size="sm" trailingArrow>
                    Poursuivre
                  </Button>
                </div>
              </div>

              <div className="py-8 border-b border-rule">
                <Eyebrow>Secondary — default</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="secondary">Revenir</Button>
                  <Button variant="secondary">Télécharger le PDF</Button>
                  <Button variant="secondary" disabled>
                    Archivé
                  </Button>
                </div>
              </div>

              <div className="py-8 border-b border-rule">
                <Eyebrow>Secondary — sm</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="secondary" size="sm">
                    Filtrer
                  </Button>
                  <Button variant="secondary" size="sm">
                    Trier
                  </Button>
                </div>
              </div>

              <div className="py-8">
                <Eyebrow>ButtonLink — navigue (interne + externe)</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-3">
                  <ButtonLink href="/design" trailingArrow>
                    Lire la méthode
                  </ButtonLink>
                  <ButtonLink
                    href="https://github.com"
                    external
                    variant="secondary"
                    trailingArrow
                  >
                    Le dépôt public
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — LIENS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Liens — deux types selon contexte" />
          <div className="grid md:grid-cols-2 gap-16">
            <div className="flex flex-col border-t border-rule-strong pt-6">
              <Eyebrow>InlineLink — dans la prose d&apos;article</Eyebrow>
              <p className="text-body text-ink/80 max-w-[42ch] mt-4 mb-8">
                Soulignement <strong>permanent</strong> 1&nbsp;px ink/40,
                offset 3&nbsp;px. Couleur du soulignement passe à{" "}
                <code className="font-mono text-accent-deep">
                  accent-deep
                </code>{" "}
                au hover. Respect strict WCAG 1.4.1 — un lien non souligné
                en prose est un anti-pattern d&apos;accessibilité.
              </p>
              <div className="font-display text-body text-ink/85 leading-relaxed max-w-[52ch] border-t border-rule pt-6">
                La palette Pinède sur toile emprunte son kaki à{" "}
                <InlineLink href="/design/palette">Ressource Peintures</InlineLink>
                , son lin au papier des magazines et ses contrastes à{" "}
                <InlineLink
                  href="https://studioko.fr"
                  external
                >
                  Studio&nbsp;KO
                </InlineLink>
                . On cite les sources — ça ressemble à un article qu&apos;à
                une démo produit.
              </div>
            </div>

            <div className="flex flex-col border-t border-rule-strong pt-6">
              <Eyebrow>SlideLink — navigation et cards</Eyebrow>
              <p className="text-body text-ink/80 max-w-[42ch] mt-4 mb-8">
                Pas de soulignement par défaut. Au hover, un filet 1&nbsp;px
                grandit de gauche à droite via{" "}
                <code className="font-mono text-accent-deep">
                  background-size
                </code>
                . Même technique que les démos{" "}
                <em className="italic">Mouvements</em>.
              </p>
              <nav className="font-display text-[1.3rem] text-ink leading-relaxed border-t border-rule pt-6 flex flex-col gap-3 items-start">
                <SlideLink href="/design">Index design</SlideLink>
                <SlideLink href="/design/typographie">
                  Typographie
                </SlideLink>
                <SlideLink href="/design/palette">Palette</SlideLink>
                <SlideLink href="/design/prose">Prose</SlideLink>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — TAGS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Tags — un seul style, cinq usages" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Un seul Tag, appliqué avec la même règle partout : filet
                1&nbsp;px <code className="font-mono text-accent-deep">border-rule-strong</code>,{" "}
                <code className="font-mono text-accent-deep">rounded-hairline</code>{" "}
                (2&nbsp;px, notre seule exception radius), small-caps
                Instrument&nbsp;Sans 11&nbsp;px. Aucun fond par défaut.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch] mb-6">
                Les small-caps gardent la hauteur-d&apos;x proche des
                minuscules — lecture plus douce que les UPPERCASE pleines,
                qui sonnent SaaS. Référence Kinfolk, qui catégorise ainsi
                ses articles (&laquo;&nbsp;arts&nbsp;&amp;&nbsp;culture&nbsp;&raquo;,{" "}
                &laquo;&nbsp;interiors&nbsp;&raquo;).
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Cliquable si la propriété{" "}
                <code className="font-mono text-accent-deep">href</code> est
                fournie — devient un filtre de catégorie.
              </p>
            </div>

            <div className="flex flex-col border-t border-rule-strong">
              <div className="py-8 border-b border-rule">
                <Eyebrow>Tags statiques — métadonnées</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Tag>2026</Tag>
                  <Tag>Marseille</Tag>
                  <Tag>Restaurant</Tag>
                  <Tag>Next.js</Tag>
                  <Tag>Refonte complète</Tag>
                </div>
              </div>

              <div className="py-8 border-b border-rule">
                <Eyebrow>Tags cliquables — filtres de catégorie</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Tag href="/projets?filtre=hotellerie">Hôtellerie</Tag>
                  <Tag href="/projets?filtre=artisanat">Artisanat</Tag>
                  <Tag href="/projets?filtre=restauration">Restauration</Tag>
                  <Tag href="/projets?filtre=architecture">
                    Architecture d&apos;intérieur
                  </Tag>
                </div>
              </div>

              <div className="py-8">
                <Eyebrow>Inline dans une ligne d&apos;article</Eyebrow>
                <p className="mt-4 text-body text-ink/80 leading-relaxed">
                  Panaille — restaurant méditerranéen à Marseille,
                  livré en <Tag>mars 2026</Tag> après trois mois de
                  travail. <Tag>Next.js 16</Tag> · <Tag>Vercel</Tag> ·{" "}
                  <Tag>Core Web Vitals verts</Tag>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — BADGES */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Badges — statut, rien d'autre" onSurface />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="text-body opacity-80 max-w-[42ch] mb-6">
                Un badge n&apos;est pas un tag. Le tag catégorise
                (métier, ville, année) ; le badge{" "}
                <em className="italic">signale un état</em>{" "}
                (disponibilité, progression, verrou). On refuse toute
                surenchère colorée — pas de vert pompier, pas de rouge
                néon. Les trois couleurs retenues sortent de la palette
                Pinède, strictement.
              </p>
              <p className="text-body opacity-75 max-w-[42ch]">
                Pas de filet, pas de radius, fond plein sobre,
                small-caps 10&nbsp;px. Plus petit que le tag, plus dense
                — il doit s&apos;effacer quand le regard ne le cherche
                pas.
              </p>
            </div>

            <div className="flex flex-col border-t border-surface-foreground/25">
              <div className="py-8 border-b border-surface-foreground/15">
                <div className="text-eyebrow uppercase text-accent-warm mb-4">
                  Les trois statuts sémantiques
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge status="available" />
                  <Badge status="waitlist" />
                  <Badge status="full" />
                </div>
              </div>

              <div className="py-8 border-b border-surface-foreground/15">
                <div className="text-eyebrow uppercase text-accent-warm mb-4">
                  Usage courant — à côté du nom du freelance
                </div>
                <div className="flex flex-wrap gap-3 items-baseline font-display italic text-[1.5rem]">
                  <span>Jules Toussenel</span>
                  <Badge status="available" />
                </div>
                <p className="text-caption opacity-70 mt-4 max-w-[48ch]">
                  Signe de disponibilité discret, lu en coin d&apos;œil —
                  ne surcharge pas la hiérarchie typographique.
                </p>
              </div>

              <div className="py-8">
                <div className="text-eyebrow uppercase text-accent-warm mb-4">
                  Label personnalisé — override du texte par défaut
                </div>
                <div className="flex flex-wrap gap-3 items-baseline">
                  <Badge status="available" label="Nouveau" />
                  <Badge status="waitlist" label="Deux mois d&apos;attente" />
                  <Badge status="full" label="Archivé" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — ÉTATS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="États — default, hover, focus, disabled" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Chaque composant interactif expose quatre états prévisibles.
            Le focus visible est non négociable (WCAG SC 2.4.7) — outline
            2&nbsp;px <code className="font-mono text-accent-deep">
              accent-deep
            </code>{" "}
            avec offset 3&nbsp;px. Essayez la touche Tab sur les boutons
            ci-dessous.
          </p>

          <div className="grid md:grid-cols-4 gap-10 border-t border-rule-strong pt-10">
            <div className="flex flex-col gap-4">
              <Eyebrow>Default</Eyebrow>
              <Button>Écrire</Button>
              <p className="text-caption text-ink/70 max-w-[28ch]">
                État de repos. Le contraste encre/lin fait le signal.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Eyebrow>Hover</Eyebrow>
              <Button className="bg-accent-deep -translate-y-[1px]">
                Écrire
              </Button>
              <p className="text-caption text-ink/70 max-w-[28ch]">
                Fond kaki profond + translation de −1&nbsp;px. Aucune
                ombre.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Eyebrow>Focus-visible</Eyebrow>
              <Button className="outline-2 outline-offset-[3px] outline-accent-deep">
                Écrire
              </Button>
              <p className="text-caption text-ink/70 max-w-[28ch]">
                Outline accent-deep, offset 3&nbsp;px. Pas de glow, pas
                de blur.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Eyebrow>Disabled</Eyebrow>
              <Button disabled>Écrire</Button>
              <p className="text-caption text-ink/70 max-w-[28ch]">
                Opacity 40, pointer-events none. Pas de message
                d&apos;erreur cryptique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — BANNIS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="06" label="Dix patterns bannis" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Chaque interdit vient d&apos;une observation : soit absent des
            sites premium visités (Studio KO, Yovanovitch, Kinfolk,
            Cabana, Apartamento), soit cliché identifié comme signal
            SaaS/DTC/dev.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_UI.map((b) => (
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
        prev={{ label: "Relire — Prose", href: "/design/prose" }}
        next={{ label: "Lire ensuite — Cartes", href: "/design/cartes" }}
      />
    </div>
  );
}
