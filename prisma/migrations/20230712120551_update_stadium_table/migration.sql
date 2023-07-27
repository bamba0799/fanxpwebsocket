/*
  Warnings:

  - You are about to alter the column `birthday` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `category` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Player` MODIFY `birthday` DATETIME NULL;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `category`;

-- CreateTable
CREATE TABLE `SeatOfStadium` (
    `id` VARCHAR(191) NOT NULL,
    `seatNumber` INTEGER NOT NULL,
    `rowNumber` INTEGER NOT NULL,
    `stadiumId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SeatOfStadium` ADD CONSTRAINT `SeatOfStadium_stadiumId_fkey` FOREIGN KEY (`stadiumId`) REFERENCES `Stadium`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
