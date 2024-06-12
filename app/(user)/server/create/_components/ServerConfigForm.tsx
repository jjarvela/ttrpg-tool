import PasswordInput from "@/app/_components/inputs/PasswordInput";
import RadioGroup from "@/app/_components/inputs/RadioGroup";
import ToggleInput from "@/app/_components/inputs/ToggleInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { Fragment, useState } from "react";

type ServerConfigFormProps = {
  configData: Omit<ServerConfig, "id" | "server_id">;
  setConfigData: React.Dispatch<
    React.SetStateAction<Omit<ServerConfig, "id" | "server_id">>
  >;
  setPasswordsMatch: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
};
export default function ServerConfigForm({
  configData,
  setConfigData,
  setPasswordsMatch,
  isPending,
}: ServerConfigFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  setPasswordsMatch(configData.protected ? password === confirmPassword : true);

  return (
    <Fragment>
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
          onToggle={(checked) =>
            setConfigData({ ...configData, protected: checked })
          }
          disabled={isPending}
        />
        <small>Invitees must know the password to join</small>
        <PasswordInput
          className="self-start"
          placeholder="password"
          required={configData.protected}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
        {configData.protected && password !== confirmPassword && (
          <small className="text-warning">{"Passwords don't match"}</small>
        )}
        <PasswordInput
          className="self-start"
          placeholder="confirm password"
          required={configData.protected}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isPending}
        />

        <h4 className="mt-5">Server visibility</h4>
        <ToggleInput
          id="server-explore"
          label="Include server in explore"
          checked={configData.explorable}
          onToggle={(checked) =>
            setConfigData({ ...configData, explorable: checked })
          }
          disabled={isPending}
        />
        <ToggleInput
          id="server-search"
          label="Include server in search results"
          checked={configData.searchable}
          onToggle={(checked) =>
            setConfigData({ ...configData, searchable: checked })
          }
          disabled={isPending}
        />

        <h4 className="mt-5">Join permissions</h4>
        <small>
          Configure the rules for how non-members who find the server can join
        </small>
        <RadioGroup
          className="my-4 flex-col gap-2"
          groupName="join-permissions"
          labels={[
            "Only through direct link to an invitation",
            "If there is an available unlimited use invitation",
            "If there is any type of available invitation",
          ]}
          values={["invitation link", "unlimited invitation", "any invitation"]}
          selected={configData.join_permission}
          setSelected={(s) =>
            setConfigData({ ...configData, join_permission: s!.toString() })
          }
          disabled={isPending}
        />

        <h4 className="mt-5">Who can customise server settings</h4>
        <RadioGroup
          groupName="settings-rights-holders"
          values={["Admin", "Admin and Moderators", "All members"]}
          selected={configData.config_permission}
          radioStyle={{
            radioBg: "bg-white",
            selectedColour: "fill-black75",
            radioSize: "1.85rem",
          }}
          className="w-[60%] flex-col gap-4 [&>*:nth-child(1)]:bg-[#5DA364] [&>*:nth-child(2)]:bg-[#B8AF5F] [&>*:nth-child(3)]:bg-[#9B3F3F]"
          labelStyle="w-full justify-between px-4 py-2 text-md-lg xl:text-lg"
          setSelected={(s) => {
            setConfigData({ ...configData, config_permission: s!.toString() });
          }}
        />
      </ColumnWrapper>
    </Fragment>
  );
}
