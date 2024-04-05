import { getUsersExcept } from "../../../../prisma/services/userService";
import UserInfo from "../../../_components/UserInfo";
import RowWrapper from "../../../_components/wrappers/RowWrapper";
import Link from "next/link";

type User = {
  id: string;
  username: string;
  password_hash: string;
  email: string;
  emailVerified: Date | null;
  created_at: Date;
  screen_name: string | null;
  timezone: string | null;
  person_description: string | null;
  profile_image: string | null;
};

export default async function UserList({ user }: { user?: User }) {
  if (user) {
    const users = await getUsersExcept(user.id);
    if (typeof users !== "string") {
      const listUsers = users.map((user) => {
        return (
          <li className="hover:bg-black25" key={user.id}>
            <Link href={`/message/${user.id}`}>
              <UserInfo
                key={user.id}
                username={user.username}
                width={40}
                isActive={false}
                screen_name={user.screen_name || undefined}
              />
            </Link>
          </li>
        );
      });

      return (
        <RowWrapper>
          <ul>{listUsers}</ul>
        </RowWrapper>
      );
    }
  }
}
