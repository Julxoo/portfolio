import { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/data/projects";
import { getBlogSlugs } from "@/lib/data/blog";
import { routing } from "@/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://julestoussenel.com";
  const currentDate = new Date();
  const allPages: MetadataRoute.Sitemap = [];

  // Pour chaque locale, générer les URLs
  for (const locale of routing.locales) {
    // Pages statiques
    allPages.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 1,
      },
      {
        url: `${baseUrl}/${locale}/projects`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/blog`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
      }
    );

    // Pages projets dynamiques
    const projectSlugs = await getProjectSlugs(locale);
    projectSlugs.forEach((slug) => {
      allPages.push({
        url: `${baseUrl}/${locale}/projects/${slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    });

    // Pages blog dynamiques
    const blogSlugs = await getBlogSlugs(locale);
    blogSlugs.forEach((slug) => {
      allPages.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    });
  }

  return allPages;
}
