import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { checkAuth } from "@/lib/auth-check";

import { handleApiError} from "@/lib/util/errorhandle"

import type {
  SmartphoneBrand,
  StorageCapacity,
  Condition,
} from "@/types/smartphone";

// READ: Fetch smartphones with pagination, search, and filtering
export async function GET(request: Request) {
  try {
    await checkAuth();
    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page") || "1"), 1);
    const limit = Math.max(Number(searchParams.get("limit") || "10"), 1);
    const search = searchParams.get("search")?.trim() || "";
    const brand = searchParams.get("brand")?.trim() || "";
    const condition = searchParams.get("condition")?.trim() || "";
    const storage = searchParams.get("storage")?.trim() || "";
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
    if (storage) {
      filters.AND.push({ storage });
    }
    if (minPrice > 0) {
      filters.AND.push({ price: { gte: minPrice } });
    }
    if (maxPrice > 0) {
      filters.AND.push({ price: { lte: maxPrice } });
    }

    const where = filters.AND.length > 0 ? { AND: filters.AND } : undefined;

    const total = await prisma.smartphone.count({ where });
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const offset = (page - 1) * limit;

    const smartphones = await prisma.smartphone.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    });

    return NextResponse.json(
      {
        data: smartphones,
        total,
        page,
        totalPages,
      },
      { status: 200 }
    );
  } catch (error:any) {
    console.error("GET_SMARTPHONES_ERROR:", error);
    return handleApiError(error)
  }
}

// CREATE: Process smartphone creation entry with assets
export async function POST(request: Request) {
  try {
     await checkAuth();
    
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
    return handleApiError(error)
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
    return handleApiError(error)
  }
}