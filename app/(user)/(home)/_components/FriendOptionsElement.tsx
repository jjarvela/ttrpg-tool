"use client";

import blockUser from "@/actions/userRelationshipManagement/blockUser";
import unfriendUser from "@/actions/userRelationshipManagement/unfriendUser";
import ConfirmModal from "@/app/_components/ConfirmModal";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsAndroidMessagesOutline from "@/public/icons/MaterialSymbolsAndroidMessagesOutline";
import MaterialSymbolsBlock from "@/public/icons/MaterialSymbolsBlock";
import MaterialSymbolsPersonCancelOutlineRounded from "@/public/icons/MaterialSymbolsPersonCancelOutlineRounded";
import MaterialSymbolsPersonRemoveOutlineRounded from "@/public/icons/MaterialSymbolsPersonRemoveOutlineRounded";
import SolarMenuDotsBold from "@/public/icons/SolarMenuDotsBold";
import { friendRequestEvent } from "@/socket";
import errorHandler from "@/utils/errorHandler";
import handleClickOutside from "@/utils/handleClickOutside";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";

export default function FriendOptionsElement({
  name,
  user_id,
  mode,
}: {
  name: string;
  user_id: string;
  mode?: "row" | "column";
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [unfriendSuccess, setUnfriendSuccess] = useState(false);
  const [blockSuccess, setBlockSuccess] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

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

          friendRequestEvent(user_id);

          router.refresh();
        },
        (e) => setError((e as Error).message),
      );
    });
  }

  const confirmRemoveRef = useRef<HTMLDialogElement | null>(null);
  const confirmBlockRef = useRef<HTMLDialogElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  return (
    <Fragment>
      <RowWrapper
        align="items-center"
        justify="justify-items-center"
        className={twMerge("relative px-2", mode !== "row" && "sm:flex-col")}
      >
        <Link href={`/message/${user_id}`}>
          <MaterialSymbolsAndroidMessagesOutline className="flex-shrink-0 text-2xl" />
        </Link>
        <div id="hitbox" className="relative" ref={menuRef}>
          <SolarMenuDotsBold
            className="flex-shrink-0 cursor-pointer text-2xl"
            onClick={() => {
              document.addEventListener("mousedown", (event) =>
                handleClickOutside(menuRef, event, () => setIsOpen(false)),
              );
              setIsOpen((prev) => !prev);
            }}
          />
          {isOpen && (
            <ColumnWrapper className="bg-color-default absolute left-[2rem] top-[1.5rem] rounded-lg border-[1px] border-black50">
              <RowWrapper
                className="cursor-pointer"
                onClick={() => confirmRemoveRef.current?.showModal()}
              >
                {unfriendSuccess ? (
                  <MaterialSymbolsPersonCancelOutlineRounded className="flex-shrink-0 text-2xl text-warning" />
                ) : (
                  <MaterialSymbolsPersonRemoveOutlineRounded className="flex-shrink-0 text-2xl" />
                )}
                <p>Unfriend</p>
              </RowWrapper>
              <RowWrapper
                className="cursor-pointer"
                onClick={() => confirmBlockRef.current?.showModal()}
              >
                <MaterialSymbolsBlock
                  className={twMerge(
                    "mr-[0.4rem] flex-shrink-0 text-2xl",
                    blockSuccess && "text-warning",
                  )}
                />
                <p>Block</p>
              </RowWrapper>
            </ColumnWrapper>
          )}
        </div>
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
