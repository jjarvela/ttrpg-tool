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
          <h1>Preferences</h1>
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

          {authMatch && (
            <Fragment>
              <h2>Security</h2>
              <ServerSecurity serverAuth={serverAuth} config={config} />{" "}
            </Fragment>
          )}

          {authMatch && (
            <Fragment>
              <h2>Discoverability</h2>
              <Discoverability serverAuth={serverAuth} config={config} />{" "}
            </Fragment>
          )}

          <h2>Invitations</h2>
          <ServerInvitationsList serverId={id} authMatch={authMatch} />
        </Fragment>
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return <Main className="min-h-[90vh] w-[98%] px-4">{element}</Main>;
}
