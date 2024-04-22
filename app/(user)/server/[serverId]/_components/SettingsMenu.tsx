"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import MaterialSymbolsManufacturing from "@/public/icons/MaterialSymbolsManufacturing";
import { Fragment, useRef, useState } from "react";
import NewInvitationModal from "./NewInvitationModal";
import handleClickOutside from "@/utils/handleClickOutside";
import { useRouter } from "next/navigation";
import MaterialSymbolsLightLoginOutlineRounded from "@/public/icons/MaterialSymbolsLightLoginOutlineRounded";
import leaveServer from "@/actions/serverMemberManagement/leaveServer";
import ConfirmModal from "@/app/_components/ConfirmModal";

export default function ServerSettingsMenu({
  serverAuth,
  authMatch,
}: {
  serverAuth: ServerAuth;
  authMatch: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const newInvitationRef = useRef<HTMLDialogElement>(null);
  const confirmRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
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
            <ColumnWrapper
              align="items-start"
              className="cursor-pointer rounded-lg border-[1px] border-black50 bg-white p-2 dark:bg-black75"
            >
              <p
                className="w-[max-content]"
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
              <p
                className="w-[max-content]"
                onClick={() => {
                  router.push(
                    `/server/${serverAuth.server_id}/preferences/#invitations`,
                  );
                  setIsOpen(false);
                }}
              >
                Manage invitations
              </p>
              {authMatch && (
                <>
                  <p
                    className="w-[max-content]"
                    onClick={() => {
                      router.push(
                        `/server/${serverAuth.server_id}/preferences`,
                      );
                      setIsOpen(false);
                    }}
                  >
                    Manage preferences
                  </p>
                  <p
                    className="w-[max-content]"
                    onClick={() => {
                      router.push(
                        `/server/${serverAuth.server_id}/preferences/roles`,
                      );
                      setIsOpen(false);
                    }}
                  >
                    Manage roles
                  </p>{" "}
                </>
              )}
              <p
                className="flex content-center items-center gap-2 text-warning"
                onClick={() => confirmRef.current?.showModal()}
              >
                <span>Leave server</span>{" "}
                <MaterialSymbolsLightLoginOutlineRounded className="text-xl" />
              </p>
            </ColumnWrapper>
          </div>
        )}
      </div>
      <NewInvitationModal
        refObject={newInvitationRef}
        serverId={serverAuth.server_id}
      />
      <ConfirmModal
        refObject={confirmRef}
        onConfirm={async () => {
          await leaveServer(serverAuth.member_id, serverAuth.server_id);
          router.refresh();
        }}
        confirmText="Leave"
        confirmButtonClass="bg-warning"
      >
        <h5 className="mb-4">Are you sure you wish to leave this server?</h5>
        <p className="text-center">
          Servers with no remaining members will be automatically deleted.
        </p>
        {serverAuth.role === "admin" && (
          <p className="mb-4 max-w-[80%] text-center">
            Upon your leaving, another user will be automatically promoted to
            admin.
          </p>
        )}
      </ConfirmModal>
    </Fragment>
  );
}
