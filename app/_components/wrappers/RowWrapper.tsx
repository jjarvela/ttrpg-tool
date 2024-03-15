import { DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
interface RowWrapperProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  breakPoint?: string;
  align?: string; //tailwind classes for aligning content/items
  justify?: string; //tailwind classes for justifying content/items
  className?: string;
  refObject?: React.RefObject<HTMLDivElement>;
}

export default function RowWrapper({
  breakPoint,
  align,
  justify,
  className,
  children,
  refObject,
  ...rest
}: RowWrapperProps) {
  //return correct tailwind classes based on set breakpoint
  const setBreakPoint = (breakPoint: string) => {
    switch (breakPoint) {
      case "xs":
        return "flex-col xs:flex-row";
      case "sm":
        return "flex-col sm:flex-row";
      case "md":
        return "flex-col md:flex-row";
      case "lg":
        return "flex-col lg:flex-row";
      case "xl":
        return "flex-col xl:flex-row";
      default:
        return "";
    }
  };

  const baseClasses = clsx(
    "flex content-center items-center gap-2",
    breakPoint && setBreakPoint(breakPoint),
  );

  return (
    <div
      className={twMerge(
        baseClasses,
        align && align,
        justify && justify,
        className && className,
      )}
      ref={refObject}
      {...rest}
    >
      {children}
    </div>
  );
}
