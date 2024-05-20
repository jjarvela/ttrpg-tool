import errorHandler from "@/utils/errorHandler";
import { getUsersExcept } from "../../../../prisma/services/userService";
import UserInfo from "../../../_components/UserInfo";
import Link from "next/link";
import FeedbackCard from "@/app/_components/FeedbackCard";

export default async function UserList({ user }: { user: string }) {
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

      const listUsers = users.map((user) => {
        return (
          <li className="m-2 hover:bg-black25" key={user.id}>
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
          </li>
        );
      });

      return <ul className="flex-grow">{listUsers}</ul>;
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return element;
}
