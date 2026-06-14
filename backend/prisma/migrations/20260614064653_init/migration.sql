/*
  Warnings:

  - Added the required column `img` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "img" TEXT NOT NULL;
