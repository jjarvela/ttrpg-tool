"use server";

import * as z from "zod";
import { LoginSchema } from "../validation-schemas";
import { signIn } from "../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";

export default async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { username, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid username or password." };
        case "AccessDenied":
          return { error: "Access denied." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw e; //needs to be thrown for redirect and error display to work properly
  }
}
