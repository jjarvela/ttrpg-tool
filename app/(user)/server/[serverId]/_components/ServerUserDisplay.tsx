import ProfilePicture from "@/app/_components/ProfilePicture";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import { auth } from "@/auth";
import { getUserById } from "@/prisma/services/userService";
import MaterialSymbolsManufacturing from "@/public/icons/MaterialSymbolsManufacturing";
import errorHandler from "@/utils/errorHandler";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ServerUserDisplay() {
  const session = await auth();

  if (!session) return redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const user = await getUserById((session as ExtendedSession).userId);
      return (
        <RowWrapper justify="w-full justify-between justify-items-between">
          <RowWrapper className="w-[80%] flex-grow">
            <ProfilePicture
              image={user.profile_image || undefined}
              width={30}
              isActive={false}
            />
            <Link
              href={`/`}
              className="flex-grow overflow-hidden overflow-ellipsis"
            >
              {user.screen_name || user.username}
            </Link>
          </RowWrapper>
          <Link href={"/preferences"}>
            <MaterialSymbolsManufacturing />
          </Link>
        </RowWrapper>
      );
    },
    () => {
      <p>No user data</p>;
    },
  );

  return (
    <ColumnWrapper className="bg-color-dark w-full border-t-[1px] border-black50 px-1 py-2">
      {element}
    </ColumnWrapper>
  );
}
