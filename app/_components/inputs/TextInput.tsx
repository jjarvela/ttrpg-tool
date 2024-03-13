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
        "m-2 gap[1rem] border-black50 border-[1px] py-1 px-2 rounded-xl",
        borderless && "border-none",
        className,
      )}
    >
      {startElement}
      <input
        className="bg-transparent outline-none border-none text-black50 focus:text-black focus:dark:text-white w-full"
        type={type || "text"}
        {...rest}
      ></input>
      {endElement}
    </RowWrapper>
  );
}
