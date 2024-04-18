import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import LayoutClientWrapper from "./_components/LayoutClientWrapper";
import ServerInnerNav from "./_components/ServerInnerNav";
import ServerMembersMenu from "./_components/ServerMembersMenu";

export default function ServerLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const id = params.serverId;

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
