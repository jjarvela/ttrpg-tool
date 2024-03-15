import { DetailedHTMLProps, Fragment, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import RowWrapper from "../wrappers/RowWrapper";
import clsx from "clsx";

interface ToggleInputProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  label?: string;
  labelClass?: string;
  checkedColour?: string; //css class
  uncheckedColour?: string; //css class
  className?: string;
  breakpoint?: string;
  height?: string;
  width?: string;
  onToggle?: (val: boolean) => void;
  onByDefault?: boolean;
  startElement?: ReactNode;
  endElement?: ReactNode;
}

export default function ToggleInput({
  id,
  label,
  labelClass,
  uncheckedColour,
  checkedColour,
  className,
  breakpoint,
  height,
  width,
  onToggle,
  onByDefault,
  startElement,
  endElement,
  ...rest
}: ToggleInputProps) {
  const [isTrue, setIsTrue] = useState(onByDefault || false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSetIsTrue = (val: boolean) => {
    setIsTrue(val);
    if (onToggle) onToggle(val);
  };

  return (
    <div className="relative">
      {/**Phantom input inside relative div to avoid unintended scroll behaviour on toggle*/}
      <input
        id={id}
        type="checkbox"
        className="absolute h-0 w-0"
        checked={isTrue}
        onChange={() => handleSetIsTrue(!isTrue)}
        onInvalid={() => setIsInvalid(true)}
        {...rest}
      />
      <label htmlFor={id}>
        <RowWrapper
          breakPoint={breakpoint}
          className={className ? className : ""}
        >
          {startElement && startElement}
          {label && (
            <span className={labelClass ? labelClass : ""}>{label}</span>
          )}
          <div
            style={{ height: height || "2rem", width: width || "3.25rem" }}
            className={twMerge(
              "cursor-pointer rounded-full border border-black50 bg-opacity-0 transition-all duration-200 ease-in-out",
              uncheckedColour ? uncheckedColour : "bg-transparent",
              isTrue &&
                clsx(
                  "bg-opacity-100",
                  checkedColour ? checkedColour : "bg-primary",
                ),
            )}
          >
            <svg
              width={"50%"}
              height={"100%"}
              viewBox="0 0 16 16"
              className={twMerge(
                "fill-black50 transition-all duration-200 ease-in-out dark:fill-white",
                isTrue && "translate-x-[100%]",
              )}
            >
              <circle r={6} cx={8} cy={8} />
            </svg>
          </div>
          {endElement && endElement}
        </RowWrapper>
        {isInvalid && (
          <span className="text-warning">This field is required</span>
        )}
      </label>
    </div>
  );
}
