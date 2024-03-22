"use client"; //for debug purposes, remove later (assume input is always imported into form component that uses client)
import {ReactNode, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import RowWrapper from "../wrappers/RowWrapper";
import MaterialSymbolsLightVisibilityOffRounded from "../../../icons/MaterialSymbolsLightVisibilityOffRounded";
import MaterialSymbolsLightVisibilityRounded from "../../../icons/MaterialSymbolsLightVisibilityRounded";
import ColumnWrapper from "../wrappers/ColumnWrapper";

export interface PasswordInputProps extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  borderless?: boolean;
  className?: string;
  startElement?: ReactNode;
  endElement?: ReactNode;
  error?: string; //if using react-hook-forms pass as formState.errors.[field name].message
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
  borderless,
  className,
  startElement,
  endElement,
  error,
  ...props}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ColumnWrapper className="p-0 gap-0 w-full">
    {error && <small className="text-left w-full m-0 text-warning">{error}</small>}
    <RowWrapper
      className={twMerge(
        "m-2 gap-1 rounded-xl border-[1px] border-black50 px-2 py-1",
        borderless && "border-none",
        className,
      )}
    >
      {startElement}
      <input
      ref={ref}
        className="w-full border-none bg-transparent text-black85 outline-none placeholder:text-black50 focus:text-black dark:text-black25 focus:dark:text-white"
        type={showPassword ? "text" : "password"}
        {...props}
      ></input>
      {showPassword ? (
        <MaterialSymbolsLightVisibilityOffRounded
          className="text-black85 dark:text-black25"
          onClick={() => setShowPassword(false)}
        />
      ) : (
        <MaterialSymbolsLightVisibilityRounded
          className="text-black85 dark:text-black25"
          onClick={() => setShowPassword(true)}
        />
      )}
      {endElement && endElement}
    </RowWrapper>
    </ColumnWrapper>
  );
})

PasswordInput.displayName = "password";

export default PasswordInput;