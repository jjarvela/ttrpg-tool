import FeedbackCard from "@/app/_components/FeedbackCard";
import {
  getServerJoinData,
  getServerMembers,
} from "@/prisma/services/serverService";
import NotOpen from "./NotOpen";
import Open from "./Open";
import ServerNotFound from "../ServerNotFound";
import { getUserBlocklist, getUserById } from "@/prisma/services/userService";

export default async function ServerJoinPage({
  user_id,
  server_id,
}: {
  user_id: string;
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

    const members = await getServerMembers(server_id);
    const user = await getUserById(user_id, { blocklist: true });

    const blocked = members.filter(
      (member) => user.blocklist.indexOf(member.member_id) > -1,
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
            hasBlocked={blocked.length > 0}
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
        hasBlocked={blocked.length > 0}
      />
    );
  } catch (e) {
    return <ServerNotFound />;
  }
}
