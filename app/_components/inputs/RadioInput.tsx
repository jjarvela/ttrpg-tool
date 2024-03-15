import { DetailedHTMLProps, Fragment, InputHTMLAttributes } from "react";
import RowWrapper from "../wrappers/RowWrapper";
import { twMerge } from "tailwind-merge";

interface RadioInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelStyle?: string; //css classes
  selectedColour?: string; //css class
  selected: string | number | readonly string[] | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
  setIsInvalid: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RadioInput({
  name,
  value,
  labelStyle,
  selectedColour,
  selected,
  setSelected,
  setIsInvalid,
  ...rest
}: RadioInputProps) {
  return (
    <label htmlFor={name + "-" + value}>
      <RowWrapper>
        <span className={twMerge("flex-grow-1", labelStyle && labelStyle)}>
          {value}
        </span>
        <div
          className={twMerge(
            "mx-2 h-4 w-4 flex-shrink-0 rounded-full border border-black50 bg-opacity-0",
          )}
        >
          <svg
            width={"100%"}
            height={"100%"}
            viewBox="0 0 16 16"
            className={twMerge(
              "fill-transparent transition-all duration-100 ease-in-out",

              selected === value &&
                (selectedColour ? selectedColour : "fill-primary"),
            )}
          >
            <circle r={6} cx={8} cy={8} />
          </svg>
        </div>
        <input
          id={name + "-" + value}
          type="radio"
          style={{ height: "0px", width: "0px" }}
          checked={selected === value ? true : false}
          onChange={() => {
            selected === value ? setSelected(undefined) : setSelected(value);
          }}
          onInvalid={() => setIsInvalid(true)}
          {...rest}
        />
      </RowWrapper>
    </label>
  );
}
