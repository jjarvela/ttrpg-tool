"use client";

import deleteBoard from "@/actions/gameBoardManagement/deleteBoard";
import Button from "@/app/_components/Button";
import ConfirmModal from "@/app/_components/ConfirmModal";
import FeedbackCard from "@/app/_components/FeedbackCard";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightDeleteOutlineRounded from "@/public/icons/MaterialSymbolsLightDeleteOutlineRounded";
import { socket } from "@/socket";
import errorHandler from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { BoardContext, boardContext } from "./BoardContextWrapper";
import { twMerge } from "tailwind-merge";

export default function BoardTop({
  board_id,
  server_id,
  children,
}: {
  board_id: string;
  server_id: string;
  children: React.ReactNode;
}) {
  const confirmRef = useRef<HTMLDialogElement>(null);
  const announceRef = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState("");
  const { pieceSize, setPieceSize } = useContext(boardContext) as BoardContext;

  const router = useRouter();

  useEffect(() => {
    socket.on("board-deleted", () => {
      announceRef.current?.showModal();
    });

    return () => {
      socket.off("board-deleted");
    };
  });

  return (
    <Fragment>
      <RowWrapper
        justify="justify-between justify-items-between"
        className="card-back flex h-[2.4rem] w-full gap-2 px-4"
      >
        {children}
        <RowWrapper>
          <small
            className={twMerge(
              "hover:bg-color-dark mini-link",
              pieceSize === "sm" && "bg-black25 dark:bg-black75",
            )}
            onClick={() => setPieceSize("sm")}
          >
            sm
          </small>
          <small
            className={twMerge(
              "hover:bg-color-dark mini-link",
              pieceSize === "md" && "bg-black25 dark:bg-black75",
            )}
            onClick={() => setPieceSize("md")}
          >
            md
          </small>
          <small
            className={twMerge(
              "hover:bg-color-dark mini-link",
              pieceSize === "lg" && "bg-black25 dark:bg-black75",
            )}
            onClick={() => setPieceSize("lg")}
          >
            lg
          </small>
        </RowWrapper>
        <span
          className="flex cursor-pointer content-center items-center gap-2"
          onClick={() => confirmRef.current?.showModal()}
        >
          <MaterialSymbolsLightDeleteOutlineRounded className="flex-shrink-0 text-2xl" />
          <span className="hidden md:block">Delete board</span>
        </span>
      </RowWrapper>
      <ConfirmModal
        refObject={confirmRef}
        onConfirm={() => {
          setError("");

          errorHandler(
            async () => {
              await deleteBoard(board_id);
              socket.emit("board-deleted", board_id);
              return null;
            },
            (e) => {
              return "Something went wrong. Please try again.";
            },
          ).then((result) => {
            if (result) {
              setError(result);
              return;
            }

            router.push(`/server/${server_id}/boards`);
            router.refresh();
          });
        }}
      >
        <h4 className="my-2">Are you sure you wish to delete this board?</h4>
        <p className="my-2">
          Deleting the board will not affect game pieces on other boards.
        </p>
        {error !== "" && <FeedbackCard type="error" message={error} />}
      </ConfirmModal>

      <dialog
        ref={announceRef}
        className="bg-transparent backdrop:bg-black backdrop:bg-opacity-50"
      >
        <ColumnWrapper className="bg-color-dark text-color-default gap-0 rounded-lg border-[1px] border-black50 py-4">
          <h4>This board has been deleted.</h4>
          <p>Go to boards</p>
          <Button
            className="btn-secondary"
            onClick={() => {
              router.push(`/server/${server_id}/boards`);
              router.refresh();
            }}
          >
            Ok
          </Button>
        </ColumnWrapper>
      </dialog>
    </Fragment>
  );
}
