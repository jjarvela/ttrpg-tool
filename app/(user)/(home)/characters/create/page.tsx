import Main from "@/app/_components/wrappers/PageMain";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserCharacterForm from "./_components/UserCharacterForm";

export default async function UserCharactersCreate() {
  const session = await auth();

  if (!session) redirect("/login");
  return (
    <Main className="mb-4 w-full px-4">
      <UserCharacterForm user_id={(session as ExtendedSession).userId} />
    </Main>
  );
}
