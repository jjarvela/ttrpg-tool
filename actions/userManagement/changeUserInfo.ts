"use server";
import * as z from "zod";
import { UserInfoSchema } from "../../validation-schemas";
import {
  getUserByEmail,
  getUserByUsername,
  updateUser,
} from "../../prisma/services/userService";

/**
 * This function validates the input values and edits the selected user's information accordingly.
 * @param id: target user's cuid
 * @param data: info that should be edited (username, screenName, email, timezone) - optional values
 * @returns error object or void
 */

export default async function changeUserInfo(
  id: string,
  data: z.infer<typeof UserInfoSchema>,
) {
  const validatedFields = UserInfoSchema.safeParse(data);

  if (!validatedFields.success) {
    const errorMessage = validatedFields.error.message
      .split(`": "`)[3]
      .split(`"`)[0];
    throw new Error(errorMessage);
  }

  if (data.username) {
    try {
      const existingUsername = await getUserByUsername(data.username);

      throw new Error("Username unavailable.");
    } catch (e) {
      console.error(e);
      if ((e as Error).message !== "No user could be found") {
        throw new Error("Something went wrong");
      }
    }
  }

  if (data.email) {
    try {
      const existingEmail = await getUserByEmail(data.email);

      throw new Error("Email already in use.");
    } catch (e) {
      if ((e as Error).message !== "No user could be found") {
        throw new Error("Something went wrong.");
      }
    }
  }

  if (data.username === "") delete data.username;
  if (data.screen_name === "") delete data.screen_name;
  if (data.email === "") delete data.email;

  try {
    const updatedUser = await updateUser(id, data);
  } catch (e) {
    throw new Error("Something went wrong. Please try again.");
  }
}
