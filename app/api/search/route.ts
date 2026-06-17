import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const page = Math.max(1, Number(request.nextUrl.searchParams.get("page") ?? 1));
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(request.nextUrl.searchParams.get("limit") ?? DEFAULT_LIMIT)));
  const offset = (page - 1) * limit;

  if (!q) {
    return NextResponse.json({ success: true, results: [], total: 0, page, limit, totalPages: 0 });
  }

  try {
    const searchPattern = `%${q}%`;

    // Search Smartphones
    const smartphones = await prisma.smartphone.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { brand: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        brand: true,
        price: true,
        image: true,
        rating: true,
        reviews: true,
        condition: true,
        storage: true,
        createdAt: true,
        updatedAt: true,
      },
      take: limit,
      skip: offset,
    });

    // Search Speakers
    const speakers = await prisma.speaker.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { brand: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        brand: true,
        price: true,
        image: true,
        rating: true,
        reviews: true,
        condition: true,
        batteryLife: true,
        createdAt: true,
        updatedAt: true,
      },
      take: limit,
      skip: offset,
    });

    // Search Accessories
    const accessories = await prisma.accessory.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { brand: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        brand: true,
        price: true,
        image: true,
        rating: true,
        reviews: true,
        condition: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
      take: limit,
      skip: offset,
    });

    // Combine results
    const results = [
      ...smartphones.map((s) => ({ ...s, batteryLife: null, type: null, category: "SMARTPHONE" })),
      ...speakers.map((s) => ({ ...s, storage: null, type: null, category: "SPEAKER" })),
      ...accessories.map((s) => ({ ...s, storage: null, batteryLife: null, category: "ACCESSORY" })),
    ];

    // Get total counts
    const smartphoneCount = await prisma.smartphone.count({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { brand: { contains: q, mode: "insensitive" } },
        ],
      },
    });

    const speakerCount = await prisma.speaker.count({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { brand: { contains: q, mode: "insensitive" } },
        ],
      },
    });

    const accessoryCount = await prisma.accessory.count({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { brand: { contains: q, mode: "insensitive" } },
        ],
      },
    });

    const total = smartphoneCount + speakerCount + accessoryCount;

    return NextResponse.json({
      success: true,
      results,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { success: false, error: "Search request failed" },
      { status: 500 }
    );
  }
}
