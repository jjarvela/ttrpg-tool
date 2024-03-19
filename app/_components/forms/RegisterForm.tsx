"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "../../../schemas";
import Button from "../Button";
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
  const {register, handleSubmit, formState} = useForm<z.infer<typeof RegisterSchema>>();
  
  return (
    <section id="register" className={twMerge("text-center", className)}>
      <form onSubmit={handleSubmit(() => {})}>
        {title && <h2 className="my-1 mb-2">Sign up</h2>}
        <ColumnWrapper className="mx-auto w-[80%] gap-1 pb-1">
          <TextInput type="email" placeholder="email" className="w-full" error={formState.errors.email?.message} {...register("email")}/>
          <TextInput placeholder="username" className="w-full" error={formState.errors.username?.message} {...register("username")}/>
          <PasswordInput placeholder="password" className="w-full" error={formState.errors.password?.message} {...register("password")}/>
          <PasswordInput placeholder="confirm password" className="w-full" error={formState.errors.confirmPassword?.message} {...register("confirmPassword")}/>
          <Button
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              console.log("Register button");
            }}
          >
            Join Now
          </Button>
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
