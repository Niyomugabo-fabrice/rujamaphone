export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";

import type {
  SpeakerBrand,
  Condition,
} from "@/types/speaker";

// GET: Single item
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const item = await prisma.speaker.findUnique({
    where: { id },
  });

  return item
    ? NextResponse.json(item)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const name = formData.get("name") as string;
    const brand = formData.get("brand") as SpeakerBrand;
    const condition = formData.get("condition") as Condition;
    const batteryLife = formData.get("batteryLife") as string | null;
    const description = formData.get("description") as string | null;
    const priceRaw = formData.get("price") as string;
    const existingImages = JSON.parse(formData.get("existingImages") as string) || "[]";
    const files = formData.getAll("images") as File[];

    // Upload new images to Cloudinary
    const uploadedImageUrls: string[] = [];
    for (const file of files) {
      if (file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "rujamaphone/speakers" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary stream pipe crash details:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          ).end(buffer);
        });

        if (uploadResult?.secure_url) {
          uploadedImageUrls.push(uploadResult.secure_url);
        }
      }
    }

    // Combine existing images with newly uploaded ones
    const finalImages = [...existingImages, ...uploadedImageUrls];

    const data = {
      name,
      brand,
      condition,
      batteryLife,
      description,
      price: parseInt(priceRaw),
      image: finalImages,
    };

    const updated = await prisma.speaker.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove item
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.speaker.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    );
  }
}
