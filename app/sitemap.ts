import type { MetadataRoute } from "next";
import { getAllRealisations } from "@/lib/realisations";

const BASE_URL = "https://julestoussenel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const realisations = getAllRealisations();

  /* Homepage and the realisations listing reflect the freshest content, so
     their lastModified is the max of their own evolution and the newest
     realisation's date. Build-time evaluation for static export. */
  const newestRealisationDate = realisations[0]
    ? new Date(realisations[0].date)
    : new Date();
  const siteLastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/realisations`,
      lastModified: newestRealisationDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: siteLastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/design-system`,
      lastModified: siteLastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const realisationPages: MetadataRoute.Sitemap = realisations.map(
    (project) => ({
      url: `${BASE_URL}/realisations/${project.slug}`,
      lastModified: new Date(project.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticPages, ...realisationPages];
}
