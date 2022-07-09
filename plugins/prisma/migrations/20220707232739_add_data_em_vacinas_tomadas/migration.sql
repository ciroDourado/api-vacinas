/*
  Warnings:

  - Added the required column `data` to the `VacinasTomadas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `VacinasTomadas` ADD COLUMN `data` DATE NOT NULL;
