import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ColumnWrapper from "../../_components/wrappers/ColumnWrapper";
import {
  getServerData,
  getServerMembers,
} from "../../../prisma/services/serverService";
import RowWrapper from "../../_components/wrappers/RowWrapper";
import FeedbackCard from "../../_components/FeedbackCard";
import UserInfo from "../../_components/UserInfo";

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
    <div className="flex flex-grow">
      <ColumnWrapper
        mode="section"
        id="server-inner-nav"
        className="sticky mr-2 h-full border-r border-r-black50 p-0 md:max-w-[15%]"
      >
        <RowWrapper className="border-b border-black50 px-2 pt-1">
          <h5 className="text-wrap">{server.server_name}</h5>
        </RowWrapper>
      </ColumnWrapper>
      {children}
      <ColumnWrapper
        mode="section"
        id="server-members-nav"
        className="bg-black"
      >
        <ColumnWrapper className="sticky h-full">
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
