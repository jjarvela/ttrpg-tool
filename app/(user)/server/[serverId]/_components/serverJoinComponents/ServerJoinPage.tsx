import FeedbackCard from "@/app/_components/FeedbackCard";
import { getServerJoinData } from "@/prisma/services/serverService";
import NotOpen from "./NotOpen";
import Open from "./Open";
import ServerNotFound from "../ServerNotFound";

export default async function ServerJoinPage({
  server_id,
}: {
  server_id: string;
}) {
  try {
    const server = await getServerJoinData(server_id);
    if (
      !server.config[0].join_permission ||
      server.config[0].join_permission === "invitation link"
    )
      return (
        <NotOpen reason="Unfortunately this server can only be joined by a direct invitation." />
      );

    const validUnlimited = server.invitations.filter(
      (item) => !item.max_uses && new Date(item.expires) > new Date(),
    );

    if (server.config[0].join_permission === "unlimited invitation")
      if (validUnlimited.length === 0)
        return (
          <NotOpen reason="Unfortunately this server has no open invitations." />
        );
      else {
        return (
          <Open
            server_name={server.server_name}
            needsPassword={server.config[0].protected}
            invitation_id={validUnlimited[0].id}
          />
        );
      }

    const validLimited = server.invitations.filter(
      (item) =>
        item.max_uses &&
        new Date(item.expires) > new Date() &&
        item.used_count < item.max_uses,
    );

    if (validUnlimited.length === 0 && validLimited.length === 0)
      return (
        <NotOpen reason="Unfortunately this server has no open invitations." />
      );

    return (
      <Open
        server_name={server.server_name}
        needsPassword={server.config[0].protected}
        invitation_id={
          validUnlimited[0] ? validUnlimited[0].id : validLimited[0].id
        }
      />
    );
  } catch (e) {
    return <ServerNotFound />;
  }
}
