import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/features/project-card";
import type { Project } from "@/types";

interface RelatedProjectsProps {
  projects: Project[];
  locale: string;
}

export function RelatedProjects({ projects, locale }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <Section
      title={locale === "fr" ? "Projets similaires" : "Related projects"}
      id="related-projects"
      aria-label={
        locale === "fr" ? "Projets similaires" : "Related projects"
      }
    >
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
