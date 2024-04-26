"use client";

import ColumnWrapper from "../../_components/wrappers/ColumnWrapper";
import Main from "../../_components/wrappers/PageMain";
import LoginForm from "../../_components/forms/LoginForm";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import RegisterForm from "@/app/_components/forms/RegisterForm";
import Loading from "./loading";
import FeedbackCard from "@/app/_components/FeedbackCard";

export default function Login() {
  const srv = useSearchParams().get("srv");
  const inv = useSearchParams().get("inv");

  const router = useRouter();

  const [login, setLogin] = useState(true);
  const [usernameAutofill, setUsernameAutofill] = useState("");
  const [success, setSuccess] = useState("");

  function setRedirectPath() {
    if (srv) return `/server/${srv}`;
    if (inv) return `/server/join/${inv}`;
    return "/";
  }

  const redirectPath = setRedirectPath();

  return (
    <Suspense fallback={<Loading />}>
      <Main className="content-center items-center justify-center text-center">
        <h1 className="text-accent-gradient">Welcome back!</h1>
        {srv && <p>Please log in or sign up to access the server.</p>}
        {inv && <p>Please log in or sign up to respond to the invitation.</p>}
        <ColumnWrapper>
          {login ? (
            <LoginForm
              usernameAutofill={usernameAutofill}
              goToRegister={() => setLogin(false)}
              redirectPath={redirectPath}
            />
          ) : (
            <RegisterForm
              setUsernameAutofill={setUsernameAutofill}
              goToLogin={() => {
                setSuccess(
                  "Your account has been registered. You can now log in.",
                );
                setLogin(true);
              }}
            />
          )}
          {success && <FeedbackCard type="success" message={success} />}
        </ColumnWrapper>
      </Main>
    </Suspense>
  );
}
