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
}

export default function ColumnWrapper({
  align,
  justify,
  className,
  children,
  ...rest
}: ColumnWrapperProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col content-center items-center p-2 gap-2",
        align && align,
        justify && justify,
        className && className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
