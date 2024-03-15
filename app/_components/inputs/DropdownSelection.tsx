import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import RowWrapper from "../wrappers/RowWrapper";
import MaterialSymbolsLightChevronLeftRounded from "../../../icons/MaterialSymbolsLightChevronLeftRounded";
import MaterialSymbolsLightCloseRounded from "../../../icons/MaterialSymbolsLightCloseRounded";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import clsx from "clsx";
import MaterialSymbolsLightCheckSmallRounded from "../../../icons/MaterialSymbolsLightCheckSmallRounded";
import handleClickOutside from "../../../utils/handleClickOutside";

type Option = { label: string; value: string | number | boolean };

interface DropdownSelectionProps {
  options: Array<Option>;
  onSelect: (selected: Array<Option>) => void;
  required?: boolean;
  defaultSelected?: Array<Option>;
  placeholder?: string;
  multiple?: boolean;
}

export default function DropdownSelection({
  options,
  onSelect,
  required,
  defaultSelected,
  placeholder,
  multiple,
}: DropdownSelectionProps) {
  const [selected, setSelected] = useState<Array<Option>>(
    defaultSelected || [],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelection = (option: Option, isSelected: boolean) => {
    if (!isSelected) {
      if (multiple) {
        const newSelected = [option, ...selected];
        setSelected(newSelected);
        onSelect && onSelect(newSelected);
      } else {
        const newSelected = [{ label: option.label, value: option.value }];
        setSelected(newSelected);
        onSelect && onSelect(newSelected);
      }
    } else {
      const newSelected = selected.filter(
        (item) => item.value !== option.value,
      );
      setSelected(newSelected);
      onSelect && onSelect(newSelected);
    }
  };

  return (
    <div className="relative">
      {/**Phantom input to track required condition*/}
      <input
        className="h-0 w-0"
        required={required}
        defaultValue={selected.length > 0 ? "1" : ""}
        onInvalid={() => setIsInvalid(true)}
      />

      <RowWrapper
        justify="justify-between"
        className="w-full overflow-hidden rounded-xl border-[1px] border-black50 p-0"
      >
        <div className="grid grid-flow-row-dense grid-cols-3 gap-1 px-1">
          {selected.length > 0 ? (
            selected.map((item) => (
              <SelectedOption
                key={"selected-" + item.value}
                option={item}
                multi={multiple}
                handleSelection={handleSelection}
              />
            ))
          ) : (
            <span className="px-2 text-black50">
              {placeholder ? placeholder : ""}
            </span>
          )}
        </div>
        <div
          className="cursor-pointer bg-black50 text-xl transition-transform duration-100"
          onClick={() => {
            const newIsOpen = !isOpen;
            setIsOpen(newIsOpen);
            newIsOpen &&
              document.addEventListener("mousedown", (event) =>
                handleClickOutside(dropdownRef, event, () => setIsOpen(false)),
              );
          }}
        >
          <MaterialSymbolsLightChevronLeftRounded
            className={clsx("self-center", isOpen ? "rotate-90" : "-rotate-90")}
          />
        </div>
      </RowWrapper>

      <ColumnWrapper
        refObject={dropdownRef}
        align="items-start"
        className={twMerge(
          "bg-color-default absolute z-[99] ml-[0.25rem] mt-[0.25rem] w-[95%] overflow-hidden border-[1px] border-black50 p-0",
          isOpen ? "h-max" : "collapse h-0",
        )}
      >
        {options.map((option) => (
          <SelectionOption
            key={option.label + option.value}
            option={option}
            isSelected={
              selected.length > 0
                ? selected.map((item) => item.value).indexOf(option.value) > -1
                : false
            }
            handleSelection={handleSelection}
          />
        ))}
      </ColumnWrapper>
      {isInvalid && (
        <span className="text-warning">This field is required</span>
      )}
    </div>
  );
}

interface SelectionOptionProps {
  option: Option;
  isSelected: boolean;
  multi?: boolean;
  handleSelection: (option: Option, isSelected: boolean) => void;
}

function SelectionOption({
  option,
  isSelected,
  handleSelection,
}: SelectionOptionProps) {
  return (
    <RowWrapper
      justify="justify-between justify-items-between"
      className="w-full cursor-pointer border-b-[1px] border-black50 px-2 py-1"
      onClick={() => {
        handleSelection(option, isSelected);
      }}
    >
      {option.label}
      {isSelected && (
        <MaterialSymbolsLightCheckSmallRounded className="text-lg" />
      )}
    </RowWrapper>
  );
}

function SelectedOption({
  option,
  multi,
  handleSelection,
}: {
  option: Option;
  multi?: boolean;
  handleSelection: (
    option: Option,
    isSelected: boolean,
    multi?: boolean,
  ) => void;
}) {
  if (!multi) return <div className="px-2">{option.label}</div>;
  else
    return (
      <RowWrapper className="bg-black25 px-[0.5rem] dark:bg-black75">
        {option.label}{" "}
        <MaterialSymbolsLightCloseRounded
          className="cursor-pointer"
          onClick={() => handleSelection(option, true, true)}
        />
      </RowWrapper>
    );
}
