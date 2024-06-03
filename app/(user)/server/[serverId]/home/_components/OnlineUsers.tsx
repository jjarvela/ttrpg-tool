import FeedbackCard from "@/app/_components/FeedbackCard";
import UserInfo from "@/app/_components/UserInfo";
import { getUsersExcept } from "@/prisma/services/userService";
import errorHandler from "@/utils/errorHandler";
import Link from "next/link";

export default async function OnlineUsers({ user }: { user: string }) {
  const element: JSX.Element = await errorHandler(
    async () => {
      const users = await getUsersExcept(user, {
        id: true,
        username: true,
        screen_name: true,
        socket_id: true,
        profile_image: true,
        person_status: true,
      });

      if (users.length < 1) return <p>No users</p>;

      const listUsers = users
        // .filter((user) => user.socket_id)
        .map((user) => {
          return (
            <div className="m-2 hover:bg-black25" key={user.id}>
              <Link href={`/message/${user.id}`}>
                <UserInfo
                  key={user.id}
                  username={user.username}
                  width={40}
                  image={user.profile_image ? user.profile_image : undefined}
                  isActive={user.socket_id ? true : false}
                  screen_name={user.screen_name || undefined}
                />
              </Link>
            </div>
          );
        });

      return <div className="grid grid-cols-2 lg:grid-cols-3">{listUsers}</div>;
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return element;
}
