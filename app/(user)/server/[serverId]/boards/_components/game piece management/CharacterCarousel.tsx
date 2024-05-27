"use client";

import CharacterPortrait from "@/app/_components/character/CharacterPortraitClient";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import { twMerge } from "tailwind-merge";

export default function CharacterCarousel({
  characters,
  index,
  filterCharacters,
  selectedCharacter,
  setSelectedCharacter,
}: {
  characters: ServerCharacter[];
  index: number;
  filterCharacters: (direction: number) => void;
  selectedCharacter: ServerCharacter;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<ServerCharacter>>;
}) {
  return (
    <RowWrapper
      justify="justify-evenly justify-items-evenly"
      className="w-[24rem] border-[1px] border-black50 px-1"
    >
      {index !== 0 && (
        <MaterialSymbolsLightChevronLeftRounded
          className="flex-shrink-0 cursor-pointer text-2xl"
          onClick={() => {
            filterCharacters(-1);
          }}
        />
      )}
      {characters.map((character) => (
        <ColumnWrapper
          key={character.id}
          className={twMerge(
            "h-[8.5rem] w-[7rem] cursor-pointer gap-1 rounded-lg hover:bg-black25 hover:dark:bg-black75",
            selectedCharacter.id === character.id
              ? "bg-primary-soft"
              : "bg-color-default",
          )}
          onClick={() => setSelectedCharacter(character)}
        >
          <div className="h-[80%] w-full flex-shrink-0 overflow-hidden">
            {character.base.image && (
              <CharacterPortrait
                filename={character.base.image}
                alt={character.base.name}
              />
            )}
          </div>
          <p className="w-full overflow-hidden text-ellipsis">
            {character.base.name}
          </p>
        </ColumnWrapper>
      ))}
      {characters[3] ? (
        characters[3].id !== selectedCharacter.id ? (
          <MaterialSymbolsLightChevronLeftRounded
            className="flex-shrink-0 rotate-180 cursor-pointer text-2xl"
            onClick={() => {
              filterCharacters(1);
            }}
          />
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </RowWrapper>
  );
}
