import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { auth } from "../../../../../../auth";
import { redirect } from "next/navigation";
import ChatForm from "./_components/ChatForm";

export default async function FormLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) return redirect("/welcome");

  const userId = (session as ExtendedSession).userId;
  const channelId = params.channelId;

  return (
    <div className="flex w-full flex-grow flex-col">
      {children}
      <ChatForm userId={userId} channelId={channelId} />
    </div>
  );
}
