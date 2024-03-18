"use client";

import ColumnWrapper from "../../_components/wrappers/ColumnWrapper";
import Main from "../../_components/wrappers/PageMain";
import LoginForm from "../../_components/forms/LoginForm";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  return (
    <Main className="content-center items-center justify-center text-center">
      <h1 className="text-accent-gradient">Welcome back!</h1>
      <ColumnWrapper>
        <LoginForm
          goToRegister={() => {
            router.push("/welcome");
          }}
        />
      </ColumnWrapper>
    </Main>
  );
}
