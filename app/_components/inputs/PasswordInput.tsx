"use client"; //for debug purposes, remove later (assume input is always imported into form component that uses client)
import { DetailedHTMLProps, ReactNode, useState } from "react";
import RowWrapper from "../wrappers/RowWrapper";
import { twMerge } from "tailwind-merge";
import MaterialSymbolsLightVisibilityOffRounded from "../../../icons/MaterialSymbolsLightVisibilityOffRounded";
import MaterialSymbolsLightVisibilityRounded from "../../../icons/MaterialSymbolsLightVisibilityRounded";

interface PasswordInputProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  borderless?: boolean;
  className?: string;
  startElement?: ReactNode;
  endElement?: ReactNode;
}

export default function PasswordInput({
  borderless,
  className,
  startElement,
  endElement,
  ...rest
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <RowWrapper
      className={twMerge(
        "m-2 gap-1 rounded-xl border-[1px] border-black50 px-2 py-1",
        borderless && "border-none",
        className,
      )}
    >
      {startElement}
      <input
        className="w-full border-none bg-transparent text-black85 outline-none focus:text-black dark:text-black25 focus:dark:text-white"
        type={showPassword ? "text" : "password"}
        {...rest}
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
  );
}
