"use client";

import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import VitalsForm from "./VitalsForm";
import { useEffect, useRef, useState, useTransition } from "react";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import InfoForm from "./InfoForm";
import BaseSelect from "./BaseSelect";
import BaseForm from "@/app/_components/character/BaseForm";
import CharacterThumb from "./CharacterThumb";
import CharacterSelector from "./CharacterSelector";
import StatsForm from "./StatsForm";
import errorHandler from "@/utils/errorHandler";
import { createCharacterForServer } from "@/actions/characterManagement/createCharacterForServer";
import createCharacterForUser from "@/actions/characterManagement/createCharacterForUser";
import postUpload from "@/utils/postUpload";
import { useRouter } from "next/navigation";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Button from "@/app/_components/Button";
import { io } from "socket.io-client";
import { HomeCharactersProps } from "../../../(home)/_components/HomeCharacters";

const socket = io();

export default function CharacterForm({
  user_id,
  config,
  characters,
}: {
  user_id: string;
  config: CharacterConfig;
  characters: Omit<CharacterBase, "owner_id" | "notes">[];
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [choice, setChoice] = useState(0);

  const [character, setCharacter] = useState<Omit<
    CharacterBase,
    "owner_id" | "notes"
  > | null>(null);

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

  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    // Join the server-specific room on component mount
    socket.emit("join-character-server", config.server_id);

    return () => {
      socket.off("join-character-server");
    };
  }, [config.server_id]);

  async function emitCharacter(
    character: HomeCharactersProps["initialCharacters"][number],
  ) {
    socket.emit("new-character", {
      serverId: config.server_id,
      character: {
        level: character.level,
        class: character.class,
        vitals: character.vitals,
        vitals_max: character.vitals_max,
        base: {
          id: character.base.id,
          name: character.base.name,
          image: character.base.image || null,
        },
      },
    });
  }

  function handleSubmit() {
    const isValid = formRef.current?.checkValidity();
    if (!isValid) {
      formRef.current?.reportValidity();
      return;
    }

    startTransition(async () => {
      const error: string | null = await errorHandler(
        async () => {
          if (character) {
            await createCharacterForServer(character.id, config.server_id, {
              ...info,
              ...vitals,
              attributes,
              statics,
            });

            emitCharacter({
              ...character,
              level: info.level,
              class: info.class,
              vitals: vitals.vitals,
              vitals_max: vitals.vitals_max,
              base: {
                id: character.id,
                name: character.name,
                image: character.image || null,
              },
            });

            router.push(`/server/${config.server_id}/characters`);
            router.refresh();
          } else {
            if (baseData.image) {
              if (baseData.image.size / 1024 / 1024 > 3) {
                return "The image file is too large. The size limit is 3MB.";
              }

              postUpload(baseData.image, async (res) => {
                if (res.data.message) {
                  return "Failed to upload image.";
                }
                const filename = res.data.filename;
                await handleCharacter(filename);

                router.push(`/server/${config.server_id}/characters`);
                router.refresh();
              });
            } else {
              await handleCharacter();

              router.push(`/server/${config.server_id}/characters`);
              router.refresh();
            }
          }
        },
        () => {
          return "Something went wrong";
        },
      );

      if (error) {
        setError(error);
        return;
      }
    });
  }

  return (
    <ColumnWrapper align="items-start" className="w-full gap-6">
      <form ref={formRef}>
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
        </ColumnWrapper>

        <VitalsForm
          vitals_names={config.vitals_names}
          vitals={vitals}
          setVitals={setVitals}
          isPending={isPending}
        />

        <ColumnWrapper align="items-start" id="stats" className="w-full p-0">
          <h4>Stats</h4>
          <StatsForm
            stats_names={config.attributes_names}
            stats={attributes}
            setStats={setAttributes}
            isPending={isPending}
          />
          <StatsForm
            stats_names={config.statics_names}
            stats={statics}
            setStats={setStatics}
            isPending={isPending}
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
        {choice !== 0 && (
          <Button
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Save
          </Button>
        )}
      </form>

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
      {error !== "" && <FeedbackCard type="error" message={error} />}
    </ColumnWrapper>
  );

  async function handleCharacter(filename?: string) {
    console.log(filename);

    const base = await createCharacterForUser(user_id, {
      name: baseData.name,
      description: baseData.description,
      image: filename,
    });

    await createCharacterForServer(base.id, config.server_id, {
      ...info,
      ...vitals,
      attributes,
      statics,
    });

    emitCharacter({
      level: info.level,
      class: info.class,
      vitals: vitals.vitals,
      vitals_max: vitals.vitals_max,
      base: {
        id: base.id,
        name: baseData.name,
        image: base.image || null,
      },
    });
  }
}
