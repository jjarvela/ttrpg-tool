"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import postUpload from "@/utils/postUpload";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

import { useState, useRef, useTransition } from "react";
import createServer from "@/actions/serverManagement/createServer";
import errorHandler from "@/utils/errorHandler";
import ServerInfoForm from "./ServerInfoForm";
import ServerConfigForm from "./ServerConfigForm";

export default function CreateServerForm({ userId }: { userId: string }) {
  const [serverData, setServerData] = useState({
    server_name: "",
    description: "",
  });
  const [configData, setConfigData] = useState<
    Omit<ServerConfig, "id" | "server_id">
  >({
    protected: false,
    explorable: false,
    searchable: false,
    join_permission: "invitation link",
    config_permission: "Admin",
    password_hash: null,
  });

  const [icon, setIcon] = useState<File | undefined>(undefined);

  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordsMatch) {
      setError("Password-protected is selected but passwords don't match.");
      return;
    }

    if (formRef.current) {
      const isValid = formRef.current.checkValidity();
      if (!isValid) {
        formRef.current.reportValidity();
        return;
      }
      startTransition(async () => {
        const error: string | null = await errorHandler(
          async () => {
            if (icon) {
              if (icon.size / 1024 / 1024 > 3) {
                return "Image file is too large. The limit is 3MB.";
              }

              postUpload(icon, async (res) => {
                if (res.data.message) {
                  return "Something went wrong!";
                }

                const filename = res.data.filename;

                const server = await createServer(userId, {
                  serverData: { ...serverData, image: filename },
                  configData,
                });

                router.push(`/server/${server.id}`);
                router.refresh();
              });
            } else {
              const server = await createServer(userId, {
                serverData,
                configData,
              });

              router.push(`/server/${server.id}`);
              router.refresh();
            }
          },
          () => {
            return "Something went wrong";
          },
        );

        if (error) {
          setError(error);
          return;
        }
      });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <ServerInfoForm
        serverData={serverData}
        setServerData={setServerData}
        icon={icon}
        setIcon={setIcon}
        isPending={isPending}
      />
      <ServerConfigForm
        configData={configData}
        setConfigData={setConfigData}
        setPasswordsMatch={setPasswordsMatch}
        isPending={isPending}
      />
      <RowWrapper justify="justify-between" className="my-8 w-[69%] pr-8">
        <Button className="btn-primary" disabled={isPending}>
          Create
        </Button>
        <Link href={"/"}>
          <Button className="btn-secondary" disabled={isPending}>
            Cancel
          </Button>
        </Link>
      </RowWrapper>
      {error !== "" && <FeedbackCard type="error" message={error} />}
    </form>
  );
}
