import Main from "../../../_components/wrappers/PageMain";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import UserList from "../_components/UserList";

export default async function PrivateMessages() {
  const session = await auth();

  if (!session) return redirect("/welcome");

  return (
    <Main>
      <p>Select a person to start chatting</p>
      <UserList user={(session as ExtendedSession).userId} />
    </Main>
  );
}
