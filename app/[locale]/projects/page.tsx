import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getProjects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/features/project-card";
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
    title: isEn ? "Projects" : "Projets",
    description: isEn
      ? "Discover my projects and achievements"
      : "Découvrez mes projets et réalisations",
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

  return (
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
        >
          <div className="space-y-6 sm:space-y-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
