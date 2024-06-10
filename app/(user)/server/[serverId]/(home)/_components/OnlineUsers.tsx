import FeedbackCard from "@/app/_components/FeedbackCard";
import UserInfo from "@/app/_components/UserInfo";
import { getServerMembers } from "@/prisma/services/serverService";
import errorHandler from "@/utils/errorHandler";
import Link from "next/link";

export default async function OnlineUsers({
  user,
  serverId,
  session,
}: {
  user: string;
  serverId: string;
  session: any;
}) {
  const element: JSX.Element = await errorHandler(
    async () => {
      const users = await getServerMembers(serverId);

      if (users.length < 1) return <p>No users</p>;

      const listUsers = users
        .filter((user) => user.user?.socket_id)
        .map((user) => {
          return (
            <div
              className="m-2 from-primary to-accent text-black85 hover:bg-opacity-50 hover:bg-gradient-to-r dark:text-white"
              key={user.id}
            >
              <Link href={`/message/${user.id}`}>
                <UserInfo
                  key={user.id}
                  user={{ ...user.user!, id: user.member_id }}
                  self_id={(session as ExtendedSession).userId}
                  width={40}
                />
              </Link>
            </div>
          );
        });

      return <div className="grid grid-cols-2 xl:grid-cols-3">{listUsers}</div>;
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return element;
}
