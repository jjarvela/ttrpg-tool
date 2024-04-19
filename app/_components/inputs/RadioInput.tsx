import { DetailedHTMLProps, Fragment, InputHTMLAttributes } from "react";
import RowWrapper from "../wrappers/RowWrapper";
import { twMerge } from "tailwind-merge";

interface RadioInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelStyle?: string; //css classes
  radioStyle?: { radioBg: string; selectedColour?: string; radioSize?: string };
  selected: string | number | readonly string[] | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
  setIsInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function RadioInput({
  name,
  value,
  labelStyle,
  radioStyle,
  selected,
  setSelected,
  setIsInvalid,
  disabled,
  readOnly,
  ...rest
}: RadioInputProps) {
  const disabledClass = "fill-black50";
  return (
    <label htmlFor={name + "-" + value} className="rounded-lg">
      <RowWrapper>
        <span className={twMerge("flex-grow-1", labelStyle && labelStyle)}>
          {value}
        </span>
        <div
          style={{
            width: radioStyle?.radioSize || "1rem",
            height: radioStyle?.radioSize || "1rem",
          }}
          className={twMerge(
            "mx-2 flex-shrink-0 rounded-full border border-black50 bg-transparent",
            radioStyle?.radioBg ? radioStyle.radioBg : "",
          )}
        >
          <svg
            width={"100%"}
            height={"100%"}
            viewBox="0 0 16 16"
            className={twMerge(
              "fill-transparent transition-all duration-100 ease-in-out",
              selected === value &&
                (radioStyle?.selectedColour
                  ? disabled || readOnly
                    ? disabledClass
                    : radioStyle?.selectedColour
                  : disabled || readOnly
                    ? disabledClass
                    : "fill-primary"),
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
            if (disabled || readOnly) return;
            selected === value ? setSelected(undefined) : setSelected(value);
          }}
          onInvalid={() => setIsInvalid(true)}
          {...rest}
        />
      </RowWrapper>
    </label>
  );
}
