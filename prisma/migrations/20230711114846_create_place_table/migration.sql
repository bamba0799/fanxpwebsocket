/*
  Warnings:

  - You are about to alter the column `birthday` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[placeId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Player` ADD COLUMN `image` LONGTEXT NOT NULL,
    MODIFY `birthday` DATETIME NULL;

-- AlterTable
ALTER TABLE `Stadium` ADD COLUMN `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `placeId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserProfilePicture` MODIFY `image` LONGTEXT NULL;

-- CreateTable
CREATE TABLE `Place` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Ticket_placeId_key` ON `Ticket`(`placeId`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_placeId_fkey` FOREIGN KEY (`placeId`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
