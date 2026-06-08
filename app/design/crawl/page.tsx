import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Crawl — Design",
  description:
    "robots.txt, sitemap.xml, llms.txt. Autoriser les bots de retrieval (Google, Perplexity, Claude-User), bloquer les bots de training (GPTBot, ClaudeBot). Stratégie 2026.",
};

type Bot = {
  name: string;
  category: string;
  action: string;
  reason: string;
};

const BOTS: Bot[] = [
  { name: "GPTBot", category: "Training OpenAI", action: "Bloqué", reason: "Aspire pour entraîner GPT — aucun retour SEO." },
  { name: "ClaudeBot", category: "Training Anthropic", action: "Bloqué", reason: "Training (≠ Claude-User retrieval)." },
  { name: "anthropic-ai", category: "Training Anthropic", action: "Bloqué", reason: "Ancien user-agent Anthropic training." },
  { name: "CCBot", category: "Common Crawl", action: "Bloqué", reason: "Dump pour LAION, etc. Pas de trafic retour." },
  { name: "Google-Extended", category: "Training Google", action: "Bloqué", reason: "Entraînement Gemini (≠ Googlebot search)." },
  { name: "Bytespider", category: "Training ByteDance", action: "Bloqué", reason: "Training + agressif sur bandwidth." },
  { name: "Applebot-Extended", category: "Training Apple", action: "Bloqué", reason: "Training Apple Intelligence (≠ Applebot search)." },
  { name: "Amazonbot", category: "Training Amazon", action: "Bloqué", reason: "Training + Alexa — pas d'indexation claire." },
  { name: "Meta-ExternalAgent", category: "Training Meta", action: "Bloqué", reason: "Training Llama (≠ FacebookExternalHit)." },
  { name: "Googlebot", category: "Search Google", action: "Autorisé", reason: "Indexation Google Search. Essentiel." },
  { name: "Bingbot", category: "Search Microsoft", action: "Autorisé", reason: "Indexation Bing, alimente ChatGPT Search." },
  { name: "OAI-SearchBot", category: "Search OpenAI", action: "Autorisé", reason: "Indexation ChatGPT Search. Envoie du trafic." },
  { name: "ChatGPT-User", category: "Retrieval OpenAI", action: "Autorisé", reason: "Fetch temps réel quand un user pose une question." },
  { name: "Claude-User", category: "Retrieval Anthropic", action: "Autorisé", reason: "Fetch temps réel dans Claude.ai." },
  { name: "Claude-SearchBot", category: "Search Anthropic", action: "Autorisé", reason: "Nouveau 2025, indexation Claude search." },
  { name: "PerplexityBot", category: "Search Perplexity", action: "Autorisé", reason: "Indexation Perplexity. Trafic IA convertit 4× mieux." },
  { name: "DuckAssistBot", category: "Search DuckDuckGo", action: "Autorisé", reason: "Indexation DuckAssist." },
];

type Banned = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_CRAWL: Banned[] = [
  { n: "01", title: "Disallow /_next/ dans robots", reason: "Google a besoin des assets CSS/JS pour le rendu. Blocage = chute ranking immédiate." },
  { n: "02", title: "Bloquer tous les bots IA sans distinction", reason: "Rejette aussi les retrieval bots qui envoient du trafic. Distinguer training vs search." },
  { n: "03", title: "Autoriser tous les bots IA sans distinction", reason: "Donne gratuitement son travail au training sans aucun retour SEO." },
  { n: "04", title: "Inclure /api dans le sitemap", reason: "Pages API sans contenu SEO. Pollue la search console." },
  { n: "05", title: "changeFrequency et priority en dur", reason: "Google ignore depuis 2023 (Bing respecte encore). Coût nul de les garder, mais ne pas les surpondérer." },
  { n: "06", title: "lastModified aléatoire ou fixe", reason: "Google détecte les sitemaps menteurs — perd confiance. Mettre la vraie date ou new Date()." },
  { n: "07", title: "llms.txt avec ton marketing", reason: "Les LLMs résument le texte — un ton marketing se reflète dans les réponses générées. Factuel uniquement." },
  { n: "08", title: "Plus de 50 000 URLs dans un seul sitemap", reason: "Limite Google. Au-delà, utiliser generateSitemaps (Next 16 : id en Promise<string>)." },
  { n: "09", title: "Oublier la gestion preview", reason: "Sans VERCEL_ENV check, les deployments preview s'indexent — flag Search Console." },
  { n: "10", title: "User-agents obsolètes (noindex bot legacy)", reason: "Certains listicles 2022 listent des bots qui n'existent plus. Partir de la doc officielle AI company." },
];

