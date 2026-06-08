import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Favicon — Design",
  description:
    "« J » italique Instrument Serif sur fond kaki. Un fragment du wordmark, pas un logo séparé. SVG + PNG 180, PWA minimal.",
};

type File = {
  path: string;
  role: string;
  note: string;
};

const FILES: File[] = [
  { path: "app/icon.tsx", role: "Favicon universel 32×32", note: "Dynamique via ImageResponse. Remplace le favicon.ico par défaut." },
  { path: "app/apple-icon.tsx", role: "iOS home screen 180×180", note: "Dynamique. iOS applique son corner radius, pas besoin de rx." },
  { path: "app/manifest.ts", role: "PWA manifest", note: "Minimal — name, theme_color, icons. display: minimal-ui (pas standalone)." },
];

type Banned = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_FAVICON: Banned[] = [
  { n: "01", title: "Emojis (🎯 ✨ 🚀)", reason: "Cassent à 16 px. Signal SaaS startup 2020." },
  { n: "02", title: "Couleurs fluo hors palette", reason: "Notre favicon doit vivre dans l'onglet à côté du site — cohérence DA non négociable." },
  { n: "03", title: "Photo de Jules", reason: "Narcissique. Illisible en 16×16. Aucune maison premium ne le fait." },
  { n: "04", title: "Logos clients", reason: "Dilution identitaire + problèmes de droits. Un favicon représente UNE identité." },
  { n: "05", title: "Drop-shadow 3D / effet biseauté", reason: "Skeuomorphisme 2010. Le favicon doit être plat comme la DA." },
];

export default function FaviconPage() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Favicon" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Un fragment du wordmark.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Un <em className="italic text-surface">« J »</em> italique, point.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Le favicon n&apos;est pas un logo séparé — c&apos;est un
            fragment du wordmark. « J » italique Instrument Serif, lin
            sur fond kaki. Kinfolk fait la même chose avec son « K »
            — la contre-forme de l&apos;italique donne une silhouette
            reconnaissable même à 16 × 16, là où une capitale romaine
            générique s&apos;effondre.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>Lin sur kaki · AAA</span>
            <span>SVG + PNG 180</span>
            <span>PWA minimal-ui</span>
            <span>Zéro emoji, zéro photo</span>
          </div>
        </div>
      </section>

      {/* 01 — APERÇU */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Aperçu — trois tailles de rendu" />
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Fond kaki{" "}
                <code className="font-mono text-accent-deep">#535040</code>,
                glyphe lin{" "}
                <code className="font-mono text-accent-deep">#F4F1E8</code>.
                Contraste ~7 : 1 (AAA). Tient visuellement en barre
                d&apos;onglet claire comme en dark mode système.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                L&apos;inverse — lin fond + kaki texte — perd dans
                Chrome onglet blanc (se noie) et Safari dark (contraste
                trop faible). On garde kaki plein partout.
              </p>
            </div>

            <div className="flex items-end gap-10">
              <div className="flex flex-col items-center gap-3">
                <div
                  className="size-8 bg-surface flex items-center justify-center"
                  aria-label="Favicon 32×32"
                >
                  <span className="font-display italic text-[22px] leading-none text-bg pb-0.5">
                    J
                  </span>
                </div>
                <div className="text-caption text-ink/65 font-sans">
                  32 × 32
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div
                  className="size-16 bg-surface flex items-center justify-center"
                  aria-label="Favicon 64×64 (aperçu)"
                >
                  <span className="font-display italic text-[50px] leading-none text-bg pb-1">
                    J
                  </span>
                </div>
                <div className="text-caption text-ink/65 font-sans">
                  64 × 64
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div
                  className="size-[180px] bg-surface flex items-center justify-center"
                  aria-label="Apple icon 180×180"
                >
                  <span className="font-display italic text-[140px] leading-none text-bg pb-4">
                    J
                  </span>
                </div>
                <div className="text-caption text-ink/65 font-sans">
                  180 × 180 (iOS)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — FICHIERS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Fichiers Next.js 16" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Trois fichiers au niveau de{" "}
            <code className="font-mono text-accent-deep">app/</code> —
            Next.js les reconnaît par convention de nommage et génère
            automatiquement les balises HTML correspondantes dans le{" "}
            <code className="font-mono text-accent-deep">&lt;head&gt;</code>.
            Le <code className="font-mono text-accent-deep">favicon.ico</code>{" "}
            par défaut a été supprimé — SVG dynamique + PNG 180 couvrent
            99,9 % des navigateurs en 2026.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {FILES.map((f) => (
              <div
                key={f.path}
                className="grid md:grid-cols-[1.2fr_1.2fr_2fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
              >
                <code className="font-mono text-caption text-accent-deep">
                  {f.path}
                </code>
                <div className="font-display italic text-[1.05rem] text-ink">
                  {f.role}
                </div>
                <div className="text-caption text-ink/75">{f.note}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-rule-strong">
            <Eyebrow>Code icon.tsx</Eyebrow>
            <pre className="mt-4 font-mono text-caption text-ink/80 bg-bg p-6 leading-relaxed overflow-x-auto">
{`// app/icon.tsx — favicon 32×32 dynamique
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", background: "#535040",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "serif", fontStyle: "italic", fontSize: 26,
        color: "#F4F1E8",
      }}>J</div>
    ),
    size,
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 03 — PWA */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="PWA — installable mais minimal" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Le manifest est posé dès maintenant (coût marginal :
                15 lignes), mais on reste sur{" "}
                <code className="font-mono text-accent-deep">
                  display: &quot;minimal-ui&quot;
                </code>{" "}
                — la barre d&apos;URL reste visible. Le site est un
                portfolio, pas une app. Cacher l&apos;URL serait un{" "}
                <em className="italic">mensonge d&apos;app</em>.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                <code className="font-mono text-accent-deep">
                  theme_color
                </code>{" "}
                kaki{" "}
                <code className="font-mono text-accent-deep">#535040</code>{" "}
                colore la barre d&apos;adresse Chrome Android dès la
                première visite — détail DA perceptible.{" "}
                <code className="font-mono text-accent-deep">
                  background_color
                </code>{" "}
                lin pour le splash screen PWA.
              </p>
            </div>

            <pre className="font-mono text-caption text-ink/80 bg-accent-warm/25 p-6 leading-relaxed overflow-x-auto">
{`// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jules Toussenel",
    short_name: "Jules T.",
    description: "Développeur freelance — sites sur-mesure.",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#F4F1E8",
    theme_color: "#535040",
    lang: "fr",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 04 — INTERDITS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Cinq interdits" />
          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_FAVICON.map((b) => (
              <div
                key={b.n}
                className="grid md:grid-cols-[60px_1.2fr_1.8fr] gap-6 py-6 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="text-eyebrow uppercase text-ink/65">
                  {b.n}
                </div>
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
        prev={{ label: "Relire — Meta & OG", href: "/design/meta" }}
        next={{ label: "Lire ensuite — Crawl", href: "/design/crawl" }}
      />
    </div>
  );
}
