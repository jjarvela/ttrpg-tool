import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Main from "../../../_components/wrappers/PageMain";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import MessageForm from "../_components/MessageForm";
import MessageBody from "../_components/MessageBody";

export default async function PrivateMessages({ params }: { params: Params }) {
  const session = await auth();

  if (!session) return redirect("/welcome");

  const userId = (session as ExtendedSession).userId;
  const receiverId = params.userId;

  return (
    <Main>
      <MessageBody senderId={userId} receiverId={receiverId} />
      <MessageForm userId={userId} receiverId={receiverId} />
    </Main>
  );
}