export default function Crawl() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Crawl" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Autoriser les lectures, bloquer le training.
          </p>
          <h1 className="font-display text-display text-ink max-w-[18ch] mb-10">
            Qui peut <em className="italic text-surface">lire le site</em>.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Stratégie 2026 pour les bots : dissocier{" "}
            <em className="italic">training</em> (on donne gratuitement
            son travail pour entraîner des modèles — zéro retour SEO) et{" "}
            <em className="italic">retrieval/search</em> (ils citent et
            envoient du trafic — le trafic IA convertit 4× mieux que
            l&apos;organique classique). On bloque douze bots de
            training, on autorise tous les autres.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>12 training bots bloqués</span>
            <span>Retrieval + search autorisés</span>
            <span>Preview en disallow total</span>
            <span>llms.txt factuel</span>
          </div>
        </div>
      </section>

      {/* 01 — BOTS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="User-agents — autorisés et bloqués" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Attention à la distinction entre les user-agents d&apos;une
            même entreprise. Anthropic a trois bots :{" "}
            <code className="font-mono text-accent-deep">ClaudeBot</code>{" "}
            (training, bloqué),{" "}
            <code className="font-mono text-accent-deep">Claude-User</code>{" "}
            (retrieval, autorisé),{" "}
            <code className="font-mono text-accent-deep">
              Claude-SearchBot
            </code>{" "}
            (search, autorisé). Même logique OpenAI.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[1.2fr_1.3fr_0.8fr_2fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>User-agent</div>
              <div>Catégorie</div>
              <div>Action</div>
              <div>Raison</div>
            </div>
            {BOTS.map((b) => (
              <div
                key={b.name}
                className="grid md:grid-cols-[1.2fr_1.3fr_0.8fr_2fr] gap-6 py-4 border-b border-rule last:border-b-0 items-baseline"
              >
                <code className="font-mono text-caption text-accent-deep">
                  {b.name}
                </code>
                <div className="text-caption text-ink/75">{b.category}</div>
                <div
                  className={`text-eyebrow uppercase ${
                    b.action === "Bloqué"
                      ? "text-ink/65"
                      : "text-accent-deep"
                  }`}
                >
                  {b.action}
                </div>
                <div className="text-caption text-ink/75">{b.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — FICHIERS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Trois fichiers — robots.ts, sitemap.ts, llms.txt" />
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <Eyebrow>app/robots.ts</Eyebrow>
              <p className="text-body text-ink/75 max-w-[36ch] mt-4 mb-6">
                Next.js 16 génère{" "}
                <code className="font-mono text-accent-deep">
                  robots.txt
                </code>{" "}
                à la racine. Deux règles&nbsp;: « tous autorisés sauf
                pages internes », puis disallow total pour les 12 training
                bots. Preview deployments → disallow{" "}
                <code className="font-mono text-accent-deep">/</code> total.
              </p>
              <p className="text-caption text-ink/60 max-w-[36ch]">
                Jamais de disallow{" "}
                <code className="font-mono text-accent-deep">/_next/</code>
                {" "}— Googlebot a besoin des assets.
              </p>
            </div>
            <div>
              <Eyebrow>app/sitemap.ts</Eyebrow>
              <p className="text-body text-ink/75 max-w-[36ch] mt-4 mb-6">
                Next.js 16 génère{" "}
                <code className="font-mono text-accent-deep">
                  sitemap.xml
                </code>
                . Pour l&apos;instant, six routes statiques. Les projets
                et articles du carnet seront fusionnés via{" "}
                <code className="font-mono text-accent-deep">
                  getProjets()
                </code>{" "}
                quand la source de données existera.
              </p>
              <p className="text-caption text-ink/60 max-w-[36ch]">
                Au-delà de 50 000 URLs, utiliser{" "}
                <code className="font-mono text-accent-deep">
                  generateSitemaps
                </code>{" "}
                (Next 16 : id en{" "}
                <code className="font-mono text-accent-deep">
                  Promise&lt;string&gt;
                </code>
                ).
              </p>
            </div>
            <div>
              <Eyebrow>public/llms.txt</Eyebrow>
              <p className="text-body text-ink/75 max-w-[36ch] mt-4 mb-6">
                Spec{" "}
                <code className="font-mono text-accent-deep">llmstxt.org</code>{" "}
                : H1 + blockquote résumé + sections H2 avec liens{" "}
                <code className="font-mono text-accent-deep">
                  [label](url): description
                </code>
                . Factuel, sans marketing — les LLMs reflètent le ton
                dans leurs résumés.
              </p>
              <p className="text-caption text-ink/60 max-w-[36ch]">
                Six pages clés listées. Section{" "}
                <em className="italic">Optional</em> pour{" "}
                <code className="font-mono text-accent-deep">/design</code>{" "}
                (interne).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — CODE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Code retenu" />
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <Eyebrow>app/robots.ts</Eyebrow>
              <pre className="mt-4 font-mono text-caption text-ink/80 bg-accent-warm/25 p-5 leading-relaxed overflow-x-auto">
{`import type { MetadataRoute } from "next";

const AI_TRAINING_BOTS = [
  "GPTBot", "ClaudeBot", "anthropic-ai",
  "CCBot", "Google-Extended", "Bytespider",
  "Applebot-Extended", "Amazonbot",
  "Meta-ExternalAgent", "cohere-ai",
  "Omgilibot", "FacebookBot",
];

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";

  if (isPreview) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/design/", "/client/"] },
      { userAgent: AI_TRAINING_BOTS, disallow: "/" },
    ],
    sitemap: "https://julestoussenel.com/sitemap.xml",
    host: "https://julestoussenel.com",
  };
}`}
              </pre>
            </div>
            <div>
              <Eyebrow>app/sitemap.ts</Eyebrow>
              <pre className="mt-4 font-mono text-caption text-ink/80 bg-accent-warm/25 p-5 leading-relaxed overflow-x-auto">
{`import type { MetadataRoute } from "next";

const BASE_URL = "https://julestoussenel.com";

const STATIC_ROUTES = [
  { path: "",         priority: 1,   changeFrequency: "monthly" as const },
  { path: "/projets", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/carnet",  priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/methode", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/a-propos",priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: \`\${BASE_URL}\${path}\`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — BANNIS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Dix erreurs bannies" />
          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_CRAWL.map((b) => (
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
        prev={{ label: "Relire — Favicon", href: "/design/favicon" }}
        next={{ label: "Lire ensuite — Performance", href: "/design/performance" }}
      />
    </div>
  );
}
