"use client";
import { Fragment, useRef, useState, useTransition } from "react";
import MaterialSymbolsLightCheckCircleOutlineRounded from "../../../../public/icons/MaterialSymbolsLightCheckCircleOutlineRounded";
import MaterialSymbolsLightCloseRounded from "../../../../public/icons/MaterialSymbolsLightCloseRounded";
import MaterialSymbolsLightHistoryEduRounded from "../../../../public/icons/MaterialSymbolsLightHistoryEduRounded";
import TextInput from "../../../_components/inputs/TextInput";
import { useRouter } from "next/navigation";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

type SettingsTextInputProps = {
  label: string;
  defaultValue: string | undefined;
  editInfo: (value: string) => void | Promise<string | undefined>;
};

export default function SettingsTextInput({
  label,
  defaultValue,
  editInfo,
}: SettingsTextInputProps) {
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const refObject = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  return (
    <div className="relative">
      <TextInput
        ref={refObject}
        className="w-full p-0 text-lg"
        startElement={
          <label>
            <h5 className="me-4 rounded-l-xl bg-black25 px-4 py-2 dark:bg-black75">
              {label}
            </h5>
          </label>
        }
        defaultValue={defaultValue || ""}
        disabled={!editMode}
        error={error}
        endElement={
          editMode ? (
            <Fragment>
              <MaterialSymbolsLightCheckCircleOutlineRounded
                className="mx-4 cursor-pointer text-2xl"
                onClick={() => {
                  setError("");
                  setSuccess(false);
                  startTransition(async () => {
                    const result = await editInfo(refObject.current!.value);
                    if (result) {
                      setError(result);
                      //if the change did not go through, return to original input value
                      refObject.current!.value = defaultValue || "";
                    } else {
                      setSuccess(true);
                    }
                    setEditMode(false);
                    router.refresh();
                  });
                }}
              />
              <MaterialSymbolsLightCloseRounded
                className="mx-4 cursor-pointer text-2xl"
                onClick={() => setEditMode(false)}
              />
            </Fragment>
          ) : (
            <MaterialSymbolsLightHistoryEduRounded
              className="mx-4 w-8 cursor-pointer text-2xl"
              onClick={() => {
                if (isPending) return;
                setEditMode(true);
              }}
            />
          )
        }
      />
      {success && (
        <MaterialSymbolsLightCheckCircleOutlineRounded className="absolute -right-10 top-4 text-2xl text-primary" />
      )}
    </div>
  );
}
