import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export type TodoSchemaType = z.infer<typeof todoSchema>;

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
