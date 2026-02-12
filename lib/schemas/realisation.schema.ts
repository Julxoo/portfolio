import { z } from "zod";

export const realisationSchema = z.object({
  id: z.string().min(1, "L'ID est requis"),
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  url: z.string().url("URL invalide"),
  tags: z.array(z.string()).min(1, "Au moins un tag est requis"),
  image: z.string().url("URL image invalide").optional(),
});

export type RealisationData = z.infer<typeof realisationSchema>;
