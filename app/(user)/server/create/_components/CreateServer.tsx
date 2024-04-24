"use client";

import Link from "next/link";

import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import postUpload from "@/utils/postUpload";
import FileInput from "@/app/_components/inputs/FileInput";
import MaterialSymbolsLightImageOutlineRounded from "@/public/icons/MaterialSymbolsLightImageOutlineRounded";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import PasswordInput from "@/app/_components/inputs/PasswordInput";
import RadioGroup from "@/app/_components/inputs/RadioGroup";
import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import TextInput from "@/app/_components/inputs/TextInput";
import ToggleInput from "@/app/_components/inputs/ToggleInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

import { useState, useRef, useTransition } from "react";
import createServer from "@/actions/createServer";

export default function CreateServer({ userId }: { userId: string }) {
  const [serverName, setServerName] = useState("");
  const [description, setDescription] = useState("");

  const [icon, setIcon] = useState<File | undefined>(undefined);
  const [isProtected, setIsProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [explorePermission, setExplorePermission] = useState(false);
  const [searchPermission, setSearchPermission] = useState(false);
  const [settingsRightsHolders, setSettingsRightsHolders] = useState("Admin");

  const passwordsMatch = isProtected ? password === confirmPassword : true;
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
      } else {
        startTransition(async () => {
          if (icon) {
            if (icon.size / 1024 / 1024 > 3) {
              setError("Image file is too large. The limit is 3MB.");
              return;
            }
            postUpload(icon, async (res) => {
              if (res.data.message) {
                setError("Something went wrong!");
                return;
              }
              const filename = res.data.filename;
              const server = await createServer(userId, {
                serverName,
                image: filename,
                description,
                isProtected,
                password,
                explorePermission,
                searchPermission,
                settingsRightsHolders,
              });
              if (!server || typeof server === "string") {
                setError(server || "Something went wrong!");
                return;
              }
              router.push(`/server/${server.id}`);
              router.refresh();
            });
          } else {
            const server = await createServer(userId, {
              serverName,
              description,
              isProtected,
              password,
              explorePermission,
              searchPermission,
              settingsRightsHolders,
            });
            if (!server || typeof server === "string") {
              setError(server || "Something went wrong!");
              return;
            }
            router.push(`/server/${server.id}`);
            router.refresh();
          }
        });
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <h1>Server Information</h1>
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
        />

        <h4 className="mt-5">Server icon</h4>
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[3px] border-dashed border-black50">
          {icon && (
            <img
              src={URL.createObjectURL(icon)}
              className="absolute left-0 top-0 z-0 min-h-[100%] min-w-[100%] object-cover"
              alt="icon preview"
            />
          )}
          <FileInput
            id="server-icon"
            accept=".jpg, .png, .svg, .gif"
            labelElement={
              <MaterialSymbolsLightImageOutlineRounded className="text-2xl" />
            }
            onChange={(e) =>
              setIcon(e.target.files ? e.target.files[0] : undefined)
            }
            disabled={isPending}
          />
        </div>

        <h4 className="mt-5">Server description</h4>
        <TextAreaInput
          borderless
          className="w-[80%] bg-black25 dark:bg-black75"
          maxLength={200}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isPending}
        />
      </ColumnWrapper>
      <h1>Server security</h1>
      <ColumnWrapper
        mode="section"
        id="server-security"
        align="content-start items-start"
        className="m-0 md:ml-6"
      >
        <ToggleInput
          id="password-protection"
          label="Password-protected server"
          labelClass="text-md-lg xl:text-lg"
          onToggle={(checked) => setIsProtected(checked)}
          disabled={isPending}
        />
        <small>Invitees must know the password to join</small>
        <PasswordInput
          className="self-start"
          placeholder="password"
          required={isProtected}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
        {!passwordsMatch && (
          <small className="text-warning">{"Passwords don't match"}</small>
        )}
        <PasswordInput
          className="self-start"
          placeholder="confirm password"
          required={isProtected}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isPending}
        />

        <h4 className="mt-5">Server visibility</h4>
        <ToggleInput
          id="server-explore"
          label="Include server in explore"
          checked={explorePermission}
          onToggle={(checked) => setExplorePermission(checked)}
          disabled={isPending}
        />
        <ToggleInput
          id="server-search"
          label="Include server in search results"
          checked={searchPermission}
          onToggle={(checked) => setSearchPermission(checked)}
          disabled={isPending}
        />

        <h4 className="mt-5">Who can customise server settings</h4>
        <RadioGroup
          groupName="settings-rights-holders"
          values={["Admin", "Admin and Moderators", "All members"]}
          selected={settingsRightsHolders}
          radioStyle={{
            radioBg: "bg-white",
            selectedColour: "fill-black75",
            radioSize: "1.85rem",
          }}
          className="w-[60%] flex-col gap-4 [&>*:nth-child(1)]:bg-[#5DA364] [&>*:nth-child(2)]:bg-[#B8AF5F] [&>*:nth-child(3)]:bg-[#9B3F3F]"
          labelStyle="w-full justify-between px-4 py-2 text-md-lg xl:text-lg"
          setSelected={(s) => {
            setSettingsRightsHolders(s!.toString());
          }}
        />
      </ColumnWrapper>
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
