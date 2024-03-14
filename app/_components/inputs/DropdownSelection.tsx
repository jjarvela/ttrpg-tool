import { DetailedHTMLProps, OptionHTMLAttributes, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import RowWrapper from "../wrappers/RowWrapper";
import MaterialSymbolsLightChevronLeftRounded from "../../../icons/MaterialSymbolsLightChevronLeftRounded";
import MaterialSymbolsLightCloseRounded from "../../../icons/MaterialSymbolsLightCloseRounded";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import clsx from "clsx";
import MaterialSymbolsLightCheckSmallRounded from "../../../icons/MaterialSymbolsLightCheckSmallRounded";

type Option = {label: string, value: string | number | boolean}

interface DropdownSelectionProps extends DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
{
  options: Array<Option>,
  defaultSelected?: Array<Option>,
  placeholder?: string,
  multiple?: boolean
}

export default function DropdownSelection ({options, defaultSelected, placeholder, multiple, ...rest} : DropdownSelectionProps) {
  const [selected, setSelected] = useState<Array<Option>>(defaultSelected || []);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (option: Option, isSelected: boolean) => {
      if(!isSelected) {
        multiple && setSelected(prev => [...prev, {label: option.label, value: option.value}])
        !multiple && setSelected([{label: option.label, value: option.value}])
      } else {
        setSelected(prev => prev.filter(item => item.value !== option.value))
      }
  }

  return (
    <div className="relative">
      <RowWrapper justify="justify-between" className="overflow-hidden w-full rounded-xl border-[1px] border-black50 p-0">
        <div className="grid grid-cols-3 gap-1 px-1 grid-flow-row-dense">
        {selected.length > 0 ? selected.map(item => <SelectedOption key={"selected-" + item.value} option={item} multi={multiple} handleSelection={handleSelection}/>)  : <span className="text-black50 px-2">{placeholder ? placeholder :  ""}</span>}
        </div>
        <div className="text-xl bg-black50 cursor-pointer transition-transform duration-100" onClick={() => setIsOpen(prev => !prev)}>
          <MaterialSymbolsLightChevronLeftRounded className={clsx("self-center", isOpen ? "rotate-90" : "-rotate-90")}/>
        </div>
      </RowWrapper>
      <ColumnWrapper align="items-start" className={twMerge("p-0 w-[95%] absolute mt-[0.25rem] ml-[0.25rem] z-[99] bg-color-default overflow-hidden border-[1px] border-black50", isOpen ? "h-max" : "h-0 collapse")}>
          {options.map(option => <SelectionOption key={option.label + option.value} option={option} isSelected={selected.length > 0 ? (selected.map(item => item.value).indexOf(option.value) > - 1) : false} handleSelection={handleSelection}/>)}
      </ColumnWrapper>
    </div>
  )
}

interface SelectionOptionProps {
option: Option,
isSelected: boolean;
multi?: boolean;  
handleSelection: (option: Option, isSelected: boolean) => void
}

function SelectionOption ({option, isSelected, handleSelection}: SelectionOptionProps) {
  return (
    <RowWrapper justify="justify-between justify-items-between" className="px-2 py-1 cursor-pointer w-full border-b-[1px] border-black50" onClick={() => {
      handleSelection(option, isSelected);
    }}>{option.label}{isSelected && <MaterialSymbolsLightCheckSmallRounded className="text-lg"/>}</RowWrapper>
  )
}

function SelectedOption ({option, multi, handleSelection} : {option: Option, multi?: boolean, handleSelection: (option: Option, isSelected: boolean, multi?: boolean) => void}) {
  if(!multi) return <div className="px-2">{option.label}</div>
  else return <RowWrapper className="bg-black25 dark:bg-black75 px-[0.5rem]">{option.label} <MaterialSymbolsLightCloseRounded className="cursor-pointer" onClick={() => handleSelection(option, true, true)}/></RowWrapper>
}