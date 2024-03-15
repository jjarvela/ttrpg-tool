"use client";
import { DetailedHTMLProps, ReactNode } from "react";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import { twMerge } from "tailwind-merge";

interface TextAreaInputProps
  extends DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  borderless?: boolean;
  className?: string;
  startElement?: ReactNode;
}

export default function TextAreaInput({
  value,
  maxLength,
  borderless,
  className,
  startElement,
  ...rest
}: TextAreaInputProps) {
  return (
    <ColumnWrapper
      className={twMerge(
        "gap[1rem] m-2 rounded-xl border-[1px] border-black50 px-2 py-1",
        borderless && "border-none",
        className,
      )}
    >
      {startElement}
      <textarea
        value={value}
        maxLength={maxLength}
        className="scrollbar-thin scrollbar-extra-margin w-full resize-none border-none bg-transparent text-black85 outline-none placeholder:text-black50 focus:text-black dark:text-black25 focus:dark:text-white"
        {...rest}
      ></textarea>
      {maxLength && (
        <p className="self-end text-black85 dark:text-black25">
          {typeof value === "string" && value.length > 0 ? value.length : "0"}/
          {maxLength}
        </p>
      )}
    </ColumnWrapper>
  );
}
