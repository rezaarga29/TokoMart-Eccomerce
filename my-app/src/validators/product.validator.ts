import { z } from "zod";

export const productSchema = z.object({
  name: z.string({ message: "Name is required" }),
  slug: z.string({ message: "Slug is required" }),
});

export type TProduct = z.infer<typeof productSchema>;
