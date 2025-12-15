import { MetadataRoute } from "next";
import { getProjects, getProjectSlugs } from "@/lib/data/projects";
import { getBlogPosts, getBlogSlugs } from "@/lib/data/blog";
import { routing } from "@/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.julestoussenel.com";
  const allPages: MetadataRoute.Sitemap = [];

  // Pour chaque locale, générer les URLs
  for (const locale of routing.locales) {
    // Get actual data to compute real lastModified dates
    const [projects, blogPosts] = await Promise.all([
      getProjects(locale),
      getBlogPosts(locale),
    ]);

    // Calculate most recent project and blog dates for list pages
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

    // Home page - highest priority
    allPages.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(
        Math.max(latestProjectDate.getTime(), latestBlogDate.getTime())
      ),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr`,
          en: `${baseUrl}/en`,
        },
      },
    });

    // Projects list page
    allPages.push({
      url: `${baseUrl}/${locale}/projects`,
      lastModified: latestProjectDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/projects`,
          en: `${baseUrl}/en/projects`,
        },
      },
    });

    // Blog list page
    allPages.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/blog`,
          en: `${baseUrl}/en/blog`,
        },
      },
    });

    // Individual project pages with real dates
    const projectSlugs = await getProjectSlugs(locale);
    for (const slug of projectSlugs) {
      const project = projects.find((p) => p.id === slug);
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
        // Images for rich results
        images: [`${baseUrl}/${locale}/projects/${slug}/opengraph-image`],
      });
    }

    // Individual blog post pages with real dates
    const blogSlugs = await getBlogSlugs(locale);
    for (const slug of blogSlugs) {
      const post = blogPosts.find((p) => p.slug === slug);
      if (post && post.published) {
        const postDate = new Date(post.date);

        allPages.push({
          url: `${baseUrl}/${locale}/blog/${slug}`,
          lastModified: postDate,
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: {
            languages: {
              fr: `${baseUrl}/fr/blog/${slug}`,
              en: `${baseUrl}/en/blog/${slug}`,
            },
          },
          // Images for rich results
          images: [`${baseUrl}/${locale}/blog/${slug}/opengraph-image`],
        });
      }
    }
  }

  return allPages;
}
