-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rfid" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Rfid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rfid" ("active", "createdAt", "id", "tag", "updatedAt", "userId") SELECT "active", "createdAt", "id", "tag", "updatedAt", "userId" FROM "Rfid";
DROP TABLE "Rfid";
ALTER TABLE "new_Rfid" RENAME TO "Rfid";
CREATE UNIQUE INDEX "Rfid_tag_key" ON "Rfid"("tag");
CREATE UNIQUE INDEX "Rfid_userId_key" ON "Rfid"("userId");
CREATE TABLE "new_Device" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mac" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("active", "createdAt", "id", "mac", "updatedAt", "userId") SELECT "active", "createdAt", "id", "mac", "updatedAt", "userId" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE UNIQUE INDEX "Device_mac_key" ON "Device"("mac");
CREATE UNIQUE INDEX "Device_userId_key" ON "Device"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
