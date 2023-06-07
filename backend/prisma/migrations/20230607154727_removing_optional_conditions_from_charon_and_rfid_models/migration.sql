/*
  Warnings:

  - You are about to drop the column `something` on the `AccessTime` table. All the data in the column will be lost.
  - Made the column `userId` on table `Rfid` required. This step will fail if there are existing NULL values in that column.
  - Made the column `environmentId` on table `Caronte` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rfid" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Rfid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rfid" ("createdAt", "id", "tag", "updatedAt", "userId") SELECT "createdAt", "id", "tag", "updatedAt", "userId" FROM "Rfid";
DROP TABLE "Rfid";
ALTER TABLE "new_Rfid" RENAME TO "Rfid";
CREATE UNIQUE INDEX "Rfid_tag_key" ON "Rfid"("tag");
CREATE UNIQUE INDEX "Rfid_userId_key" ON "Rfid"("userId");
CREATE TABLE "new_Caronte" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip" TEXT NOT NULL,
    "esp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,
    CONSTRAINT "Caronte_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Caronte" ("environmentId", "esp", "id", "ip", "password") SELECT "environmentId", "esp", "id", "ip", "password" FROM "Caronte";
DROP TABLE "Caronte";
ALTER TABLE "new_Caronte" RENAME TO "Caronte";
CREATE UNIQUE INDEX "Caronte_ip_key" ON "Caronte"("ip");
CREATE UNIQUE INDEX "Caronte_esp_key" ON "Caronte"("esp");
CREATE TABLE "new_AccessTime" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "AccessTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AccessTime" ("dayOfWeek", "endTime", "id", "startTime", "userId") SELECT "dayOfWeek", "endTime", "id", "startTime", "userId" FROM "AccessTime";
DROP TABLE "AccessTime";
ALTER TABLE "new_AccessTime" RENAME TO "AccessTime";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
