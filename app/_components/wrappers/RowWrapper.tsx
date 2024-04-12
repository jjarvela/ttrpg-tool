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
  mode?: "div" | "section";
  refObject?: React.RefObject<HTMLDivElement>;
}

/**
 * Wrapper that renders a flex row layout section or div depending on mode prop
 * @param breakPoint tailwind breakpoint as string to control at which point the row changes to column
 * @param align prop to contain tw classes for aligning content
 * @param justify prop to contain tw classes for justifying content
 * @param className additional classnames or override existing tailwind classes
 * @param refObject HTMLDivElement type ref
 * @param mode section or div to decide which tags the wrapper renders
 * @param rest accepts all common HTML attributes
 * @returns JSX <div> or <section> with default classes of "flex content-center items-center gap-2 p-2" unless overriden with props
 */

export default function RowWrapper({
  breakPoint,
  align,
  justify,
  className,
  children,
  mode,
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

  if (mode && mode === "section")
    return (
      <section
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
      </section>
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
