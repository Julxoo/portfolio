import { z } from "zod";

export const blogPostSchema = z.object({
  slug: z.string().min(1, "Le slug est requis"),
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  date: z.string().datetime("Date invalide"),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  readingTime: z.string().optional(),
  coverImage: z.string().optional(),
});

export type BlogPostData = z.infer<typeof blogPostSchema>;
