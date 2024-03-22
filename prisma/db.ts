import { PrismaClient } from "@prisma/client";

/**declare global type for prisma client */
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

/**
 * in development store prisma client to global
 * this will prevent a new client from spawning every time next.js does a hot reload after a file is saved
 */
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
