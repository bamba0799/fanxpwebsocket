/*
  Warnings:

  - You are about to alter the column `birthday` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `placeId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Place` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RowOfStadium` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Place` DROP FOREIGN KEY `Place_rowOfStadiumId_fkey`;

-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_placeId_fkey`;

-- AlterTable
ALTER TABLE `Player` MODIFY `birthday` DATETIME NULL;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `placeId`;

-- DropTable
DROP TABLE `Place`;

-- DropTable
DROP TABLE `RowOfStadium`;
