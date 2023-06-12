/*
  Warnings:

  - You are about to drop the `Bluetooth` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "mac" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Bluetooth";
PRAGMA foreign_keys=on;
