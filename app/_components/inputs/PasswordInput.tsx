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
        "m-2 gap-1 border-black50 border-[1px] py-1 px-2 rounded-xl",
        borderless && "border-none",
        className,
      )}
    >
      {startElement}
      <input
        className="bg-transparent outline-none border-none text-black50 focus:text-black focus:dark:text-white w-full"
        type={showPassword ? "text" : "password"}
        {...rest}
      ></input>
      {showPassword ? (
        <MaterialSymbolsLightVisibilityOffRounded
          onClick={() => setShowPassword(false)}
        />
      ) : (
        <MaterialSymbolsLightVisibilityRounded
          onClick={() => setShowPassword(true)}
        />
      )}
      {endElement && endElement}
    </RowWrapper>
  );
}
