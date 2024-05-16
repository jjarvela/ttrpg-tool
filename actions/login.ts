"use server";

import * as z from "zod";
import { LoginSchema } from "../validation-schemas";
import { signIn } from "../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import { getUserByUsername } from "../prisma/services/userService";
import * as bcrypt from "bcryptjs";

export default async function login(
  values: z.infer<typeof LoginSchema>,
  redirectPath?: string,
) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { username, password } = validatedFields.data;

  //need these checks for correct error display behaviour in production
  try {
    const user = await getUserByUsername(username);

    const passwordsMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordsMatch) return { error: "Invalid username or password." };
  } catch (e) {
    if ((e as Error).message === "No user could be found") {
      return { error: "Invalid username or password." };
    }

    return { error: "Something went wrong." };
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: redirectPath || DEFAULT_LOGIN_REDIRECT,
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
