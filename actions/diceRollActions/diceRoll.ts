"use server";
import { sendMessage } from "@/socket"
import { DiceRoller } from "dice-roller-parser";
import type { RollBase } from "dice-roller-parser";
import addChatMessage from "../addChatMessage";
import { sendNotification } from "@/socket";
import { auth } from "@/auth";
import {
  getConversationByChannelId,
} from "@/prisma/services/conversationService";
import { getUserById } from "@/prisma/services/userService"; "@/prisma/services/userService"
import NextAuth from "next-auth";
import UserInfo from "@/app/_components/UserInfo";

export async function sendRollAnnouncement(rollObject: RollBase, channelId: string) {

  // Tarkista, että käyttäjä on kanavalla jäsenenä
  console.log("Server action");
  const userSession = await auth() as UserSession;
  const convId = await getConversationByChannelId(channelId);

  if (userSession.userId) {
    const userInfo = await getUserById(userSession.userId)
    await addChatMessage([userSession.userId, channelId], `User ${userInfo.screen_name} rolled ${rollObject.value}`)

  }

  //await sendMessage(user?.userId)
  console.log(rollObject.value);
  console.log(channelId);

  console.log(userSession);
  // Tarkista botti-tilin id

  // Lähetä viesti sendMessage funktiolla.


}
