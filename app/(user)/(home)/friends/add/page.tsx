import Main from "@/app/_components/wrappers/PageMain";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AddFriendsPage() {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return redirect("/welcome");

  return <Main className="w-full items-center justify-between pb-10"></Main>;
}
