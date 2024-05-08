import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Main from "@/app/_components/wrappers/PageMain";
import ChatBody from "./_components/ChatBody";
import FeedbackCard from "../../../../../_components/FeedbackCard";
import ConversationClientWrapper from "@/app/(user)/message/_components/ConversationClientWrapper";
import { getChannelByChannelId } from "@/prisma/services/channelService";

export default async function ServerChat({ params }: { params: Params }) {
  const channelId = params.channelId;

  const channel = await getChannelByChannelId(channelId);

  if (!channel || typeof channel === "string") {
    return (
      <FeedbackCard
        type="error"
        message="Something went wrong. Please try again."
      />
    );
  } else {
    const channeltype = channel.channel_type;
    const channelName = channel.channel_name;

    return (
      <>
        {channeltype === "text" ? (
          <Main className="min-h-0 overflow-hidden">
            <ConversationClientWrapper>
              <h3>{channelName}</h3>
              <ChatBody channelId={channelId} />
            </ConversationClientWrapper>
          </Main>
        ) : (
          <Main className="mx-4">
            <h3>{channelName}</h3>
            <p>The voice channels are not implemented yet.</p>
          </Main>
        )}
      </>
    );
  }
}
