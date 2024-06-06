/*
  Warnings:

  - The primary key for the `Channel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `server_uid` on the `Channel` table. All the data in the column will be lost.
  - The primary key for the `Conversation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Conversation` table. All the data in the column will be lost.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sender_uid` on the `Message` table. All the data in the column will be lost.
  - The primary key for the `Server` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `Server` table. All the data in the column will be lost.
  - You are about to drop the column `member_uid` on the `ServerMember` table. All the data in the column will be lost.
  - You are about to drop the column `server_uid` on the `ServerMember` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[server_id,channel_name]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[conversation_id,participant_id]` on the table `ConversationParticipant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[server_id,member_id]` on the table `ServerMember` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `server_id` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `ServerMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `server_id` to the `ServerMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_server_uid_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_server_id_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "ConversationParticipant" DROP CONSTRAINT "ConversationParticipant_conversation_id_fkey";

-- DropForeignKey
ALTER TABLE "ConversationParticipant" DROP CONSTRAINT "ConversationParticipant_participant_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversation_uid_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sender_uid_fkey";

-- DropForeignKey
ALTER TABLE "ServerMember" DROP CONSTRAINT "ServerMember_member_uid_fkey";

-- DropForeignKey
ALTER TABLE "ServerMember" DROP CONSTRAINT "ServerMember_server_uid_fkey";

-- DropIndex
DROP INDEX "Channel_uid_key";

-- DropIndex
DROP INDEX "Conversation_uid_key";

-- DropIndex
DROP INDEX "Server_uid_key";

-- DropIndex
DROP INDEX "User_uid_key";

-- AlterTable
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_pkey",
DROP COLUMN "id",
DROP COLUMN "server_uid",
ADD COLUMN     "server_id" TEXT NOT NULL,
ADD CONSTRAINT "Channel_pkey" PRIMARY KEY ("uid");

-- AlterTable
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_pkey",
DROP COLUMN "id",
ALTER COLUMN "channel_id" DROP NOT NULL,
ADD CONSTRAINT "Conversation_pkey" PRIMARY KEY ("uid");

-- AlterTable
ALTER TABLE "ConversationParticipant" ALTER COLUMN "conversation_id" SET DATA TYPE TEXT,
ALTER COLUMN "participant_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
DROP COLUMN "id",
DROP COLUMN "sender_uid",
ADD COLUMN     "sender_id" TEXT NOT NULL,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("uid");

-- AlterTable
ALTER TABLE "Server" DROP CONSTRAINT "Server_pkey",
DROP COLUMN "uid",
ADD COLUMN     "image" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Server_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Server_id_seq";

-- AlterTable
ALTER TABLE "ServerMember" DROP COLUMN "member_uid",
DROP COLUMN "server_uid",
ADD COLUMN     "member_id" TEXT NOT NULL,
ADD COLUMN     "server_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "uid",
ADD COLUMN     "blocklist" TEXT[],
ADD COLUMN     "person_status" TEXT,
ADD COLUMN     "share_timezone" BOOLEAN,
ADD COLUMN     "socket_id" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Character";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" SERIAL NOT NULL,
    "requester_id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendList" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "FriendList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendInstance" (
    "id" SERIAL NOT NULL,
    "list_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "FriendInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerConfig" (
    "id" SERIAL NOT NULL,
    "server_id" TEXT NOT NULL,
    "config_permission" TEXT NOT NULL,
    "protected" BOOLEAN,
    "password_hash" TEXT,
    "explorable" BOOLEAN,
    "searchable" BOOLEAN,
    "join_permission" TEXT,

    CONSTRAINT "ServerConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "read_status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message_id" TEXT,
    "conversation_id" TEXT,
    "channel_id" TEXT,
    "server_id" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterBase" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "notes" TEXT,

    CONSTRAINT "CharacterBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerCharacterConfig" (
    "id" SERIAL NOT NULL,
    "server_id" TEXT NOT NULL,
    "enable_creation" BOOLEAN NOT NULL,
    "vitals_count" INTEGER NOT NULL,
    "vitals_names" TEXT[],
    "attributes_count" INTEGER NOT NULL,
    "attributes_names" TEXT[],
    "statics_count" INTEGER NOT NULL,
    "statics_names" TEXT[],

    CONSTRAINT "ServerCharacterConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerCharacter" (
    "id" TEXT NOT NULL,
    "base_id" TEXT NOT NULL,
    "server_id" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "experience" DOUBLE PRECISION NOT NULL,
    "experience_max" DOUBLE PRECISION NOT NULL,
    "vitals" DOUBLE PRECISION[],
    "vitals_max" DOUBLE PRECISION[],
    "attributes" DOUBLE PRECISION[],
    "statics" DOUBLE PRECISION[],
    "skills" TEXT NOT NULL,
    "items" TEXT NOT NULL,

    CONSTRAINT "ServerCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameBoard" (
    "id" TEXT NOT NULL,
    "server_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "background" TEXT,

    CONSTRAINT "GameBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePiece" (
    "id" TEXT NOT NULL,
    "board_id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "style" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "position_x" INTEGER NOT NULL,
    "position_y" INTEGER NOT NULL,

    CONSTRAINT "GamePiece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "server_id" TEXT NOT NULL,
    "expires" TEXT NOT NULL,
    "used_count" INTEGER NOT NULL,
    "max_uses" INTEGER,
    "protected" BOOLEAN NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,
    "positionX" INTEGER NOT NULL,
    "positionY" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "server_id" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "FriendList_owner_id_key" ON "FriendList"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "FriendInstance_list_id_user_id_key" ON "FriendInstance"("list_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ServerConfig_server_id_key" ON "ServerConfig"("server_id");

-- CreateIndex
CREATE UNIQUE INDEX "ServerCharacterConfig_server_id_key" ON "ServerCharacterConfig"("server_id");

-- CreateIndex
CREATE UNIQUE INDEX "ServerCharacter_base_id_server_id_key" ON "ServerCharacter"("base_id", "server_id");

-- CreateIndex
CREATE UNIQUE INDEX "GameBoard_server_id_name_key" ON "GameBoard"("server_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "GamePiece_board_id_character_id_key" ON "GamePiece"("board_id", "character_id");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_server_id_channel_name_key" ON "Channel"("server_id", "channel_name");

-- CreateIndex
CREATE UNIQUE INDEX "ConversationParticipant_conversation_id_participant_id_key" ON "ConversationParticipant"("conversation_id", "participant_id");

-- CreateIndex
CREATE UNIQUE INDEX "ServerMember_server_id_member_id_key" ON "ServerMember"("server_id", "member_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendList" ADD CONSTRAINT "FriendList_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendInstance" ADD CONSTRAINT "FriendInstance_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "FriendList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendInstance" ADD CONSTRAINT "FriendInstance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerConfig" ADD CONSTRAINT "ServerConfig_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerMember" ADD CONSTRAINT "ServerMember_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerMember" ADD CONSTRAINT "ServerMember_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversation_uid_fkey" FOREIGN KEY ("conversation_uid") REFERENCES "Conversation"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Message"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterBase" ADD CONSTRAINT "CharacterBase_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerCharacterConfig" ADD CONSTRAINT "ServerCharacterConfig_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerCharacter" ADD CONSTRAINT "ServerCharacter_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "CharacterBase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerCharacter" ADD CONSTRAINT "ServerCharacter_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameBoard" ADD CONSTRAINT "GameBoard_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePiece" ADD CONSTRAINT "GamePiece_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "GameBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePiece" ADD CONSTRAINT "GamePiece_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "ServerCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
