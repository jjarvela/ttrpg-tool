"use client";
import { DetailedHTMLProps, ReactNode, useRef } from "react";
import "../../../styles/numberInput.css";
import RowWrapper from "../wrappers/RowWrapper";
import { twMerge } from "tailwind-merge";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import NumberInputSpinner from "./NumberInputSpinner";

interface NumberInputProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  min?: number;
  max?: number;
  borderless?: boolean;
  className?: string;
  startElement?: ReactNode;
  endElement?: ReactNode;
}

export default function NumberInput({
  min,
  max,
  borderless,
  className,
  startElement,
  endElement,
  ...rest
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <RowWrapper
      className={twMerge(
        "m-2 gap-1 overflow-hidden rounded-xl border-[1px] border-black50 pl-2",
        borderless && "border-none",
        className,
      )}
    >
      {startElement}
      <RowWrapper>
        <input
          ref={inputRef}
          min={max}
          max={max}
          className="border-none bg-transparent py-1 text-end text-black85 outline-none focus:appearance-none focus:text-black dark:text-black25 focus:dark:text-white"
          type="number"
          {...rest}
        ></input>
        <ColumnWrapper className="gap-0 p-0">
          <NumberInputSpinner
            method="add"
            disabled={
              (inputRef.current &&
                max &&
                parseInt(inputRef.current?.value) >= max) ||
              false
            }
            onClick={() => {
              if (inputRef.current && inputRef.current.value !== "") {
                const newValue = parseInt(inputRef.current.value) + 1;
                inputRef.current.value = newValue.toString();
              } else if (inputRef.current) {
                inputRef.current.value = "1";
              }
            }}
          />
          <NumberInputSpinner
            method="subtract"
            disabled={
              (inputRef.current &&
                min &&
                parseInt(inputRef.current?.value) <= min) ||
              false
            }
            onClick={() => {
              if (inputRef.current && inputRef.current.value !== "") {
                const newValue = parseInt(inputRef.current.value) - 1;
                inputRef.current.value = newValue.toString();
              } else if (inputRef.current) {
                inputRef.current.value = "-1";
              }
            }}
          />
        </ColumnWrapper>
      </RowWrapper>
      {endElement}
    </RowWrapper>
  );
}
