"use client";
import { twMerge } from "tailwind-merge";
import { useState, useTransition } from "react";
import PasswordInput from "../inputs/PasswordInput";
import TextInput from "../inputs/TextInput";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import Button from "../Button";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../../validation-schemas";
import login from "../../../actions/login";
import FeedbackCard from "../FeedbackCard";

type LoginFormProps = {
  goToRegister: () => void;
  className?: string;
  title?: boolean;
};
/**
 * Reusable login form component.
 * Value validation via zodResolver.
 *
 * @param goToRegister - return type void function that can be used to either alter the state of the page or redirect to a different page
 * @param className - optional additional css classes for section-tag (twMerge - will overwrite component's default tailwind classes as needed)
 * @param title - optional title to be displayed in h2-tags on top of form
 */

export default function LoginForm({
  goToRegister,
  className,
  title,
}: LoginFormProps) {
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof LoginSchema>
  >({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  return (
    <section id="login" className={twMerge("text-center", className)}>
      <form
        onSubmit={handleSubmit((values: z.infer<typeof LoginSchema>) => {
          setError("");
          startTransition(() => {
            login(values).then(
              (data) => data && data.error && setError(data.error),
            );
          });
        })}
      >
        {title && <h2 className="my-1 mb-2">Log in</h2>}
        <ColumnWrapper className="mx-auto w-[80%] gap-1 pb-1">
          <TextInput
            className="w-full"
            placeholder="username"
            error={formState.errors.username?.message}
            disabled={isPending}
            {...register("username")}
          />
          <PasswordInput
            className="w-full"
            placeholder="password"
            error={formState.errors.password?.message}
            disabled={isPending}
            {...register("password")}
          />
          <Button type="submit" className="btn-primary" disabled={isPending}>
            Login
          </Button>
          {error && <FeedbackCard type="error" message={error} />}
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
