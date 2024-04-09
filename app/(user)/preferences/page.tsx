import { redirect } from "next/navigation";
import AccountInfo from "./_components/AccountInfo";
import { auth } from "../../../auth";
import { getUserById } from "../../../prisma/services/userService";
import FeedbackCard from "../../_components/FeedbackCard";
import Main from "../../_components/wrappers/PageMain";

export default async function UserPreferences() {
  const session = await auth();

  if (!session)
    return redirect("/welcome");

  const user = await getUserById((session as ExtendedSession).userId);

  if (typeof user === "string")
    return <FeedbackCard type="error" message="Something went wrong!" />;

  return (
    <Main className="p-4">
      <AccountInfo user={user || undefined} />
    </Main>
  );
}
