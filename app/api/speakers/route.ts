import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";

import type {
  SpeakerBrand,
  Condition,
} from "@/types/speaker";

// READ: Fetch speakers with pagination, search, and filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page") || "1"), 1);
    const limit = Math.max(Number(searchParams.get("limit") || "10"), 1);
    const search = searchParams.get("search")?.trim() || "";
    const brand = searchParams.get("brand")?.trim() || "";
    const condition = searchParams.get("condition")?.trim() || "";
    const minPrice = Number(searchParams.get("minPrice") || "0");
    const maxPrice = Number(searchParams.get("maxPrice") || "0");

    const filters: any = { AND: [] };

    if (search) {
      filters.AND.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { brand: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    if (brand) {
      filters.AND.push({ brand });
    }
    if (condition) {
      filters.AND.push({ condition });
    }
    if (minPrice > 0) {
      filters.AND.push({ price: { gte: minPrice } });
    }
    if (maxPrice > 0) {
      filters.AND.push({ price: { lte: maxPrice } });
    }

    const where = filters.AND.length > 0 ? { AND: filters.AND } : undefined;

    const total = await prisma.speaker.count({ where });
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const offset = (page - 1) * limit;

    const speakers = await prisma.speaker.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    });

    return NextResponse.json(
      {
        data: speakers,
        total,
        page,
        totalPages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET_SPEAKERS_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch speakers" },
      { status: 500 }
    );
  }
}

// CREATE: Process speaker creation entry with assets
export async function POST(request: Request) {
  try {
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const formData = await request.formData();
    
    // Extract text properties from the dashboard view
    const name = formData.get("name") as string;
    const priceRaw = formData.get("price") as string;
    const description = formData.get("description") as string | null;
    const brand = formData.get("brand") as SpeakerBrand;
    const condition = formData.get("condition") as Condition;
    const batteryLife = formData.get("batteryLife") as string | null;
    const files = formData.getAll("images") as File[];

    if (!name || !priceRaw || !brand || !condition) {
      return NextResponse.json(
        { error: "Missing required product fields" },
        { status: 400 }
      );
    }

    const uploadedImageUrls: string[] = [];

    // Process every attached file chunk targeting remote binary delivery
    for (const file of files) {
      if (file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Pipe directly to Cloudinary via native buffer processing streams
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

    // Persist new records inside your Postgres instance
    const newSpeaker = await prisma.speaker.create({
      data: {
        name,
        price: parseInt(priceRaw, 10),
        description: description || null,
        brand,
        condition,
        batteryLife: batteryLife || null,
        image: uploadedImageUrls,
      },
    });

    return NextResponse.json(newSpeaker, { status: 201 });
  } catch (error) {
    console.error("POST_SPEAKER_ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Processing Error" },
      { status: 500 }
    );
  }
}

// DELETE: Remove speaker item from database entry
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    await prisma.speaker.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Speaker tracking record deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE_SPEAKER_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete item from records" },
      { status: 500 }
    );
  }
}
