import * as z from "zod";

/**
 * Schemas for auth validation
 */

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Email is required.",
    }),
    username: z.string().min(1, {
      message: "Username is required.",
    }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(30, {
        message: "Password's maximum length is 30 characters.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
