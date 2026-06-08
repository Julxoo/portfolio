import type { MetadataRoute } from "next";

// sitemap.ts — Next 16 génère automatiquement sitemap.xml à la racine.
//
// Règles :
// - Google ignore changeFrequency et priority depuis 2023 — on les garde quand
//   même (Bing les respecte encore, coût nul)
// - /design/*, /api/*, /client/* sont exclus (cohérent avec robots.ts)
// - Projets et articles de carnet seront fusionnés ici quand la source de
//   données existera (MDX frontmatter ou CMS)

const BASE_URL = "https://julestoussenel.com";

const STATIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "monthly" as const },
  { path: "/projets", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/carnet", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/methode", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/a-propos", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // TODO — quand les projets et le carnet auront une source de données :
  // const projets = await getProjets();
  // const articles = await getArticles();
  // Fusionner avec STATIC_ROUTES en map() et utiliser lastModified = projet.updatedAt

  return STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
