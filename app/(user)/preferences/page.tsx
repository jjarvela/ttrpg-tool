import { redirect } from "next/navigation";
import AccountInfo from "./_components/AccountInfo";
import { auth } from "../../../auth";
import { getUserById } from "../../../prisma/services/userService";
import FeedbackCard from "../../_components/FeedbackCard";
import Main from "../../_components/wrappers/PageMain";
import ProfileInfo from "./_components/ProfileInfo";
import Icon from "@/app/_components/Icon";

export default async function UserPreferences() {
  const session = await auth();

  if (!session) return redirect("/welcome");

  const user = await getUserById((session as ExtendedSession).userId);

  if (!user || typeof user === "string")
    return <FeedbackCard type="error" message="Something went wrong!" />;

  return (
    <Main className="p-4">
      <AccountInfo user={user} />
      <div className="mx-auto h-[1px] w-full bg-black50"></div>
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
      <div className="mx-auto h-[1px] w-full bg-black50"></div>
    </Main>
  );
}
