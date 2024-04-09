import FeedbackCard from "@/app/_components/FeedbackCard";
import UserInfo from "@/app/_components/UserInfo";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import {
  getServerData,
  getServerMembers,
} from "@/prisma/services/serverService";
import { twMerge } from "tailwind-merge";

export default async function ServerMembersMenu({
  id
}: {
  id: string;
}) {
  const server = await getServerData(id);
  const members = await getServerMembers(id);

  if (
    !server ||
    typeof server === "string" ||
    !members ||
    typeof members === "string"
  )
    return (
      <div className="flex-grow">
        <FeedbackCard type="error" message="Something went wrong!" />
      </div>
    );

  const admin = members.filter((item) => item.role === "admin")[0];
  const regulars = members.filter((item) => item.role === "member");
  return (
    <ColumnWrapper
      mode="section"
      id="server-members-nav"
      className={twMerge(
        "bg-color-dark border-l-[1px] border-black50"
      )}
    >
      <ColumnWrapper className="h-full">
        <h5>Admin</h5>
        <UserInfo
          username={admin.user.username || ""}
          screen_name={
            admin.nickname
              ? admin.nickname
              : admin.user.screen_name || admin.user.username
          }
          image={admin.icon ? admin.icon : admin.user.profile_image || ""}
          isActive={false}
          width={40}
        />
        <h5>Members</h5>
        {regulars.map((item) => (
          <UserInfo
            key={item.id}
            username={item.user.username || ""}
            screen_name={
              item.nickname
                ? item.nickname
                : item.user.screen_name || item.user.username
            }
            image={item.icon ? item.icon : item.user.profile_image || ""}
            isActive={false}
            width={40}
          />
        ))}
      </ColumnWrapper>
    </ColumnWrapper>
  );
}
