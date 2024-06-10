import RowWrapper from "../../../../_components/wrappers/RowWrapper";
import UserInfo from "@/app/_components/UserInfo";
import { getUserById } from "../../../../../prisma/services/userService";
import errorHandler from "@/utils/errorHandler";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type MessageCellProps = {
  sender_id: string;
  message: string;
  created_at: Date;
};

export default async function MessageCell({
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
      const userInfo = await getUserById(sender_id, {
        id: true,
        username: true,
        screen_name: true,
        profile_image: true,
      });

      return (
        <UserInfo
          key={userInfo.id}
          className="w-[max-content]"
          user={userInfo}
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
