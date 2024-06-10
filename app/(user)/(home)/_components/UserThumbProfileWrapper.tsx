"use client";

import UserProfileModal from "@/app/_components/UserProfileModal";
import { Fragment, useRef } from "react";

export default function UserThumbProfileWrapper({
  user_id,
  optionsElement,
  children,
}: {
  user_id: string;
  optionsElement: React.ReactNode;
  children: React.ReactNode;
}) {
  const profileRef = useRef<HTMLDialogElement | null>(null);

  return (
    <Fragment>
      <div
        className="w-full cursor-pointer"
        onClick={() => profileRef.current?.showModal()}
      >
        {children}
      </div>
      <UserProfileModal
        refObject={profileRef}
        user_id={user_id}
        optionsElement={optionsElement}
      />
    </Fragment>
  );
}
