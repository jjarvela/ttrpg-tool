import Main from "../../_components/wrappers/PageMain";
import UserList from "./_components/UserList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return redirect("/welcome");

  return (
    <Main className="items-center justify-between">
      Users:
      <UserList user={(session as ExtendedSession).userId} />
    </Main>
  );
}
