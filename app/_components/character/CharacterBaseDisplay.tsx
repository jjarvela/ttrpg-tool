import Link from "next/link";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import RowWrapper from "../wrappers/RowWrapper";
import CharacterPortrait from "./CharacterPortrait";
import DeleteCharacterBaseButton from "./DeleteCharacterBaseButton";

export default function CharacterBaseDisplay({
  character,
}: {
  character: CharacterBase;
}) {
  return (
    <RowWrapper align="items-start w-[24rem]">
      <div className="relative flex h-44 w-[10rem] items-center justify-center overflow-hidden border-[1px] border-black50">
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
        </ColumnWrapper>
      </Link>
      <DeleteCharacterBaseButton character_id={character.id} />
    </RowWrapper>
  );
}
