import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string()
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string()
});