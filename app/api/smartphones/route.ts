import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";

import type {
  SmartphoneBrand,
  StorageCapacity,
  Condition,
} from "@/types/smartphone";

// READ: Fetch all smartphones
export async function GET() {
  try {
    const smartphones = await prisma.smartphone.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(smartphones, { status: 200 });
  } catch (error) {
    console.error("GET_SMARTPHONES_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch smartphones" },
      { status: 500 }
    );
  }
}

// CREATE: Process smartphone creation entry with assets
export async function POST(request: Request) {
  try {
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const formData = await request.formData();
    
    // 2. CLG: Check text properties coming from the dashboard view
    const name = formData.get("name") as string;
    const priceRaw = formData.get("price") as string;
    const description = formData.get("description") as string | null;
    const brand = formData.get("brand") as SmartphoneBrand;
    const storage = formData.get("storage") as StorageCapacity;
    const condition = formData.get("condition") as Condition;
    const files = formData.getAll("images") as File[];

   

    if (!name || !priceRaw || !brand || !storage || !condition) {
      return NextResponse.json(
        { error: "Missing required product fields" },
        { status: 400 }
      );
    }

    const uploadedImageUrls: string[] = [];

    // Process every attached file chunk targeting remote binary delivery
    for (const file of files) {
      if (file.size > 0) {
        // console.log(`Processing file: ${file.name} (${file.size} bytes)`);
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Pipe directly to Cloudinary via native buffer processing streams
        const uploadResult = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "rujamaphone/products" },
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


    // Persist new records inside your Postgres instance
    const newSmartphone = await prisma.smartphone.create({
      data: {
        name,
        price: parseInt(priceRaw, 10),
        description: description || null,
        brand,
        storage,
        condition,
        image: uploadedImageUrls,
      },
    });

    return NextResponse.json(newSmartphone, { status: 201 });
  } catch (error) {
    console.error("POST_SMARTPHONE_ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Processing Error" },
      { status: 500 }
    );
  }
}

// DELETE: Remove smartphone item from database entry
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    await prisma.smartphone.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Smartphone tracking record deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE_SMARTPHONE_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete item from records" },
      { status: 500 }
    );
  }
}