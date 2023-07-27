/*
  Warnings:

  - You are about to drop the column `quantity` on the `BuyTicket` table. All the data in the column will be lost.
  - You are about to alter the column `birthday` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `BuyTicket` DROP COLUMN `quantity`;

-- AlterTable
ALTER TABLE `Player` MODIFY `birthday` DATETIME NULL;
