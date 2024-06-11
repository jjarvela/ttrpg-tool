import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import MessageForm from "../_components/MessageForm";
import { getUserPrivacyPref, isBlocked } from "@/prisma/services/userService";
import errorHandler from "@/utils/errorHandler";
import MaterialSymbolsLightInfoOutlineRounded from "@/public/icons/MaterialSymbolsLightInfoOutlineRounded";
import { isFriend } from "@/prisma/services/friendService";
import { Fragment } from "react";
import { getUserMutualServers } from "@/prisma/services/serverService";
import { getConversationByParticipants } from "@/prisma/services/conversationService";

export default async function FormLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) return redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const userId = (session as ExtendedSession).userId;

      const receiverId = params.userId;

      const senderBlocked = await isBlocked(receiverId, userId);

      if (senderBlocked) {
        return (
          <p>
            <MaterialSymbolsLightInfoOutlineRounded /> This user has restricted
            who can message them.
          </p>
        );
      }

      const recipientBlocked = await isBlocked(userId, receiverId);

      if (recipientBlocked) {
        return (
          <p>
            <MaterialSymbolsLightInfoOutlineRounded /> You have blocked this
            user, so you are unable to message them.
          </p>
        );
      }

      const conversation = await getConversationByParticipants(
        userId,
        receiverId,
      );

      if (conversation) {
        return (
          <Fragment>
            {children}
            <MessageForm userId={userId} receiverId={receiverId} />
          </Fragment>
        );
      }

      const recipientSettings = await getUserPrivacyPref(receiverId);

      if (recipientSettings.dm_permission === "anyone") {
        return (
          <Fragment>
            {children}
            <MessageForm userId={userId} receiverId={receiverId} />
          </Fragment>
        );
      }

      const friends = await isFriend(userId, receiverId);

      if (recipientSettings.dm_permission === "friends" && friends) {
        return (
          <Fragment>
            {children}
            <MessageForm userId={userId} receiverId={receiverId} />
          </Fragment>
        );
      }

      const serverMutuals = await getUserMutualServers(userId, receiverId);

      if (
        recipientSettings.dm_permission === "servers" &&
        serverMutuals.length > 0
      ) {
        return (
          <Fragment>
            {children}
            <MessageForm userId={userId} receiverId={receiverId} />
          </Fragment>
        );
      }

      return (
        <p>
          <MaterialSymbolsLightInfoOutlineRounded /> This user has restricted
          who can message them.
        </p>
      );
    },
    () => <p>Something went wrong. Please refresh the page.</p>,
  );

  return (
    <div className="flex w-full flex-grow flex-col justify-end overflow-hidden">
      {element}
    </div>
  );
}
