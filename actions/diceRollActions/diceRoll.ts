"use server";
import { DiceRoller } from "dice-roller-parser";
import type { RollBase } from "dice-roller-parser";
import addChatMessage from "../addChatMessage";
import { cookies } from 'next/headers';
import { sendNotification } from "@/socket";
import { auth } from "@/auth";
import {
  getConversationByChannelId,
} from "@/prisma/services/conversationService";
import { getUserById } from "@/prisma/services/userService"; "@/prisma/services/userService"
import { revalidatePath } from 'next/cache'
// import NextAuth from "next-auth";

export interface RollResult extends RollBase {
  dice: [{ value: number }]
}
export async function sendRollAnnouncement(rollObject: RollResult, channelId: string, serverId: string) {



  const userSession = await auth() as UserSession
  const convId = await getConversationByChannelId(channelId)

  if (userSession.userId) {
    const userInfo = await getUserById(userSession.userId)
    const diceSet = rollObject.dice.map((dice) => dice.value)
    const screenName = userInfo.screen_name === null ? userInfo.username : userInfo.screen_name
    await addChatMessage([userSession.userId, channelId], `User ${screenName} rolled ${diceSet.toString()} = ${rollObject.value}`)
    revalidatePath(`/server/[serverId]/chat/${channelId}`, "layout")
  }


}
