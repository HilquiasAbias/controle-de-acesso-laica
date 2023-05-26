/*
  Warnings:

  - The primary key for the `Caronte` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `caronteIp` on the `Log` table. All the data in the column will be lost.
  - Added the required column `id` to the `Caronte` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caronteId` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Caronte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "esp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "environmentId" INTEGER,
    CONSTRAINT "Caronte_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Caronte" ("environmentId", "esp", "ip", "password") SELECT "environmentId", "esp", "ip", "password" FROM "Caronte";
DROP TABLE "Caronte";
ALTER TABLE "new_Caronte" RENAME TO "Caronte";
CREATE UNIQUE INDEX "Caronte_ip_key" ON "Caronte"("ip");
CREATE UNIQUE INDEX "Caronte_esp_key" ON "Caronte"("esp");
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "caronteId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isPassed" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Log_caronteId_fkey" FOREIGN KEY ("caronteId") REFERENCES "Caronte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("createdAt", "id", "isPassed", "userId") SELECT "createdAt", "id", "isPassed", "userId" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
