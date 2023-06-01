/*
  Warnings:

  - Made the column `dayOfWeek` on table `AccessTime` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endTime` on table `AccessTime` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startTime` on table `AccessTime` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccessTime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "something" TEXT,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "AccessTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AccessTime" ("dayOfWeek", "endTime", "id", "startTime", "userId") SELECT "dayOfWeek", "endTime", "id", "startTime", "userId" FROM "AccessTime";
DROP TABLE "AccessTime";
ALTER TABLE "new_AccessTime" RENAME TO "AccessTime";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
