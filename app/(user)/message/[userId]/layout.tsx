import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import MessageForm from "../_components/MessageForm";

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
  const receiverId = params.userId;

  return (
    <div className="flex w-full flex-col overflow-y-hidden">
      <MessageForm userId={userId} receiverId={receiverId} />
      {children}
    </div>
  );
}
