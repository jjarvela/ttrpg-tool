"use client";

import { ReactNode, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import RowWrapper from "../wrappers/RowWrapper";
import MaterialSymbolsLightChevronLeftRounded from "../../../public/icons/MaterialSymbolsLightChevronLeftRounded";
import MaterialSymbolsLightCloseRounded from "../../../public/icons/MaterialSymbolsLightCloseRounded";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import clsx from "clsx";
import MaterialSymbolsLightCheckSmallRounded from "../../../public/icons/MaterialSymbolsLightCheckSmallRounded";
import handleClickOutside from "../../../utils/handleClickOutside";

/***
 * Custom dropdown selection component
 *
 * Includes dummy input tag to handle required and invalid cases. Use onSelect prop to get access to selection.
 * @param options Array<{label: string, value: string}>
 * @param disabledOptions Array<{label: string, value: string}>, optional
 * @param onSelect (selected: Array<Option>) => void
 */

declare global {
  type Option = { label: string; value: string | number | boolean };
}

interface DropdownSelectionProps {
  options: Array<Option>;
  disabledOptions?: Array<Option>;
  id?: string;
  onSelect: (selected: Array<Option>) => void;
  required?: boolean;
  defaultSelected?: Array<Option>;
  placeholder?: string;
  multiple?: boolean;
  className?: string;
  arrowClass?: string;
  startElement?: ReactNode;
}

export default function DropdownSelection({
  options,
  disabledOptions,
  onSelect,
  id,
  required,
  defaultSelected,
  placeholder,
  multiple,
  className,
  arrowClass,
  startElement,
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
    <ColumnWrapper
      className="relative w-full gap-0 p-0"
      refObject={dropdownRef}
    >
      {/**Phantom input to track required condition*/}
      <input
        className="collapse absolute h-0 w-0"
        required={required}
        id={id}
        defaultValue={selected.length > 0 ? "1" : ""}
        onInvalid={() => setIsInvalid(true)}
      />

      <RowWrapper
        justify="justify-between"
        className={twMerge(
          "cursor-pointer overflow-hidden rounded-xl border-[1px] border-black50 p-0",
          className,
        )}
        onClick={() => {
          const newIsOpen = !isOpen;
          newIsOpen &&
            document.addEventListener("mousedown", (event) =>
              handleClickOutside(dropdownRef, event, () => setIsOpen(false)),
            );
          setIsOpen((prev) => !prev);
        }}
      >
        {startElement}
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
          className={twMerge(
            "flex-shrink-0 bg-black50 transition-transform duration-100",
            arrowClass,
          )}
        >
          <MaterialSymbolsLightChevronLeftRounded
            className={clsx(isOpen ? "rotate-90" : "-rotate-90")}
          />
        </div>
      </RowWrapper>

      <ColumnWrapper
        align="items-start"
        className={twMerge(
          "bg-color-default scrollbar-thin z-[99] ml-[0.25rem] mt-[0.25rem] max-h-[20em] w-[95%] overflow-hidden overflow-y-auto border-[1px] border-black50 p-0",
          isOpen ? "h-max" : "collapse h-0",
        )}
      >
        {options.map((option) => {
          if (
            disabledOptions &&
            disabledOptions.filter((item) => item.value === option.value)
          ) {
            return (
              <SelectionOption
                key={option.label + option.value}
                option={option}
                isSelected={
                  selected.length > 0
                    ? selected.map((item) => item.value).indexOf(option.value) >
                      -1
                    : false
                }
                disabled
              />
            );
          }
          return (
            <SelectionOption
              key={option.label + option.value}
              option={option}
              isSelected={
                selected.length > 0
                  ? selected.map((item) => item.value).indexOf(option.value) >
                    -1
                  : false
              }
              handleSelection={handleSelection}
            />
          );
        })}
      </ColumnWrapper>
      {isInvalid && (
        <span className="text-warning">This field is required</span>
      )}
    </ColumnWrapper>
  );
}

interface SelectionOptionProps {
  option: Option;
  isSelected: boolean;
  multi?: boolean;
  disabled?: boolean;
  handleSelection?: (option: Option, isSelected: boolean) => void;
}

function SelectionOption({
  option,
  disabled,
  isSelected,
  handleSelection,
}: SelectionOptionProps) {
  return (
    <RowWrapper
      justify="justify-between justify-items-between"
      className={twMerge(
        "w-full cursor-pointer border-b-[1px] border-black50 px-2 py-1",
        disabled && "text-black50",
      )}
      onClick={() => {
        handleSelection && handleSelection(option, isSelected);
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
