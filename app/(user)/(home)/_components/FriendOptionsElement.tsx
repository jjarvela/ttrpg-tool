"use client";

import blockUser from "@/actions/userRelationshipManagement/blockUser";
import unfriendUser from "@/actions/userRelationshipManagement/unfriendUser";
import ConfirmModal from "@/app/_components/ConfirmModal";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsBlock from "@/public/icons/MaterialSymbolsBlock";
import MaterialSymbolsPersonCancelOutlineRounded from "@/public/icons/MaterialSymbolsPersonCancelOutlineRounded";
import MaterialSymbolsPersonRemoveOutlineRounded from "@/public/icons/MaterialSymbolsPersonRemoveOutlineRounded";
import { friendRequestEvent } from "@/socket";
import errorHandler from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";

export default function FriendOptionsElement({
  name,
  user_id,
}: {
  name: string;
  user_id: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [unfriendSuccess, setUnfriendSuccess] = useState(false);
  const [blockSuccess, setBlockSuccess] = useState(false);

  const router = useRouter();

  function handleRemoveFriend() {
    startTransition(async () => {
      await errorHandler(
        async () => {
          await unfriendUser(user_id);

          friendRequestEvent(user_id);

          setUnfriendSuccess(true);

          router.refresh();
        },
        (e) => setError((e as Error).message),
      );
    });
  }

  function handleBlockUser() {
    startTransition(async () => {
      await errorHandler(
        async () => {
          await unfriendUser(user_id);

          await blockUser(user_id);

          setBlockSuccess(true);

          router.refresh();
        },
        (e) => setError((e as Error).message),
      );
    });
  }

  const confirmRemoveRef = useRef<HTMLDialogElement | null>(null);
  const confirmBlockRef = useRef<HTMLDialogElement | null>(null);
  return (
    <Fragment>
      <RowWrapper
        align="items-center"
        justify="justify-items-center"
        className="px-2 sm:flex-col"
      >
        {unfriendSuccess ? (
          <MaterialSymbolsPersonCancelOutlineRounded className="flex-shrink-0 cursor-pointer text-2xl text-warning" />
        ) : (
          <MaterialSymbolsPersonRemoveOutlineRounded
            className="flex-shrink-0 cursor-pointer text-2xl"
            onClick={() => confirmRemoveRef.current?.showModal()}
          />
        )}
        <MaterialSymbolsBlock
          className={twMerge(
            "mr-[0.4rem] flex-shrink-0 cursor-pointer text-2xl",
            blockSuccess && "text-warning",
          )}
          onClick={() => confirmBlockRef.current?.showModal()}
        />
      </RowWrapper>
      <ConfirmModal
        refObject={confirmRemoveRef}
        confirmText="Remove Friend"
        onConfirm={() => {
          handleRemoveFriend();
          confirmRemoveRef.current?.close();
        }}
      >
        <h4 className="my-4">Remove {name} from your friends?</h4>
      </ConfirmModal>
      <ConfirmModal
        refObject={confirmBlockRef}
        confirmText="Block User"
        confirmButtonClass="bg-warning active:bg-warning"
        onConfirm={() => {
          handleBlockUser();
          confirmBlockRef.current?.close();
        }}
      >
        <h4 className="my-4">Block {name}?</h4>
        <p>This user will also be removed from your friend list.</p>
      </ConfirmModal>
    </Fragment>
  );
}
