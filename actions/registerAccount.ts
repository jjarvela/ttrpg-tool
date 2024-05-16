"use server";

import * as z from "zod";
import { RegisterSchema } from "../validation-schemas";
import * as bcrypt from "bcryptjs";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "../prisma/services/userService";

export default async function registerAccount(
  values: z.infer<typeof RegisterSchema>,
) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, username, password } = validatedFields.data;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const existingEmail = await getUserByEmail(email);

    return { error: "Email already in use." };
  } catch (e) {
    if ((e as Error).message !== "No user could be found") {
      return { error: "Something went wrong" };
    }
  }

  try {
    const existingUsername = await getUserByUsername(username);

    return { error: "Username unavailable." };
  } catch (e) {
    if ((e as Error).message !== "No user could be found") {
      return { error: "Something went wrong" };
    }
  }

  try {
    const newUser = await createUser({
      email,
      username,
      password_hash: passwordHash,
    });

    return { username: newUser.username };
  } catch (e) {
    return { error: "Something went wrong. Please try again." };
  }
}
