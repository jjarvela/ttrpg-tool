import { ReactNode, forwardRef } from "react";
import RowWrapper from "../wrappers/RowWrapper";
import { twMerge } from "tailwind-merge";
import ColumnWrapper from "../wrappers/ColumnWrapper";

export interface TextInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  type?: "email" | "tel" | "url";
  borderless?: boolean;
  className?: string;
  startElement?: ReactNode;
  endElement?: ReactNode;
  error?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { type, borderless, className, startElement, endElement, error, ...props },
    ref,
  ) => {
    return (
      <ColumnWrapper className="w-full gap-0 p-0">
        {error && (
          <small className="m-0 w-full text-left text-warning">{error}</small>
        )}
        <RowWrapper
          className={twMerge(
            "m-2 w-max gap-1 rounded-xl border-[1px] border-black50 px-2 py-1",
            borderless && "border-none",
            className,
          )}
        >
          {startElement}
          <input
            ref={ref}
            className="flex-grow border-none bg-transparent text-black85 outline-none placeholder:text-black50 focus:text-black dark:text-black25 focus:dark:text-white"
            type={type || "text"}
            {...props}
          ></input>
          {endElement}
        </RowWrapper>
      </ColumnWrapper>
    );
  },
);

TextInput.displayName = "textinput";

export default TextInput;
