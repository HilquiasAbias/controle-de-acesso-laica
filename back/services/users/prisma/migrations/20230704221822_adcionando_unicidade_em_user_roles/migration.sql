/*
  Warnings:

  - A unique constraint covering the columns `[userId,role]` on the table `UserRoles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserRoles_userId_role_key" ON "UserRoles"("userId", "role");
