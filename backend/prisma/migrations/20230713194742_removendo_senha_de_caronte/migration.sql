/*
  Warnings:

  - You are about to drop the column `caronteMac` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Caronte` table. All the data in the column will be lost.
  - Added the required column `deviceMac` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deviceMac" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Log_deviceMac_fkey" FOREIGN KEY ("deviceMac") REFERENCES "Caronte" ("esp") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("createdAt", "id", "message", "topic", "type") SELECT "createdAt", "id", "message", "topic", "type" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
CREATE TABLE "new_Caronte" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip" TEXT NOT NULL,
    "esp" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,
    CONSTRAINT "Caronte_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Caronte" ("environmentId", "esp", "id", "ip") SELECT "environmentId", "esp", "id", "ip" FROM "Caronte";
DROP TABLE "Caronte";
ALTER TABLE "new_Caronte" RENAME TO "Caronte";
CREATE UNIQUE INDEX "Caronte_ip_key" ON "Caronte"("ip");
CREATE UNIQUE INDEX "Caronte_esp_key" ON "Caronte"("esp");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
