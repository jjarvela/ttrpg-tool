import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Main from "@/app/_components/wrappers/PageMain";
import CreateChannelForm from "./_components/CreateChannelForm";
import { getServerMembers } from "@/prisma/services/serverService";
import errorHandler from "@/utils/errorHandler";
import { Fragment } from "react";

export default async function CreateChannel({ params }: { params: Params }) {
  const element: JSX.Element = await errorHandler(
    async () => {
      const serverId = params.serverId;

      const members = await getServerMembers(serverId);

      const listMembers = members.map((member) => {
        return { label: member.user!.username, value: member.member_id };
      });

      return (
        <Fragment>
          <h1>Create new channel</h1>
          <CreateChannelForm serverId={serverId} listMembers={listMembers} />
        </Fragment>
      );
    },
    () => {
      return <p>Something went wrong. Please refresh the page.</p>;
    },
  );

  return (
    <Main className="w-full content-center items-center justify-center text-center">
      {element}
    </Main>
  );
}
