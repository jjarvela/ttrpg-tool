import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import {
  getServerCharacterConfig,
  getServerCharacters,
  updateServerCharacterConfig,
} from "@/prisma/services/characterService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import getServerAuth from "@/actions/getServerAuth";
import { getServerConfig } from "@/prisma/services/serverService";
import checkAuthMatch from "../../../../../utils/checkServerAuthMatch";
import ToggleCreation from "./configure/_components/ToggleCreation";
import errorHandler from "@/utils/errorHandler";
import { Fragment } from "react";
import ServerCharacterDisplay from "@/app/_components/character/ServerCharacterDisplay";

export default async function ServerCharacters({ params }: { params: Params }) {
  const id = params.serverId;
  const session = await auth();

  if (!session) redirect("/login");

  const element: JSX.Element = await errorHandler(
    async () => {
      const characters = await getServerCharacters(id, {
        base: {
          id: true,
          name: true,
          description: true,
          image: true,
          owner_id: true,
        },
      });

      const characterConfig = await getServerCharacterConfig(id);

      const serverAuth = await getServerAuth(
        id,
        (session as ExtendedSession).userId,
      );

      const config = await getServerConfig(id);

      return (
        <Fragment>
          <RowWrapper
            breakPoint="sm"
            justify="justify-start sm:justify-between"
            align="content-start sm:content-center items-start sm:items-center"
          >
            {characters.length > 0 || characterConfig.enable_creation ? (
              <Link href={`/server/${id}/characters/create`}>
                <Button className="btn-primary">Create new</Button>
              </Link>
            ) : (
              <small>Character creation is currently disabled</small>
            )}
            <Link href={`/server/${id}/characters/configure`}>
              <Button className="btn-secondary">Configuration</Button>
            </Link>
          </RowWrapper>
          {checkAuthMatch(serverAuth!, config) &&
            characters.length < 1 &&
            renderToggle(characterConfig)}
          {characters.length > 0 ? (
            <RowWrapper
              className="mt-4 flex-wrap gap-4"
              align="content-start items-start"
            >
              {characters.map((character) => (
                <ServerCharacterDisplay
                  user_id={(session as ExtendedSession).userId}
                  key={character.base.id}
                  character={character}
                  config={characterConfig}
                />
              ))}
            </RowWrapper>
          ) : (
            <p>This server has no characters yet.</p>
          )}
        </Fragment>
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return (
    <Main className="mb-4 min-h-[90vh] w-full px-4">
      <h1>Characters</h1>
      {element}
    </Main>
  );
}

function renderToggle(characterConfig: CharacterConfig) {
  if (!characterConfig.enable_creation) {
    return (
      <ToggleCreation
        server_id={characterConfig.server_id}
        enable={async () => {
          "use server";
          await updateServerCharacterConfig(characterConfig.server_id, {
            enable_creation: true,
          });
        }}
      />
    );
  }

  return (
    <ToggleCreation
      server_id={characterConfig.server_id}
      disable={async () => {
        "use server";
        await updateServerCharacterConfig(characterConfig.server_id, {
          enable_creation: false,
        });
      }}
    />
  );
}
