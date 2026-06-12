import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { checkAuth } from "@/lib/auth-check";
import { handleApiError } from "@/lib/util/errorhandle";

import type {
  SpeakerBrand,
  Condition,
} from "@/types/speaker";

// READ: Fetch speakers (Public access usually okay, but checking auth if needed)
export async function GET(request: Request) {
  try {
    await checkAuth();
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

    if (brand) filters.AND.push({ brand });
    if (condition) filters.AND.push({ condition });
    if (minPrice > 0) filters.AND.push({ price: { gte: minPrice } });
    if (maxPrice > 0) filters.AND.push({ price: { lte: maxPrice } });

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

    return NextResponse.json({ data: speakers, total, page, totalPages }, { status: 200 });
  } catch (error: any) {
    return handleApiError(error);
  }
}

// CREATE: Process speaker creation entry
export async function POST(request: Request) {
  try {
    await checkAuth(); // Ensure auth is checked first

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const formData = await request.formData();
    
    // Log raw form data for inspection
    const rawData = Object.fromEntries(formData.entries());
    console.log("RECEIVED FORM DATA:", rawData);

    const name = formData.get("name") as string;
    const priceRaw = formData.get("price") as string;
    const description = formData.get("description") as string | null;
    const brand = formData.get("brand") as SpeakerBrand;
    const condition = formData.get("condition") as Condition;
    const batteryLife = formData.get("batteryLife") as string | null;
    const files = formData.getAll("images") as File[];

    console.log("EXTRACTED FIELDS:", { name, priceRaw, brand, condition, fileCount: files.length });

    if (!name || !priceRaw || !brand || !condition) {
      throw new Error("Missing required product fields: name, price, brand, or condition");
    }

    const uploadedImageUrls: string[] = [];
    for (const file of files) {
      if (file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "rujamaphone/speakers" },
            (error, result) => (error ? reject(error) : resolve(result))
          ).end(buffer);
        });
        if (uploadResult?.secure_url) uploadedImageUrls.push(uploadResult.secure_url);
      }
    }

    const payload = {
      name,
      price: parseInt(priceRaw, 10),
      description,
      brand, // Ensure this matches your Prisma Enum exactly
      condition, // Ensure this matches your Prisma Enum exactly
      batteryLife,
      image: uploadedImageUrls,
    };

    console.log("FINAL PRISMA PAYLOAD:", payload);

    const newSpeaker = await prisma.speaker.create({
      data: payload,
    });

    return NextResponse.json(newSpeaker, { status: 201 });
  } catch (error: any) {
    console.error("POST_SPEAKER_ERROR:", error);
    return handleApiError(error);
  }
}

// DELETE: Remove speaker item
export async function DELETE(request: Request) {
  try {
    await checkAuth(); // Protect route
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) throw new Error("Missing id parameter");

    await prisma.speaker.delete({ where: { id } });
    return NextResponse.json({ message: "Speaker tracking record deleted" }, { status: 200 });
  } catch (error: any) {
    return handleApiError(error);
  }
}