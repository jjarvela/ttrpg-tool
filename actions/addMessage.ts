"use server";
import { getConversationByParticipants } from "../prisma/services/conversationService";

export default async function addMessage(formData: FormData) {
  const message = formData.get("message");
  const conversation = getConversationByParticipants(
    "clu2dnxk00000bge1km91yrw7",
    "clu2dnxkt0001bge1b07xcqoc",
  );
  console.log(message);
}
