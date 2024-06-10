"use client";

import changeServerMemberProfile from "@/actions/serverMemberManagement/changeServerMemberProfile";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Checkbox from "@/app/_components/inputs/Checkbox";
import FileInput from "@/app/_components/inputs/FileInput";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightImageOutlineRounded from "@/public/icons/MaterialSymbolsLightImageOutlineRounded";
import MaterialSymbolsLightInfoOutlineRounded from "@/public/icons/MaterialSymbolsLightInfoOutlineRounded";
import errorHandler from "@/utils/errorHandler";
import postUpload from "@/utils/postUpload";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function ServerProfileForm({
  memberData,
  server_icon,
  profile_image,
}: {
  memberData: ServerMember;
  server_icon: React.ReactNode | null;
  profile_image: React.ReactNode;
}) {
  const [nickname, setNickname] = useState(memberData.nickname || "");
  const [icon, setIcon] = useState<File | undefined>(undefined);
  const [removeIcon, setRemoveIcon] = useState(false);
  const [shareTimezone, setShareTimezone] = useState(memberData.share_timezone);

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
              const result = await changeServerMemberProfile(
                memberData.server_id,
                memberData.member_id,
                {
                  icon: filename,
                  nickname: nickname !== "" ? nickname : null,
                  share_timezone: shareTimezone,
                },
              );
              setSuccess(true);
              router.refresh();
            });
          } else {
            const result = await changeServerMemberProfile(
              memberData.server_id,
              memberData.member_id,
              {
                nickname: nickname !== "" ? nickname : null,
                icon: removeIcon ? null : undefined,
                share_timezone: shareTimezone,
              },
            );
            setSuccess(true);
            router.refresh();
          }
        },
        () => setError("Something went wrong."),
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
    } else if (!removeIcon && server_icon) {
      return server_icon;
    }

    return profile_image;
  }

  return (
    <ColumnWrapper mode="section" align="items-start content-start w-full">
      <h1>Server Profile</h1>
      <p className="mb-8">
        Here you can set yourself a custom nickname and icon that will only be
        displayed on this server.
      </p>
      <RowWrapper
        breakPoint="md"
        justify="justify-start"
        className="mb-8 w-full gap-4"
      >
        <RowWrapper id="server-profile">
          <div className="relative flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-dashed border-black50">
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
              setIcon(undefined);
              setRemoveIcon(true);
            }}
            disabled={isPending || (icon === undefined && !memberData.icon)}
          >
            Use default profile image
          </Button>
        </RowWrapper>
        <ColumnWrapper className="max-w-[70%] content-start items-start">
          <label htmlFor="nickname" className="flex-shrink-0 pr-2">
            <h5>Nickname</h5>
          </label>
          <TextInput
            id="nickname"
            placeholder={
              memberData.user!.screen_name || memberData.user!.username
            }
            className="flex-grow"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={isPending}
          />
        </ColumnWrapper>
      </RowWrapper>

      <h5>Server-specific preferences</h5>
      {
        <Checkbox
          id="share-timezone"
          label="Share timezone"
          labelClass="text-lg"
          className={shareTimezone === null ? "opacity-30" : undefined}
          onByDefault={memberData.share_timezone || false}
          onCheck={(check) => {
            setShareTimezone(check);
          }}
          disabled={isPending}
          endElement={
            <RowWrapper className="ml-4">
              <MaterialSymbolsLightInfoOutlineRounded />
              <span>
                Sharing of timezone will not share the locale associated with
                the timezone
              </span>
            </RowWrapper>
          }
        />
      }

      <Button
        className="btn-secondary mb-8"
        disabled={isPending || shareTimezone === null}
        onClick={() => setShareTimezone(null)}
      >
        Use global timezone sharing setting
      </Button>

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
}
