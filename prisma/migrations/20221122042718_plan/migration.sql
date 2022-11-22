/*
  Warnings:

  - Added the required column `budget` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "budget" INTEGER NOT NULL,
ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
