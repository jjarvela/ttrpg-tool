import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import LayoutClientWrapper from "./_components/LayoutClientWrapper";
import ServerInnerNav from "./_components/ServerInnerNav";
import ServerMembersMenu from "./_components/ServerMembersMenu";
import { auth } from "@/auth";
import getServerAuth from "@/actions/getServerAuth";
import ServerJoinPage from "./_components/serverJoinComponents/ServerJoinPage";

export default async function ServerLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const id = params.serverId;

  const session = await auth();
  const serverAuth = await getServerAuth(
    id,
    (session as ExtendedSession).userId,
  );

  if (!serverAuth) return <ServerJoinPage server_id={id} />;

  return (
    <LayoutClientWrapper
      id={id}
      innerNav={<ServerInnerNav id={id} />}
      membersMenu={<ServerMembersMenu id={id} />}
    >
      {children}
    </LayoutClientWrapper>
  );
}
