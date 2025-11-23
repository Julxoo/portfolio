import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { experienceSchema } from "@/lib/schemas/experience.schema";
import type { Experience } from "@/types";

const experiencesArraySchema = z.array(experienceSchema);

export async function getExperiences(locale: string): Promise<Experience[]> {
  try {
    const experiencesFile = path.join(process.cwd(), `content/experiences/${locale}.json`);
    const content = await fs.readFile(experiencesFile, "utf-8");
    const data = JSON.parse(content);
    const experiences = experiencesArraySchema.parse(data);

    // Trier par date (plus récent en premier)
    return experiences.sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  } catch (error) {
    console.error("Erreur lors de la lecture des expériences:", error);
    return [];
  }
}

export async function getCurrentExperience(locale: string): Promise<Experience | null> {
  const experiences = await getExperiences(locale);
  return experiences.find((exp) => exp.current) || null;
}
