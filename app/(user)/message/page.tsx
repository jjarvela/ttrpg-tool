import Main from "../../_components/wrappers/PageMain";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "../../../prisma/services/userService";
import UserList from "./_components/UserList";
import MessageForm from "./_components/MessageForm";
//import { getConversationByParticipants } from "../../../prisma/services/conversationService";

export default async function PrivateMessages() {
  const session = await auth();

  if (!session || !session.user || !session.user.email)
    return redirect("/welcome");

  const user = await getUserByEmail(session.user.email);
  const sendToUser = "clu2dnxkt0001bge1b07xcqoc";

  if (typeof user !== "string") {
    return (
      <Main>
        <UserList user={user || undefined} />
        <MessageForm />
      </Main>
    );
  }
}
