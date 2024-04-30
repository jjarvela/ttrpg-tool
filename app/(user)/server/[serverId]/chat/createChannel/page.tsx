import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import getServerUsers from "@/actions/getServerUsers";
import Main from "@/app/_components/wrappers/PageMain";
import CreateChannelForm from "./_components/CreateChannelForm";

export default async function CreateChannel({ params }: { params: Params }) {
  const serverId = params.serverId;
  const members = await getServerUsers(serverId);
  let listMembers: any[] = [];
  if (members && typeof members !== "string") {
    listMembers = members.map((member: any) => {
      return { label: member.user.username, value: member.member_id };
    });
  }

  return (
    <Main className="content-center items-center justify-center text-center">
      <h1>Create new channel</h1>
      <CreateChannelForm serverId={serverId} listMembers={listMembers} />
    </Main>
  );
}
