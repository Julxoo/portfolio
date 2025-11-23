import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().min(1, "L'ID est requis"),
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  longDescription: z.string().min(1, "La description longue est requise"),
  tags: z.array(z.string()).min(1, "Au moins un tag est requis"),
  images: z.array(z.string()).default([]),
  githubUrl: z.string().url("URL GitHub invalide").or(z.literal("")).optional(),
  liveUrl: z.string().url("URL live invalide").or(z.literal("")).optional(),
  featured: z.boolean().default(false),
  date: z.string().datetime("Date invalide"),
  status: z.enum(["in-progress", "completed", "archived"]).optional(),
});

export type ProjectData = z.infer<typeof projectSchema>;
