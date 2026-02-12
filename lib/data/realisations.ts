import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { realisationSchema } from "@/lib/schemas/realisation.schema";
import type { Realisation } from "@/types";

const realisationsArraySchema = z.array(realisationSchema);

export async function getRealisations(locale: string): Promise<Realisation[]> {
  try {
    const filePath = path.join(process.cwd(), `content/realisations/${locale}.json`);
    const content = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(content);
    return realisationsArraySchema.parse(data);
  } catch (error) {
    console.error("Erreur lors de la lecture des réalisations:", error);
    return [];
  }
}

export async function getLatestRealisations(
  locale: string,
  limit: number
): Promise<Realisation[]> {
  const realisations = await getRealisations(locale);
  return realisations.slice(0, limit);
}
