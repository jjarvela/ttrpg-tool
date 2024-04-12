"use client";

import changeUserProfile from "@/actions/changeUserProfile";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import FileInput from "@/app/_components/inputs/FileInput";
import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightImageOutlineRounded from "@/public/icons/MaterialSymbolsLightImageOutlineRounded";
import postUpload from "@/utils/postUpload";
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
  person_description: string | null;
  person_status: string | null;
  profile_image: string | null;
};

export default function ProfileInfo({
  user,
  profile_image,
}: {
  user: user;
  profile_image: React.ReactNode;
}) {
  const [status, setStatus] = useState(user.person_status || "");
  const [about, setAbout] = useState(user.person_description || "");
  const [icon, setIcon] = useState<File | undefined>(undefined);
  const [removeIcon, setRemoveIcon] = useState(false);

  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleUpdateInfo = () => {
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
          const result = await changeUserProfile(user.id, {
            profile_image: filename,
            person_description: about,
            person_status: status,
          });
          if (result) setError(result.error);
          else router.refresh();
        });
      } else {
        const result = await changeUserProfile(user.id, {
          person_description: about,
          person_status: status,
        });
        if (result) setError(result.error);
        else router.refresh();
      }
    });
  };

  if (!user) return <div></div>;

  return (
    <ColumnWrapper mode="section" align="items-start content-start w-full">
      <h1>User Profile</h1>
      <RowWrapper
        breakPoint="md"
        justify="justify-between"
        className="w-full gap-2 md:gap-48"
      >
        <RowWrapper>
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
            {!icon && !removeIcon && user.profile_image && profile_image}
            <FileInput
              id="profile-icon"
              accept=".jpg, .png, .svg, .gif"
              labelElement={
                <MaterialSymbolsLightImageOutlineRounded className="text-2xl" />
              }
              onChange={(e) => {
                setIcon(e.target.files ? e.target.files[0] : undefined);
                setRemoveIcon(false);
              }}
              disabled={isPending}
            />
          </div>
          <Button
            className="btn-secondary"
            onClick={() => {
              setIcon(undefined);
              setRemoveIcon(true);
            }}
            disabled={isPending}
          >
            Remove profile image
          </Button>
        </RowWrapper>
        <ColumnWrapper className="flex-grow" align="content-start items-start">
          <h5>Status</h5>
          <TextAreaInput
            borderless
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            maxLength={50}
            className="ml-8 w-full bg-black25 md:w-[80%] dark:bg-black75"
            disabled={isPending}
          />
        </ColumnWrapper>
      </RowWrapper>
      <h5>About me</h5>
      <TextAreaInput
        borderless
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        maxLength={200}
        className="ml-8 w-full bg-black25 md:w-[50%] dark:bg-black75"
        disabled={isPending}
      />
      <Button
        className="btn-primary"
        onClick={() => handleUpdateInfo()}
        disabled={isPending}
      >
        Update profile
      </Button>
      {error !== "" && <FeedbackCard type="error" message={error} />}
    </ColumnWrapper>
  );
}
