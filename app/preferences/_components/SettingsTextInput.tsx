"use client";
import { Fragment, useRef, useState, useTransition } from "react";
import TextInput from "../../_components/inputs/TextInput";
import MaterialSymbolsLightCheckCircleOutlineRounded from "../../../icons/MaterialSymbolsLightCheckCircleOutlineRounded";
import { MaterialSymbolsLightHistoryEduRounded } from "../../../icons/MaterialSymbolsLightHistoryEduRounded";
import MaterialSymbolsLightCloseRounded from "../../../icons/MaterialSymbolsLightCloseRounded";

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

  return (
    <TextInput
      ref={refObject}
      className="w-full overflow-hidden p-0 text-lg"
      startElement={
        <label>
          <h5 className="me-4 bg-black25 px-4 py-2 dark:bg-black75">{label}</h5>
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
                startTransition(async () => {
                  const result = await editInfo(refObject.current!.value);
                  if (result) {
                    setError(result);
                    //if the change did not go through, return to original input value
                    refObject.current!.value = defaultValue || "";
                  }
                });
                setEditMode(false);
              }}
            />
            <MaterialSymbolsLightCloseRounded
              className="mx-4 cursor-pointer text-2xl"
              onClick={() => setEditMode(false)}
            />
          </Fragment>
        ) : (
          <MaterialSymbolsLightHistoryEduRounded
            className="mx-4 cursor-pointer text-2xl"
            onClick={() => {
              if (isPending) return;
              setEditMode(true);
            }}
          />
        )
      }
    />
  );
}
