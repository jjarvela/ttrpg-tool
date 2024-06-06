import { PrismaClient } from "@prisma/client";
import { Users } from "./data/users";

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
