import { getUsersExcept } from "../../../../prisma/services/userService";
import UserInfo from "../../../_components/UserInfo";
import Link from "next/link";

export default async function UserList({ user }: { user: string }) {
  const users = await getUsersExcept(user, {
    id: true,
    username: true,
    screen_name: true,
    socket_id: true,
    profile_image: true,
    person_status: true,
  });

  if (!users || typeof users === "string") return <p>No users</p>;

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
}
