import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import FriendOptionsElement from "../FriendOptionsElement";
import UserThumb from "../UserThumb";

export default function OnlineList({ users }: { users: UserBasic[] }) {
  return (
    <ColumnWrapper className="w-full">
      {users.map((user) => (
        <UserThumb
          key={user.id}
          user={user}
          optionsElement={
            <FriendOptionsElement
              name={user.screen_name || user.username}
              user_id={user.id}
            />
          }
        />
      ))}
    </ColumnWrapper>
  );
}
