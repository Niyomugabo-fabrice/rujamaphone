import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { checkAuth } from "@/lib/auth-check";
import { handleApiError } from "@/lib/util/errorhandle";

import type {
  AccessoryBrand,
  AccessoryType,
  Condition,
} from "@/types/accessory";

export const runtime = "nodejs";

// GET: Single item
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await checkAuth();
    const { id } = await params;

    const item = await prisma.accessory.findUnique({
      where: { id },
    });

    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Accessory not found" }, { status: 404 });
  } catch (error: any) {
    return handleApiError(error);
  }
}

// PATCH: Update item with file handling
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await checkAuth();
    const { id } = await params;
    const formData = await request.formData();
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const name = formData.get("name") as string;
    const brand = formData.get("brand") as AccessoryBrand;
    const condition = formData.get("condition") as Condition;
    const type = formData.get("type") as AccessoryType;
    const description = formData.get("description") as string | null;
    const priceRaw = formData.get("price") as string;
    const existingImages = JSON.parse((formData.get("existingImages") as string) || "[]");
    const files = formData.getAll("images") as File[];

    // Upload new images
    const uploadedImageUrls: string[] = [];
    for (const file of files) {
      if (file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "rujamaphone/accessories" },
            (error, result) => (error ? reject(error) : resolve(result))
          ).end(buffer);
        });

        if (uploadResult?.secure_url) uploadedImageUrls.push(uploadResult.secure_url);
      }
    }

    const finalImages = [...existingImages, ...uploadedImageUrls];

    const updated = await prisma.accessory.update({
      where: { id },
      data: {
        name,
        brand,
        condition,
        type,
        description,
        price: parseInt(priceRaw || "0", 10),
        image: finalImages,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return handleApiError(error);
  }
}

// DELETE: Remove item
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await checkAuth();
    const { id } = await params;

    await prisma.accessory.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Accessory record deleted" });
  } catch (error: any) {
    return handleApiError(error);
  }
}