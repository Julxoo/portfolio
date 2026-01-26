import { Link } from "@/i18n/routing";
import type { Project } from "@/types";
import { TechTag } from "@/components/ui/tech-tag";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="group cursor-pointer block">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
        <h3 className="text-xs sm:text-sm group-hover:text-muted-foreground transition-colors">
          {project.title}
        </h3>
        <span className="text-xs text-muted-foreground sm:shrink-0">
          {new Date(project.date).getFullYear()}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{project.description}</p>
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.slice(0, 3).map((tag) => (
            <TechTag key={tag} tag={tag} clickable={false} />
          ))}
        </div>
      )}
    </Link>
  );
}
