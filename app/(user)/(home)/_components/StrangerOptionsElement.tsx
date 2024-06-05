"use client";

import blockUser from "@/actions/userRelationshipManagement/blockUser";
import sendFriendRequest from "@/actions/userRelationshipManagement/sendFriendRequest";
import ConfirmModal from "@/app/_components/ConfirmModal";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsBlock from "@/public/icons/MaterialSymbolsBlock";
import MaterialSymbolsPersonAddOutlineRounded from "@/public/icons/MaterialSymbolsPersonAddOutlineRounded";
import MaterialSymbolsPersonCheckOutlineRounded from "@/public/icons/MaterialSymbolsPersonCheckOutlineRounded";
import { friendRequestEvent } from "@/socket";
import errorHandler from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";

export default function StrangerOptionsElement({
  name,
  user_id,
}: {
  name: string;
  user_id: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [blockSuccess, setBlockSuccess] = useState(false);

  const router = useRouter();

  function handleAddFriend() {
    startTransition(async () => {
      await errorHandler(
        async () => {
          await sendFriendRequest(user_id);

          friendRequestEvent(user_id);

          setRequestSuccess(true);

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
          await blockUser(user_id);

          setBlockSuccess(true);

          router.refresh();
        },
        (e) => setError((e as Error).message),
      );
    });
  }

  const confirmRequestRef = useRef<HTMLDialogElement | null>(null);
  const confirmBlockRef = useRef<HTMLDialogElement | null>(null);
  return (
    <Fragment>
      <RowWrapper
        align="items-center"
        justify="justify-items-center"
        className="px-2 sm:flex-col"
      >
        {requestSuccess ? (
          <MaterialSymbolsPersonCheckOutlineRounded className="flex-shrink-0 text-2xl text-primary" />
        ) : (
          <MaterialSymbolsPersonAddOutlineRounded
            className="flex-shrink-0 cursor-pointer text-2xl"
            onClick={() => confirmRequestRef.current?.showModal()}
          />
        )}
        {
          <MaterialSymbolsBlock
            className={twMerge(
              "mr-[0.4rem] flex-shrink-0 cursor-pointer text-2xl",
              blockSuccess && "text-warning",
            )}
            onClick={() => confirmBlockRef.current?.showModal()}
          />
        }
      </RowWrapper>
      <ConfirmModal
        refObject={confirmRequestRef}
        confirmText="Add Friend"
        onConfirm={() => {
          handleAddFriend();
          confirmRequestRef.current?.close();
        }}
      >
        <h4 className="my-4">Send friend request to {name}?</h4>
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
      </ConfirmModal>
    </Fragment>
  );
}
