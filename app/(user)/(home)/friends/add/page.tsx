import Main from "@/app/_components/wrappers/PageMain";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserSearch from "./_components/UserSearch";

export default async function AddFriendsPage() {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return redirect("/welcome");

  return (
    <Main className="w-full items-center justify-between pb-10">
      <UserSearch searcher_id={(session as ExtendedSession).userId} />
    </Main>
  );
}
