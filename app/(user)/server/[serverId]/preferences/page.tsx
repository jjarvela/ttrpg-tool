import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { getServerConfig } from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ServerInvitationsList from "./_components/InvitationList";
import getServerAuth from "@/actions/getServerAuth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ServerSecurity from "./_components/Security";
import { Fragment } from "react";
import checkAuthMatch from "@/utils/checkServerAuthMatch";

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
