"use client";

import MaterialSymbolsLightDeleteOutlineRounded from "@/public/icons/MaterialSymbolsLightDeleteOutlineRounded";
import { Fragment, useRef, useState } from "react";
import ConfirmModal from "../ConfirmModal";
import deleteCharacterFromUser from "@/actions/characterManagement/deleteCharacterFromUser";
import { useRouter } from "next/navigation";
import errorHandler from "@/utils/errorHandler";

export default function DeleteCharacterBaseButton({
  character_id,
}: {
  character_id: string;
}) {
  const confirmRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <Fragment>
      <MaterialSymbolsLightDeleteOutlineRounded
        className="cursor-pointer text-2xl"
        onClick={() => confirmRef.current?.showModal()}
      />
      <ConfirmModal
        refObject={confirmRef}
        onConfirm={async () => {
          const error: string | null = await errorHandler(
            async () => {
              await deleteCharacterFromUser(character_id);
              confirmRef.current?.close();
              router.refresh();
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
        }}
      >
        <h5>Are you sure you wish to delete this character?</h5>
        <p>
          The character will also be deleted from any server they are in use in.
        </p>
        {error !== "" && <p className="text-warning">{error}</p>}
      </ConfirmModal>
    </Fragment>
  );
}
