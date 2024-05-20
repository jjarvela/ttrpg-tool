import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import {
  getServerData,
  getServerMembers,
} from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Clock from "./_components/Clock";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import ProfilePicture from "@/app/_components/ProfilePicture";
import UsernameHover from "./_components/UsernameHover";
import errorHandler from "@/utils/errorHandler";
import ServerNotFound from "../_components/ServerNotFound";

export default async function ServerWorldClock({ params }: { params: Params }) {
  const id = params.serverId;

  const serverError: JSX.Element | null = await errorHandler(
    async () => {
      const server = await getServerData(id);
      return null;
    },
    () => {
      return <ServerNotFound />;
    },
  );

  if (serverError) {
    return serverError;
  }

  const element: JSX.Element = await errorHandler(
    async () => {
      const members = await getServerMembers(id);

      const sortedMembers = memberSort(members);
      return (
        <RowWrapper breakPoint="sm" className="flex-wrap">
          {sortedMembers.map((item) => {
            return (
              <ColumnWrapper key={item.timezone}>
                <h5>{item.timezone}</h5>
                <Clock timezone={item.members[0].user!.timezone!} />
                <div className="flex items-center">
                  {item.members.map((member) => (
                    <UsernameHover
                      key={member.member_id}
                      username={
                        member.nickname ||
                        member.user!.screen_name ||
                        member.user!.username
                      }
                    >
                      <ProfilePicture
                        className="outline-6 mx-[-0.2rem] outline outline-white dark:outline-black85"
                        width={28}
                        image={member.icon || member.user!.profile_image || ""}
                        isActive={false}
                      />
                    </UsernameHover>
                  ))}
                </div>
              </ColumnWrapper>
            );
          })}
        </RowWrapper>
      );
    },
    () => {
      return (
        <h5>
          Something went wrong while loading the page. Please try refreshing.
        </h5>
      );
    },
  );

  return (
    <Main className="w-full px-4">
      <h1>World Clock</h1>
      {element}
    </Main>
  );

  function memberSort(members: ServerMember[]) {
    const timezones: { timezone: string; members: ServerMember[] }[] = [];
    members.forEach((member) => {
      if (member.user!.share_timezone) return;
      const time = new Intl.DateTimeFormat("fi", {
        dateStyle: "short",
        timeStyle: "long",
        timeZone: member.user!.timezone || "Australia/Sydney",
      })
        .format(new Date())
        .split(" ")
        .filter((item) => item.includes("UTC"))[0];
      console.log(time);
      const timezone = new Intl.DateTimeFormat("fi", {
        dateStyle: "short",
        timeStyle: "long",
        timeZone: member.user!.timezone || "Australia/Sydney",
      })
        .format(new Date())
        .split(" ")
        .filter((item) => item.includes("UTC"))[0];
      if (timezones.map((i) => i.timezone).indexOf(timezone) > -1) {
        const index = timezones.map((i) => i.timezone).indexOf(timezone);
        timezones[index].members.push(member);
      } else timezones.push({ timezone, members: [member] });
    });

    return timezones;
  }
}
