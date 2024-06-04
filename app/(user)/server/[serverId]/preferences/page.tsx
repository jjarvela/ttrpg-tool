import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import {
  getServerConfig,
  getServerData,
} from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ServerInvitationsList from "./_components/InvitationList";
import getServerAuth from "@/actions/getServerAuth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ServerSecurity from "./_components/Security";
import { Fragment } from "react";
import checkAuthMatch from "@/utils/checkServerAuthMatch";
import Discoverability from "./_components/Discoverability";
import ServerInfo from "./_components/ServerInfo";
import Icon from "@/app/_components/Icon";
import errorHandler from "@/utils/errorHandler";
import Link from "next/link";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import Divider from "@/app/_components/Divider";

export default async function ServerPreferences({
  params,
}: {
  params: Params;
}) {
  const id = params.serverId;
  const session = await auth();

  if (!session) redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const config = await getServerConfig(id);

      const serverAuth = await getServerAuth(
        id,
        (session as ExtendedSession).userId,
      );

      if (!serverAuth) redirect("/server");

      const info: unknown = await getServerData(id, {
        select: { server_name: true, description: true, image: true },
      });

      const authMatch = checkAuthMatch(serverAuth, config);

      return (
        <Fragment>
          <h2>Server information</h2>

          <ServerInfo
            info={info as ServerData}
            serverAuth={serverAuth}
            config={config}
            editable={authMatch}
            server_icon={
              <Icon
                filename={(info as ServerData).image || ""}
                alt="server icon"
                className="absolute left-0 top-0"
              />
            }
          />

          <Divider />

          {authMatch && (
            <Fragment>
              <h2 className="my-2">Security</h2>
              <ServerSecurity serverAuth={serverAuth} config={config} />{" "}
              <Divider />
            </Fragment>
          )}

          {authMatch && (
            <Fragment>
              <h2 className="my-2">Discoverability</h2>
              <Discoverability serverAuth={serverAuth} config={config} />{" "}
              <Divider />
            </Fragment>
          )}

          <h2 className="my-2">Invitations</h2>
          <ServerInvitationsList serverId={id} authMatch={authMatch} />
        </Fragment>
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return (
    <Main className="relative min-h-[90vh] w-full px-4 py-10">
      <Link
        href={`/server/${id}`}
        className="card-back absolute left-0 top-0 flex h-[2.4rem] w-full content-center items-center gap-2 px-4"
      >
        <MaterialSymbolsLightChevronLeftRounded className="flex-shrink-0 text-2xl" />
        <span>Return</span>
      </Link>
      {element}
    </Main>
  );
}
