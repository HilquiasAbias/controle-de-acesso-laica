/*
  Warnings:

  - You are about to drop the column `isPassed` on the `Log` table. All the data in the column will be lost.
  - Added the required column `successful` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "caronteId" INTEGER NOT NULL,
    "userId" INTEGER,
    "successful" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Log_caronteId_fkey" FOREIGN KEY ("caronteId") REFERENCES "Caronte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("caronteId", "createdAt", "id", "userId") SELECT "caronteId", "createdAt", "id", "userId" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
