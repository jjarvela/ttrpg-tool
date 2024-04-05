import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ColumnWrapper from "../../_components/wrappers/ColumnWrapper";
import {
  getServerData,
  getServerMembers,
} from "../../../prisma/services/serverService";
import RowWrapper from "../../_components/wrappers/RowWrapper";
import FeedbackCard from "../../_components/FeedbackCard";
import UserInfo from "../../_components/UserInfo";
import TopMenu from "@/app/_components/TopMenu";

export default async function ServerLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const id = params.serverId[0];

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

  return (
    <div className="relative flex flex-grow">
      {/* TopMenu component */}
      <div className="fixed left-0 right-0 top-0">
        <TopMenu />
      </div>

      <ColumnWrapper
        mode="section"
        id="server-inner-nav"
        className="fixed bottom-0 left-16 top-0 flex min-w-28 overflow-y-hidden border-r border-r-black50 bg-black25 p-0 md:w-40 md:p-0 dark:bg-black85"
      >
        <RowWrapper className="border-b border-black50 px-2 pt-1">
          <h5 className="text-wrap">{server.server_name}</h5>
        </RowWrapper>
      </ColumnWrapper>

      {/* Main content */}
      <div className="flex">{children}</div>

      <ColumnWrapper
        mode="section"
        id="server-members-nav"
        className="dark:bg-color-dark fixed right-0 top-0 h-screen w-32 bg-primary"
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
        </ColumnWrapper>
      </ColumnWrapper>
    </div>
  );
}
