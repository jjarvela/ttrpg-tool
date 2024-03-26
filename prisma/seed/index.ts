import { PrismaClient } from "@prisma/client";
import { Users } from "./data/users";

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
