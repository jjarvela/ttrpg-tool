import { PrismaClient } from "@prisma/client";
import { Users } from "./data/users";
import { Servers } from "./data/servers";

const prisma = new PrismaClient();

async function runSeeders() {
  // Users
  await Promise.all(
    Users.map(async (user) =>
      prisma.user.upsert({
        where: { username: user.username },
        update: {},
        create: user,
      }),
    ),
  );

  // Servers
  await Promise.all(
    Servers.map(async (server) =>
      prisma.server.upsert({
        where: { server_name: server.server_name },
        update: {},
        create: server,
      }),
    ),
  );
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Successfully seeded database. Closing connection.");
    await prisma.$disconnect();
  });
