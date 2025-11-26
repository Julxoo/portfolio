import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/lib/data/blog";
import { BlogCard } from "@/components/features/blog-card";
import { Section } from "@/components/layout/section";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BreadcrumbWithJsonLd } from "@/components/breadcrumb-with-json-ld";
import { CollectionPageJsonLd } from "@/components/collection-page-json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const baseUrl = "https://julestoussenel.com";

  return {
    title: "Blog",
    description: isEn
      ? "Articles, tutorials and reflections on web development, React, Next.js, Node.js and modern technologies."
      : "Articles, tutoriels et réflexions sur le développement web, React, Next.js, Node.js et les technologies modernes.",
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        fr: `${baseUrl}/fr/blog`,
        en: `${baseUrl}/en/blog`,
      },
      types: {
        "application/rss+xml": `${baseUrl}/feed.xml`,
        "application/atom+xml": `${baseUrl}/atom.xml`,
      },
    },
    openGraph: {
      title: isEn ? "Blog | Jules Toussenel" : "Blog | Jules Toussenel",
      description: isEn
        ? "Articles, tutorials and reflections on web development"
        : "Articles, tutoriels et réflexions sur le développement web",
      url: `${baseUrl}/${locale}/blog`,
      type: "website",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("BlogPage");
  const tNav = await getTranslations("Navigation");
  const posts = await getBlogPosts(locale);
  const publishedPosts = posts.filter((post) => post.published);
  const baseUrl = "https://julestoussenel.com";

  const postsCount = publishedPosts.length;
  const description =
    postsCount === 0
      ? t("empty")
      : postsCount > 1
      ? `${postsCount} ${t("articlesPublishedPlural")}`
      : `${postsCount} ${t("articlesPublished")}`;

  // Construire les items du breadcrumb
  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("blog") },
  ];

  // Collection items for JSON-LD
  const collectionItems = publishedPosts.map((post) => ({
    name: post.title,
    description: post.description,
    url: `${baseUrl}/${locale}/blog/${post.slug}`,
    datePublished: post.date,
    image: `${baseUrl}/${locale}/blog/${post.slug}/opengraph-image`,
  }));

  return (
    <>
      {publishedPosts.length > 0 && (
        <CollectionPageJsonLd
          name="Blog"
          description={
            locale === "en"
              ? "Technical articles and tutorials on web development by Jules Toussenel"
              : "Articles techniques et tutoriels sur le développement web par Jules Toussenel"
          }
          url={`/${locale}/blog`}
          locale={locale}
          items={collectionItems}
          type="blog"
        />
      )}

      <div className="min-h-screen">
        <Nav />
        <main>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
            <BreadcrumbWithJsonLd items={breadcrumbItems} />
          </div>
          <Section
            title="Blog"
            description={description}
            className="border-t-0 pt-0"
            aria-label={locale === "en" ? "Blog articles" : "Articles de blog"}
          >
            {publishedPosts.length === 0 ? (
              <div
                className="text-xs sm:text-sm text-muted-foreground"
                role="status"
                aria-live="polite"
              >
                <p className="mb-4">{t("emptyDescription")}</p>
                <ul
                  className="list-disc list-inside space-y-2 ml-4"
                  aria-label={
                    locale === "en" ? "Upcoming content" : "Contenu à venir"
                  }
                >
                  <li>{t("upcomingItem1")}</li>
                  <li>{t("upcomingItem2")}</li>
                  <li>{t("upcomingItem3")}</li>
                  <li>{t("upcomingItem4")}</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-4" role="feed" aria-label="Blog posts">
                {publishedPosts.map((post) => (
                  <article key={post.slug} role="article">
                    <BlogCard post={post} />
                  </article>
                ))}
              </div>
            )}
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
}
