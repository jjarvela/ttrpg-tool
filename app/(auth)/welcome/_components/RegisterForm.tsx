"use client";

import PasswordInput from "../../../_components/inputs/PasswordInput";
import TextInput from "../../../_components/inputs/TextInput";
import ColumnWrapper from "../../../_components/wrappers/ColumnWrapper";

export default function RegisterForm() {
  return (
    <section id="register" className="bg-color-dark border-l border-black50">
      <form className="">
        <h2 className="mb-3 text-center">Sign up</h2>
        <ColumnWrapper>
          <TextInput type="email" placeholder="email" />
          <TextInput placeholder="username" />
          <PasswordInput placeholder="password" />
          <PasswordInput placeholder="confirm password" />
          <button>Join Now</button>
        </ColumnWrapper>
      </form>
    </section>
  );
}
