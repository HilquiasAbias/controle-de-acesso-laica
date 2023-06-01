/*
  Warnings:

  - You are about to drop the column `something` on the `AccessTime` table. All the data in the column will be lost.
  - Made the column `userId` on table `AccessTime` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccessTime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dayOfWeek" TEXT,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "AccessTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AccessTime" ("dayOfWeek", "endTime", "id", "startTime", "userId") SELECT "dayOfWeek", "endTime", "id", "startTime", "userId" FROM "AccessTime";
DROP TABLE "AccessTime";
ALTER TABLE "new_AccessTime" RENAME TO "AccessTime";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
