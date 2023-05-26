/*
  Warnings:

  - A unique constraint covering the columns `[esp]` on the table `Caronte` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Caronte_esp_key" ON "Caronte"("esp");
