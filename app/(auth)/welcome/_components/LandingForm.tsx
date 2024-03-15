"use client";

import { useState } from "react";
import LoginForm from "../../../_components/forms/LoginForm";
import RegisterForm from "../../../_components/forms/RegisterForm";

export default function LandingForm({ className }: { className?: string }) {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="bg-color-dark h-[25rem] w-full border-t-[1px] border-black50 sm:w-[20rem] sm:border-l-[1px] sm:border-t-0">
      {isLogin ? (
        <LoginForm goToRegister={() => setIsLogin(false)} title />
      ) : (
        <RegisterForm goToLogin={() => setIsLogin(true)} title />
      )}
    </div>
  );
}
