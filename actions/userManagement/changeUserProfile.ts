"use server";
import { getUserById, updateUser } from "@/prisma/services/userService";
import deleteBlob from "../deleteBlob";

type ProfileData = {
  person_description: string;
  person_status: string;
  profile_image?: string | null;
};
export default async function changeUserProfile(id: string, data: ProfileData) {
  try {
    let filename = "";

    if (data.profile_image !== undefined) {
      const original = await getUserById(id);
      filename = original.profile_image || "";
    }

    const updatedUser = await updateUser(id, data);

    //safeguard the seed user potoo bird
    if (filename !== "" && filename !== "1712753350248.png") {
      await deleteBlob(filename);
    }
  } catch (e) {
    throw new Error("Something went wrong. Please try again.");
  }
}
