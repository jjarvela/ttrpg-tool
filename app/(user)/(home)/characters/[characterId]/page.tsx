import Main from "@/app/_components/wrappers/PageMain";
import { auth } from "@/auth";
import { getCharacterBase } from "@/prisma/services/characterService";
import { redirect } from "next/navigation";
import errorHandler from "@/utils/errorHandler";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import UserCharacterForm from "../create/_components/UserCharacterForm";
import FeedbackCard from "@/app/_components/FeedbackCard";

export default async function UserCharactersCreate({
  params,
}: {
  params: Params;
}) {
  const session = await auth();

  if (!session) redirect("/login");

  const id = params.characterId;

  const element: JSX.Element = await errorHandler(
    async () => {
      const character = await getCharacterBase(id);
      return (
        <UserCharacterForm
          user_id={(session as ExtendedSession).userId}
          character={character}
        />
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );
  return <Main className="mb-4 w-full px-4">{element}</Main>;
}
