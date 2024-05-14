import { z } from "zod";

export const userSchema = z.object({
  name: z.string({ message: "Name is required" }),
  username: z.string({ message: "Username is required" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(5, { message: "Must be 5 or more characters long" }),
});

export type TUser = z.infer<typeof userSchema>;
