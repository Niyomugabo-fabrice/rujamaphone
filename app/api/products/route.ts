import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { normalizeSearchText, rankProducts } from "@/lib/search";

const productCacheHeaders = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
};

const baseProductSelect = {
  id: true,
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
  const { searchParams } = new URL(request.url);
  
  // 1. Sanitize and Extract Inputs
  const search = normalizeSearchText(searchParams.get("search") || "");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const condition = searchParams.get("condition");
  const storage = searchParams.get("storage");
  const batteryLife = searchParams.get("batteryLife");
  const type = searchParams.get("type");
  const sort = searchParams.get("sort") || "createdAt-desc";
  const isSuggestionsRequest = searchParams.get("suggestions") === "1";
  
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 999999999;
  
  const page = Math.max(Number(searchParams.get("page") || "1"), 1);
  const limit = Math.min(Math.max(Number(searchParams.get("limit") || "12"), 1), 50);
  const skip = (page - 1) * limit;

  try {
    // 2. Build Prisma where clauses for each table
    const baseWhere: any = {
      price: { gte: minPrice, lte: maxPrice },
    };

    if (brand) baseWhere.brand = brand;
    if (condition) baseWhere.condition = condition;

    // Category-specific filters
    const smartphoneWhere = { ...baseWhere };
    const speakerWhere = { ...baseWhere };
    const accessoryWhere = { ...baseWhere };

    if (category && category !== "SMARTPHONE") smartphoneWhere.brand = undefined;
    if (category && category !== "SPEAKER") speakerWhere.brand = undefined;
    if (category && category !== "ACCESSORY") accessoryWhere.brand = undefined;

    if (storage) smartphoneWhere.storage = storage;
    if (batteryLife) speakerWhere.batteryLife = { contains: batteryLife, mode: "insensitive" };
    if (type) accessoryWhere.type = type;

    // 3. Fetch from each table in parallel
    const shouldRankSearch = Boolean(search);
    const candidateTake = shouldRankSearch ? 250 : limit * 3;
    const categoryTake = shouldRankSearch ? 250 : limit;
    const categorySkip = shouldRankSearch ? 0 : skip;

    const [smartphones, speakers, accessories] = await Promise.all([
      category === "SMARTPHONE" || !category
        ? prisma.smartphone.findMany({
            where: smartphoneWhere,
            select: {
              ...baseProductSelect,
              storage: true,
            },
            orderBy: getOrderBy(sort),
            take: category ? categoryTake : candidateTake,
            skip: category ? categorySkip : 0,
          })
        : [],
      category === "SPEAKER" || !category
        ? prisma.speaker.findMany({
            where: speakerWhere,
            select: {
              ...baseProductSelect,
              batteryLife: true,
            },
            orderBy: getOrderBy(sort),
            take: category ? categoryTake : candidateTake,
            skip: category ? categorySkip : 0,
          })
        : [],
      category === "ACCESSORY" || !category
        ? prisma.accessory.findMany({
            where: accessoryWhere,
            select: {
              ...baseProductSelect,
              type: true,
            },
            orderBy: getOrderBy(sort),
            take: category ? categoryTake : candidateTake,
            skip: category ? categorySkip : 0,
          })
        : [],
    ]);

    // 4. Combine results and add category field
    const allProducts = [
      ...smartphones.map((p) => ({ ...p, category: "SMARTPHONE", batteryLife: null, type: null })),
      ...speakers.map((p) => ({ ...p, category: "SPEAKER", storage: null, type: null })),
      ...accessories.map((p) => ({ ...p, category: "ACCESSORY", storage: null, batteryLife: null })),
    ];

    // 5. Sort combined results if no category filter
    let sortedProducts = allProducts as any[];
    if (search) {
      sortedProducts = rankProducts(sortedProducts, search).map((result) => result.item);
    } else if (!category) {
      sortedProducts = allProducts.sort((a, b) => {
        const sortFn = getSortFunction(sort);
        return sortFn(a, b);
      });
    }

    // 6. Apply pagination
    const total = sortedProducts.length;
    const paginatedProducts = isSuggestionsRequest
      ? sortedProducts.slice(0, limit)
      : sortedProducts.slice(skip, skip + limit);

    return NextResponse.json(
      {
        success: true,
        data: paginatedProducts,
        total,
        totalPages: Math.ceil(total / limit),
      },
      { headers: productCacheHeaders }
    );
  } catch (error) {
    console.error("SEARCH_API_ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function getOrderBy(sort: string) {
  const [field, direction] = sort.split("-");
  const orderBy: any = {};
  
  switch (field) {
    case "price":
      orderBy[field] = direction === "asc" ? "asc" : "desc";
      break;
    case "rating":
      orderBy[field] = direction === "asc" ? "asc" : "desc";
      break;
    case "createdAt":
    default:
      orderBy[field] = direction === "asc" ? "asc" : "desc";
      break;
  }
  
  return orderBy;
}

function getSortFunction(sort: string) {
  const [field, direction] = sort.split("-");
  const dir = direction === "asc" ? 1 : -1;
  
  return (a: any, b: any) => {
    const aVal = a[field];
    const bVal = b[field];
    
    if (aVal < bVal) return -1 * dir;
    if (aVal > bVal) return 1 * dir;
    return 0;
  };
}
