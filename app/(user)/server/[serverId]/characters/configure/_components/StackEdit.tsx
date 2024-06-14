"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightDeleteOutlineRounded from "@/public/icons/MaterialSymbolsLightDeleteOutlineRounded";
import AddNew from "./AddNew";
import { useState, useTransition } from "react";
import Button from "@/app/_components/Button";
import editCharacterConfig from "@/actions/characterManagement/editCharacterConfig";
import { useRouter } from "next/navigation";
import FeedbackCard from "@/app/_components/FeedbackCard";

export default function StackEdit({
  server_id,
  title,
  description,
  stats,
}: {
  server_id: string;
  title: string;
  description: string;
  stats: string[];
}) {
  const [statList, setStatList] = useState(stats);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleAdd(value: string) {
    setError("");
    setSuccess(false);
    const newStats = [...statList, value];
    setStatList(newStats);
  }

  function handleDelete(deleted: string) {
    setError("");
    setSuccess(false);
    const newStats = statList.filter((item) => item !== deleted);
    setStatList(newStats);
  }

  const router = useRouter();

  return (
    <ColumnWrapper
      align="items-center content-center"
      className="w-full border-b-[1px] border-black25 dark:border-black75"
    >
      <div className="relative w-full">
        <h4 className="w-full text-center">{title}</h4>
        <span className="absolute right-0 top-0">
          <Button
            className="btn-primary text-sm"
            disabled={isPending}
            onClick={() => {
              setError("");
              setSuccess(false);
              startTransition(async () => {
                try {
                  const key = `${title.toLowerCase()}_names`;
                  await editCharacterConfig(server_id, {
                    [key]: statList,
                  });
                  setSuccess(true);
                  router.refresh();
                } catch (e) {
                  setError("Something went wrong. Please try again.");
                }
              });
            }}
          >
            Save
          </Button>{" "}
          <Button
            className="btn-secondary text-sm"
            onClick={() => {
              setError("");
              setSuccess(false);
              setStatList(stats);
            }}
            disabled={isPending}
          >
            Cancel
          </Button>
        </span>
      </div>
      <p>{description}</p>
      <RowWrapper
        justify="justify-center justify-items-center w-full"
        className="flex-wrap"
      >
        {statList.map((item, index) => (
          <RowWrapper
            key={item + index}
            className="min-w-[10%] gap-4 bg-black25 px-4 py-2 dark:bg-black75"
          >
            <h5>{item}</h5>
            <MaterialSymbolsLightDeleteOutlineRounded
              className="cursor-pointer"
              onClick={() => {
                !isPending && handleDelete(item);
              }}
            />
          </RowWrapper>
        ))}
      </RowWrapper>
      <AddNew handleAdd={handleAdd} isPending={isPending} />
      {error !== "" && <FeedbackCard type="error" message={error} />}
      {success && <FeedbackCard type="success" message="Saved" />}
    </ColumnWrapper>
  );
}
