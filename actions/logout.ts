"use server";

import { signOut } from "../auth";

export default async function logOut() {
  try {
    await signOut({ redirectTo: "/welcome" });
  } catch (e) {
    throw e;
  }
}
