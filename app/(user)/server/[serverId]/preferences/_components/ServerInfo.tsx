"use client";

import FileInput from "@/app/_components/inputs/FileInput";
import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import MaterialSymbolsLightImageOutlineRounded from "@/public/icons/MaterialSymbolsLightImageOutlineRounded";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import postUpload from "@/utils/postUpload";
import checkAuthMatch from "@/utils/checkServerAuthMatch";
import editServerInfo from "@/actions/serverManagement/editServerInfo";

export default function ServerInfo({
  info,
  serverAuth,
  config,
  editable,
  server_icon,
}: {
  info: {
    id: string;
    server_name: string;
    image: string | null;
    description: string | null;
  };
  serverAuth: ServerAuth;
  config: ServerConfig;
  editable: boolean;
  server_icon: React.ReactNode;
}) {
  const [serverName, setServerName] = useState(info.server_name);
  const [description, setDescription] = useState(info.description || "");
  const [icon, setIcon] = useState<File | undefined>(undefined);
  const [removeIcon, setRemoveIcon] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const handleUpdateInfo = () => {
    setSuccess(false);
    setError("");
    startTransition(async () => {
      if (icon) {
        if (icon.size / 1024 / 1024 > 3) {
          setError("Image file is too large. The limit is 3MB.");
          return;
        }
        const authMatch = await checkAuthMatch(serverAuth, config);
        if (!authMatch) {
          setError(
            "You don't have the required permissions to change this information.",
          );
          return;
        }
        postUpload(icon, async (res) => {
          if (res.data.message) {
            setError("Something went wrong!");
            return;
          }
          const filename = res.data.filename;
          const result = await editServerInfo(serverAuth.member_id, config, {
            image: filename,
            description,
            server_name: serverName,
          });
          if (typeof result === "string") setError(result);
          else {
            setSuccess(true);
            router.refresh();
          }
        });
      } else {
        const result = await editServerInfo(serverAuth.member_id, config, {
          description,
          server_name: serverName,
        });
        if (typeof result === "string") setError(result);
        else {
          setSuccess(true);
          router.refresh();
        }
      }
    });
  };

  return (
    <form ref={formRef}>
      <ColumnWrapper
        mode="section"
        id="server-information"
        align="content-start items-start"
        className="m-0 md:ml-6"
      >
        <TextInput
          className="self-start px-2 py-0 text-xl"
          placeholder="Server name"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          required
          endElement={<span className="text-warning">*</span>}
          disabled={isPending}
          readOnly={!editable}
        />

        <h4 className="mt-5">Server icon</h4>
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[3px] border-dashed border-black50">
          {
            /*Icon display priority: icon remove selected => icon uploaded => user original icon */
            !removeIcon && icon && (
              <img
                src={URL.createObjectURL(icon)}
                className="absolute left-0 top-0 z-0 min-h-[100%] min-w-[100%] object-cover"
                alt="icon preview"
              />
            )
          }
          {!icon && !removeIcon && info.image && server_icon}
          <FileInput
            id="server-icon"
            accept=".jpg, .png, .svg, .gif"
            labelElement={
              <MaterialSymbolsLightImageOutlineRounded className="text-2xl" />
            }
            onChange={(e) => {
              setIcon(e.target.files ? e.target.files[0] : undefined);
              setRemoveIcon(false);
            }}
            disabled={isPending}
            readOnly={!editable}
          />
        </div>
        {editable && (
          <Button
            className="btn-secondary mt-2"
            onClick={() => {
              setIcon(undefined);
              setRemoveIcon(true);
            }}
            disabled={isPending}
          >
            Remove profile image
          </Button>
        )}
        <h4 className="mt-5">Server description</h4>
        <TextAreaInput
          borderless
          className="w-[80%] bg-black25 dark:bg-black75"
          maxLength={200}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isPending}
          readOnly={!editable}
        />

        {editable && (
          <Button
            className="btn-primary my-8"
            onClick={() => handleUpdateInfo()}
            disabled={isPending}
          >
            Save
          </Button>
        )}
        {error !== "" && <FeedbackCard type="error" message={error} />}
        {success && <FeedbackCard type="success" message="Changes saved" />}
      </ColumnWrapper>
    </form>
  );
}
