import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
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
        <UserThumb key={user.id} user={user} options="friend" />
      ))}
      {offline.map((user) => (
        <UserThumb key={user.id} user={user} options="friend" />
      ))}
    </ColumnWrapper>
  );
}
