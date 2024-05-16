import ColumnWrapper from "../../../../_components/wrappers/ColumnWrapper";
import RowWrapper from "../../../../_components/wrappers/RowWrapper";
import UserInfo from "@/app/_components/UserInfo";
import { getUserById } from "../../../../../prisma/services/userService";

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
  const userInfo = await getUserById(sender_id, {
    username: true,
    screen_name: true,
    profile_image: true,
  });
  if (userInfo && typeof userInfo !== "string") {
    const time = created_at.toLocaleString().slice(0, -3);
    return (
      <div className="hover:bg-primary-soft w-full border-t p-2 dark:hover:bg-black50">
        <RowWrapper justify="justify-start justify-items-start">
          <UserInfo
            key={userInfo.id}
            className="w-[max-content]"
            username={userInfo.username}
            width={40}
            image={userInfo.profile_image ? userInfo.profile_image : undefined}
            isActive={false}
            screen_name={userInfo.screen_name || undefined}
          />
          <p className="text-sm">{time}</p>
        </RowWrapper>
        <div className="text-left">
          <p className="ms-10">{message}</p>
        </div>
      </div>
    );
  }
}
