import { DetailedHTMLProps } from "react";

interface ColumnWrapperProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
}

export default function ColumnWrapper({
  className,
  children,
}: ColumnWrapperProps) {
  return (
    <div className={`flex flex-col ${className ? className : ""}`}>
      {children}
    </div>
  );
}
