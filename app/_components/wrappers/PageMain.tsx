import { DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Wrapper for page main content that by default scales height to screen and width to leftover space within layout. Overflow set to auto.
 * @param className add additional classes or override existing ones
 * @returns JSX <div> tags with default classes of "flex min-h-screen flex-grow flex-col overflow-auto scrollbar-thin"
 */
export default function Main({
  children,
  className,
  ...rest
}: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "scrollbar-thin flex min-h-screen flex-grow flex-col overflow-auto",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
