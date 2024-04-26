import { db } from "../db";

export async function getNewlyCreated() {
  const limit = subtractDays(new Date(Date.now()).toISOString(), 14);
  //get all servers created within the past 14 days
  const servers = await db.server.findMany({
    where: {
      created_at: { gte: limit },
      AND: {
        config: {
          some: {
            explorable: true,
          },
        },
      },
    },
    select: {
      id: true,
      server_name: true,
      created_at: true,
      description: true,
      image: true,
      config: { select: { join_permission: true } },
      invitations: { select: { max_uses: true, expires: true } },
      server_members: { select: { user: { select: { socket_id: true } } } },
    },
  });
  console.log(servers);
  return servers;
}

function subtractDays(date: string, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}
