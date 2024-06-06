import errorHandler from "@/utils/errorHandler";
import FeedbackCard from "@/app/_components/FeedbackCard";
import UserThumb from "./UserThumb";
import { getUserFriends } from "@/prisma/services/friendService";
import FriendOptionsElement from "./FriendOptionsElement";

export default async function UserList({ user }: { user: string }) {
  const element: JSX.Element = await errorHandler(
    async () => {
      const users = await getUserFriends(user);

      if (users.length < 1) return <p>No users</p>;

      const listUsers = users.map((user) => (
        <UserThumb
          key={user.id}
          user={user}
          optionsElement={
            <FriendOptionsElement
              user_id={user.id}
              name={user.screen_name || user.username}
            />
          }
        />
      ));

      return <ul className="w-full flex-grow">{listUsers}</ul>;
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return element;
}
