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
  mode?: "section" | "div"; //section
}

/**
 * Wrapper that renders a flex column layout section or div depending on mode prop
 * @param align prop to contain tw classes for aligning content
 * @param justify prop to contain tw classes for justifying content
 * @param className additional classnames or override existing tailwind classes
 * @param refObject HTMLDivElement type ref
 * @param mode section or div to decide which tags the wrapper renders
 * @param rest accepts all common HTML attributes
 * @returns JSX <div> or <section> with default classes of "flex flex-col content-center items-center gap-2 p-2" unless overriden with props
 */

export default function ColumnWrapper({
  align,
  justify,
  className,
  children,
  refObject,
  mode,
  ...rest
}: ColumnWrapperProps) {
  if (mode && mode === "section")
    return (
      <section
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
      </section>
    );

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
