/*
  Warnings:

  - A unique constraint covering the columns `[server_name]` on the table `Server` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Made the column `protected` on table `ServerConfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `explorable` on table `ServerConfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `searchable` on table `ServerConfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `join_permission` on table `ServerConfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dm_permission` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ServerConfig" ALTER COLUMN "protected" SET NOT NULL,
ALTER COLUMN "explorable" SET NOT NULL,
ALTER COLUMN "searchable" SET NOT NULL,
ALTER COLUMN "join_permission" SET NOT NULL;

-- AlterTable
ALTER TABLE "ServerMember" ADD COLUMN     "share_timezone" BOOLEAN;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "dm_permission" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Server_server_name_key" ON "Server"("server_name");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
