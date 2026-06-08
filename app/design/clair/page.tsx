import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Clair — Design",
  description:
    "Palette unique light. Pas de dark mode. La toile de lin EST la DA — l'inverser donnerait un autre site, pas une variante.",
};

type Observed = {
  site: string;
  category: string;
  toggle: string;
};

const OBSERVED: Observed[] = [
  { site: "Studio KO", category: "Architecture FR", toggle: "aucun" },
  { site: "Pierre Yovanovitch", category: "Design intérieur FR", toggle: "aucun" },
  { site: "Vincent Van Duysen", category: "Architecture BE", toggle: "aucun" },
  { site: "Joseph Dirand", category: "Architecture FR", toggle: "aucun" },
  { site: "The Gentlewoman", category: "Magazine éditorial", toggle: "aucun" },
  { site: "Apartamento", category: "Magazine intérieurs", toggle: "aucun" },
  { site: "Cabana Magazine", category: "Magazine luxe", toggle: "aucun" },
  { site: "Kinfolk", category: "Magazine lifestyle", toggle: "aucun" },
  { site: "Ressource Peintures", category: "Peintures premium FR", toggle: "aucun" },
  { site: "Hôtel de Buci", category: "Hôtellerie luxe", toggle: "aucun" },
  { site: "Offscreen Magazine", category: "Magazine indépendant", toggle: "aucun" },
  { site: "Vercel", category: "SaaS (contraste)", toggle: "système/clair/sombre (footer)" },
  { site: "Linear", category: "SaaS (contraste)", toggle: "sombre par défaut" },
  { site: "Stripe", category: "SaaS (contraste)", toggle: "aucun (clair only assumé)" },
];

type Arg = {
  title: string;
  body: string;
};

const AGAINST: Arg[] = [
  { title: "La DA est le fond crème", body: "Inverser sur ink #1F1F1B ne donne pas un « dark mode de Pinède sur toile » — ça donne un autre site, avec une autre identité. Le kaki méditerranéen sur fond sombre perd l'idée même de la pinède." },
  { title: "Zéro pair premium ne le fait", body: "Sur 11 sites éditoriaux / architecture haut de gamme fetchés, aucun toggle. Les magazines non plus. Seuls les SaaS proposent des variantes." },
  { title: "Double maintenance", body: "Tokens, images, ombres, illustrations à retravailler. Instrument Serif chaleureuse perd son caractère sur fond noir — les serifs demandent un fond chaud." },
  { title: "Toggle = bruit UI supplémentaire", body: "Dans un design minimaliste, ajouter un switch lune/soleil pollue une nav déjà tenue à 5 liens. Le signal « SaaS » brouille le positionnement artisan." },
  { title: "Posture = confiance dans la DA", body: "Proposer un toggle, c'est dire « je ne sais pas trancher ». Les magazines n'offrent pas de variante nocturne — une charte éditoriale se défend, elle ne se négocie pas en session." },
];

const FOR: Arg[] = [
  { title: "Accessibilité photophobie", body: "Certains utilisateurs préfèrent sombre (lecture de nuit, sensibilité lumineuse). Réel mais minoritaire, et mitigé par notre lin #F4F1E8 — crème désaturé, pas blanc pur." },
  { title: "Tendance 2026 en SaaS", body: "Vercel, Linear, Stripe proposent ou imposent sombre. Mais ce n'est pas notre positionnement." },
  { title: "Respect formel de prefers-color-scheme", body: "Ignorer cette préférence est un choix qu'on assume. Mitigé par le color-scheme: light explicite et un lin déjà doux sur les yeux." },
];

