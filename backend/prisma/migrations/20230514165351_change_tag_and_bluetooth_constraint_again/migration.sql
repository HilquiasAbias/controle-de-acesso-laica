/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `Bluetooth` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[content]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bluetooth_content_key" ON "Bluetooth"("content");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_content_key" ON "Tag"("content");
