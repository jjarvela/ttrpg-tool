import { redirect } from "next/navigation";
import AccountInfo from "./_components/AccountInfo";
import { auth } from "../../../auth";
import { getUserByEmail } from "../../../prisma/services/userService";
import FeedbackCard from "../../_components/FeedbackCard";
import Main from "../../_components/wrappers/PageMain";

export default async function UserPreferences() {
  const session = await auth();

  if (!session || !session.user || !session.user.email)
    return redirect("/welcome");

  const user = await getUserByEmail(session.user.email);

  if (typeof user === "string")
    return <FeedbackCard type="error" message="Something went wrong!" />;

  return (
    <Main className="p-4">
      <AccountInfo user={user || undefined} />
    </Main>
  );
}
