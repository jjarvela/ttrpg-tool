import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Main from "@/app/_components/wrappers/PageMain";
import ChatBody from "../_components/ChatBody";
import { getChannelData } from "@/prisma/services/channelService";
import FeedbackCard from "../../../_components/FeedbackCard";
import ConversationClientWrapper from "@/app/(user)/message/_components/ConversationClientWrapper";

export default async function ServerChat({ params }: { params: Params }) {
  // const session = await auth();

  // if (!session) return redirect("/welcome");

  // const userId = (session as ExtendedSession).userId;
  const id = params.channelId;

  // const channel = await getChannelData(id);

  // if (!channel || typeof channel === "string") {
  //   return <FeedbackCard type="error" message="Something went wrong." />;
  // }

  return (
    <Main className="min-h-0 overflow-hidden">
      <ConversationClientWrapper>
        <ChatBody channelId={id} />
      </ConversationClientWrapper>
    </Main>
  );
}
