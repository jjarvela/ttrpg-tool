import { DetailedHTMLProps, ReactNode } from "react";
import RowWrapper from "../wrappers/RowWrapper";
import { twMerge } from "tailwind-merge";

interface TextInputProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: "email" | "tel" | "url";
  borderless?: boolean;
  className?: string;
  startElement?: ReactNode;
  endElement?: ReactNode;
}

export default function TextInput({
  type,
  borderless,
  className,
  startElement,
  endElement,
  ...rest
}: TextInputProps) {
  return (
    <RowWrapper
      className={twMerge(
        "m-2 w-max gap-1 rounded-xl border-[1px] border-black50 px-2 py-1",
        borderless && "border-none",
        className,
      )}
    >
      {startElement}
      <input
        className="w-full border-none bg-transparent text-black85 outline-none placeholder:text-black50 focus:text-black dark:text-black25 focus:dark:text-white"
        type={type || "text"}
        {...rest}
      ></input>
      {endElement}
    </RowWrapper>
  );
}
