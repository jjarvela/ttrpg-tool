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

export default async function ServerCharacters({ params }: { params: Params }) {
  const id = params.serverId;
  const session = await auth();

  if (!session) redirect("/login");

  const element: JSX.Element = await errorHandler(
    async () => {
      const characters = await getServerCharacters(id);

      const characterConfig = await getServerCharacterConfig(id);

      const serverAuth = await getServerAuth(
        id,
        (session as ExtendedSession).userId,
      );

      const config = await getServerConfig(id);

      return (
        <Fragment>
          <RowWrapper justify="justify-between">
            {characters.length < 1 && characterConfig.enable_creation ? (
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
      disable={async () => {
        "use server";
        await updateServerCharacterConfig(characterConfig.server_id, {
          enable_creation: false,
        });
      }}
    />
  );
}
