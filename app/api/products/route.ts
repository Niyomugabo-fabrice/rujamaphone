import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { normalizeSearchText, rankProducts } from "@/lib/search";
import { handleApiError, parseSearchParams } from "@/lib/api";
import { publicProductsQuerySchema } from "@/lib/schemas";

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
  try {
    const query = parseSearchParams(request, publicProductsQuerySchema);
    const search = normalizeSearchText(query.search);
    const {
      category,
      brand,
      condition,
      storage,
      batteryLife,
      type,
      sort,
      minPrice,
      maxPrice,
      page,
      limit,
    } = query;
    const isSuggestionsRequest = query.suggestions === "1";
    const skip = (page - 1) * limit;
    const smartphoneWhere = buildProductWhere({
      tableCategory: "SMARTPHONE",
      selectedCategory: category,
      brand,
      condition,
      minPrice,
      maxPrice,
      storage,
      batteryLife,
      type,
    });
    const speakerWhere = buildProductWhere({
      tableCategory: "SPEAKER",
      selectedCategory: category,
      brand,
      condition,
      minPrice,
      maxPrice,
      storage,
      batteryLife,
      type,
    });
    const accessoryWhere = buildProductWhere({
      tableCategory: "ACCESSORY",
      selectedCategory: category,
      brand,
      condition,
      minPrice,
      maxPrice,
      storage,
      batteryLife,
      type,
    });

    // 3. Fetch from each table in parallel
    const shouldRankSearch = Boolean(search);
    const candidateTake = shouldRankSearch ? 250 : limit * 3;
    const categoryTake = shouldRankSearch ? 250 : limit;
    const categorySkip = shouldRankSearch ? 0 : skip;

    const [smartphones, speakers, accessories] = await Promise.all([
      smartphoneWhere
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
      speakerWhere
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
      accessoryWhere
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
    return handleApiError("products.GET", error);
  }
}

type BuildWhereOptions = {
  tableCategory: "SMARTPHONE" | "SPEAKER" | "ACCESSORY";
  selectedCategory?: "SMARTPHONE" | "SPEAKER" | "ACCESSORY";
  brand?: string;
  condition?: string;
  minPrice: number;
  maxPrice: number;
  storage?: string;
  batteryLife?: string;
  type?: string;
};

function buildProductWhere({
  tableCategory,
  selectedCategory,
  brand,
  condition,
  minPrice,
  maxPrice,
  storage,
  batteryLife,
  type,
}: BuildWhereOptions) {
  if (selectedCategory && selectedCategory !== tableCategory) return null;
  if (storage && tableCategory !== "SMARTPHONE") return null;
  if (batteryLife && tableCategory !== "SPEAKER") return null;
  if (type && tableCategory !== "ACCESSORY") return null;

  const where: any = {
    price: { gte: minPrice, lte: maxPrice },
  };

  if (brand) where.brand = { contains: brand, mode: "insensitive" };
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
