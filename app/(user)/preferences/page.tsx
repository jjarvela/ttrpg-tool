import { redirect } from "next/navigation";
import AccountInfo from "./_components/AccountInfo";
import { auth } from "../../../auth";
import { getUserById } from "../../../prisma/services/userService";
import FeedbackCard from "../../_components/FeedbackCard";
import Main from "../../_components/wrappers/PageMain";
import ProfileInfo from "./_components/ProfileInfo";
import Icon from "@/app/_components/Icon";
import PrivacyAndSafety from "./_components/PrivacyAndSafety";
import errorHandler from "@/utils/errorHandler";
import { Fragment } from "react";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import Link from "next/link";
import Divider from "@/app/_components/Divider";

export default async function UserPreferences() {
  const session = await auth();

  if (!session) return redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const user = await getUserById((session as ExtendedSession).userId);
      return (
        <Fragment>
          <AccountInfo user={user} />
          <Divider className="my-8" />
          <ProfileInfo
            user={user}
            profile_image={
              <Icon
                filename={user.profile_image || ""}
                alt="profile image"
                className="absolute left-0 top-0"
              />
            }
          />
          <Divider className="my-8" />
          <PrivacyAndSafety user={user} />
        </Fragment>
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong!" />;
    },
  );

  return (
    <Main className="relative px-4 py-10">
      <Link
        href={`/`}
        className="card-back absolute left-0 top-0 flex h-[2.4rem] w-full content-center items-center gap-2 px-4"
      >
        <MaterialSymbolsLightChevronLeftRounded className="flex-shrink-0 text-2xl" />
        <span>Return</span>
      </Link>
      {element}
    </Main>
  );
}
