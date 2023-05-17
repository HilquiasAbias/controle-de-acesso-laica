/*
  Warnings:

  - Added the required column `password` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trigger" (
    "ip" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "environmentId" INTEGER,
    CONSTRAINT "Trigger_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Trigger" ("environmentId", "ip") SELECT "environmentId", "ip" FROM "Trigger";
DROP TABLE "Trigger";
ALTER TABLE "new_Trigger" RENAME TO "Trigger";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
