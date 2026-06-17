import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handleApiError, parseSearchParams } from "@/lib/api";
import { productsPreviewQuerySchema } from "@/lib/schemas";

const productCacheHeaders = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
};

const baseProductSelect = {
  id: true,
  slug: true,
  name: true,
  price: true,
  image: true,
  description: true,
  rating: true,
  reviews: true,
  condition: true,
  brand: true,
  createdAt: true,
  updatedAt: true,
};

export async function GET(request: Request) {
  try {
    const query = parseSearchParams(request, productsPreviewQuerySchema);
    const smartphoneLimit = Number(query.smartphoneLimit);
    const speakerLimit = Number(query.speakerLimit);
    const accessoryLimit = Number(query.accessoryLimit);

    const [smartphones, speakers, accessories] = await Promise.all([
      prisma.smartphone.findMany({
        select: {
          ...baseProductSelect,
          storage: true,
        },
        orderBy: { createdAt: "desc" },
        take: smartphoneLimit,
      }),
      prisma.speaker.findMany({
        select: {
          ...baseProductSelect,
          batteryLife: true,
        },
        orderBy: { createdAt: "desc" },
        take: speakerLimit,
      }),
      prisma.accessory.findMany({
        select: {
          ...baseProductSelect,
          type: true,
        },
        orderBy: { createdAt: "desc" },
        take: accessoryLimit,
      }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          smartphones: smartphones.map((product) => ({
            ...product,
            category: "SMARTPHONE",
          })),
          speakers: speakers.map((product) => ({
            ...product,
            category: "SPEAKER",
          })),
          accessories: accessories.map((product) => ({
            ...product,
            category: "ACCESSORY",
          })),
        },
      },
      { headers: productCacheHeaders }
    );
  } catch (error) {
    return handleApiError("products.preview.GET", error);
  }
}
