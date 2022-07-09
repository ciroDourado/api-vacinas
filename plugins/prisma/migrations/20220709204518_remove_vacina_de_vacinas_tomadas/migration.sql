/*
  Warnings:

  - The primary key for the `VacinasTomadas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `vacinaId` on the `VacinasTomadas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `VacinasTomadas` DROP FOREIGN KEY `VacinasTomadas_vacinaId_fkey`;

-- AlterTable
ALTER TABLE `VacinasTomadas` DROP PRIMARY KEY,
    DROP COLUMN `vacinaId`,
    ADD PRIMARY KEY (`vacinadoId`, `doseId`);
