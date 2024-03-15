"use client";

import { useState } from "react";
import LoginForm from "../../../_components/forms/LoginForm";
import RegisterForm from "../../../_components/forms/RegisterForm";

export default function LandingForm() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="bg-color-dark h-[25rem] w-[20rem] border-l-[1px] border-black50">
      {isLogin ? (
        <LoginForm goToRegister={() => setIsLogin(false)} title />
      ) : (
        <RegisterForm goToLogin={() => setIsLogin(true)} title />
      )}
    </div>
  );
}
