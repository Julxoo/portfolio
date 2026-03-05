import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";
import { getAllRealisations } from "@/lib/realisations";

const BASE_URL = "https://julestoussenel.com";

/** Last real modification date for static pages (update when content changes). */
const LAST_SITE_UPDATE = "2025-03-04";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/identite-visuelle`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/site-vitrine`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/site-annonces`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/bot-affiliation`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/realisations`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const realisationPages: MetadataRoute.Sitemap = getAllRealisations().map(
    (project) => ({
      url: `${BASE_URL}/realisations/${project.slug}`,
      lastModified: new Date(project.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticPages, ...blogPosts, ...realisationPages];
}
