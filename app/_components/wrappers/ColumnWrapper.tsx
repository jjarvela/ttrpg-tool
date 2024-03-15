import { DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface ColumnWrapperProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  align?: string; //tailwind classes for aligning content/items
  justify?: string; //tailwind classes for justifying content/items
  className?: string;
  refObject?: React.RefObject<HTMLDivElement>;
}

export default function ColumnWrapper({
  align,
  justify,
  className,
  children,
  refObject,
  ...rest
}: ColumnWrapperProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col content-center items-center gap-2 p-2",
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
