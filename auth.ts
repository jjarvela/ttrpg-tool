import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./prisma/db";

export const {
  handlers: { GET, POST },
  auth, //this is the universal component that lets us check for valid sessions
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" }, //with Prisma strategy needs to be jwt, database sessions won't work
  ...authConfig,
});
