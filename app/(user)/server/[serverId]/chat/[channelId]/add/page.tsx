import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import getServerUsers from "@/actions/getServerUsers";
import Main from "@/app/_components/wrappers/PageMain";
import AddMemberForm from "../_components/AddMemberForm";
import {
  getChannelByChannelId,
  getParticipantsOfChannel,
} from "@/prisma/services/channelService";
import FeedbackCard from "../../../../../../_components/FeedbackCard";

export default async function AddMembersToChannel({
  params,
}: {
  params: Params;
}) {
  const serverId = params.serverId;
  const channelId = params.channelId;
  const channel = await getChannelByChannelId(channelId);
  if (!channel || typeof channel === "string") {
    return (
      <FeedbackCard
        type="error"
        message="Something went wrong. Please try again."
      />
    );
  }
  const channelName = channel.channel_name;

  const members = await getServerUsers(serverId);
  if (!members || typeof members === "string") {
    return (
      <FeedbackCard
        type="error"
        message="Something went wrong. Please try again."
      />
    );
  }
  const channelConversationMembers = await getParticipantsOfChannel(channelId);
  if (typeof channelConversationMembers === "string") {
    return (
      <FeedbackCard
        type="error"
        message="Something went wrong. Please try again."
      />
    );
  }
  let notChannelMembers: any[] = [];
  if (channelConversationMembers) {
    const channelMembersIds = channelConversationMembers.participants.map(
      (user) => user.participant_id,
    );
    const notChannelMembersList = members.filter(
      (member: { member_id: string }) =>
        !channelMembersIds.includes(member.member_id),
    );

    if (notChannelMembersList) {
      notChannelMembers = notChannelMembersList.map((member: any) => {
        return { label: member.user.username, value: member.member_id };
      });
    }
  }

  return (
    <Main className="content-center items-center justify-center text-center">
      <h1>Add members to channel {channelName}</h1>
      <AddMemberForm
        serverId={serverId}
        channelId={channelId}
        notChannelMembers={notChannelMembers}
      />
    </Main>
  );
}
