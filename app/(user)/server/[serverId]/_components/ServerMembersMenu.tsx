import FeedbackCard from "@/app/_components/FeedbackCard";
import UserInfo from "@/app/_components/UserInfo";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import {
  getServerData,
  getServerMembers,
} from "@/prisma/services/serverService";
import errorHandler from "@/utils/errorHandler";

export default async function ServerMembersMenu({ id }: { id: string }) {
  const element: JSX.Element = await errorHandler(
    async () => {
      const server = await getServerData(id);

      const members = await getServerMembers(id);

      const admin = members.filter((item) => item.role === "admin")[0];
      const mods = members.filter((item) => item.role === "moderator");
      const regulars = members.filter((item) => item.role === "member");

      return (
        <ColumnWrapper className="h-full w-40">
          <h5>Admin</h5>
          <UserInfo
            username={admin.user!.username || ""}
            screen_name={
              admin.nickname
                ? admin.nickname
                : admin.user!.screen_name || admin.user!.username
            }
            image={admin.icon ? admin.icon : admin.user!.profile_image || ""}
            isActive={admin.user!.socket_id ? true : false}
            width={40}
          />
          {mods.length > 0 && (
            <>
              <h5>Moderators</h5>
              {mods.map((item) => (
                <UserInfo
                  key={item.id}
                  username={item.user!.username || ""}
                  screen_name={
                    item.nickname
                      ? item.nickname
                      : item.user!.screen_name || item.user!.username
                  }
                  image={item.icon ? item.icon : item.user!.profile_image || ""}
                  isActive={item.user!.socket_id ? true : false}
                  width={40}
                />
              ))}
            </>
          )}
          <h5>Members</h5>
          {regulars.map((item) => (
            <UserInfo
              key={item.id}
              username={item.user!.username || ""}
              screen_name={
                item.nickname
                  ? item.nickname
                  : item.user!.screen_name || item.user!.username
              }
              image={item.icon ? item.icon : item.user!.profile_image || ""}
              isActive={item.user!.socket_id ? true : false}
              width={40}
            />
          ))}
        </ColumnWrapper>
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong!" />;
    },
  );

  return (
    <ColumnWrapper
      mode="section"
      id="server-members-nav"
      className="h-full w-full"
    >
      {element}
    </ColumnWrapper>
  );
}
