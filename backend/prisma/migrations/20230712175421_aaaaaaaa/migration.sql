/*
  Warnings:

  - You are about to drop the column `obolType` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `userRegistration` on the `Log` table. All the data in the column will be lost.
  - Added the required column `topic` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caronteMac" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Log_caronteMac_fkey" FOREIGN KEY ("caronteMac") REFERENCES "Caronte" ("esp") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("caronteMac", "createdAt", "id", "message", "type") SELECT "caronteMac", "createdAt", "id", "message", "type" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
