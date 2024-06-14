import FeedbackCard from "@/app/_components/FeedbackCard";
import UserInfo from "@/app/_components/UserInfo";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { auth } from "@/auth";
import { getServerMembers } from "@/prisma/services/serverService";
import errorHandler from "@/utils/errorHandler";
import { redirect } from "next/navigation";

export default async function ServerMembersMenu({ id }: { id: string }) {
  const element: JSX.Element = await errorHandler(
    async () => {
      const session = await auth();

      if (!session) {
        redirect("/welcome");
      }

      const members = await getServerMembers(id);

      const admin = members.filter((item) => item.role === "admin")[0];
      const mods = members.filter((item) => item.role === "moderator");
      const regulars = members.filter((item) => item.role === "member");

      return (
        <ColumnWrapper className="h-full w-40">
          <h5>Admin</h5>
          <UserInfo
            user={{
              ...admin.user!,
              id: admin.member_id,
              profile_image: admin.icon || admin.user!.profile_image,
              screen_name: admin.nickname || admin.user!.screen_name,
            }}
            self_id={(session as ExtendedSession).userId}
            width={40}
          />
          {mods.length > 0 && (
            <>
              <h5>Moderators</h5>
              {mods.map((item) => (
                <UserInfo
                  key={item.id}
                  user={{
                    ...item.user!,
                    id: item.member_id,
                    profile_image: item.icon || item.user!.profile_image,
                    screen_name: item.nickname || item.user!.screen_name,
                  }}
                  self_id={(session as ExtendedSession).userId}
                  width={40}
                />
              ))}
            </>
          )}
          <h5>Members</h5>
          {regulars.map((item) => (
            <UserInfo
              key={item.id}
              user={{
                ...item.user!,
                id: item.member_id,
                profile_image: item.icon || item.user!.profile_image,
                screen_name: item.nickname || item.user!.screen_name,
              }}
              self_id={(session as ExtendedSession).userId}
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
