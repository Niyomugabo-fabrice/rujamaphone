import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { Product } from "@/types/product";
import { fail, handleApiError, ok } from "@/lib/api";

const detailCacheHeaders = {
  "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
};

const baseDetailSelect = {
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
};

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

function buildWhereClause(identifier: string) {
  if (isUuid(identifier)) {
    return { id: identifier };
  }
  return { slug: identifier };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const identifier = String(slug).trim();
    const where = buildWhereClause(identifier);

    const [smartphone, speaker, accessory] = await Promise.all([
      prisma.smartphone.findUnique({
        where,
        select: {
          ...baseDetailSelect,
          storage: true,
        },
      }),
      prisma.speaker.findUnique({
        where,
        select: {
          ...baseDetailSelect,
          batteryLife: true,
        },
      }),
      prisma.accessory.findUnique({
        where,
        select: {
          ...baseDetailSelect,
          type: true,
        },
      }),
    ]);

    let product: Product | null = null;

    if (smartphone) {
      product = {
        id: smartphone.id,
        slug: smartphone.slug ?? undefined,
        name: smartphone.name,
        price: smartphone.price,
        image: smartphone.image,
        brand: smartphone.brand,
        category: "SMARTPHONE",
        condition: smartphone.condition,
        rating: smartphone.rating,
        reviews: smartphone.reviews,
        storage: smartphone.storage,
        description: smartphone.description,
      };
    } else if (speaker) {
      product = {
        id: speaker.id,
        slug: speaker.slug ?? undefined,
        name: speaker.name,
        price: speaker.price,
        image: speaker.image,
        brand: speaker.brand,
        category: "SPEAKER",
        condition: speaker.condition,
        rating: speaker.rating,
        reviews: speaker.reviews,
        batteryLife: speaker.batteryLife,
        description: speaker.description,
      };
    } else if (accessory) {
      product = {
        id: accessory.id,
        slug: accessory.slug ?? undefined,
        name: accessory.name,
        price: accessory.price,
        image: accessory.image,
        brand: accessory.brand,
        category: "ACCESSORY",
        condition: accessory.condition,
        rating: accessory.rating,
        reviews: accessory.reviews,
        type: accessory.type ?? undefined,
        description: accessory.description,
      };
    }

    if (!product) {
      return fail("Product not found", 404);
    }

    return ok(product, 200, { headers: detailCacheHeaders });
  } catch (error) {
    return handleApiError("products.slug.GET", error);
  }
}
