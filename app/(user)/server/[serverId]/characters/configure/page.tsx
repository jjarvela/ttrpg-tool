import getServerAuth from "@/actions/getServerAuth";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { auth } from "@/auth";
import {
  getServerCharacterConfig,
  getServerCharacters,
} from "@/prisma/services/characterService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { redirect } from "next/navigation";
import StackDisplay from "./_components/StackDisplay";
import StackEdit from "./_components/StackEdit";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import Link from "next/link";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import { getServerConfig } from "@/prisma/services/serverService";
import checkAuthMatch from "@/utils/checkServerAuthMatch";

export default async function ServerCharacterConfig({
  params,
}: {
  params: Params;
}) {
  const session = await auth();

  const id = params.serverId;

  if (!session) redirect("/login");

  try {
    const characters = await getServerCharacters(id);

    const characterConfig = await getServerCharacterConfig(id);

    const serverAuth = await getServerAuth(
      id,
      (session as ExtendedSession).userId,
    );

    const config = await getServerConfig(id);

    if (
      !checkAuthMatch(serverAuth!, config) ||
      characterConfig.enable_creation ||
      characters.length > 0
    ) {
      return (
        <Main className="w-full px-4">
          <Link href={`/server/${id}/characters`} className="mb-4 flex gap-2">
            <MaterialSymbolsLightChevronLeftRounded className="text-xl" />
            <span>Return</span>
          </Link>
          {characters.length > 0 && (
            <p>
              Please note that the status configuration cannot be altered when
              there are existing characters.
            </p>
          )}
          <ColumnWrapper className="gap-4">
            <StackDisplay
              title="Vitals"
              description="These are the type of statuses that have a maximum value and can fall below it depending on the game situation (eg. damage taken, magic used)."
              stats={characterConfig.vitals_names}
            />
            <StackDisplay
              title="Attributes"
              description="These are the type of statuses that increase when certain conditions (eg. level up) are met."
              stats={characterConfig.attributes_names}
            />
            <StackDisplay
              title="Statics"
              description="These are the type of statuses that remain at the intial values throughout the character's lifespan."
              stats={characterConfig.statics_names}
            />
          </ColumnWrapper>
        </Main>
      );
    }

    return (
      <Main className="w-full px-4">
        <Link href={`/server/${id}/characters`} className="mb-4 flex gap-2">
          <MaterialSymbolsLightChevronLeftRounded className="text-xl" />
          <span>Return</span>
        </Link>
        <p>
          Here you can alter the status sets. Please note that the configuration
          cannot be altered when there are existing characters.
        </p>
        <ColumnWrapper className="gap-4">
          <StackEdit
            server_id={id}
            title="Vitals"
            description="These are the type of statuses that have a maximum value and can fall below it depending on the game situation."
            stats={characterConfig.vitals_names}
          />
          <StackEdit
            server_id={id}
            title="Attributes"
            description="These are the type of statuses that increase when certain conditions (eg. level up) are met."
            stats={characterConfig.attributes_names}
          />
          <StackEdit
            server_id={id}
            title="Statics"
            description="These are the type of statuses that remain at the intial values throughout the character's lifespan."
            stats={characterConfig.statics_names}
          />
        </ColumnWrapper>
      </Main>
    );
  } catch (e) {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }
}
