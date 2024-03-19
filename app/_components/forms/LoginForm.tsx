"use client";
import { twMerge } from "tailwind-merge";
import PasswordInput from "../inputs/PasswordInput";
import TextInput from "../inputs/TextInput";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import Button from "../Button";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "../../../schemas";
import { useEffect } from "react";

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
  const {register, handleSubmit, formState} = useForm<z.infer<typeof LoginSchema>>();

  return (
    <section id="login" className={twMerge("text-center", className)}>
      <form onSubmit={handleSubmit(() => {})}>
        {title && <h2 className="my-1 mb-2">Log in</h2>}
        <ColumnWrapper className="mx-auto w-[80%] gap-1 pb-1">
          <TextInput className="w-full" placeholder="username" error={formState.errors.username?.message} {...register("username")}/>
          <PasswordInput className="w-full" placeholder="password" error={formState.errors.password?.message} {...register("password")}/>
          <Button
            className="btn-primary"
          >
            Login
          </Button>
          <a>Forgot password?</a>
          <p>
            {"Don't have an account yet?"}{" "}
            <a
              className="border-spacing-1 cursor-pointer border-b-[0.5px]"
              onClick={goToRegister}
            >
              Register
            </a>
          </p>
        </ColumnWrapper>
      </form>
    </section>
  );
}
