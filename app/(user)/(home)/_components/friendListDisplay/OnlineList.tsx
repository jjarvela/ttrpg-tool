import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import UserThumb from "../UserThumb";

export default function OnlineList({ users }: { users: UserBasic[] }) {
  return (
    <ColumnWrapper className="w-full">
      {users.map((user) => (
        <UserThumb key={user.id} user={user} options="friend" />
      ))}
    </ColumnWrapper>
  );
}
