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
    username: z
      .string()
      .min(1, {
        message: "Username is required.",
      })
      .regex(
        /^[a-zA-Z0-9-_]+$/,
        "Username can only contain alphanumerical characters, - and _.",
      ),
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

export const UserInfoSchema = z.object({
  username: z
    .union([
      z
        .string()
        .min(4)
        .regex(
          /^[a-zA-Z0-9-_]+$/,
          "Username can only contain alphanumerical characters, - and _.",
        ),
      z.string().length(0),
    ])
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  screenName: z
    .union([z.string(), z.string().length(0)])
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  email: z
    .union([z.string().email(), z.string().length(0)])
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  timezone: z
    .union([z.string().length(0), z.string()])
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
});
