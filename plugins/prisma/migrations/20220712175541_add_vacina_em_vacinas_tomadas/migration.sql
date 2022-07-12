/*
  Warnings:

  - The primary key for the `VacinasTomadas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `vacinaId` to the `VacinasTomadas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `VacinasTomadas` DROP PRIMARY KEY,
    ADD COLUMN `vacinaId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`vacinadoId`, `vacinaId`, `doseId`);

-- AddForeignKey
ALTER TABLE `VacinasTomadas` ADD CONSTRAINT `VacinasTomadas_vacinaId_fkey` FOREIGN KEY (`vacinaId`) REFERENCES `Vacina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
