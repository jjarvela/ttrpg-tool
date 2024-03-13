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
        "m-2 gap[1rem] border-black50 border-[1px] py-1 px-2 rounded-xl",
        borderless && "border-none",
        className,
      )}
    >
      {startElement}
      <textarea
        value={value}
        maxLength={maxLength}
        className="bg-transparent outline-none border-none text-black50 focus:text-black focus:dark:text-white scrollbar-thin scrollbar-extra-margin resize-none w-full"
        {...rest}
      ></textarea>
      {maxLength && (
        <p className="text-black50 self-end">
          {typeof value === "string" && value.length > 0 ? value.length : "0"}/
          {maxLength}
        </p>
      )}
    </ColumnWrapper>
  );
}
