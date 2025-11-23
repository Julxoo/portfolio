import { z } from "zod";

export const experienceSchema = z.object({
  id: z.string().min(1, "L'ID est requis"),
  role: z.string().min(1, "Le rôle est requis"),
  company: z.string().min(1, "L'entreprise est requise"),
  companyUrl: z.string().url("URL entreprise invalide").or(z.literal("")).optional(),
  period: z.string().min(1, "La période est requise"),
  startDate: z.string().datetime("Date de début invalide"),
  endDate: z.string().datetime("Date de fin invalide").optional(),
  description: z.string().min(1, "La description est requise"),
  technologies: z.array(z.string()).default([]),
  current: z.boolean().default(false),
});

export type ExperienceData = z.infer<typeof experienceSchema>;
