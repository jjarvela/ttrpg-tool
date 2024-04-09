"use client";

import Link from "next/link";
import Button from "../../_components/Button";
import PasswordInput from "../../_components/inputs/PasswordInput";
import RadioGroup from "../../_components/inputs/RadioGroup";
import TextAreaInput from "../../_components/inputs/TextAreaInput";
import TextInput from "../../_components/inputs/TextInput";
import ToggleInput from "../../_components/inputs/ToggleInput";
import ColumnWrapper from "../../_components/wrappers/ColumnWrapper";
import Main from "../../_components/wrappers/PageMain";
import RowWrapper from "../../_components/wrappers/RowWrapper";
import { useRef, useState, useTransition } from "react";
import FeedbackCard from "../../_components/FeedbackCard";
import createServer from "../../../actions/createServer";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateServer() {
  const [serverName, setServerName] = useState("");
  const [description, setDescription] = useState("");

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
    }
    if (formRef.current) {
      const isValid = formRef.current.checkValidity();
      if (!isValid) {
        formRef.current.reportValidity();
      } else {
        startTransition(async () => {
          const session = await getSession();
          const server = await createServer(
            (session as ExtendedSession).userId,
            {
              serverName,
              description,
              isProtected,
              password,
              explorePermission,
              searchPermission,
              settingsRightsHolders,
            },
          );
          if (!server || typeof server === "string") {
            setError(server || "Something went wrong!");
            return;
          }
          router.push(`/server/${server.id}`);
          router.refresh();
        });
      }
    }
  };

  return (
    <Main className="ml-8 ps-12 pt-2">
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
          <div className="flex h-24 w-24 rounded-full border-[3px] border-dashed border-black50"></div>

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
          <Button className="btn-primary">Create</Button>
          <Link href={"/"}>
            <Button className="btn-secondary">Cancel</Button>
          </Link>
        </RowWrapper>
      </form>
      {error !== "" && <FeedbackCard type="error" message={error} />}
    </Main>
  );
}
