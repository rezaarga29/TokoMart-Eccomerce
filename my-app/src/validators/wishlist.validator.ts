import { z } from "zod";

export const wishlistSchema = z.object({
  userId: z.string({ message: "userId is required" }),
  productId: z.string({ message: "productId is required" }),
});

export type TWishlist = z.infer<typeof wishlistSchema>;
