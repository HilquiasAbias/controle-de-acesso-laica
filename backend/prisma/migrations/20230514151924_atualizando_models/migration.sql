/*
  Warnings:

  - You are about to drop the column `envAdminsId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `envFreqId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_envAdminsId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_envFreqId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "envAdminsId",
DROP COLUMN "envFreqId",
ADD COLUMN     "environmentAdminId" INTEGER,
ADD COLUMN     "environmentFrequenterId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_environmentAdminId_fkey" FOREIGN KEY ("environmentAdminId") REFERENCES "Environment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_environmentFrequenterId_fkey" FOREIGN KEY ("environmentFrequenterId") REFERENCES "Environment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
