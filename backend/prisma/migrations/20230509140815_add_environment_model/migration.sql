-- AlterTable
ALTER TABLE "User" ADD COLUMN     "envAdminsId" INTEGER,
ADD COLUMN     "envFreqId" INTEGER;

-- CreateTable
CREATE TABLE "Environment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Environment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Environment_name_key" ON "Environment"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_envAdminsId_fkey" FOREIGN KEY ("envAdminsId") REFERENCES "Environment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_envFreqId_fkey" FOREIGN KEY ("envFreqId") REFERENCES "Environment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
