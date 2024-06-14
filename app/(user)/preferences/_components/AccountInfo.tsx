import { User } from "@prisma/client";
import changeUserInfo from "../../../../actions/userManagement/changeUserInfo";
import Button from "../../../_components/Button";
import ColumnWrapper from "../../../_components/wrappers/ColumnWrapper";
import SettingsTextInput from "./SettingsTextInput";
import SettingsTimezoneInput from "./SettingsTimezoneInput";
import errorHandler from "@/utils/errorHandler";

export default function AccountInfo({ user }: { user: User }) {
  return (
    <section id="account" className="w-[30em] lg:w-[80%]">
      <h1>Account Information</h1>
      <SettingsTextInput
        label="Screen name"
        defaultValue={user?.screen_name || ""}
        editInfo={async (value) => {
          "use server";
          if (!user) return;
          const error = await errorHandler(
            async () => {
              await changeUserInfo(user.id, { screen_name: value });
              return null;
            },
            (e) => {
              console.log(e);
              return (e as Error).message;
            },
          );
          return error;
        }}
      />
      <SettingsTextInput
        label="Username"
        defaultValue={user?.username || ""}
        editInfo={async (value) => {
          "use server";
          if (!user) return;
          const error = await errorHandler(
            async () => {
              await changeUserInfo(user.id, { username: value });
              return;
            },
            (e) => {
              return (e as Error).message;
            },
          );
          return error;
        }}
      />
      <SettingsTextInput
        label="Email"
        defaultValue={user?.email || ""}
        editInfo={async (value) => {
          "use server";
          if (!user) return;
          const error = await errorHandler(
            async () => {
              await changeUserInfo(user.id, { email: value });
              return;
            },
            (e) => {
              return (e as Error).message;
            },
          );
          return error;
        }}
      />
      <SettingsTimezoneInput
        timezone={user.timezone || undefined}
        editInfo={async (selected) => {
          "use server";
          if (!user) return;
          const error = await errorHandler(
            async () => {
              try {
                changeUserInfo(user.id, {
                  timezone: selected[0].value.toString(),
                });
                return;
              } catch (e) {
                throw new Error((e as Error).message);
              }
            },
            (e) => {
              return (e as Error).message;
            },
          );
          return error;
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
