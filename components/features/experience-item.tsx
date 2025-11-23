import type { Experience } from "@/types";

interface ExperienceItemProps {
  experience: Experience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
      <div>
        <h3 className="text-xs sm:text-sm">{experience.role}</h3>
        {experience.companyUrl ? (
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {experience.company}
          </a>
        ) : (
          <p className="text-xs text-muted-foreground">{experience.company}</p>
        )}
      </div>
      <span className="text-xs text-muted-foreground sm:shrink-0">
        {experience.period}
      </span>
    </div>
  );
}
