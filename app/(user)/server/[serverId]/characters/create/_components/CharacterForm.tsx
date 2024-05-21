"use client";

import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import VitalsForm from "./VitalsForm";
import { useRef, useState, useTransition } from "react";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import InfoForm from "./InfoForm";
import BaseSelect from "./BaseSelect";
import BaseForm from "@/app/_components/character/BaseForm";
import CharacterThumb from "./CharacterThumb";
import CharacterSelector from "./CharacterSelector";
import StatsForm from "./StatsForm";

export default function CharacterForm({
  config,
  characters,
}: {
  config: CharacterConfig;
  characters: CharacterBase[];
}) {
  const [choice, setChoice] = useState(0);

  const [character, setCharacter] = useState<CharacterBase | null>(null);

  const [baseData, setBaseData] = useState<{
    name: string;
    description: string;
    image: File | undefined;
  }>({
    name: "",
    description: "",
    image: undefined,
  });

  const [info, setInfo] = useState({
    class: "",
    level: 1,
    experience: 0,
    experience_max: 30,
    skills: "",
    items: "",
  });

  const vitals_init = config.vitals_names.map((_item) => {
    return 1;
  });

  const attributes_init = config.attributes_names.map((_item) => {
    return 1;
  });

  const statics_init = config.statics_names.map((_item) => {
    return 1;
  });

  const [vitals, setVitals] = useState({
    vitals: vitals_init,
    vitals_max: vitals_init,
  });

  const [attributes, setAttributes] = useState(attributes_init);

  const [statics, setStatics] = useState(statics_init);

  const [isPending, startTransition] = useTransition();

  const characterSelectorRef = useRef<HTMLDialogElement>(null);

  return (
    <ColumnWrapper align="items-start" className="w-full gap-6">
      <ColumnWrapper align="items-start">
        <BaseSelect
          selectNew={() => {
            setCharacter(null);
            setChoice(2);
          }}
          characterSelector={characterSelectorRef}
        />
        <RowWrapper
          breakPoint="lg"
          id="information"
          justify="justify-items-start w-full"
          className="lg:gap-8"
        >
          {choice === 1 && character && (
            <CharacterThumb size="lg" character={character} />
          )}
          {choice === 2 && (
            <BaseForm
              isPending={isPending}
              baseData={baseData}
              setBaseData={setBaseData}
            />
          )}
          <InfoForm isPending={isPending} info={info} setInfo={setInfo} />
        </RowWrapper>
        <CharacterSelector refObject={characterSelectorRef}>
          {characters.length > 0 ? (
            characters.map((chara) => (
              <CharacterThumb
                key={chara.id}
                size="sm"
                character={chara}
                onClick={() => {
                  setChoice(1);
                  setCharacter(chara);
                  characterSelectorRef.current?.close();
                }}
              />
            ))
          ) : (
            <p>No existing characters</p>
          )}
        </CharacterSelector>
      </ColumnWrapper>

      <VitalsForm
        vitals_names={config.vitals_names}
        vitals={vitals}
        setVitals={setVitals}
      />

      <ColumnWrapper align="items-start" id="stats" className="w-full p-0">
        <h4>Stats</h4>
        <StatsForm
          stats_names={config.attributes_names}
          stats={attributes}
          setStats={setAttributes}
        />
        <StatsForm
          stats_names={config.statics_names}
          stats={statics}
          setStats={setStatics}
        />
      </ColumnWrapper>

      <ColumnWrapper id="skills-and-inventory" className="w-[60%]">
        <label htmlFor="character-skills">Skills</label>
        <TextAreaInput
          id="character-skills"
          className="w-[90%]"
          value={info.skills}
          onChange={(e) => setInfo({ ...info, skills: e.target.value })}
        />

        <label htmlFor="character-inventory">Inventory</label>
        <TextAreaInput
          id="character-inventory"
          className="w-[90%]"
          value={info.items}
          onChange={(e) => setInfo({ ...info, items: e.target.value })}
        />
      </ColumnWrapper>
    </ColumnWrapper>
  );
}
