import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug, getProjectSlugs, getRelatedProjects } from "@/lib/data/projects";
import { RelatedProjects } from "@/components/features/related-projects";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { RichText } from "@/components/ui/rich-text";
import { TechTag } from "@/components/ui/tech-tag";
import { ProjectJsonLd } from "@/components/project-json-ld";
import { BreadcrumbWithJsonLd } from "@/components/breadcrumb-with-json-ld";
import { SITE_CONFIG } from "@/lib/constants";

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const locale of routing.locales) {
    const slugs = await getProjectSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    const t = await getTranslations("ProjectPage");
    return {
      title: t("notFound"),
    };
  }

  const baseUrl = SITE_CONFIG.url;

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/projects/${slug}`,
      languages: {
        fr: `${baseUrl}/fr/projects/${slug}`,
        en: `${baseUrl}/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${baseUrl}/${locale}/projects/${slug}`,
      type: "article",
      locale: locale === "en" ? "en_US" : "fr_FR",
      siteName: "Jules Toussenel",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ProjectPage");
  const tNav = await getTranslations("Navigation");
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  // Fetch related projects based on tags
  const relatedProjects = await getRelatedProjects(project.id, project.tags, locale, 2);

  // Construire les items du breadcrumb
  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("projects"), href: "/projects" },
    { label: project.title },
  ];

  return (
    <div className="min-h-screen">
      <ProjectJsonLd
        title={project.title}
        description={project.description}
        slug={slug}
        locale={locale}
        tags={project.tags}
        githubUrl={project.githubUrl}
        liveUrl={project.liveUrl}
      />
      <Nav />
      <main>
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <BreadcrumbWithJsonLd items={breadcrumbItems} />

        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <TechTag
                key={tag}
                tag={tag}
                variant="primary"
                className="px-2 py-1 border"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("github")}
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("liveDemo")}
              </a>
            )}
          </div>
        </header>

        <div className="prose prose-sm sm:prose max-w-none">
          <RichText className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {project.longDescription}
          </RichText>
        </div>
      </article>

      {relatedProjects.length > 0 && (
        <aside className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <RelatedProjects projects={relatedProjects} locale={locale} />
        </aside>
      )}
      </main>
      <Footer />
    </div>
  );
}
