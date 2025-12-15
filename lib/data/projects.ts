import fs from "fs/promises";
import path from "path";
import { projectSchema } from "@/lib/schemas/project.schema";
import type { Project } from "@/types";

export async function getProjects(locale: string): Promise<Project[]> {
  try {
    const projectsDir = path.join(process.cwd(), `content/projects/${locale}`);
    const files = await fs.readdir(projectsDir);

    const projects = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const content = await fs.readFile(
            path.join(projectsDir, file),
            "utf-8"
          );
          const data = JSON.parse(content);
          return projectSchema.parse(data);
        })
    );

    // Trier par date (plus récent en premier)
    return projects.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Erreur lors de la lecture des projets:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string, locale: string): Promise<Project | null> {
  try {
    const projectsDir = path.join(process.cwd(), `content/projects/${locale}`);
    const filePath = path.join(projectsDir, `${slug}.json`);
    const content = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(content);
    return projectSchema.parse(data);
  } catch (error) {
    console.error(`Erreur lors de la lecture du projet ${slug}:`, error);
    return null;
  }
}

export async function getFeaturedProjects(locale: string): Promise<Project[]> {
  const projects = await getProjects(locale);
  return projects.filter((project) => project.featured);
}

export async function getProjectSlugs(locale: string): Promise<string[]> {
  try {
    const projectsDir = path.join(process.cwd(), `content/projects/${locale}`);
    const files = await fs.readdir(projectsDir);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(".json", ""));
  } catch (error) {
    console.error("Erreur lors de la lecture des slugs projets:", error);
    return [];
  }
}

/**
 * Get related projects based on shared tags
 * Uses a scoring algorithm: more shared tags = higher relevance
 */
export async function getRelatedProjects(
  currentId: string,
  currentTags: string[],
  locale: string,
  limit: number = 2
): Promise<Project[]> {
  const allProjects = await getProjects(locale);

  // Filter out current project and score by shared tags
  const scored = allProjects
    .filter((project) => project.id !== currentId)
    .map((project) => ({
      project,
      score: project.tags.filter((tag) =>
        currentTags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      ).length,
    }));

  // Sort by score (highest first), then by date (newest first)
  return scored
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.project.date).getTime() - new Date(a.project.date).getTime()
    )
    .slice(0, limit)
    .map((item) => item.project);
}
