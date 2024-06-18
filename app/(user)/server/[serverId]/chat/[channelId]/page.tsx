import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { cookies } from "next/headers";
import Main from "@/app/_components/wrappers/PageMain";
import ChatBody from "./_components/ChatBody";
import FeedbackCard from "../../../../../_components/FeedbackCard";
import ConversationClientWrapper from "@/app/(user)/(home)/message/_components/ConversationClientWrapper";
import { getChannelByChannelId } from "@/prisma/services/channelService";
import { IconLink } from "@/app/_components/Button";
import errorHandler from "@/utils/errorHandler";
import OpenDiceModal from "./_components/OpenDiceModal";

export default async function ServerChat({ params }: { params: Params }) {
  const server_id = params.serverId;
  const channelId = params.channelId;

  // Check for cookie set refresh request
  const cookieStore = cookies();
  const refresh = cookieStore.get("refreshReq");

  const element: JSX.Element = await errorHandler(
    async () => {
      const channel = await getChannelByChannelId(channelId);

      const channeltype = channel.channel_type;
      const channelName = channel.channel_name;
      if (channeltype === "text") {
        return (
          <ConversationClientWrapper>
            <div className="z-3 sticky top-0 m-0 flex w-full justify-between bg-white p-0 px-4 dark:bg-black">
              <h3>{channelName}</h3>
              <OpenDiceModal channelId={channelId} serverId={server_id} />
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
