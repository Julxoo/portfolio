import type { MetadataRoute } from "next";
import { getAllRealisations } from "@/lib/realisations";

const BASE_URL = "https://julestoussenel.com";

const LAST_SITE_UPDATE = "2026-04-20";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/realisations`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/design-system`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const realisationPages: MetadataRoute.Sitemap = getAllRealisations().map(
    (project) => ({
      url: `${BASE_URL}/realisations/${project.slug}`,
      lastModified: new Date(project.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticPages, ...realisationPages];
}
