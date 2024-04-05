import Main from "../../_components/wrappers/PageMain";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "../../../prisma/services/userService";

export default async function PrivateMessages() {
  const session = await auth();

  if (!session || !session.user || !session.user.email)
    return redirect("/welcome");

  const user = await getUserByEmail(session.user.email);

  if (typeof user !== "string") {
    return (
      <Main>
        <p>Select a person to start chatting</p>
      </Main>
    );
  }
}
