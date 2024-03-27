import { DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

export default function Main({
  children,
  className,
  ...rest
}: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={twMerge("flex min-h-screen flex-grow flex-col", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
