import getServerAuth from "@/actions/getServerAuth";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { auth } from "@/auth";
import {
  getServerConfig,
  getServerMembers,
} from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { redirect } from "next/navigation";
import MemberThumb from "./_components/MemberThumb";

export default async function RoleManagement({ params }: { params: Params }) {
  const id = params.serverId;

  const config = await getServerConfig(id);

  const session = await auth();

  if (!session) redirect("/welcome");

  const serverAuth = await getServerAuth(
    id,
    (session as ExtendedSession).userId,
  );

  if (!serverAuth) redirect("/server");
  const members = await getServerMembers(id);

  if (
    !config ||
    typeof config === "string" ||
    !members ||
    typeof members === "string"
  ) {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }

  const admin = members.filter((member) => member.role === "admin")[0];
  const mods = members.filter((member) => member.role === "moderator");
  const regulars = members.filter((member) => member.role === "member");

  return (
    <Main className="mx-4 min-h-[90vh] w-[98%] items-start">
      <h1>Members</h1>
      <MemberThumb
        serverAuth={serverAuth}
        member={admin}
        editable={serverAuth.role === "admin"}
      />
      {mods.length > 0 &&
        mods.map((mod) => (
          <MemberThumb
            serverAuth={serverAuth}
            key={mod.member_id}
            member={mod}
            editable={serverAuth.role === "admin"}
          />
        ))}

      {regulars.map((regular) => (
        <MemberThumb
          serverAuth={serverAuth}
          key={regular.member_id}
          member={regular}
          editable={
            serverAuth.role === "moderator" || serverAuth.role === "admin"
          }
        />
      ))}
    </Main>
  );
}
