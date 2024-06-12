"use client";
import changeUserPrivacyPrefs from "@/actions/userManagement/changeUserPrivacyPrefs";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Checkbox from "@/app/_components/inputs/Checkbox";
import RadioGroup from "@/app/_components/inputs/RadioGroup";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightInfoOutlineRounded from "@/public/icons/MaterialSymbolsLightInfoOutlineRounded";
import errorHandler from "@/utils/errorHandler";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function PrivacyAndSafety({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const [dm_permission, setDmPermission] = useState<
    string | number | readonly string[] | undefined
  >(user.dm_permission);
  const [share_timezone, setShareTimezone] = useState(user.share_timezone);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  return (
    <ColumnWrapper
      mode="section"
      id="privacy"
      align="content-start items-start"
      className="gap-4"
    >
      <h1>Privacy and Safety</h1>
      <h3>Allow direct messages from</h3>
      <RadioGroup
        groupName="dm_permission"
        className="items-between w-[90%] flex-col content-between lg:w-[40%] xl:w-[30%]"
        labelStyle="w-full"
        labels={[
          "Friends only",
          "People from servers I am a member of",
          "Anyone",
        ]}
        values={["friends", "servers", "anyone"]}
        selected={dm_permission}
        setSelected={setDmPermission}
      />
      <h3>Server defaults</h3>
      <Checkbox
        id="share-timezone"
        label="Share timezone"
        labelClass="text-lg"
        onByDefault={user.share_timezone || false}
        onCheck={(check) => {
          setShareTimezone(check);
        }}
        disabled={isPending}
        endElement={
          <RowWrapper className="ml-4">
            <MaterialSymbolsLightInfoOutlineRounded />
            <span>
              Sharing of timezone will not share the locale associated with the
              timezone
            </span>
          </RowWrapper>
        }
      />
      <Button
        className="btn-primary"
        onClick={() => {
          setSuccess(false);
          setError("");
          startTransition(async () => {
            await errorHandler(
              async () => {
                await changeUserPrivacyPrefs(user.id, {
                  dm_permission: dm_permission
                    ? dm_permission.toString()
                    : "friends",
                  share_timezone: share_timezone ? share_timezone : undefined,
                });
                setSuccess(true);
                router.refresh();
              },
              () => {
                setError("Something went wrong.");
              },
            );
          });
        }}
      >
        Save
      </Button>
      {error !== "" && <FeedbackCard type="error" message={error} />}
      {success && <FeedbackCard type="success" message="Preferences saved" />}
    </ColumnWrapper>
  );
}
