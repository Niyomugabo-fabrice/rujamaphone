import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { Product } from "@/types/product";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try to find the product in all three models
    const [smartphone, speaker, accessory] = await Promise.all([
      prisma.smartphone.findUnique({ where: { id } }),
      prisma.speaker.findUnique({ where: { id } }),
      prisma.accessory.findUnique({ where: { id } }),
    ]);

    let product: Product | null = null;

    if (smartphone) {
      product = {
        id: smartphone.id,
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
        name: accessory.name,
        price: accessory.price,
        image: accessory.image,
        brand: accessory.brand,
        category: "ACCESSORY",
        condition: accessory.condition,
        rating: accessory.rating,
        reviews: accessory.reviews,
        type: accessory.type,
        description: accessory.description,
      };
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET_PRODUCT_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
