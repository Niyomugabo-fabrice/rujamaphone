/*
  Warnings:

  - Changed the type of `brand` on the `Accessory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `storage` on the `Smartphone` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `brand` on the `Smartphone` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `brand` on the `Speaker` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Accessory" DROP COLUMN "brand",
ADD COLUMN     "brand" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Smartphone" DROP COLUMN "storage",
ADD COLUMN     "storage" TEXT NOT NULL,
DROP COLUMN "brand",
ADD COLUMN     "brand" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Speaker" DROP COLUMN "brand",
ADD COLUMN     "brand" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AccessoryBrand";

-- DropEnum
DROP TYPE "SmartphoneBrand";

-- DropEnum
DROP TYPE "SpeakerBrand";

-- DropEnum
DROP TYPE "StorageCapacity";

-- CreateIndex
CREATE INDEX "Accessory_brand_idx" ON "Accessory"("brand");

-- CreateIndex
CREATE INDEX "Accessory_brand_price_idx" ON "Accessory"("brand", "price");

-- CreateIndex
CREATE INDEX "Smartphone_brand_idx" ON "Smartphone"("brand");

-- CreateIndex
CREATE INDEX "Smartphone_brand_price_idx" ON "Smartphone"("brand", "price");

-- CreateIndex
CREATE INDEX "Speaker_brand_idx" ON "Speaker"("brand");

-- CreateIndex
CREATE INDEX "Speaker_brand_price_idx" ON "Speaker"("brand", "price");
