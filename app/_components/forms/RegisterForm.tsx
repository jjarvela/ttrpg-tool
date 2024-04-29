"use client";

import { twMerge } from "tailwind-merge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RegisterSchema } from "../../../validation-schemas";
import Button from "../Button";
import PasswordInput from "../inputs/PasswordInput";
import TextInput from "../inputs/TextInput";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import { useState, useTransition } from "react";
import registerAccount from "../../../actions/registerAccount";
import FeedbackCard from "../FeedbackCard";

type RegisterFormProps = {
  goToLogin: () => void;
  setUsernameAutofill?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  title?: boolean;
};
/**
 * Reusable registration form component.
 * Value validation via zodResolver.
 *
 * @param goToLogin - return type void function that can be used to either alter the state of the page or redirect to a different page
 * @param className - optional additional css classes for section-tag (twMerge - will overwrite component's default tailwind classes as needed)
 * @param title - optional title to be displayed in h2-tags on top of form
 */

export default function RegisterForm({
  goToLogin,
  setUsernameAutofill,
  className,
  title,
}: RegisterFormProps) {
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof RegisterSchema>
  >({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <section id="register" className={twMerge("text-center", className)}>
      <form
        onSubmit={handleSubmit((values: z.infer<typeof RegisterSchema>, e) => {
          e?.preventDefault();
          setError("");
          setSuccess("");
          startTransition(() => {
            registerAccount(values).then((data) => {
              if (data.error) {
                setError(data.error);
                return;
              }
              if (setUsernameAutofill) {
                setUsernameAutofill(data.username!);
                goToLogin();
              } else {
                setSuccess("Verification email sent.");
              }
            });
          });
        })}
      >
        {title && <h2 className="my-1 mb-2">Sign up</h2>}
        <ColumnWrapper className="mx-auto w-[80%] gap-1 pb-1">
          <TextInput
            type="email"
            placeholder="email"
            className="w-full"
            error={formState.errors.email?.message}
            {...register("email")}
            disabled={isPending}
          />
          <TextInput
            placeholder="username"
            className="w-full"
            error={formState.errors.username?.message}
            {...register("username")}
            disabled={isPending}
          />
          <PasswordInput
            placeholder="password"
            className="w-full"
            error={formState.errors.password?.message}
            {...register("password")}
            disabled={isPending}
          />
          <PasswordInput
            placeholder="confirm password"
            className="w-full"
            error={formState.errors.confirmPassword?.message}
            {...register("confirmPassword")}
            disabled={isPending}
          />
          <Button type="submit" className="btn-primary" disabled={isPending}>
            Join Now
          </Button>
          {error && <FeedbackCard type="error" message={error} />}
          {success && <FeedbackCard type="success" message={success} />}
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
