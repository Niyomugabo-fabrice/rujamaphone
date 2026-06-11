-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('NEW', 'USED');

-- CreateEnum
CREATE TYPE "StorageCapacity" AS ENUM ('GB64', 'GB128', 'GB256', 'GB512', 'TB1');

-- CreateEnum
CREATE TYPE "SmartphoneBrand" AS ENUM ('APPLE', 'SAMSUNG', 'GOOGLE', 'XIAOMI', 'ONEPLUS');

-- CreateEnum
CREATE TYPE "SpeakerBrand" AS ENUM ('JBL', 'SONY', 'BOSE', 'APPLE', 'ANKER');

-- CreateEnum
CREATE TYPE "AccessoryBrand" AS ENUM ('APPLE', 'SAMSUNG', 'ANKER', 'BASEUS', 'GENERIC');

-- CreateTable
CREATE TABLE "Smartphone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT[],
    "description" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "storage" "StorageCapacity" NOT NULL,
    "condition" "Condition" NOT NULL,
    "brand" "SmartphoneBrand" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Smartphone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT[],
    "description" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "condition" "Condition" NOT NULL,
    "brand" "SpeakerBrand" NOT NULL,
    "batteryLife" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accessory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT[],
    "description" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "condition" "Condition" NOT NULL,
    "brand" "AccessoryBrand" NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accessory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Smartphone_brand_idx" ON "Smartphone"("brand");

-- CreateIndex
CREATE INDEX "Smartphone_price_idx" ON "Smartphone"("price");

-- CreateIndex
CREATE INDEX "Speaker_brand_idx" ON "Speaker"("brand");

-- CreateIndex
CREATE INDEX "Speaker_price_idx" ON "Speaker"("price");

-- CreateIndex
CREATE INDEX "Accessory_brand_idx" ON "Accessory"("brand");

-- CreateIndex
CREATE INDEX "Accessory_price_idx" ON "Accessory"("price");
