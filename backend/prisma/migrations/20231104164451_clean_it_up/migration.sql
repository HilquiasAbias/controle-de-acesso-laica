/*
  Warnings:

  - You are about to drop the `AccessTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Caronte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Environment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rfid` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Caronte_esp_key";

-- DropIndex
DROP INDEX "Caronte_ip_key";

-- DropIndex
DROP INDEX "Environment_name_key";

-- DropIndex
DROP INDEX "Rfid_userId_key";

-- DropIndex
DROP INDEX "Rfid_tag_key";

-- DropIndex
DROP INDEX "User_registration_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AccessTime";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Caronte";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Environment";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rfid";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deviceMac" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Log" ("createdAt", "deviceMac", "id", "message", "topic", "type") SELECT "createdAt", "deviceMac", "id", "message", "topic", "type" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
