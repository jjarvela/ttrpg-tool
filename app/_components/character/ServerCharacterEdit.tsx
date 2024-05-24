"use client";

import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import { ServerCharacterConfig } from "@prisma/client";
import RowWrapper from "../wrappers/RowWrapper";
import VitalsForm from "@/app/(user)/server/[serverId]/characters/create/_components/VitalsForm";
import { useRef, useState, useTransition } from "react";
import StatsForm from "@/app/(user)/server/[serverId]/characters/create/_components/StatsForm";
import CharacterThumb from "@/app/(user)/server/[serverId]/characters/create/_components/CharacterThumb";
import InfoForm from "@/app/(user)/server/[serverId]/characters/create/_components/InfoForm";
import TextAreaInput from "../inputs/TextAreaInput";
import { useRouter } from "next/navigation";
import Button from "../Button";
import errorHandler from "@/utils/errorHandler";
import updateCharacterForServer from "@/actions/characterManagement/updateCharacterForServer";

export default function ServerCharacterEdit({
  refObject,
  character,
  config,
}: {
  refObject: React.RefObject<HTMLDialogElement>;
  character: ServerCharacter;
  config: ServerCharacterConfig;
}) {
  const [info, setInfo] = useState({
    class: character.class,
    level: character.level,
    experience: character.experience,
    experience_max: character.experience_max,
    skills: character.skills,
    items: character.items,
  });
  const [vitals, setVitals] = useState({
    vitals: character.vitals,
    vitals_max: character.vitals_max,
  });
  const [attributes, setAttributes] = useState(character.attributes);

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  function handleEdit() {
    const isValid = formRef.current?.reportValidity();

    if (!isValid) {
      formRef.current?.reportValidity();
      return;
    }

    startTransition(async () => {
      const error: string | null = await errorHandler(
        async () => {
          await updateCharacterForServer(character.id, {
            ...info,
            ...vitals,
            attributes,
          });
        },
        () => {
          return "Something went wrong.";
        },
      );

      if (error) {
        setError(error);
        return;
      }

      refObject.current?.close();
      router.refresh();
    });
  }

  return (
    <dialog ref={refObject} className="bg-transparent backdrop:bg-transparent">
      <ColumnWrapper className="bg-color-default text-color-default scrollbar-thin h-[80vh] overflow-auto rounded-lg border-[1px] border-black50">
        <div className="flex w-full justify-end">
          <MaterialSymbolsLightCloseRounded
            className="flex-shrink-0 cursor-pointer text-xl"
            onClick={() => refObject.current?.close()}
          />
        </div>
        <CharacterThumb size="lg" character={character.base} />
        <form ref={formRef}>
          <InfoForm isPending={isPending} info={info} setInfo={setInfo} />
          <VitalsForm
            vitals_names={config.vitals_names}
            vitals={vitals}
            setVitals={setVitals}
            isPending={isPending}
          />
          <StatsForm
            stats={attributes}
            setStats={setAttributes}
            stats_names={config.attributes_names}
            isPending={isPending}
          />
          <RowWrapper className="flex-wrap">
            {character.statics.map((stat, index) => (
              <p key={config.statics_names[index]} className="mr-4">
                <span className="mr-4">{config.statics_names[index]}</span>
                <span>{stat}</span>
              </p>
            ))}
          </RowWrapper>
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
          <RowWrapper justify="justify-evenly">
            <Button
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleEdit();
              }}
            >
              Save
            </Button>
            <Button
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                refObject.current?.close();
              }}
            >
              Cancel
            </Button>
          </RowWrapper>
        </form>
      </ColumnWrapper>
    </dialog>
  );
}
