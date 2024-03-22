import { DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

export default function Main({
  children,
  className,
  ...rest
}: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <main
      className={twMerge("flex min-h-screen flex-col", className)}
      {...rest}
    >
      {children}
    </main>
  );
}
