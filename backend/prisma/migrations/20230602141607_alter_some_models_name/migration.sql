/*
  Warnings:

  - You are about to drop the `Mac` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `errorReason` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Mac_userId_key";

-- DropIndex
DROP INDEX "Mac_content_key";

-- DropIndex
DROP INDEX "Tag_userId_key";

-- DropIndex
DROP INDEX "Tag_content_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Mac";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RRID" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tag" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RRID_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bluetooth" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mac" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Bluetooth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "caronteId" INTEGER NOT NULL,
    "userId" INTEGER,
    "errorReason" TEXT NOT NULL,
    "successful" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Log_caronteId_fkey" FOREIGN KEY ("caronteId") REFERENCES "Caronte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("caronteId", "createdAt", "id", "successful", "userId") SELECT "caronteId", "createdAt", "id", "successful", "userId" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "RRID_tag_key" ON "RRID"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "RRID_userId_key" ON "RRID"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Bluetooth_mac_key" ON "Bluetooth"("mac");

-- CreateIndex
CREATE UNIQUE INDEX "Bluetooth_userId_key" ON "Bluetooth"("userId");
