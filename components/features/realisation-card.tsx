import Image from "next/image";
import type { Realisation } from "@/types";
import { TechTag } from "@/components/ui/tech-tag";

interface RealisationCardProps {
  realisation: Realisation;
}

function getScreenshotUrl(siteUrl: string): string {
  return `https://image.thum.io/get/width/600/crop/400/${siteUrl}`;
}

export function RealisationCard({ realisation }: RealisationCardProps) {
  const imageUrl = realisation.image || getScreenshotUrl(realisation.url);

  return (
    <a
      href={realisation.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative aspect-[3/2] overflow-hidden border border-border bg-muted">
        <Image
          src={imageUrl}
          alt={realisation.name}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="text-xs sm:text-sm group-hover:text-muted-foreground transition-colors">
          {realisation.name}
        </h3>
        <p className="text-xs text-muted-foreground">{realisation.description}</p>
        {realisation.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {realisation.tags.map((tag) => (
              <TechTag key={tag} tag={tag} clickable={false} />
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
