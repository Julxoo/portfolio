import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getProjects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/features/project-card";
import { Section } from "@/components/layout/section";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BreadcrumbWithJsonLd } from "@/components/breadcrumb-with-json-ld";
import { CollectionPageJsonLd } from "@/components/collection-page-json-ld";
import { SITE_CONFIG } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const baseUrl = SITE_CONFIG.url;

  return {
    title: isEn ? "Projects" : "Projets",
    description: isEn
      ? "Discover my projects and achievements in web development: Next.js, React, Node.js, Supabase applications and more."
      : "Découvrez mes projets et réalisations en développement web : applications Next.js, React, Node.js, Supabase et plus encore.",
    alternates: {
      canonical: `${baseUrl}/${locale}/projects`,
      languages: {
        fr: `${baseUrl}/fr/projects`,
        en: `${baseUrl}/en/projects`,
      },
    },
    openGraph: {
      title: isEn ? "Projects | Jules Toussenel" : "Projets | Jules Toussenel",
      description: isEn
        ? "Discover my projects and achievements in web development"
        : "Découvrez mes projets et réalisations en développement web",
      url: `${baseUrl}/${locale}/projects`,
      type: "website",
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ProjectsPage");
  const tNav = await getTranslations("Navigation");
  const projects = await getProjects(locale);
  const baseUrl = SITE_CONFIG.url;

  const projectsCount = projects.length;
  const description =
    projectsCount > 1
      ? `${projectsCount} ${t("projectsCompletedPlural")}`
      : `${projectsCount} ${t("projectsCompleted")}`;

  // Construire les items du breadcrumb
  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("projects") },
  ];

  // Collection items for JSON-LD
  const collectionItems = projects.map((project) => ({
    name: project.title,
    description: project.description,
    url: `${baseUrl}/${locale}/projects/${project.id}`,
    datePublished: project.date,
    image: `${baseUrl}/${locale}/projects/${project.id}/opengraph-image`,
  }));

  return (
    <>
      <CollectionPageJsonLd
        name={t("title")}
        description={
          locale === "en"
            ? "Collection of web development projects by Jules Toussenel"
            : "Collection de projets de développement web par Jules Toussenel"
        }
        url={`/${locale}/projects`}
        locale={locale}
        items={collectionItems}
        type="projects"
      />

      <div className="min-h-screen">
        <Nav />
        <main>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
            <BreadcrumbWithJsonLd items={breadcrumbItems} />
          </div>
          <Section
            title={t("title")}
            description={description}
            className="border-t-0 pt-0"
            aria-label={locale === "en" ? "All projects" : "Tous les projets"}
          >
            <div className="space-y-6 sm:space-y-8" role="list">
              {projects.map((project) => (
                <div key={project.id} role="listitem">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
}
