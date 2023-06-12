/*
  Warnings:

  - You are about to drop the `RFID` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RFID";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Rfid" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Rfid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Rfid_tag_key" ON "Rfid"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Rfid_userId_key" ON "Rfid"("userId");
