import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ColumnWrapper from "../../_components/wrappers/ColumnWrapper";
import TopMenu from "@/app/_components/TopMenu";
import ServerInnerNav from "./_components/ServerInnerNav";
import ServerMembersMenu from "./_components/ServerMembersMenu";

export default async function ServerLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const id = params.serverId;

  let isOpen = true;

  return (
    <div className="flex flex-grow">
      {/*server inner nav*/}
      <ServerInnerNav id={id} />

      {/*top menu and content*/}
      <ColumnWrapper
        align="items-start"
        className="m-0 flex-grow gap-0 p-0 lg:gap-2"
      >
        <TopMenu serverId={id} />
        {children}
      </ColumnWrapper>

      {/*server members bar*/}
      <ServerMembersMenu id={id} isOpen={isOpen} />
    </div>
  );
}
