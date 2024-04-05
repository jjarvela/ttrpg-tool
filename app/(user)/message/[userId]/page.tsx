import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Main from "../../../_components/wrappers/PageMain";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "../../../../prisma/services/userService";
import MessageForm from "../_components/MessageForm";

export default async function PrivateMessages({ params }: { params: Params }) {
  const session = await auth();

  if (!session || !session.user || !session.user.email)
    return redirect("/welcome");

  const user = await getUserByEmail(session.user.email);

  const receiverId = params.userId;

  if (user && typeof user !== "string") {
    console.log("userId: " + user.id);

    return (
      <Main>
        <p>messages</p>
        <MessageForm userId={user.id} receiverId={receiverId} />
      </Main>
    );
  }
}
