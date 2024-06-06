"use client";
import { useEffect, useState } from "react";

export interface HomeCharactersProps {
  latestCharacters: {
    level: number;
    class: string;
    vitals: number[];
    vitals_max: number[];
    base: {
      name: string;
      image: string | null;
    };
  }[];
}

export default function HomeCharacters({
  latestCharacters,
}: HomeCharactersProps) {
  const [listLatestCharacters, setListLatestCharacters] = useState<
    typeof latestCharacters
  >([]);

  useEffect(() => {
    setListLatestCharacters(latestCharacters);
  }, [latestCharacters]);

  return (
    <div className="scrollbar-thin flex flex-col gap-4 overflow-auto bg-black75 p-4">
      <h3 className="mx-auto text-lg font-bold text-white">
        Latest Characters
      </h3>
      {latestCharacters.map((character) => (
        <div
          key={character.base.name}
          className="flex flex-row rounded-lg bg-black85 p-4 shadow"
        >
          <div className="me-4 flex">
            <img
              src={character.base.image ?? undefined}
              alt={character.base.name}
              className="h-8 w-8 rounded-full p-3"
            />
          </div>
          <div className="flex flex-auto flex-col items-start">
            <p className="text-sm font-bold text-white">
              {character.base.name}
            </p>
            <p className="text-sm text-black25">
              HP: {character.vitals}/{character.vitals_max}
            </p>
          </div>
          <div className="flex flex-auto flex-col items-end">
            <p className="text-sm text-black25">{character.class}</p>
            <p className="text-sm text-black25">Level {character.level}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
