import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { Product } from "@/types/product";

// -------------------------
// SMART SCORING ENGINE
// -------------------------
function getScore(product: any, q: string) {
  const query = q.toLowerCase();
  const name = product.name?.toLowerCase() || "";
  const brand = product.brand?.toLowerCase() || "";
  const desc = product.description?.toLowerCase() || "";

  let score = 0;

  // exact match (highest priority)
  if (name === query) score += 100;

  // startsWith (very strong match)
  if (name.startsWith(query)) score += 80;

  // contains
  if (name.includes(query)) score += 50;

  // brand match
  if (brand.includes(query)) score += 60;

  // description match
  if (desc.includes(query)) score += 20;

  // fuzzy match (ip → iphone style)
  if (name.replace(/\s/g, "").includes(query)) score += 30;

  return score;
}

// -------------------------
// MAIN API
// -------------------------
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // pagination
    const page = Math.max(Number(searchParams.get("page") || "1"), 1);
    const limit = Math.max(Number(searchParams.get("limit") || "12"), 1);

    const search = searchParams.get("search")?.trim() || "";

    // -------------------------
    // FETCH ALL DATA SAFELY
    // -------------------------
    const [smartphones, speakers, accessories] = await Promise.all([
      prisma.smartphone.findMany().catch(() => []),
      prisma.speaker.findMany().catch(() => []),
      prisma.accessory.findMany().catch(() => []),
    ]);

    // -------------------------
    // MERGE PRODUCTS
    // -------------------------
    let products: Product[] = [
      ...smartphones.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: Array.isArray(p.image) ? p.image : [p.image],
        brand: p.brand,
        category: "SMARTPHONE" as const,
        condition: p.condition,
        rating: p.rating,
        reviews: p.reviews,
        storage: p.storage,
        description: p.description,
      })),

      ...speakers.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: Array.isArray(p.image) ? p.image : [p.image],
        brand: p.brand,
        category: "SPEAKER" as const,
        condition: p.condition,
        rating: p.rating,
        reviews: p.reviews,
        batteryLife: p.batteryLife,
        description: p.description,
      })),

      ...accessories.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: Array.isArray(p.image) ? p.image : [p.image],
        brand: p.brand,
        category: "ACCESSORY" as const,
        condition: p.condition,
        rating: p.rating,
        reviews: p.reviews,
        type: p.type,
        description: p.description,
      })),
    ];

    // -------------------------
    // SMART SEARCH + RANKING
    // -------------------------
    const q = search.toLowerCase().trim();

    if (q) {
      products = products
        .map((p) => ({
          ...p,
          score: getScore(p, q),
        }))
        .filter((p: any) => p.score > 0)
        .sort((a: any, b: any) => b.score - a.score);
    } else {
      // default sorting when no search (best rated first)
      products = products.sort((a, b) => b.rating - a.rating);
    }

    // -------------------------
    // FALLBACK (NO RESULTS)
    // -------------------------
    if (q && products.length === 0) {
      products = products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10);
    }

    // -------------------------
    // PAGINATION
    // -------------------------
    const total = products.length;
    const totalPages = Math.max(Math.ceil(total / limit), 1);

    const start = (page - 1) * limit;
    const data = products.slice(start, start + limit);

    // -------------------------
    // RESPONSE
    // -------------------------
    return NextResponse.json({
      success: true,
      data,
      page,
      limit,
      total,
      totalPages,
      message: data.length ? "Products loaded" : "No products found",
    });
  } catch (error) {
    console.error("PRODUCT_SEARCH_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "No products found",
      },
      { status: 200 }
    );
  }
}