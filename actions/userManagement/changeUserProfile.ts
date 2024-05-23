"use server";
import { updateUser } from "@/prisma/services/userService";

type ProfileData = {
  person_description: string;
  person_status: string;
  profile_image?: string;
};
export default async function changeUserProfile(id: string, data: ProfileData) {
  try {
    const updatedUser = await updateUser(id, data);
  } catch (e) {
    return { error: "Something went wrong. Please try again." };
  }
}
