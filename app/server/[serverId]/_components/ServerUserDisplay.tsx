import ProfilePicture from "@/app/_components/ProfilePicture";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import { auth } from "@/auth";
import { getUserById } from "@/prisma/services/userService";
import MaterialSymbolsManufacturing from "@/public/icons/MaterialSymbolsManufacturing";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ServerUserDisplay() {
  const session = await auth();

  if (!session) return redirect("/welcome");

  const user = await getUserById((session as ExtendedSession).userId);

  if (!user || typeof user === "string") return <p>No user data</p>;
  return (
    <ColumnWrapper className="bg-color-dark w-full border-t-[1px] border-black50 px-1 py-2">
      <RowWrapper justify="w-full justify-between justify-items-between">
        <RowWrapper className="flex-grow w-[80%]">
          <ProfilePicture
            image={user.profile_image || undefined}
            width={30}
            isActive={false}
          />
          <Link href={`/`} className="overflow-hidden overflow-ellipsis flex-grow">{user.screen_name || user.username}</Link>
        </RowWrapper>
        <Link href={"/preferences"}>
          <MaterialSymbolsManufacturing />
        </Link>
      </RowWrapper>
    </ColumnWrapper>
  );
}
