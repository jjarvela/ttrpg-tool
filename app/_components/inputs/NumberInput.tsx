"use client";
import { DetailedHTMLProps, ReactNode, useRef, useState } from "react";
import "../../../styles/numberInput.css";
import RowWrapper from "../wrappers/RowWrapper";
import { twMerge } from "tailwind-merge";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import MaterialSymbolsLightChevronLeftRounded from "../../../icons/MaterialSymbolsLightChevronLeftRounded";

interface NumberInputProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  min?: number;
  max?: number;
  borderless?: boolean;
  className?: string;
  handleChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  startElement?: ReactNode;
  endElement?: ReactNode;
}

export default function NumberInput({
  value,
  step,
  min,
  max,
  borderless,
  className,
  handleChange,
  startElement,
  endElement,
  ...rest
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [number, setNumber] = useState(value || min || 0);
  const [reachedMax, setReachedMax] = useState(
    max && number ? parseFloat(number.toString()) >= max : false,
  );
  const [reachedMin, setReachedMin] = useState(
    min && number ? parseFloat(number.toString()) >= min : false,
  );

  //remotely trigger input onChange event
  const dispatchChange = (value: number) => {
    const desc = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    );
    desc?.set?.call(inputRef.current, value);
    const event = new Event("change", { bubbles: true });

    inputRef.current?.dispatchEvent(event);
  };

  return (
    <RowWrapper
      className={twMerge(
        "m-2 w-min gap-1 overflow-hidden rounded-xl border-[1px] border-black50 pl-2",
        borderless && "border-none",
        className,
      )}
    >
      {startElement}
      <RowWrapper>
        <input
          ref={inputRef}
          value={number}
          step={step || 1}
          min={min}
          max={max}
          onChange={(e) => {
            setNumber(e.target.value);

            //handle max and min check to disable spinners if necessary
            if (min) {
              if (Number(e.target.value) <= min && !reachedMin)
                setReachedMin(true);
              else if (Number(e.target.value) > min && reachedMin)
                setReachedMin(false);
            }
            if (max) {
              if (Number(e.target.value) >= max && !reachedMax)
                setReachedMax(true);
              else if (Number(e.target.value) < max && reachedMax)
                setReachedMax(false);
            }
            handleChange && handleChange(e);
          }}
          onBlur={(e) => {
            //if input number does not fall within accepted step, set to closest smaller accepted number
            if(step && Number(number) % Number(step) !== 1) setNumber(Number(number) - (Number(number) % Number(step)));

            //if input number is not within allowed range, set to min or max respectively
            if (min) {
              if (Number(e.target.value) < min) setNumber(min);
              if (Number(e.target.value) <= min && !reachedMin)
                setReachedMin(true);
              else if (Number(e.target.value) > min && reachedMin)
                setReachedMin(false);
            }

            if (max) {
              if (Number(e.target.value) > max) setNumber(max);
              if (Number(e.target.value) >= max && !reachedMax)
                setReachedMax(true);
              else if (Number(e.target.value) < max && reachedMax)
                setReachedMax(false);
            }}}
          className="border-none bg-transparent text-end text-black85 outline-none placeholder:text-black50 focus:appearance-none focus:text-black dark:text-black25 focus:dark:text-white"
          type="number"
          {...rest}
        ></input>
        <ColumnWrapper className="gap-0 p-0">
          <NumberInputSpinner
            input={inputRef}
            step={step ? parseFloat(step?.toString()) : 1}
            disabled={reachedMax}
            dispatchChange={dispatchChange}
            method="add"
          />
          <NumberInputSpinner
            input={inputRef}
            step={step ? parseFloat(step?.toString()) : 1}
            disabled={reachedMin}
            dispatchChange={dispatchChange}
            method="subtract"
          />
        </ColumnWrapper>
      </RowWrapper>
      {endElement}
    </RowWrapper>
  );
}

interface NumberInputSpinnerProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  input: React.RefObject<HTMLInputElement>;
  method: "add" | "subtract";
  dispatchChange: (value: number) => void;
  step: number;
  min?: number;
  max?: number;
  isDisabled?: boolean;
}

/*Spinner*/
function NumberInputSpinner({
  input,
  method,
  dispatchChange,
  step,
  min,
  max,
  ...rest
}: NumberInputSpinnerProps) {
  return (
    <button
      className="bg-black50 px-1 text-lg hover:bg-black25 disabled:text-black25 hover:dark:bg-black75 disabled:dark:text-black75"
      onClick={(e) => {
        e.preventDefault();
        if (!input.current) return;
        if (method === "add") {
          const current = parseFloat(input.current.value) || 0;
          dispatchChange(current + step);
        } else {
          const current = parseFloat(input.current.value) || 0;
          dispatchChange(current - step);
        }
      }}
      {...rest}
    >
      <MaterialSymbolsLightChevronLeftRounded
        className={method === "add" ? "rotate-90" : "-rotate-90"}
      />
    </button>
  );
}
