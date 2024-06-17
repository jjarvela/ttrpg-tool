"use client";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import Link from "next/link"
import Image from "next/image"
interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className: string;
  children?: React.ReactNode;
  handleClick?: (e?: React.MouseEvent) => void;
}

interface IconLink {
  imgSrc: string,
  width: number,
  height: number,
  className: string,
  children?: React.ReactNode
  href: string
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

export function IconLink({ children, className, imgSrc, width, height, href, ...rest }: IconLink) {
  return (
    <Link
      className={className}
      href={href} {...rest}>
      <Image src={imgSrc} width={width} height={height} alt="Dice icon" />
      {children}
    </Link>
  )
}

export default Button;
