"use client";

import createCharacterForUser from "@/actions/characterManagement/createCharacterForUser";
import updateCharacterForUser from "@/actions/characterManagement/updateCharacterForUser";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import BaseForm from "@/app/_components/character/BaseForm";
import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import errorHandler from "@/utils/errorHandler";
import postUpload from "@/utils/postUpload";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

export default function UserCharacterForm({
  user_id,
  character,
}: {
  user_id: string;
  character?: CharacterBase;
}) {
  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const [baseData, setBaseData] = useState<{
    name: string;
    description: string;
    image: File | undefined;
  }>({
    name: character?.name || "",
    description: character?.description || "",
    image: undefined,
  });
  const [notes, setNotes] = useState("");

  const router = useRouter();

  function handleCreate() {
    setError("");
    const isValid = formRef.current?.checkValidity();

    if (!isValid) {
      formRef.current?.reportValidity();
      return;
    }

    startTransition(async () => {
      console.log("transition");
      const error: string | null = await errorHandler(
        async () => {
          if (baseData.image) {
            if (baseData.image.size / 1024 / 1024 > 3) {
              setError("The image file is too large. The size limit is 3MB.");
              return;
            }

            postUpload(baseData.image, async (res) => {
              if (res.data.message) {
                setError("Something went wrong!");
                return;
              }
              const filename = res.data.filename;

              await handleCharacter(filename);

              router.push("/characters");
              router.refresh();
            });
          } else {
            await handleCharacter();

            router.push("/characters");
            router.refresh();
          }

          return null;
        },
        () => {
          return "Something went wrong.";
        },
      );

      if (error) {
        setError(error);
        return;
      }
    });
  }

  return (
    <ColumnWrapper className="h-[90%] w-full">
      <form ref={formRef}>
        <BaseForm
          isPending={isPending}
          baseData={baseData}
          setBaseData={setBaseData}
        />
        <label htmlFor="notes">Notes</label>
        <TextAreaInput
          className="h-[40%] w-full"
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <RowWrapper justify="justify-center" className="w-full ">
          <Button
            className="btn-primary"
            disabled={isPending}
            onClick={() => handleCreate()}
          >
            Save
          </Button>
          <Button className="btn-secondary" disabled={isPending}>
            <Link href="/characters">Cancel</Link>
          </Button>
        </RowWrapper>
      </form>
      {error !== "" && <FeedbackCard type="error" message={error} />}
    </ColumnWrapper>
  );

  async function handleCharacter(image?: string) {
    if (character) {
      await updateCharacterForUser(character.id, {
        name: baseData.name,
        description: baseData.description,
        image: image || undefined,
        notes,
      });
    } else {
      await createCharacterForUser(user_id, {
        name: baseData.name,
        description: baseData.description,
        image: image || undefined,
        notes,
      });
    }
  }
}
