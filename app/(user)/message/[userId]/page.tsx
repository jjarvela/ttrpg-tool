import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Main from "../../../_components/wrappers/PageMain";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import MessageBody from "../_components/MessageBody";
import ConversationClientWrapper from "../_components/ConversationClientWrapper";

export default async function PrivateMessages({ params }: { params: Params }) {
  const session = await auth();

  if (!session) return redirect("/welcome");

  const userId = (session as ExtendedSession).userId;
  const receiverId = params.userId;

  return (
    <Main className="min-h-0 overflow-hidden">
      <ConversationClientWrapper>
        <MessageBody senderId={userId} receiverId={receiverId} />
      </ConversationClientWrapper>
    </Main>
  );
}
