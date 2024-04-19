"use client";
import changeUserPrivacyPrefs from "@/actions/userManagement/changeUserPrivacyPrefs";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Checkbox from "@/app/_components/inputs/Checkbox";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightInfoOutlineRounded from "@/public/icons/MaterialSymbolsLightInfoOutlineRounded";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type user = {
  id: string;
  username: string;
  password_hash: string;
  email: string;
  emailVerified: Date | null;
  created_at: Date;
  screen_name: string | null;
  timezone: string | null;
  share_timezone: boolean | null;
  person_description: string | null;
  profile_image: string | null;
};

export default function PrivacyAndSafety({ user }: { user: user }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  return (
    <ColumnWrapper
      mode="section"
      id="privacy"
      align="content-start items-start"
    >
      <h1>Privacy and Safety</h1>
      <h3>Server defaults</h3>
      <Checkbox
        id="share-timezone"
        label="Share timezone"
        labelClass="text-lg"
        onByDefault={user.share_timezone || false}
        onCheck={(check) => {
          setSuccess(false);
          setError("");
          startTransition(async () => {
            const result = await changeUserPrivacyPrefs(user.id, {
              share_timezone: check,
            });
            if (result) setError(result.error);
            else {
              setSuccess(true);
              router.refresh();
            }
          });
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
      {error !== "" && <FeedbackCard type="error" message={error} />}
      {success && <FeedbackCard type="success" message="Preferences saved" />}
    </ColumnWrapper>
  );
}
