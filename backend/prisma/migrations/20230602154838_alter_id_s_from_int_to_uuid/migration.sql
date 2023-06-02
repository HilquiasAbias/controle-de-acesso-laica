/*
  Warnings:

  - The primary key for the `Log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RRID` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AccessTime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Bluetooth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Caronte` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Environment` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caronteId" TEXT NOT NULL,
    "userId" TEXT,
    "errorReason" TEXT NOT NULL,
    "successful" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Log_caronteId_fkey" FOREIGN KEY ("caronteId") REFERENCES "Caronte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("caronteId", "createdAt", "errorReason", "id", "successful", "userId") SELECT "caronteId", "createdAt", "errorReason", "id", "successful", "userId" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "environmentAdminId" TEXT,
    "environmentFrequenterId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_environmentAdminId_fkey" FOREIGN KEY ("environmentAdminId") REFERENCES "Environment" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_environmentFrequenterId_fkey" FOREIGN KEY ("environmentFrequenterId") REFERENCES "Environment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "environmentAdminId", "environmentFrequenterId", "id", "name", "password", "registration", "role", "updatedAt") SELECT "createdAt", "environmentAdminId", "environmentFrequenterId", "id", "name", "password", "registration", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_registration_key" ON "User"("registration");
CREATE TABLE "new_RRID" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RRID_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RRID" ("createdAt", "id", "tag", "updatedAt", "userId") SELECT "createdAt", "id", "tag", "updatedAt", "userId" FROM "RRID";
DROP TABLE "RRID";
ALTER TABLE "new_RRID" RENAME TO "RRID";
CREATE UNIQUE INDEX "RRID_tag_key" ON "RRID"("tag");
CREATE UNIQUE INDEX "RRID_userId_key" ON "RRID"("userId");
CREATE TABLE "new_AccessTime" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "something" TEXT,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "AccessTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AccessTime" ("dayOfWeek", "endTime", "id", "something", "startTime", "userId") SELECT "dayOfWeek", "endTime", "id", "something", "startTime", "userId" FROM "AccessTime";
DROP TABLE "AccessTime";
ALTER TABLE "new_AccessTime" RENAME TO "AccessTime";
CREATE TABLE "new_Bluetooth" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mac" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Bluetooth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Bluetooth" ("createdAt", "id", "mac", "updatedAt", "userId") SELECT "createdAt", "id", "mac", "updatedAt", "userId" FROM "Bluetooth";
DROP TABLE "Bluetooth";
ALTER TABLE "new_Bluetooth" RENAME TO "Bluetooth";
CREATE UNIQUE INDEX "Bluetooth_mac_key" ON "Bluetooth"("mac");
CREATE UNIQUE INDEX "Bluetooth_userId_key" ON "Bluetooth"("userId");
CREATE TABLE "new_Caronte" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip" TEXT NOT NULL,
    "esp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "environmentId" TEXT,
    CONSTRAINT "Caronte_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Caronte" ("environmentId", "esp", "id", "ip", "password") SELECT "environmentId", "esp", "id", "ip", "password" FROM "Caronte";
DROP TABLE "Caronte";
ALTER TABLE "new_Caronte" RENAME TO "Caronte";
CREATE UNIQUE INDEX "Caronte_ip_key" ON "Caronte"("ip");
CREATE UNIQUE INDEX "Caronte_esp_key" ON "Caronte"("esp");
CREATE TABLE "new_Environment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Environment" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "Environment";
DROP TABLE "Environment";
ALTER TABLE "new_Environment" RENAME TO "Environment";
CREATE UNIQUE INDEX "Environment_name_key" ON "Environment"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
