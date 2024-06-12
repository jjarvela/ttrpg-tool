import { PrismaClient } from "@prisma/client";
import { Users } from "./data/users";
import { Servers } from "./data/servers";

const prisma = new PrismaClient();

async function runSeeders() {
  // Users
  await Promise.all(
    Users.map(async (user) => {
      await prisma.user.upsert({
        where: { username: user.username },
        update: {},
        create: user,
      });
    }),
  );

  const users = await prisma.user.findMany();

  //Friend lists
  await Promise.all(
    users.map(async (user) => {
      await prisma.friendList.upsert({
        where: { owner_id: user.id },
        update: {},
        create: { owner_id: user.id },
      });
    }),
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

  const servers = await prisma.server.findMany();

  //server members
  await Promise.all(
    servers.map(async (server) => {
      await prisma.serverMember.upsert({
        where: {
          server_id_member_id: { server_id: server.id, member_id: users[0].id },
        },
        update: {},
        create: {
          server_id: server.id,
          member_id: users[0].id,
          role: "admin",
        },
      });
    }),
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
