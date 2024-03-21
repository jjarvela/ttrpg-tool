"use client";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className: string;
  children?: React.ReactNode;
  handleClick?: (e?: React.MouseEvent) => void;
}

function Button({ children, className, handleClick, ...rest }: ButtonProps) {
  return (
    <button
      className={className}
      onClick={() => handleClick && handleClick()}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
