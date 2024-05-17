import FileInput from "@/app/_components/inputs/FileInput";
import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightImageOutlineRounded from "@/public/icons/MaterialSymbolsLightImageOutlineRounded";
import { useState, useTransition } from "react";

export default function BaseForm({ isPending }: { isPending: boolean }) {
  const [portrait, setPortrait] = useState<File>();

  return (
    <RowWrapper justify="justify-items-start">
      <div className="relative flex h-44 w-[10rem] items-center justify-center overflow-hidden border-[1px] border-black50">
        {
          /*Icon display priority: icon remove selected => icon uploaded => user original icon */
          portrait && (
            <img
              src={URL.createObjectURL(portrait)}
              className="absolute left-0 top-0 z-0 min-h-[100%] min-w-[100%] object-cover"
              alt="portrait preview"
            />
          )
        }
        <FileInput
          id="server-icon"
          accept=".jpg, .png, .svg, .gif"
          labelElement={
            <MaterialSymbolsLightImageOutlineRounded className="text-2xl" />
          }
          onChange={(e) => {
            setPortrait(e.target.files ? e.target.files[0] : undefined);
          }}
          disabled={isPending}
        />
      </div>
      <ColumnWrapper align="items-start">
        <RowWrapper className="text-xl">
          <label htmlFor="character-name">Character name</label>
          <TextInput id="character-name" />
        </RowWrapper>
        <label htmlFor="description">Description</label>
        <TextAreaInput className="w-full" />
      </ColumnWrapper>
    </RowWrapper>
  );
}
