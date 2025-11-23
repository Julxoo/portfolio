import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getBlogPost, getBlogSlugs } from "@/lib/data/blog";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BlogPostJsonLd } from "@/components/blog-post-json-ld";
import { BreadcrumbWithJsonLd } from "@/components/breadcrumb-with-json-ld";

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const locale of routing.locales) {
    const slugs = await getBlogSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);

  if (!post) {
    const t = await getTranslations("BlogPostPage");
    return {
      title: t("notFound"),
    };
  }

  const baseUrl = "https://julestoussenel.com";

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
      languages: {
        fr: `${baseUrl}/fr/blog/${slug}`,
        en: `${baseUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/${locale}/blog/${slug}`,
      type: "article",
      locale: locale === "en" ? "en_US" : "fr_FR",
      siteName: "Jules Toussenel",
      publishedTime: post.date,
      authors: ["Jules Toussenel"],
      tags: post.tags,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations("Navigation");
  const post = await getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  // Construire les items du breadcrumb
  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("blog"), href: "/blog" },
    { label: post.title },
  ];

  return (
    <div className="min-h-screen">
      <BlogPostJsonLd
        title={post.title}
        description={post.description}
        date={post.date}
        slug={slug}
        locale={locale}
        tags={post.tags}
        readingTime={post.readingTime}
      />
      <Nav />
      <main>
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <BreadcrumbWithJsonLd items={breadcrumbItems} />

        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.readingTime && <span>{post.readingTime}</span>}
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-muted-foreground px-2 py-1 border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="max-w-none">
          {post.content}
        </div>
      </article>
      </main>
      <Footer />
    </div>
  );
}
