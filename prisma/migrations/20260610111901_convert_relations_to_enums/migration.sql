-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('NEW', 'USED');

-- CreateEnum
CREATE TYPE "Storage" AS ENUM ('GB64', 'GB128', 'GB256', 'GB512');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SMARTPHONE', 'TABLET', 'LAPTOP', 'ACCESSORY');

-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('APPLE', 'SAMSUNG', 'GOOGLE', 'XIAOMI', 'ONEPLUS');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT[],
    "description" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "storage" "Storage",
    "condition" "Condition" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "brand" "Brand" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- CreateIndex
CREATE INDEX "Product_price_idx" ON "Product"("price");
