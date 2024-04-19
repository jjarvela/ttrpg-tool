import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { getServerConfig } from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ServerInvitationsList from "./_components/InvitationList";
import getServerAuth from "@/actions/getServerAuth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ServerSecurity from "./_components/Security";
import config from "../../../../../tailwind.config";
import { Fragment } from "react";

export default async function ServerPreferences({
  params,
}: {
  params: Params;
}) {
  const id = params.serverId;

  const config = await getServerConfig(id);

  const session = await auth();

  if (!session) redirect("/welcome");

  const serverAuth = await getServerAuth(
    id,
    (session as ExtendedSession).userId,
  );

  if (!serverAuth) redirect("/server");

  if (!config || typeof config === "string") {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }

  const authMatch = checkAuthMatch(serverAuth, config);

  function checkAuthMatch(
    serverAuth: {
      id: number;
      server_id: string;
      member_id: string;
      role: string;
      nickname: string | null;
      icon: string | null;
    },
    config: {
      id: number;
      server_id: string;
      config_permission: string;
      protected: boolean | null;
      password_hash: string | null;
      explorable: boolean | null;
      searchable: boolean | null;
    },
  ) {
    const permissions = config.config_permission;
    if (permissions === "All members") return true;
    const role = serverAuth.role;
    if (permissions.toUpperCase().includes(role.toUpperCase())) return true;
    return false;
  }

  return (
    <Main className="mx-4 min-h-[90vh] w-[98%]">
      <h1>Preferences</h1>
      <h2>Invitations</h2>
      <ServerInvitationsList serverId={id} authMatch={authMatch} />
      {authMatch && (
        <Fragment>
          <h2>Security</h2>
          <ServerSecurity serverAuth={serverAuth} config={config} />{" "}
        </Fragment>
      )}
    </Main>
  );
}
