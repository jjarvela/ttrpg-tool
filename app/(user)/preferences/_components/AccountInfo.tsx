import changeUserInfo from "../../../../actions/userManagement/changeUserInfo";
import Button from "../../../_components/Button";
import ColumnWrapper from "../../../_components/wrappers/ColumnWrapper";
import SettingsTextInput from "./SettingsTextInput";
import SettingsTimezoneInput from "./SettingsTimezoneInput";

type user = {
  id: string;
  username: string;
  password_hash: string;
  email: string;
  emailVerified: Date | null;
  created_at: Date;
  screen_name: string | null;
  timezone: string | null;
  person_description: string | null;
  profile_image: string | null;
};

export default function AccountInfo({ user }: { user: user }) {
  return (
    <section id="account" className="w-[30em] lg:w-[80%]">
      <h1>Account Information</h1>
      <SettingsTextInput
        label="Screen name"
        defaultValue={user?.screen_name || ""}
        editInfo={async (value) => {
          "use server";
          if (!user) return;
          const result = await changeUserInfo(user.id, { screen_name: value });
          if (result?.error) return result.error;
          return;
        }}
      />
      <SettingsTextInput
        label="Username"
        defaultValue={user?.username || ""}
        editInfo={async (value) => {
          "use server";
          if (!user) return;
          const result = await changeUserInfo(user.id, { username: value });
          if (result?.error) return result.error;
          return;
        }}
      />
      <SettingsTextInput
        label="Email"
        defaultValue={user?.email || ""}
        editInfo={async (value) => {
          "use server";
          if (!user) return;
          const result = await changeUserInfo(user.id, { email: value });
          if (result?.error) return result.error;
          return;
        }}
      />
      <SettingsTimezoneInput
        timezone={user.timezone || undefined}
        editInfo={async (selected) => {
          "use server";
          if (!user) return;
          const result = await changeUserInfo(user.id, {
            timezone: selected[0].value.toString(),
          });
          if (result?.error) return result.error;
          return;
        }}
      />

      <ColumnWrapper align="items-start" className="mb-2">
        <h5>Forgot password?</h5>
        <Button className="btn-secondary">Reset password</Button>
      </ColumnWrapper>
      <ColumnWrapper align="items-start" className="mb-2">
        <h5>Danger zone</h5>
        <Button className="btn-secondary border-none bg-warning dark:text-white">
          Delete Account
        </Button>
      </ColumnWrapper>
    </section>
  );
}
