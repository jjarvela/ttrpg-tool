"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import MaterialSymbolsManufacturing from "@/public/icons/MaterialSymbolsManufacturing";
import { Fragment, useRef, useState } from "react";
import NewInvitationModal from "./NewInvitationModal";
import handleClickOutside from "@/utils/handleClickOutside";

export default function ServerSettingsMenu({
  server_id,
}: {
  server_id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const newInvitationRef = useRef<HTMLDialogElement>(null);
  return (
    <Fragment>
      <div className="relative">
        <MaterialSymbolsManufacturing
          className="cursor-pointer"
          onClick={() => {
            document.addEventListener("mousedown", (event) =>
              handleClickOutside(menuRef, event, () => setIsOpen(false)),
            );
            setIsOpen((prev) => !prev);
          }}
        />
        {isOpen && (
          <div
            id="hitbox"
            className="absolute left-0 top-0 pl-4 pt-4"
            ref={menuRef}
          >
            <ColumnWrapper className="cursor-pointer rounded-lg border-[1px] border-black50 bg-white p-2 dark:bg-black75">
              <p
                onClick={() => {
                  newInvitationRef.current?.showModal();
                  setIsOpen(false);
                  document.addEventListener("mousedown", (event) =>
                    handleClickOutside(newInvitationRef, event, () =>
                      newInvitationRef.current?.close(),
                    ),
                  );
                }}
              >
                Create invitation
              </p>
              <p>Manage Invitations</p>
            </ColumnWrapper>
          </div>
        )}
      </div>
      <NewInvitationModal refObject={newInvitationRef} serverId={server_id} />
    </Fragment>
  );
}
