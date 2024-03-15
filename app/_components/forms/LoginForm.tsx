"use client";

import { twMerge } from "tailwind-merge";
import PasswordInput from "../inputs/PasswordInput";
import TextInput from "../inputs/TextInput";
import ColumnWrapper from "../wrappers/ColumnWrapper";

type LoginFormProps = {
  goToRegister: () => void;
  className?: string;
  title?: boolean;
  registerRef?: React.RefObject<HTMLDivElement>;
};

export default function LoginForm({
  goToRegister,
  className,
  title,
}: LoginFormProps) {
  return (
    <section id="login" className={twMerge("text-center", className)}>
      <form>
        {title && <h2 className="my-1 mb-2">Log in</h2>}
        <ColumnWrapper className="mx-auto w-[80%] gap-1 pb-1">
          <TextInput placeholder="username" className="w-full" required />
          <PasswordInput placeholder="password" className="w-full" required />
          <button>Login</button>
          <a>Forgot password?</a>
          <p>
            {"Don't have an account yet?"}{" "}
            <a
              className="border-spacing-1 cursor-pointer border-b-[0.5px]"
              onClick={() => goToRegister()}
            >
              Register
            </a>
          </p>
        </ColumnWrapper>
      </form>
    </section>
  );
}
