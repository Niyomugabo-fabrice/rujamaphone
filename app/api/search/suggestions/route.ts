import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const MIN_QUERY_LENGTH = 2;
const MAX_SUGGESTIONS = 10;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const limit = Math.min(
    MAX_SUGGESTIONS,
    Math.max(1, Number(request.nextUrl.searchParams.get("limit") ?? MAX_SUGGESTIONS))
  );

  if (query.length < MIN_QUERY_LENGTH) {
    return NextResponse.json({ success: true, suggestions: [] });
  }

  try {
    // Search Smartphones
    const smartphones = await prisma.smartphone.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { brand: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        brand: true,
      },
      take: limit,
    });

    // Search Speakers
    const speakers = await prisma.speaker.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { brand: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        brand: true,
      },
      take: limit,
    });

    // Search Accessories
    const accessories = await prisma.accessory.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { brand: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        brand: true,
      },
      take: limit,
    });

    // Combine and format results
    const suggestions = [
      ...smartphones.map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        category: "SMARTPHONE",
        highlightedName: item.name,
      })),
      ...speakers.map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        category: "SPEAKER",
        highlightedName: item.name,
      })),
      ...accessories.map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        category: "ACCESSORY",
        highlightedName: item.name,
      })),
    ].slice(0, limit);

    return NextResponse.json({ success: true, suggestions });
  } catch (error) {
    console.error("Suggestions error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get suggestions",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

