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

type member = {
  user: {
    username: string;
    screen_name: string | null;
    timezone: string | null;
    share_timezone: boolean | null;
    profile_image: string | null;
  };
} & {
  id: number;
  server_id: string;
  member_id: string;
  role: string;
  nickname: string | null;
  icon: string | null;
};
export default async function ServerWorldClock({ params }: { params: Params }) {
  const id = params.serverId;

  const server = await getServerData(id);

  if (!server || typeof server === "string") {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }
  const members = await getServerMembers(id);

  if (!members || typeof members === "string") {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }

  function memberSort(members: member[]) {
    const timezones: { timezone: string; members: member[] }[] = [];
    members.forEach((member) => {
      if (!member.user.share_timezone) return;
      const time = new Intl.DateTimeFormat("fi", {
        dateStyle: "short",
        timeStyle: "long",
        timeZone: member.user.timezone || "Australia/Sydney",
      })
        .format(new Date())
        .split(" ")
        .filter((item) => item.includes("UTC"))[0];
      console.log(time);
      const timezone = new Intl.DateTimeFormat("fi", {
        dateStyle: "short",
        timeStyle: "long",
        timeZone: member.user.timezone || "Australia/Sydney",
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

  const sortedMembers = memberSort(members);

  return (
    <Main className="w-full px-4">
      <h1>World Clock</h1>
      <RowWrapper breakPoint="sm" className="flex-wrap">
        {sortedMembers.map((item) => {
          return (
            <ColumnWrapper key={item.timezone}>
              <h5>{item.timezone}</h5>
              <Clock timezone={item.members[0].user.timezone!} />
              <div className="flex items-center">
                {item.members.map((member) => (
                  <UsernameHover
                    key={member.member_id}
                    username={
                      member.nickname ||
                      member.user.screen_name ||
                      member.user.username
                    }
                  >
                    <ProfilePicture
                      className="outline-6 mx-[-0.2rem] outline outline-white dark:outline-black85"
                      width={28}
                      image={member.icon || member.user.profile_image || ""}
                      isActive={false}
                    />
                  </UsernameHover>
                ))}
              </div>
            </ColumnWrapper>
          );
        })}
      </RowWrapper>
    </Main>
  );
}
