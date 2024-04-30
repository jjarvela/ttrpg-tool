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

  const existingEmail = await getUserByEmail(email);

  if (existingEmail) return { error: "Email already in use." };

  const existingUsername = await getUserByUsername(username);

  if (existingUsername) return { error: "Username unavailable." };

  const newUser = await createUser({
    email,
    username,
    password_hash: passwordHash,
  });

  if (typeof newUser === "string")
    return { error: "Something went wrong. Please try again." };

  return { username: newUser.username };
}
