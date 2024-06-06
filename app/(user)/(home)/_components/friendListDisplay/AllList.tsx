import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import FriendOptionsElement from "../FriendOptionsElement";
import UserThumb from "../UserThumb";

export default function AllList({
  online,
  offline,
}: {
  online: UserBasic[];
  offline: UserBasic[];
}) {
  return (
    <ColumnWrapper className="w-full">
      {online.map((user) => (
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
      {offline.map((user) => (
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
