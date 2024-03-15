import { DetailedHTMLProps, Fragment, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import RowWrapper from "../wrappers/RowWrapper";
import clsx from "clsx";
import MaterialSymbolsLightCheckSmallRounded from "../../../icons/MaterialSymbolsLightCheckSmallRounded";

interface CheckboxProps
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
  onCheck?: (val: boolean) => void;
  onByDefault?: boolean;
  startElement?: ReactNode;
  endElement?: ReactNode;
}

export default function Checkbox({
  id,
  label,
  labelClass,
  uncheckedColour,
  checkedColour,
  className,
  breakpoint,
  height,
  width,
  onCheck,
  onByDefault,
  startElement,
  endElement,
  ...rest
}: CheckboxProps) {
  const [isTrue, setIsTrue] = useState(onByDefault || false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSetIsTrue = (val: boolean) => {
    setIsTrue(val);
    if (onCheck) onCheck(val);
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
            style={{ height: height || "1rem", width: width || "1rem" }}
            className={twMerge(
              "relative cursor-pointer rounded-sm border border-black50 bg-opacity-0 transition-all duration-200 ease-in-out",
              uncheckedColour ? uncheckedColour : "bg-transparent",
              isTrue &&
                clsx(
                  "bg-opacity-100",
                  checkedColour ? checkedColour : "bg-primary",
                ),
            )}
          >
            {isTrue && (
              <MaterialSymbolsLightCheckSmallRounded className="absolute left-auto top-auto" />
            )}
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
