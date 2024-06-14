import Main from "@/app/_components/wrappers/PageMain";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CreateServerForm from "./_components/CreateServerForm";

export default async function CreateServerPage() {
  const session = await auth();

  if (!session) redirect("/welcome");

  return (
    <Main className="ml-8 ps-12 pt-2">
      <CreateServerForm userId={(session as ExtendedSession).userId} />
    </Main>
  );
}
