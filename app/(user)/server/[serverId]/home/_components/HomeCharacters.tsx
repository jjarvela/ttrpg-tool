"use client";
import { useEffect, useState } from "react";

export interface HomeCharactersProps {
  latestCharacters: {
    level: number;
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
    <div className="flex flex-col gap-4 bg-black75 p-4">
      <h3 className="mx-auto text-lg font-bold text-white">
        Latest Characters
      </h3>
      {latestCharacters.map((character) => (
        <div
          key={character.base.name}
          className="flex flex-row rounded-lg bg-black85 p-4 shadow"
        >
          <div className="flex">
            <img
              src={character.base.image ?? undefined}
              alt={character.base.name}
              className="m-3 h-12 w-12 rounded-full p-3"
            />
          </div>
          <div className="flex flex-auto flex-col justify-between">
            <p className="text-sm font-bold text-white">
              {character.base.name}
            </p>
            <p className="text-sm text-black25">HP:</p>
          </div>
          <div className="flex flex-auto flex-col justify-between">
            <p className="self-start text-sm text-black25">
              Level {character.level}
            </p>
            <p className="text-sm text-black25">
              {character.vitals}/{character.vitals_max}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
