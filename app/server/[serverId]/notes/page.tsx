"use client";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { getServerData } from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Note from "./note";
import { DndContext } from "@dnd-kit/core";

export default function ServerNotes({ params }: { params: Params }) {
  const id = params.serverId;
  const server = getServerData(id);

  if (!server || typeof server === "string") {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }

  return (
    <DndContext>
      <Main className="mx-4">
        <h1>Hewwo</h1>
        <Note
          id="1"
          initialPosition={{ x: 300, y: 200 }}
          text={"JammaJuu"}
          onTextChange={function (id: string, text: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Main>
    </DndContext>
  );
}
