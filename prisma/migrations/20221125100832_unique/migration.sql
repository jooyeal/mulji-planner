/*
  Warnings:

  - A unique constraint covering the columns `[writer]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Schedule_writer_key" ON "Schedule"("writer");
