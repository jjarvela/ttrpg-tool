import TextInput from "@/app/_components/inputs/TextInput";
import MaterialSymbolsLightAdd from "@/public/icons/MaterialSymbolsLightAdd";
import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";
import { useState } from "react";

export default function AddNew({
  handleAdd,
  isPending,
}: {
  handleAdd: (value: string) => void;
  isPending: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [value, setValue] = useState("");

  if (isOpen) {
    return (
      <TextInput
        id={"add-new-" + Math.floor(Math.random() * 1000)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd(value);
            setValue("");
            setIsOpen(false);
            return;
          }

          if (e.key === "Escape") {
            setValue("");
            setIsOpen(false);
            return;
          }
        }}
        disabled={isPending}
        endElement={
          <MaterialSymbolsLightCloseRounded
            className="cursor-pointer justify-self-end text-2xl"
            onClick={() => {
              setValue("");
              setIsOpen(false);
            }}
          />
        }
      />
    );
  }
  return (
    <div
      onClick={() => !isPending && setIsOpen(true)}
      className="cursor-pointer"
    >
      <MaterialSymbolsLightAdd className="text-2xl" />
    </div>
  );
}
