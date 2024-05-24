"use client";

import createBoard from "@/actions/gameBoardManagement/createBoard";
import Button from "@/app/_components/Button";
import NumberInput from "@/app/_components/inputs/NumberInput";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import errorHandler from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function CreateBoard({ server_id }: { server_id: string }) {
  const [board, setBoard] = useState({ name: "", width: 100, height: 100 });
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");

  const router = useRouter();

  function handleCreate() {
    startTransition(async () => {
      const error: string | null = await errorHandler(
        async () => {
          const newBoard = await createBoard(server_id, board);
          router.push(`/server/${server_id}/boards/${newBoard.id}`);
          return null;
        },
        () => "Something went wrong.",
      );

      if (error) {
        setError(error);
        return;
      }

      router.refresh();
    });
  }

  return (
    <form>
      <ColumnWrapper align="content-start items-start">
        <label htmlFor="board-name">Board name</label>
        <TextInput
          id="board-name"
          value={board.name}
          onChange={(e) => setBoard({ ...board, name: e.target.value })}
          disabled={isPending}
        />

        <label htmlFor="board-width">{"Width (pixels)"}</label>
        <NumberInput
          id="board-width"
          min={1}
          value={board.width}
          onChange={(e) =>
            setBoard({ ...board, width: parseInt(e.target.value.toString()) })
          }
          disabled={isPending}
        />

        <label htmlFor="board-height">{"Height (pixels)"}</label>
        <NumberInput
          id="board-height"
          min={1}
          value={board.height}
          onChange={(e) =>
            setBoard({ ...board, height: parseInt(e.target.value.toString()) })
          }
          disabled={isPending}
        />
      </ColumnWrapper>

      <Button
        className="btn-primary"
        onClick={(e) => {
          e.preventDefault();
          handleCreate();
        }}
        disabled={isPending}
      >
        Create
      </Button>
    </form>
  );
}
