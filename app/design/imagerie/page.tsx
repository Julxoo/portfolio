import type { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Imagerie — Design",
  description:
    "Screenshots posés en contexte éditorial + photographies prises au téléphone chez le client. Deux ratios, un grading subtil, zéro mockup MacBook.",
};

type Ratio = {
  name: string;
  value: string;
  pixel: string;
  usage: string;
  reference: string;
  // Pour la démo CSS : aspect-ratio Tailwind
  aspect: string;
};

const RATIOS: Ratio[] = [
  {
    name: "3:2 paysage",
    value: "3/2",
    pixel: "1500 × 1000 px",
    usage: "Hero projet, vignettes d'index, photos d'ambiance larges.",
    reference: "Format argentique 35 mm — Yovanovitch, Reiulf Ramstad.",
    aspect: "aspect-[3/2]",
  },
  {
    name: "4:5 portrait",
    value: "4/5",
    pixel: "1200 × 1500 px",
    usage: "Détails matière, portraits verticaux, accents rares.",
    reference: "Ratio Apartamento — portraits éditoriaux.",
    aspect: "aspect-[4/5]",
  },
];

type RejectedRatio = {
  name: string;
  reason: string;
};

const REJECTED_RATIOS: RejectedRatio[] = [
  { name: "16:9", reason: "Ratio vidéo/TV — lecture industrielle, trop cinéma." },
  { name: "1:1", reason: "Instagram look — trop saturé 2018." },
  { name: "3:4 strict", reason: "Trop élancé pour les grilles éditoriales." },
];

type Grading = {
  param: string;
  value: string;
};

const GRADING: Grading[] = [
  { param: "Température", value: "+3 à +5 K (chaud léger)" },
  { param: "Saturation", value: "−8 %" },
  { param: "Highlights", value: "−10" },
  { param: "Shadows", value: "+5" },
  { param: "Noirs", value: "relevés à #1A1A1A max — jamais #000 pur" },
  { param: "Vignetage", value: "aucun" },
  { param: "Grain simulé", value: "aucun — lisse digital" },
  { param: "Export", value: "AVIF quality 75 + WebP quality 80" },
];

type BannedImg = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_IMG: BannedImg[] = [
  { n: "01", title: "Mockup MacBook / iPhone flottant", reason: "Zéro des 15 sites premium testés ne le fait. Signal dev junior immédiat." },
  { n: "02", title: "Lens flare, HDR sursaturé", reason: "Absent de Cabana, Aesop, Ressource. Traitement console Sony 2010." },
  { n: "03", title: "Bokeh marketing exagéré", reason: "Absent de tous les portfolios archi FR testés. Artifice." },
  { n: "04", title: "Stock Unsplash non retravaillé", reason: "Risque du cliché « MacBook-latte-bureau-bois ». Hors-sujet éditorial." },
  { n: "05", title: "Before / after slider JS", reason: "Tic de freelance. Zéro occurrence sur les sites premium." },
  { n: "06", title: "Drone 360° / time-lapse", reason: "Absent des sites d'architectes FR. Gadget immobilier." },
  { n: "07", title: "GIF animé décoratif", reason: "Absent partout. Mouvement non maîtrisé, alourdit la page." },
  { n: "08", title: "Vignetage en post-prod", reason: "Cabana, Yovanovitch, Aesop : edges open, no vignette." },
  { n: "09", title: "Grain simulé sur photo digitale", reason: "Faux argentique. Clean digital est la norme." },
  { n: "10", title: "Hover zoom sur vignette", reason: "Tic codé dev 2015. Aucun portfolio haut de gamme ne le fait." },
];

type NextImageProp = {
  prop: string;
  value: string;
  why: string;
};

const NEXT_IMAGE_CONFIG: NextImageProp[] = [
  { prop: "formats", value: "['image/avif', 'image/webp']", why: "AVIF d'abord (−20 % de poids vs WebP), WebP en fallback." },
  { prop: "qualities", value: "[60, 75, 90]", why: "Next 16 : breaking change, qualities doit être déclaré. 75 défaut, 60 vignette, 90 hero." },
  { prop: "deviceSizes", value: "[640, 828, 1200, 1920, 2560]", why: "Couvre mobile, tablet, laptop, desktop, retina." },
  { prop: "imageSizes", value: "[240, 384, 640, 840]", why: "Tailles de vignette et inline pour les grilles." },
];

// Simple swatch pour le grading — mouvement d'un neutre brut vers notre grading.
function GradingSwatch({ before, after, label }: { before: string; after: string; label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1">
        <div className="flex-1 aspect-[3/2]" style={{ background: before }} aria-hidden />
        <div className="flex-1 aspect-[3/2]" style={{ background: after }} aria-hidden />
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-eyebrow uppercase text-ink/65">{label}</div>
        <div className="flex items-baseline gap-3 text-caption text-ink/55">
          <code className="font-mono">brut</code>
          <span>·</span>
          <code className="font-mono">gradé</code>
        </div>
      </div>
    </div>
  );
}

