import { DetailedHTMLProps } from "react";
import MaterialSymbolsLightChevronLeftRounded from "../../../icons/MaterialSymbolsLightChevronLeftRounded";
interface NumberInputSpinnerProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  method: "add" | "subtract";
}

export default function NumberInputSpinner({
  method,
  ...rest
}: NumberInputSpinnerProps) {
  return (
    <button
      className="bg-black50 px-1 text-lg hover:bg-black25 disabled:text-black25 hover:dark:bg-black75 disabled:dark:text-black75"
      {...rest}
    >
      <MaterialSymbolsLightChevronLeftRounded
        className={method === "add" ? "rotate-90" : "-rotate-90"}
      />
    </button>
  );
}
