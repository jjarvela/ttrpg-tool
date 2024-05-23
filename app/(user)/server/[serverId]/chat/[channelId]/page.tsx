import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Main from "@/app/_components/wrappers/PageMain";
import ChatBody from "./_components/ChatBody";
import FeedbackCard from "../../../../../_components/FeedbackCard";
import ConversationClientWrapper from "@/app/(user)/(home)/message/_components/ConversationClientWrapper";
import { getChannelByChannelId } from "@/prisma/services/channelService";
import errorHandler from "@/utils/errorHandler";

export default async function ServerChat({ params }: { params: Params }) {
  const channelId = params.channelId;

  const element: JSX.Element = await errorHandler(
    async () => {
      const channel = await getChannelByChannelId(channelId);

      const channeltype = channel.channel_type;
      const channelName = channel.channel_name;
      if (channeltype === "text") {
        return (
          <ConversationClientWrapper>
            <h3>{channelName}</h3>
            <ChatBody channelId={channelId} />
          </ConversationClientWrapper>
        );
      }
      return (
        <>
          <h3>{channelName}</h3>
          <p>The voice channels are not implemented yet.</p>
        </>
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

  return <Main className="min-h-0 overflow-hidden">{element}</Main>;
}
