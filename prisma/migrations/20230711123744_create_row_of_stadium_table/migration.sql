/*
  Warnings:

  - You are about to alter the column `birthday` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[rowOfStadiumId]` on the table `Place` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rowOfStadiumId` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Place` ADD COLUMN `rowOfStadiumId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Player` MODIFY `birthday` DATETIME NULL;

-- CreateTable
CREATE TABLE `RowOfStadium` (
    `id` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Place_rowOfStadiumId_key` ON `Place`(`rowOfStadiumId`);

-- AddForeignKey
ALTER TABLE `Place` ADD CONSTRAINT `Place_rowOfStadiumId_fkey` FOREIGN KEY (`rowOfStadiumId`) REFERENCES `RowOfStadium`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
