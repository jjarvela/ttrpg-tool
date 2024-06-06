import Main from "../../_components/wrappers/PageMain";
import { auth } from "@/auth";
import errorHandler from "@/utils/errorHandler";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import UserThumb from "./_components/UserThumb";
import {
  getUserFriends,
  getUserPendingRequests,
} from "@/prisma/services/friendService";
import FriendOptionsElement from "./_components/FriendOptionsElement";
import FriendListNavWrapper from "./_components/friendListDisplay/FriendListNavWrapper";
import OnlineList from "./_components/friendListDisplay/OnlineList";
import AllList from "./_components/friendListDisplay/AllList";
import PendingRequestsList from "./_components/friendListDisplay/PendingRequestsList";

export default async function Home() {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const friendList = await getUserFriends(
        (session as ExtendedSession).userId,
      );

      const pending = await getUserPendingRequests(
        (session as ExtendedSession).userId,
      );

      if (friendList.length < 1) {
        return (
          <FriendListNavWrapper
            onlineList={<p>{"You haven't added any friends yet."}</p>}
            allList={<p>{"You haven't added any friends yet."}</p>}
            pendingList={<PendingRequestsList pending={pending} />}
          />
        );
      }

      const online = friendList.filter((person) => person.socket_id !== null);

      const offline = friendList.filter((person) => person.socket_id === null);

      return (
        <FriendListNavWrapper
          onlineList={<OnlineList users={online} />}
          allList={<AllList online={online} offline={offline} />}
          pendingList={<PendingRequestsList pending={pending} />}
        />
      );
    },
    (e) => {
      console.log(e);
      return <p className="text-warning">Something went wrong</p>;
    },
  );

  return (
    <Main className="w-full items-center justify-between pb-10">{element}</Main>
  );
}