export default function Imagerie() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Imagerie" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Deux ratios, un grading, zéro mockup.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            La photographie <em className="italic text-surface">d&apos;un dev</em>.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Un dev freelance ne commissionne pas un Clément Vayssières.
            L&apos;imagerie du site se compose autrement : des captures
            d&apos;écran posées en contexte éditorial, des photos au téléphone
            prises chez le client — de la matière, une main, un atelier. La
            home, elle, ne montre presque rien. Joseph Dirand n&apos;a que deux
            images sur tout son site. C&apos;est une posture.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>3:2 + 4:5 · deux ratios, pas plus</span>
            <span>Grading chaud subtil</span>
            <span>AVIF + WebP · Next.js 16</span>
            <span>Zéro stock, zéro mockup</span>
          </div>
        </div>
      </section>

      {/* 01 — PHILOSOPHIE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Une philosophie sans budget photographe" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 mb-16">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Le vrai objet qu&apos;on livre, c&apos;est un site web —
                donc un <em className="italic">screenshot</em> en est la
                photographie naturelle. Les portfolios qui maquillent les sites
                dans des mockups MacBook flottants font immédiatement{" "}
                <em className="italic">stock, générique, cliché 2016</em>.
                On ne le fait pas.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                On ne va pas non plus sur Unsplash. Le risque du cliché
                &laquo;&nbsp;MacBook-latte-bureau-bois&nbsp;&raquo; est
                rédhibitoire. Les maisons qu&apos;on admire ne prennent jamais
                d&apos;images libres.
              </p>
            </div>
            <div className="flex flex-col border-t border-rule-strong">
              <div className="py-6 border-b border-rule">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-display italic text-[1.15rem] text-ink">
                    80 % — Screenshots posés
                  </span>
                  <span className="text-eyebrow uppercase text-accent-deep">
                    Retenu
                  </span>
                </div>
                <p className="text-caption text-ink/75 max-w-[52ch]">
                  Capture d&apos;écran haute définition, respect du ratio
                  responsive réel, posée sur fond lin ou kaki. Pas de device
                  mockup. Le site se montre comme il est.
                </p>
              </div>
              <div className="py-6 border-b border-rule">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-display italic text-[1.15rem] text-ink">
                    20 % — Photos « chantier » au téléphone
                  </span>
                  <span className="text-eyebrow uppercase text-accent-deep">
                    Retenu
                  </span>
                </div>
                <p className="text-caption text-ink/75 max-w-[52ch]">
                  Jules prend au téléphone chez le client : un détail
                  d&apos;atelier, une texture, une main qui travaille, le lieu
                  réel. Traité au grading maison — cohérent avec l&apos;ensemble.
                </p>
              </div>
              <div className="py-6 border-b border-rule">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-display italic text-[1.15rem] text-ink/65 line-through decoration-[0.5px]">
                    Stock Unsplash / Pexels
                  </span>
                  <span className="text-eyebrow uppercase text-ink/65">
                    Rejeté
                  </span>
                </div>
                <p className="text-caption text-ink/60 max-w-[52ch]">
                  Cliché générique. Aucun site premium testé n&apos;en utilise
                  visiblement.
                </p>
              </div>
              <div className="py-6 border-b border-rule">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-display italic text-[1.15rem] text-ink/65 line-through decoration-[0.5px]">
                    Mockup MacBook / iPhone flottant
                  </span>
                  <span className="text-eyebrow uppercase text-ink/65">
                    Rejeté
                  </span>
                </div>
                <p className="text-caption text-ink/60 max-w-[52ch]">
                  Signal dev junior immédiat. Zéro occurrence sur les 15 sites
                  premium investigués.
                </p>
              </div>
              <div className="py-6">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-display italic text-[1.15rem] text-ink">
                    Silence sur la home
                  </span>
                  <span className="text-eyebrow uppercase text-accent-deep">
                    Référence Dirand
                  </span>
                </div>
                <p className="text-caption text-ink/75 max-w-[52ch]">
                  Joseph Dirand a <em className="italic">deux images</em> sur
                  tout son site : un logo et un toggle. La home Jules montre
                  presque rien — seulement des noms, des dates, des lieux.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — RATIOS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Deux ratios — jamais davantage" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Chaque ratio supplémentaire fragmente la grille et dilue
            l&apos;autorité visuelle. On en garde deux — l&apos;un pour
            respirer large, l&apos;autre pour resserrer sur la matière.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {RATIOS.map((r) => (
              <article
                key={r.name}
                className="flex flex-col border-t border-rule-strong pt-6"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <Eyebrow>{r.name}</Eyebrow>
                  <code className="font-mono text-caption text-ink/65">
                    {r.pixel}
                  </code>
                </div>
                <div className={`${r.aspect} bg-surface mb-6`} aria-hidden />
                <p className="text-body text-ink/80 max-w-[42ch] mb-3">
                  {r.usage}
                </p>
                <p className="text-caption text-ink/60 max-w-[42ch]">
                  {r.reference}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-rule-strong pt-10">
            <Eyebrow>Ratios écartés</Eyebrow>
            <div className="mt-6 grid md:grid-cols-3 gap-10">
              {REJECTED_RATIOS.map((r) => (
                <div key={r.name}>
                  <div className="font-display italic text-[1.2rem] text-ink/65 line-through decoration-[0.5px] mb-2">
                    {r.name}
                  </div>
                  <p className="text-caption text-ink/70 max-w-[36ch]">
                    {r.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — GRADING */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Grading chaud subtil — pas de LUT cinéma" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Cabana maintient un{" "}
                <em className="italic">
                  warm tone without heavy digital processing
                </em>{" "}
                — c&apos;est notre cible. Pas de LUT Orange &amp; Teal, pas de
                vignetage, pas de grain simulé. Juste une passe chaude mesurée
                pour que les photos cohabitent avec la palette kaki/lin sans
                jurer.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch] mb-6">
                Les noirs restent relevés à <code className="font-mono">#1A1A1A</code>{" "}
                max — jamais <code className="font-mono">#000</code> pur. On
                respecte la toile de lin, on ne plonge pas dans le trou noir.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6">
                <GradingSwatch
                  before="#a89a7c"
                  after="#9d8c6a"
                  label="Neutre chaud"
                />
                <GradingSwatch
                  before="#6b6655"
                  after="#5f5947"
                  label="Kaki matière"
                />
              </div>
            </div>

            <div className="flex flex-col border-t border-rule-strong">
              <div className="hidden md:grid md:grid-cols-[1fr_2fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
                <div>Paramètre</div>
                <div>Valeur</div>
              </div>
              {GRADING.map((g) => (
                <div
                  key={g.param}
                  className="grid md:grid-cols-[1fr_2fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
                >
                  <div className="font-display italic text-[1.1rem] text-ink">
                    {g.param}
                  </div>
                  <div className="text-body text-ink/80">
                    <code className="font-mono text-accent-deep">{g.value}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — LÉGENDES & CRÉDITS */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Légendes et crédits — obligation FR" onSurface />
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16">
            <div>
              <p className="text-body opacity-80 max-w-[48ch] mb-6">
                Le droit moral du photographe est inaliénable en France —{" "}
                <em className="italic">Article L. 122-4 du Code de la
                propriété intellectuelle</em>. Omettre le crédit, c&apos;est
                contrefaçon. Même quand la photo est prise par Jules
                lui-même, la mention est systématique.
              </p>
              <p className="text-body opacity-75 max-w-[48ch] mb-6">
                On préfère la forme FR <code className="font-mono">Photo : Prénom Nom</code>{" "}
                à l&apos;anglaise <code className="font-mono">© Name</code> —
                plus lisible, moins juridique, aligné avec la tradition des
                magazines français et des institutions (Pompidou, Frac).
              </p>
              <p className="text-body opacity-70 max-w-[48ch]">
                Les conventions de nommage de fichier reprennent la même
                logique — le crédit est intégré au nom lui-même, traçable dans
                le CMS, jamais perdu au chemin.
              </p>
            </div>

            <div className="flex flex-col border-t border-surface-foreground/25">
              <div className="py-6 border-b border-surface-foreground/15">
                <div className="text-eyebrow uppercase text-accent-warm mb-3">
                  Format de légende retenu
                </div>
                <p className="font-display italic text-[1.3rem] leading-snug mb-4">
                  « Boutique Atelier Vert — Lyon 2025 · Photo : Jules Toussenel »
                </p>
                <p className="text-caption opacity-70 max-w-[42ch]">
                  Instrument Sans, taille caption, alignée à gauche sous
                  l&apos;image. Séparateur middle dot{" "}
                  <code className="font-mono">·</code> (pas slash).
                </p>
              </div>

              <div className="py-6 border-b border-surface-foreground/15">
                <div className="text-eyebrow uppercase text-accent-warm mb-3">
                  Convention nommage fichier
                </div>
                <code className="font-mono text-caption leading-snug block mb-4 opacity-85">
                  JULES_ATELIER-VERT_Jules-Toussenel_001-1500x1000.webp
                </code>
                <p className="text-caption opacity-70 max-w-[42ch]">
                  Initiales projet, nom du photographe, numéro, dimensions.
                  Copié de la convention Yovanovitch{" "}
                  <code className="font-mono">
                    PY_BEAUREGARD_Clement-Vayssieres_152-2200x1238.webp
                  </code>
                  .
                </p>
              </div>

              <div className="py-6">
                <div className="text-eyebrow uppercase text-accent-warm mb-3">
                  Alt text — règle stricte
                </div>
                <p className="text-body opacity-80 mb-3">
                  <strong>Décoratif</strong> →{" "}
                  <code className="font-mono">alt=&quot;&quot;</code> explicite.
                </p>
                <p className="text-body opacity-80 mb-3">
                  <strong>Informatif</strong> → descriptif ≤ 120 caractères,
                  sans <em className="italic">« photo de »</em>, sans{" "}
                  <em className="italic">« image de »</em>.
                </p>
                <p className="text-body opacity-70">
                  <strong>Jamais alt = légende.</strong> La doc Next 16 le
                  précise : redondance pour les lecteurs d&apos;écran.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — TECHNIQUE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Technique — Next.js 16, AVIF d'abord" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Next 16 a changé le contrat des images. Deux breaking changes à
            connaître :{" "}
            <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
              priority
            </code>{" "}
            est déprécié au profit de{" "}
            <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
              preload
            </code>
            , et{" "}
            <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
              qualities
            </code>{" "}
            doit être déclaré explicitement (défaut <code className="font-mono">[75]</code>,
            les valeurs hors liste sont coercées).
          </p>

          <div className="grid md:grid-cols-[1.3fr_1fr] gap-16 items-start">
            <div>
              <Eyebrow>Config next.config.ts</Eyebrow>
              <pre className="mt-4 font-mono text-caption text-ink/80 bg-accent-warm/25 p-6 leading-relaxed overflow-x-auto">
{`import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 90],
    deviceSizes: [640, 828, 1200, 1920, 2560],
    imageSizes: [240, 384, 640, 840],
  },
}

export default nextConfig`}
              </pre>

              <Eyebrow>
                <span className="mt-10 inline-block">Composant Image</span>
              </Eyebrow>
              <pre className="mt-4 font-mono text-caption text-ink/80 bg-accent-warm/25 p-6 leading-relaxed overflow-x-auto">
{`<Image
  src={project.hero}
  alt={project.title}
  width={1500} height={1000}
  sizes="(min-width: 1024px) 840px, 100vw"
  quality={75}
  placeholder="blur"
  blurDataURL={project.blurDataURL}
  preload={isAboveFold}
/>`}
              </pre>
            </div>

            <div className="flex flex-col border-t border-rule-strong">
              <div className="hidden md:grid md:grid-cols-[1fr_1fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
                <div>Paramètre</div>
                <div>Raison</div>
              </div>
              {NEXT_IMAGE_CONFIG.map((p) => (
                <div
                  key={p.prop}
                  className="py-5 border-b border-rule last:border-b-0"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <code className="font-mono text-caption text-accent-deep">
                      {p.prop}
                    </code>
                    <code className="font-mono text-caption text-ink/55 truncate">
                      {p.value}
                    </code>
                  </div>
                  <p className="text-caption text-ink/70 max-w-[36ch]">
                    {p.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06 — BANNIS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="06" label="Dix patterns bannis — observés et écartés" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Chacun des dix interdits ci-dessous est le résultat d&apos;une
            observation réelle : soit absent des 15 sites premium testés, soit
            cliché identifié comme{" "}
            <em className="italic">signal dev junior</em>. Rien d&apos;arbitraire.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_IMG.map((b) => (
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

          <div className="mt-16 border-t border-rule-strong pt-10">
            <Eyebrow>Sources consultées</Eyebrow>
            <ul className="flex flex-col gap-2 mt-4">
              <li>
                <Link
                  href="https://pierreyovanovitch.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-accent-deep hover:text-ink transition-colors"
                >
                  pierreyovanovitch.com — ratios, nommage fichier, crédits ↗
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.cabanamagazine.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-accent-deep hover:text-ink transition-colors"
                >
                  cabanamagazine.com — warm tone, no heavy processing ↗
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.josephdirand.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-accent-deep hover:text-ink transition-colors"
                >
                  josephdirand.com — stratégie du silence (2 images totales) ↗
                </Link>
              </li>
              <li>
                <Link
                  href="https://nextjs.org/docs/app/api-reference/components/image"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-accent-deep hover:text-ink transition-colors"
                >
                  nextjs.org — Image component (Next 16, preload/qualities) ↗
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Relire — Voix", href: "/design/voix" }}
        next={{ label: "Lire ensuite — Prose", href: "/design/prose" }}
      />
    </div>
  );
}
