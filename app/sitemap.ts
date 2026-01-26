import { MetadataRoute } from "next";
import { getProjects, getProjectSlugs } from "@/lib/data/projects";
import { getBlogPosts, getBlogSlugs } from "@/lib/data/blog";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const allPages: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const [projects, blogPosts] = await Promise.all([
      getProjects(locale),
      getBlogPosts(locale),
    ]);

    // Create Maps for O(1) lookup instead of O(n) find()
    const projectsMap = new Map(projects.map((p) => [p.id, p]));
    const postsMap = new Map(blogPosts.map((p) => [p.slug, p]));

    const latestProjectDate =
      projects.length > 0
        ? new Date(Math.max(...projects.map((p) => new Date(p.date).getTime())))
        : new Date();

    const publishedPosts = blogPosts.filter((p) => p.published);
    const latestBlogDate =
      publishedPosts.length > 0
        ? new Date(
            Math.max(...publishedPosts.map((p) => new Date(p.date).getTime()))
          )
        : new Date();

    // Home page
    allPages.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(
        Math.max(latestProjectDate.getTime(), latestBlogDate.getTime())
      ),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: { fr: `${baseUrl}/fr`, en: `${baseUrl}/en` },
      },
    });

    // Projects list page
    allPages.push({
      url: `${baseUrl}/${locale}/projects`,
      lastModified: latestProjectDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: { fr: `${baseUrl}/fr/projects`, en: `${baseUrl}/en/projects` },
      },
    });

    // Blog list page
    allPages.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: { fr: `${baseUrl}/fr/blog`, en: `${baseUrl}/en/blog` },
      },
    });

    // Individual project pages - O(1) lookup with Map
    const projectSlugs = await getProjectSlugs(locale);
    for (const slug of projectSlugs) {
      const project = projectsMap.get(slug);
      const projectDate = project ? new Date(project.date) : new Date();

      allPages.push({
        url: `${baseUrl}/${locale}/projects/${slug}`,
        lastModified: projectDate,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr/projects/${slug}`,
            en: `${baseUrl}/en/projects/${slug}`,
          },
        },
        images: [`${baseUrl}/${locale}/projects/${slug}/opengraph-image`],
      });
    }

    // Individual blog post pages - O(1) lookup with Map
    const blogSlugs = await getBlogSlugs(locale);
    for (const slug of blogSlugs) {
      const post = postsMap.get(slug);
      if (post && post.published) {
        allPages.push({
          url: `${baseUrl}/${locale}/blog/${slug}`,
          lastModified: new Date(post.date),
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: {
            languages: {
              fr: `${baseUrl}/fr/blog/${slug}`,
              en: `${baseUrl}/en/blog/${slug}`,
            },
          },
          images: [`${baseUrl}/${locale}/blog/${slug}/opengraph-image`],
        });
      }
    }
  }

  return allPages;
}
