import ProfilePicture from "@/app/_components/ProfilePicture";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import { auth } from "@/auth";
import { getUserById } from "@/prisma/services/userService";
import MaterialSymbolsAutoAwesomeOutlineRounded from "@/public/icons/MaterialSymbolsAutoAwesomeOutlineRounded";
import MaterialSymbolsManufacturing from "@/public/icons/MaterialSymbolsManufacturing";
import errorHandler from "@/utils/errorHandler";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function ActiveUserDisplay() {
  const session = await auth();

  if (!session) return redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const user = await getUserById((session as ExtendedSession).userId);
      return (
        <Fragment>
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
          <RowWrapper
            justify="justify-start"
            className="w-full pl-1 text-black50"
          >
            {user.person_status && (
              <Fragment>
                <MaterialSymbolsAutoAwesomeOutlineRounded />
                <small>{user.person_status}</small>
              </Fragment>
            )}
          </RowWrapper>
        </Fragment>
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
