/*
  Warnings:

  - Added the required column `esp` to the `Caronte` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Caronte" (
    "ip" TEXT NOT NULL PRIMARY KEY,
    "esp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "environmentId" INTEGER,
    CONSTRAINT "Caronte_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Caronte" ("environmentId", "ip", "password") SELECT "environmentId", "ip", "password" FROM "Caronte";
DROP TABLE "Caronte";
ALTER TABLE "new_Caronte" RENAME TO "Caronte";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
