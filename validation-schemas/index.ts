import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});
