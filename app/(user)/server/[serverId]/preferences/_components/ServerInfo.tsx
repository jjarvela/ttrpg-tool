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
import Icon from "../../(home)/_components/ClientIcon";

export default function ServerInfo({
  info,
  serverAuth,
  config,
  editable,
  isPending,
  startTransition,
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
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}) {
  const [serverData, setServerData] = useState({
    server_name: info.server_name,
    description: info.description,
    image: info.image,
  });
  const [icon, setIcon] = useState<File | undefined>(undefined);
  const [removeIcon, setRemoveIcon] = useState(false);

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
        const authMatch = checkAuthMatch(serverAuth, config);
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
          try {
            const result = await editServerInfo(serverAuth.member_id, config, {
              ...serverData,
              image: filename,
            });
            setSuccess(true);
            router.refresh();
          } catch (e) {
            setError((e as Error).message);
            return;
          }
        });
      } else {
        try {
          const result = await editServerInfo(serverAuth.member_id, config, {
            ...serverData,
            image: removeIcon ? null : undefined,
          });
          setSuccess(true);
          router.refresh();
        } catch (e) {
          setError((e as Error).message);
          return;
        }
      }
    });
  };

  function setImageDisplay() {
    console.log(removeIcon);

    if (!removeIcon && icon) {
      const url = URL.createObjectURL(icon);
      return (
        <img
          src={url}
          className="absolute left-0 top-0 z-0 min-h-[100%] min-w-[100%] object-cover"
          alt="icon preview"
          onDrop={() => URL.revokeObjectURL(url)}
        />
      );
    } else if (!removeIcon && info.image) {
      return (
        <Icon
          filename={serverData.image || ""}
          alt="server icon"
          className="absolute left-0 top-0"
        />
      );
    }

    return null;
  }

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
          value={serverData.server_name}
          onChange={(e) =>
            setServerData({ ...serverData, server_name: e.target.value })
          }
          required
          endElement={<span className="text-warning">*</span>}
          disabled={isPending}
          readOnly={!editable}
        />

        <h4 className="mt-5">Server icon</h4>
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[3px] border-dashed border-black50">
          {
            /*Icon display priority: icon remove selected => icon uploaded => user original icon */
            setImageDisplay()
          }
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
            onClick={(e) => {
              e.preventDefault();
              setRemoveIcon(true);
            }}
            disabled={isPending}
          >
            Remove icon
          </Button>
        )}
        <h4 className="mt-5">Server description</h4>
        <TextAreaInput
          borderless
          className="w-[80%] bg-black25 dark:bg-black75"
          maxLength={200}
          value={serverData.description || ""}
          onChange={(e) =>
            setServerData({ ...serverData, description: e.target.value })
          }
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
