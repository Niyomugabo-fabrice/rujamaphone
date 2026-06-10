/*
  Warnings:

  - The values [TABLET,LAPTOP] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `brandId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('SMARTPHONE', 'SPEAKER', 'ACCESSORY');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "public"."Category_old";
COMMIT;

-- DropIndex
DROP INDEX "Product_brandId_idx";

-- DropIndex
DROP INDEX "Product_categoryId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brandId",
DROP COLUMN "categoryId";

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_brand_idx" ON "Product"("brand");
