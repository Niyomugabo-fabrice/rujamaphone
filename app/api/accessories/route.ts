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

// READ: Fetch accessories
export async function GET(request: Request) {
  try {
    await checkAuth();
    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page") || "1"), 1);
    const limit = Math.max(Number(searchParams.get("limit") || "10"), 1);
    const search = searchParams.get("search")?.trim() || "";
    const brand = searchParams.get("brand")?.trim() || "";
    const condition = searchParams.get("condition")?.trim() || "";
    const type = searchParams.get("type")?.trim() || "";
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
    if (type) filters.AND.push({ type });
    if (minPrice > 0) filters.AND.push({ price: { gte: minPrice } });
    if (maxPrice > 0) filters.AND.push({ price: { lte: maxPrice } });

    const where = filters.AND.length > 0 ? { AND: filters.AND } : undefined;

    const total = await prisma.accessory.count({ where });
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const offset = (page - 1) * limit;

    const accessories = await prisma.accessory.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    });

    return NextResponse.json(
      { data: accessories, total, page, totalPages },
      { status: 200 }
    );
  } catch (error: any) {
    return handleApiError(error);
  }
}

// CREATE: Process accessory creation
export async function POST(request: Request) {
  try {
    await checkAuth();

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const priceRaw = formData.get("price") as string;
    const description = formData.get("description") as string | null;
    const brand = formData.get("brand") as AccessoryBrand;
    const condition = formData.get("condition") as Condition;
    const type = formData.get("type") as AccessoryType;
    const files = formData.getAll("images") as File[];

    if (!name || !priceRaw || !brand || !condition || !type) {
      throw new Error("Missing required product fields");
    }

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

    const newAccessory = await prisma.accessory.create({
      data: {
        name,
        price: parseInt(priceRaw, 10),
        description,
        brand,
        condition,
        type,
        image: uploadedImageUrls,
      },
    });

    return NextResponse.json(newAccessory, { status: 201 });
  } catch (error: any) {
    return handleApiError(error);
  }
}

// DELETE: Remove accessory item
export async function DELETE(request: Request) {
  try {
    await checkAuth();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) throw new Error("Missing id parameter");

    await prisma.accessory.delete({ where: { id } });
    return NextResponse.json({ message: "Accessory tracking record deleted" }, { status: 200 });
  } catch (error: any) {
    return handleApiError(error);
  }
}