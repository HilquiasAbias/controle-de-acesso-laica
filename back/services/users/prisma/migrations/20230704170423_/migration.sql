/*
  Warnings:

  - Made the column `userId` on table `UserRoles` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserRoles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UserRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserRoles" ("active", "id", "role", "userId") SELECT "active", "id", "role", "userId" FROM "UserRoles";
DROP TABLE "UserRoles";
ALTER TABLE "new_UserRoles" RENAME TO "UserRoles";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
