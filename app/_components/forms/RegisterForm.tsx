"use client";

import PasswordInput from "../inputs/PasswordInput";
import TextInput from "../inputs/TextInput";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import { twMerge } from "tailwind-merge";

type RegisterFormProps = {
  goToLogin: () => void;
  className?: string;
  title?: boolean;
};

export default function RegisterForm({
  goToLogin,
  className,
  title,
}: RegisterFormProps) {
  return (
    <section id="register" className={twMerge("text-center", className)}>
      <form>
        {title && <h2 className="my-1 mb-2">Sign up</h2>}
        <ColumnWrapper className="mx-auto w-[80%]">
          <TextInput type="email" placeholder="email" className="w-full" />
          <TextInput placeholder="username" className="w-full" />
          <PasswordInput placeholder="password" className="w-full" />
          <PasswordInput placeholder="confirm password" className="w-full" />
          <button>Join Now</button>
          Already have an account?{" "}
          <a
            className="border-spacing-1 cursor-pointer border-b-[0.5px]"
            onClick={() => goToLogin()}
          >
            Login
          </a>
        </ColumnWrapper>
      </form>
    </section>
  );
}
