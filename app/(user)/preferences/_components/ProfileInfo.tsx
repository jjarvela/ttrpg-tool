"use client";

import changeUserProfile from "@/actions/userManagement/changeUserProfile";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import ProfilePicture from "@/app/_components/ProfilePicture";
import FileInput from "@/app/_components/inputs/FileInput";
import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightImageOutlineRounded from "@/public/icons/MaterialSymbolsLightImageOutlineRounded";
import errorHandler from "@/utils/errorHandler";
import postUpload from "@/utils/postUpload";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function ProfileInfo({
  user,
  profile_image,
}: {
  user: User;
  profile_image: React.ReactNode;
}) {
  const [profileInfo, setProfileInfo] = useState({
    person_description: user.person_description || "",
    person_status: user.person_status || "",
  });
  const [icon, setIcon] = useState<File | undefined>(undefined);
  const [removeIcon, setRemoveIcon] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleUpdateInfo = () => {
    setSuccess(false);
    setError("");
    startTransition(async () => {
      await errorHandler(
        async () => {
          if (!removeIcon && icon) {
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

              await handleUser(filename);
            });
          } else {
            await handleUser();
          }
          setSuccess(true);
          router.refresh();
        },
        (e) => {
          setError((e as Error).message);
        },
      );
    });
  };

  function setImageDisplay() {
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
    } else if (!removeIcon && user.profile_image) {
      return profile_image;
    }

    return null;
  }

  if (!user) return <div></div>;

  return (
    <ColumnWrapper mode="section" align="items-start content-start w-full">
      <h1>User Profile</h1>
      <RowWrapper
        breakPoint="md"
        justify="justify-between"
        className="w-full gap-2 md:gap-48"
      >
        <RowWrapper id="profile">
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[3px] border-dashed border-black50">
            {
              /*Icon display priority: icon remove selected => icon uploaded => user original icon */
              setImageDisplay()
            }
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
            value={profileInfo.person_status}
            onChange={(e) =>
              setProfileInfo({ ...profileInfo, person_status: e.target.value })
            }
            maxLength={50}
            className="ml-8 w-full bg-black25 md:w-[80%] dark:bg-black75"
            disabled={isPending}
          />
        </ColumnWrapper>
      </RowWrapper>
      <h5>About me</h5>
      <TextAreaInput
        borderless
        value={profileInfo.person_description}
        onChange={(e) =>
          setProfileInfo({ ...profileInfo, person_description: e.target.value })
        }
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
      {success && <FeedbackCard type="success" message="Profile saved" />}
    </ColumnWrapper>
  );

  async function handleUser(filename?: string) {
    if (filename) {
      try {
        const result = await changeUserProfile(user.id, {
          profile_image: filename,
          ...profileInfo,
        });
      } catch (e) {
        throw new Error((e as Error).message);
      }
    } else {
      try {
        const result = await changeUserProfile(user.id, profileInfo);
      } catch (e) {
        throw new Error((e as Error).message);
      }
    }
  }
}
