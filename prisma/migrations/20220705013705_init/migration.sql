-- CreateTable
CREATE TABLE `Vacinado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(11) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Vacinado_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(8) NOT NULL,
    `complemento` VARCHAR(191) NULL,
    `numero` INTEGER NULL,
    `moradorId` INTEGER NOT NULL,

    UNIQUE INDEX `Endereco_moradorId_key`(`moradorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vacina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(300) NOT NULL,

    UNIQUE INDEX `Vacina_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dose` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(300) NOT NULL,

    UNIQUE INDEX `Dose_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DosesDasVacinas` (
    `vacinaId` INTEGER NOT NULL,
    `doseId` INTEGER NOT NULL,

    PRIMARY KEY (`vacinaId`, `doseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VacinasTomadas` (
    `vacinaId` INTEGER NOT NULL,
    `vacinadoId` INTEGER NOT NULL,
    `doseId` INTEGER NOT NULL,

    PRIMARY KEY (`vacinaId`, `vacinadoId`, `doseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_moradorId_fkey` FOREIGN KEY (`moradorId`) REFERENCES `Vacinado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DosesDasVacinas` ADD CONSTRAINT `DosesDasVacinas_vacinaId_fkey` FOREIGN KEY (`vacinaId`) REFERENCES `Vacina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DosesDasVacinas` ADD CONSTRAINT `DosesDasVacinas_doseId_fkey` FOREIGN KEY (`doseId`) REFERENCES `Dose`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VacinasTomadas` ADD CONSTRAINT `VacinasTomadas_vacinadoId_fkey` FOREIGN KEY (`vacinadoId`) REFERENCES `Vacinado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VacinasTomadas` ADD CONSTRAINT `VacinasTomadas_vacinaId_fkey` FOREIGN KEY (`vacinaId`) REFERENCES `Vacina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VacinasTomadas` ADD CONSTRAINT `VacinasTomadas_doseId_fkey` FOREIGN KEY (`doseId`) REFERENCES `Dose`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
