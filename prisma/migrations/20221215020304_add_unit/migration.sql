/*
  Warnings:

  - Added the required column `unit` to the `WishItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WishItem" ADD COLUMN     "unit" TEXT NOT NULL;
