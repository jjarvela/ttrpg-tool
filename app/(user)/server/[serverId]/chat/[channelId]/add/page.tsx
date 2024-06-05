import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Main from "@/app/_components/wrappers/PageMain";
import AddMemberForm from "../_components/AddMemberForm";
import {
  getChannelByChannelId,
  getParticipantsOfChannel,
} from "@/prisma/services/channelService";
import FeedbackCard from "../../../../../../_components/FeedbackCard";
import { getServerMembers } from "@/prisma/services/serverService";
import errorHandler from "@/utils/errorHandler";
import { Fragment } from "react";

export default async function AddMembersToChannel({
  params,
}: {
  params: Params;
}) {
  const element: JSX.Element = await errorHandler(
    async () => {
      const serverId = params.serverId;

      const channelId = params.channelId;

      const channel = await getChannelByChannelId(channelId);

      const channelName = channel.channel_name;

      const members = await getServerMembers(serverId);

      const channelConversationMembers =
        await getParticipantsOfChannel(channelId);

      let notChannelMembers: { label: string; value: string }[] = [];

      if (channelConversationMembers) {
        const channelMembersIds = channelConversationMembers.participants.map(
          (user) => user.participant_id,
        );
        const notChannelMembersList = members.filter(
          (member: { member_id: string }) =>
            !channelMembersIds.includes(member.member_id),
        );

        if (notChannelMembersList) {
          notChannelMembers = notChannelMembersList.map((member) => {
            return { label: member.user!.username, value: member.member_id };
          });
        }
      }

      return (
        <Fragment>
          <h1>Add members to channel {channelName}</h1>
          <AddMemberForm
            serverId={serverId}
            channelId={channelId}
            notChannelMembers={notChannelMembers}
          />
        </Fragment>
      );
    },
    () => {
      return (
        <FeedbackCard
          type="error"
          message="Something went wrong. Please try again."
        />
      );
    },
  );

  return (
    <Main className="w-full content-center items-center justify-center text-center">
      {element}
    </Main>
  );
}
