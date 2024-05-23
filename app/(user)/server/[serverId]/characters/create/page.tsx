import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import CharacterForm from "./_components/CharacterForm";
import {
  getServerCharacterConfig,
  getUserCharacterBases,
} from "@/prisma/services/characterService";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import errorHandler from "@/utils/errorHandler";
import { Fragment } from "react";

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

  const element: JSX.Element = await errorHandler(
    async () => {
      const config = await getServerCharacterConfig(id);
      const characters = await getUserCharacterBases(
        (session as ExtendedSession).userId,
      );
      return (
        <Fragment>
          <h1>Create character</h1>
          <CharacterForm characters={characters} config={config} />
        </Fragment>
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return <Main className="mb-4 min-h-[90vh] w-full px-4">{element}</Main>;
}