export default function Clair() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Clair" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Une palette, assumée.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Pas de <em className="italic text-surface">dark mode</em>.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            La toile de lin EST la DA. L&apos;inverser ne donnerait pas
            une variante « de nuit » — ça donnerait un autre site. Le
            kaki méditerranéen sur lin crème évoque la lumière de midi ;
            ce contraste précis disparaît sur fond sombre. On assume la
            palette unique, avec{" "}
            <code className="font-mono text-accent-deep">
              color-scheme: light
            </code>{" "}
            déclaré explicitement.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>Zéro toggle</span>
            <span>Lin #F4F1E8 doux — pas un blanc cru</span>
            <span>AAA sur toute la palette</span>
            <span>color-scheme: light explicite</span>
          </div>
        </div>
      </section>

      {/* 01 — OBSERVATION */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Observation — aucun pair premium ne propose de toggle" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Quatorze sites visités en avril 2026 — onze éditoriaux /
            architecture, trois SaaS pour contraste. Les onze premiers
            assument un fond clair unique et signent par leur palette,
            jamais par un confort de lecture optionnel.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[1.5fr_1.5fr_1fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>Site</div>
              <div>Catégorie</div>
              <div>Toggle observé</div>
            </div>
            {OBSERVED.map((o) => (
              <div
                key={o.site}
                className="grid md:grid-cols-[1.5fr_1.5fr_1fr] gap-6 py-4 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="font-display italic text-[1.05rem] text-ink">
                  {o.site}
                </div>
                <div className="text-caption text-ink/70">{o.category}</div>
                <div className="font-sans text-caption text-ink/80">
                  {o.toggle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — CONTRE */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Cinq raisons contre un dark mode ici" />
          <div className="grid md:grid-cols-2 gap-10 md:gap-x-16 md:gap-y-12 border-t border-rule-strong pt-10">
            {AGAINST.map((a) => (
              <div key={a.title}>
                <Eyebrow>{a.title}</Eyebrow>
                <p className="text-body text-ink/80 max-w-[44ch] mt-4">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — POUR */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Trois arguments pour — qu'on reconnaît" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Les arguments pour un dark mode sont réels. On les recense
            honnêtement, et on explique pourquoi ils sont surpondérés
            par les cinq contre dans <em className="italic">ce</em>{" "}
            contexte — portfolio éditorial FR à identité chromatique
            forte.
          </p>
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 border-t border-rule-strong pt-10">
            {FOR.map((a) => (
              <div key={a.title}>
                <Eyebrow>{a.title}</Eyebrow>
                <p className="text-body text-ink/80 max-w-[36ch] mt-4">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — IMPLÉMENTATION */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Implémentation — trois lignes de code" onSurface />
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <div>
              <p className="text-body opacity-80 max-w-[42ch] mb-6">
                On ignore{" "}
                <code className="font-mono text-accent-warm">
                  prefers-color-scheme: dark
                </code>{" "}
                consciemment. Le choix est marqué à deux niveaux pour
                éviter tout FOUC et empêcher le navigateur
                d&apos;auto-darkifier les scrollbars et{" "}
                <em className="italic">form controls</em>.
              </p>
              <p className="text-body opacity-75 max-w-[42ch]">
                Pas de message explicite à l&apos;utilisateur («&nbsp;ce
                site est conçu en mode clair&nbsp;»). Soulever le
                problème que personne ne se pose est un aveu de
                faiblesse. La posture se tient par elle-même.
              </p>
            </div>

            <div className="bg-bg text-ink p-6 border border-surface-foreground/20">
              <Eyebrow>Code posé</Eyebrow>
              <pre className="mt-4 font-mono text-caption text-ink/80 bg-accent-warm/25 p-4 leading-relaxed overflow-x-auto">
{`// app/layout.tsx
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F4F1E8",
}`}
              </pre>
              <pre className="mt-4 font-mono text-caption text-ink/80 bg-accent-warm/25 p-4 leading-relaxed overflow-x-auto">
{`/* app/globals.css */
html {
  color-scheme: light;
}`}
              </pre>
              <p className="text-caption text-ink/60 mt-4 max-w-[42ch]">
                Aucune règle{" "}
                <code className="font-mono">
                  @media (prefers-color-scheme: dark)
                </code>{" "}
                dans la feuille de style. Aucune variante de tokens.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Relire — États", href: "/design/etats" }}
        next={{ label: "Lire ensuite — Responsive", href: "/design/responsive" }}
      />
    </div>
  );
}
