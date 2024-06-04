import Link from "next/link";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import RowWrapper from "../wrappers/RowWrapper";
import CharacterPortrait from "./CharacterPortrait";
import DeleteCharacterBaseButton from "./DeleteCharacterBaseButton";
import { getCharacterServers } from "@/prisma/services/characterService";
import errorHandler from "@/utils/errorHandler";
import ServersDisplay from "./ServersDisplay";

export default async function CharacterBaseDisplay({
  character,
}: {
  character: CharacterBase;
}) {
  const element: JSX.Element | null = await errorHandler(
    async () => {
      const servers = await getCharacterServers(character.id);

      if (servers.length > 0) {
        return <ServersDisplay servers={servers} />;
      }

      return null;
    },
    () => null,
  );

  return (
    <RowWrapper align="items-start w-[26.5rem]">
      <div className="relative h-44 w-[10rem] flex-shrink-0 overflow-hidden border-[1px] border-black50">
        {character.image && (
          <CharacterPortrait filename={character.image} alt={character.name} />
        )}
      </div>
      <Link href={`/characters/${character.id}`}>
        <ColumnWrapper align="items-start">
          <h3 className="w-full overflow-hidden text-ellipsis">
            {character.name}
          </h3>
          <p className="line-clamp-3 w-full text-ellipsis">
            {character.description}
          </p>
          {element && <div className="flex w-full justify-end">{element}</div>}
        </ColumnWrapper>
      </Link>
      <DeleteCharacterBaseButton character_id={character.id} />
    </RowWrapper>
  );
}
