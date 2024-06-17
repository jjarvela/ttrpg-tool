import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Main from "@/app/_components/wrappers/PageMain";
import ChatBody from "./_components/ChatBody";
import FeedbackCard from "../../../../../_components/FeedbackCard";
import ConversationClientWrapper from "@/app/(user)/(home)/message/_components/ConversationClientWrapper";
import { getChannelByChannelId } from "@/prisma/services/channelService";
import { IconLink } from "@/app/_components/Button"
import errorHandler from "@/utils/errorHandler";

export default async function ServerChat({ params }: { params: Params }) {
  const server_id = params.serverId;
  const channelId = params.channelId;

  const element: JSX.Element = await errorHandler(
    async () => {
      const channel = await getChannelByChannelId(channelId);

      const channeltype = channel.channel_type;
      const channelName = channel.channel_name;
      if (channeltype === "text") {
        return (
          <ConversationClientWrapper>
            <div className="flex z-3 sticky bg-white m-0 p-0 top-0 w-full justify-between">
              <div></div>
              <h3>{channelName}</h3>
              <IconLink href={`/server/${server_id}/dice?channel=${channelId}`} className="p-2" imgSrc="/icons/dices/icon.svg" width={30} height={30}></IconLink>
            </div>
            <ChatBody channelId={channelId} server_id={server_id} />
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
