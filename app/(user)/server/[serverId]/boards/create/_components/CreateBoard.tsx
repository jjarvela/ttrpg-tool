"use client";

import createBoard from "@/actions/gameBoardManagement/createBoard";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import FileInput from "@/app/_components/inputs/FileInput";
import NumberInput from "@/app/_components/inputs/NumberInput";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightImageOutlineRounded from "@/public/icons/MaterialSymbolsLightImageOutlineRounded";
import errorHandler from "@/utils/errorHandler";
import postUpload from "@/utils/postUpload";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export default function CreateBoard({ server_id }: { server_id: string }) {
  const [name, setName] = useState("");
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [image, setImage] = useState<File>();
  const [imageURL, setImageURL] = useState("");

  const previewRef = useRef<HTMLImageElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {}, [previewRef]);

  function handleCreate() {
    const isValid = formRef.current?.checkValidity();
    if (!isValid) {
      formRef.current?.reportValidity();
      return;
    }
    startTransition(async () => {
      const error: string | null = await errorHandler(
        async () => {
          if (image) {
            if (image.size / 1024 / 1024 > 4) {
              setError("The image file is too large. The size limit is 4MB.");
              return;
            }

            postUpload(image, async (res) => {
              if (res.data.message) {
                setError("Something went wrong!");
                return;
              }
              const filename = res.data.filename;

              const newBoard = await handleBoard(filename);
              router.push(`/server/${server_id}/boards/${newBoard.id}`);
              router.refresh();

              return null;
            });
          } else {
            const newBoard = await handleBoard();
            router.push(`/server/${server_id}/boards/${newBoard.id}`);
            return null;
          }
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

  useEffect(() => {
    if (previewRef.current) {
      setHeight(previewRef.current.naturalHeight);
      setWidth(previewRef.current.naturalWidth);
    }
  }, [previewRef, height, width]);

  return (
    <form className="w-full" ref={formRef}>
      <RowWrapper breakPoint="md" className="w-full">
        <ColumnWrapper align="content-start items-start">
          <label htmlFor="board-name">Board name</label>
          <TextInput
            id="board-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            required
          />

          <label htmlFor="board-width">{"Width (pixels)"}</label>
          <NumberInput
            id="board-width"
            min={1}
            value={width}
            handleChange={(e) => setWidth(parseInt(e!.target.value.toString()))}
            disabled={isPending}
          />

          <label htmlFor="board-height">{"Height (pixels)"}</label>
          <NumberInput
            id="board-height"
            min={1}
            value={height}
            handleChange={(e) =>
              setHeight(parseInt(e!.target.value.toString()))
            }
            disabled={isPending}
          />
        </ColumnWrapper>
        <div className="relative flex-grow">
          {image && (
            <img
              ref={previewRef}
              src={imageURL}
              className="absolute left-0 top-0 z-0 min-h-[100%] min-w-[100%] object-cover"
              alt="board preview"
              onLoad={() => {
                if (previewRef.current) {
                  setHeight(previewRef.current.naturalHeight);
                  setWidth(previewRef.current.naturalWidth);
                }
              }}
              onDrop={() => URL.revokeObjectURL(imageURL)}
            />
          )}
          <FileInput
            id="board-bg"
            accept=".jpg, .png, .svg, .gif"
            onChange={(e) => {
              setImage(e.target.files ? e.target.files[0] : undefined);
              if (e.target.files) {
                setImageURL(URL.createObjectURL(e.target.files[0]));
              }
            }}
            labelElement={
              <MaterialSymbolsLightImageOutlineRounded className="flex-shrink-0 text-2xl" />
            }
          />
        </div>
      </RowWrapper>
      {error !== "" && <FeedbackCard type="error" message={error} />}
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

  async function handleBoard(image?: string) {
    const newBoard = await createBoard(server_id, {
      name,
      height,
      width,
      background: image,
    });
    return newBoard;
  }
}
