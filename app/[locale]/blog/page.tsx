import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/lib/data/blog";
import { BlogCard } from "@/components/features/blog-card";
import { Section } from "@/components/layout/section";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BreadcrumbWithJsonLd } from "@/components/breadcrumb-with-json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: "Blog",
    description: isEn
      ? "Articles, tutorials and reflections on web development"
      : "Articles, tutoriels et réflexions sur le développement web",
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

  return (
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
      >
        {publishedPosts.length === 0 ? (
          <div className="text-xs sm:text-sm text-muted-foreground">
            <p className="mb-4">
              {t("emptyDescription")}
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t("upcomingItem1")}</li>
              <li>{t("upcomingItem2")}</li>
              <li>{t("upcomingItem3")}</li>
              <li>{t("upcomingItem4")}</li>
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            {publishedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Section>
      </main>
      <Footer />
    </div>
  );
}
