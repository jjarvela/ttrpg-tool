import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Main from "@/app/_components/wrappers/PageMain";
import ChatBody from "./_components/ChatBody";
import FeedbackCard from "../../../../../_components/FeedbackCard";
import ConversationClientWrapper from "@/app/(user)/message/_components/ConversationClientWrapper";

export default async function ServerChat({ params }: { params: Params }) {
  const id = params.channelId;

  if (!id) {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }

  return (
    <Main className="min-h-0 overflow-hidden">
      <ConversationClientWrapper>
        <ChatBody channelId={id} />
      </ConversationClientWrapper>
    </Main>
  );
}
