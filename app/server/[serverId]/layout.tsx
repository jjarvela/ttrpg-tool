
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ColumnWrapper from "../../_components/wrappers/ColumnWrapper";
import TopMenu from "@/app/_components/TopMenu";
import ServerInnerNav from "./_components/ServerInnerNav";
import ServerMembersMenu from "./_components/ServerMembersMenu";
import LayoutClientWrapper from "./_components/LayoutClientWrapper";

export default function ServerLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const id = params.serverId;

  return (
    <LayoutClientWrapper id={id} innerNav={<ServerInnerNav id={id} />} membersMenu={<ServerMembersMenu id={id}/>}>
      {children}
    </LayoutClientWrapper>
    
    
  );
}
