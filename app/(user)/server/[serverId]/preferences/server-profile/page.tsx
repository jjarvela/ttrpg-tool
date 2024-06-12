import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { auth } from "@/auth";
import { getServerMember } from "@/prisma/services/serverService";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import errorHandler from "@/utils/errorHandler";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { redirect } from "next/navigation";
import ServerProfileForm from "./_components/ServerProfileForm";
import Icon from "@/app/_components/Icon";

export default async function ServerProfilePage({
  params,
}: {
  params: Params;
}) {
  const session = await auth();

  if (!session) {
    redirect("/welcome");
  }

  const user_id = (session as ExtendedSession).userId;
  const server_id = params.serverId;

  const element: JSX.Element = await errorHandler(
    async () => {
      const serverMemberData = await getServerMember(server_id, user_id, true);

      return (
        <ServerProfileForm
          memberData={serverMemberData}
          profile_image={
            <Icon
              filename={serverMemberData.user!.profile_image || ""}
              alt="profile image"
              className="absolute left-0 top-0"
            />
          }
          server_icon={
            serverMemberData.icon ? (
              <Icon
                filename={serverMemberData.icon}
                alt="profile image"
                className="absolute left-0 top-0"
              />
            ) : null
          }
        />
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return (
    <Main className="relative min-h-[90vh] w-full px-4 py-10">
      <Link
        href={`/server/${server_id}`}
        className="card-back absolute left-0 top-0 flex h-[2.4rem] w-full content-center items-center gap-2 px-4"
      >
        <MaterialSymbolsLightChevronLeftRounded className="flex-shrink-0 text-2xl" />
        <span>Return</span>
      </Link>
      {element}
    </Main>
  );
}
