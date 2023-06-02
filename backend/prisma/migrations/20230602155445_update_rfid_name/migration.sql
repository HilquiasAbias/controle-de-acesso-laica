/*
  Warnings:

  - You are about to drop the `RRID` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RRID";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RFID" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RFID_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RFID_tag_key" ON "RFID"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "RFID_userId_key" ON "RFID"("userId");
