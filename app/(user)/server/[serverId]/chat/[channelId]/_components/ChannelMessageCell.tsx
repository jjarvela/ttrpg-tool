import UserInfo from "@/app/_components/UserInfo";
import errorHandler from "@/utils/errorHandler";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getServerMember } from "@/prisma/services/serverService";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

type MessageCellProps = {
  server_id: string;
  sender_id: string;
  message: string;
  created_at: Date;
};

export default async function ChannelMessageCell({
  server_id,
  sender_id,
  message,
  created_at,
}: MessageCellProps) {
  const session = await auth();

  if (!session) {
    redirect("/welcome");
  }

  const element: JSX.Element | null = await errorHandler(
    async () => {
      const user = await getServerMember(server_id, sender_id, true);

      return (
        <UserInfo
          key={user.member_id}
          className="w-[max-content]"
          user={{
            ...user.user!,
            id: user.member_id,
            profile_image: user.icon || user.user!.profile_image,
            screen_name: user.nickname || user.user!.screen_name,
          }}
          width={40}
          self_id={(session as ExtendedSession).userId}
        />
      );
    },
    () => {
      return null;
    },
  );

  const time = created_at.toLocaleString().slice(0, -3);
  return (
    <div className="hover:bg-primary-soft w-full border-t p-2 dark:hover:bg-black50">
      <RowWrapper justify="justify-start justify-items-start">
        {element && element}
        <p className="text-sm">{time}</p>
      </RowWrapper>
      <div className="text-left">
        <p className="ms-10">{message}</p>
      </div>
    </div>
  );
}
