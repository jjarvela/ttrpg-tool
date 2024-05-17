import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import CharacterForm from "./_components/CharacterForm";
import { getServerCharacterConfig } from "@/prisma/services/characterService";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ServerCharactersCreate({
  params,
}: {
  params: Params;
}) {
  const id = params.serverId;

  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  try {
    const config = await getServerCharacterConfig(id);

    return (
      <Main className="mb-4 min-h-[90vh] w-full px-4">
        <h1>Create character</h1>
        <CharacterForm
          user_id={(session as ExtendedSession).userId}
          config={config}
        />
      </Main>
    );
  } catch (e) {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }
}
