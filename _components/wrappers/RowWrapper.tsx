import { DetailedHTMLProps } from "react";

interface RowWrapperProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  breakPoint?: string;
  className?: string;
}

export default function RowWrapper({
  breakPoint,
  className,
  children,
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

  return (
    <div
      className={`flex ${breakPoint ? setBreakPoint(breakPoint) : ""} ${className ? className : ""}`}
    >
      {children}
    </div>
  );
}
