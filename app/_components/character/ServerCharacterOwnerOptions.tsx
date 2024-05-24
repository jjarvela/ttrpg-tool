"use client";

import RowWrapper from "../wrappers/RowWrapper";
import MaterialSymbolsLightDeleteOutlineRounded from "@/public/icons/MaterialSymbolsLightDeleteOutlineRounded";
import MaterialSymbolsLightHistoryEduRounded from "@/public/icons/MaterialSymbolsLightHistoryEduRounded";
import ServerCharacterEdit from "./ServerCharacterEdit";
import ConfirmModal from "../ConfirmModal";
import { ServerCharacterConfig } from "@prisma/client";
import { useRef, useState } from "react";
import errorHandler from "@/utils/errorHandler";
import deleteCharacterFromServer from "@/actions/characterManagement/deleteCharacterFromServer";
import { useRouter } from "next/navigation";

export default function ServerCharacterOwnerOptions({
  character,
  config,
}: {
  character: ServerCharacter;
  config: ServerCharacterConfig;
}) {
  const editModalRef = useRef<HTMLDialogElement>(null);

  const confirmModalRef = useRef<HTMLDialogElement>(null);

  const [error, setError] = useState("");

  const router = useRouter();

  return (
    <RowWrapper className="flex-shrink-0">
      <MaterialSymbolsLightHistoryEduRounded
        className="cursor-pointer text-xl"
        onClick={() => editModalRef.current?.showModal()}
      />
      <MaterialSymbolsLightDeleteOutlineRounded
        className="cursor-pointer text-xl"
        onClick={() => confirmModalRef.current?.showModal()}
      />
      <ServerCharacterEdit
        refObject={editModalRef}
        character={character}
        config={config}
      />
      <ConfirmModal
        refObject={confirmModalRef}
        onConfirm={async () => {
          const error: string | null = await errorHandler(
            async () => {
              await deleteCharacterFromServer(character.id);
            },
            () => {
              return "Something went wrong.";
            },
          );

          if (error) {
            setError(error);
            return;
          }

          confirmModalRef.current?.close();
          router.refresh();
        }}
      >
        <h5>Are you sure you wish to delete this character?</h5>
        <p>The base information will still be retained.</p>
        {error && (
          <p className="mt-4 text-warning">
            Something went wrong. Please try again.
          </p>
        )}
      </ConfirmModal>
    </RowWrapper>
  );
}
