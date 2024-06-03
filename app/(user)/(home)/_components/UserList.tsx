import errorHandler from "@/utils/errorHandler";
import { getUsersExcept } from "../../../../prisma/services/userService";
import UserInfo from "../../../_components/UserInfo";
import Link from "next/link";
import FeedbackCard from "@/app/_components/FeedbackCard";
import UserThumb from "./UserThumb";

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

      const listUsers = users.map((user) => (
        <UserThumb key={user.id} user={user} />
      ));

      return <ul className="w-full flex-grow">{listUsers}</ul>;
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return element;
}
