"use server";
import * as z from "zod";
import { UserInfoSchema } from "../validation-schemas";
import { getUserByUsername, updateUser } from "../prisma/services/userService";

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
    return {
      error: validatedFields.error.message.split(`": "`)[3].split(`"`)[0],
    };
  }

  if (data.username) {
    const existingUser = await getUserByUsername(data.username);
    console.log(existingUser);
    if (existingUser || typeof existingUser === "string")
      return { error: "Username unavailable" };
  }

  if (data.email) {
    const existingUser = await getUserByUsername(data.email);
    if (existingUser || typeof existingUser === "string")
      return { error: "Email already associated with an account" };
  }

  if (data.username === "") delete data.username;
  if (data.screen_name === "") delete data.screen_name;
  if (data.email === "") delete data.email;

  const updatedUser = await updateUser(id, data);

  if (typeof updatedUser === "string")
    return { error: "Something went wrong. Please try again." };
}
