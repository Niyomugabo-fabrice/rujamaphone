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

// ===============================
// MAIN GET ROUTE
// ===============================
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

    const skip = (Number(page) - 1) * Number(limit);

    const cleanBrand = brand?.trim();
    const cleanStorage = storage?.trim();
    const cleanBattery = batteryLife?.trim();
    const cleanType = type?.trim();

    // ===============================
    // SAFE WHERE BUILDER
    // ===============================
    function buildProductWhere(tableCategory: "SMARTPHONE" | "SPEAKER" | "ACCESSORY") {
      if (category && category !== tableCategory) return null;

      if (cleanStorage && tableCategory !== "SMARTPHONE") return null;
      if (cleanBattery && tableCategory !== "SPEAKER") return null;
      if (cleanType && tableCategory !== "ACCESSORY") return null;

      const where: any = {
        price: {
          gte: Number(minPrice) || 0,
          lte: Number(maxPrice) || 999999999,
        },
      };

      if (cleanBrand) {
        where.brand = {
          contains: cleanBrand,
          mode: "insensitive",
        };
      }

      if (condition) {
        where.condition = condition;
      }

      return where;
    }

    // ===============================
    // BUILD QUERIES
    // ===============================
    const smartphoneWhere = buildProductWhere("SMARTPHONE");
    const speakerWhere = buildProductWhere("SPEAKER");
    const accessoryWhere = buildProductWhere("ACCESSORY");

    const shouldRankSearch = Boolean(search);
    const candidateTake = shouldRankSearch ? 250 : limit * 3;

    // ===============================
    // FETCH DATA
    // ===============================
    const [smartphones, speakers, accessories] = await Promise.all([
      smartphoneWhere === null
        ? Promise.resolve([])
        : prisma.smartphone.findMany({
            where: smartphoneWhere,
            select: {
              ...baseProductSelect,
              storage: true,
            },
            orderBy: getOrderBy(sort),
            take: candidateTake,
            skip: 0,
          }),

      speakerWhere === null
        ? Promise.resolve([])
        : prisma.speaker.findMany({
            where: speakerWhere,
            select: {
              ...baseProductSelect,
              batteryLife: true,
            },
            orderBy: getOrderBy(sort),
            take: candidateTake,
            skip: 0,
          }),

      accessoryWhere === null
        ? Promise.resolve([])
        : prisma.accessory.findMany({
            where: accessoryWhere,
            select: {
              ...baseProductSelect,
              type: true,
            },
            orderBy: getOrderBy(sort),
            take: candidateTake,
            skip: 0,
          }),
    ]);

    // ===============================
    // MERGE RESULTS
    // ===============================
    let allProducts = [
      ...smartphones.map((p) => ({
        ...p,
        category: "SMARTPHONE",
        batteryLife: null,
        type: null,
      })),
      ...speakers.map((p) => ({
        ...p,
        category: "SPEAKER",
        storage: null,
        type: null,
      })),
      ...accessories.map((p) => ({
        ...p,
        category: "ACCESSORY",
        storage: null,
        batteryLife: null,
      })),
    ];

    // ===============================
    // SEARCH RANKING
    // ===============================
    if (search) {
      allProducts = rankProducts(allProducts, search).map((r) => r.item);
    }

    // ===============================
    // SORTING
    // ===============================
    if (!search && !category) {
      const sortFn = getSortFunction(sort);
      allProducts.sort(sortFn);
    }

    // ===============================
    // PAGINATION
    // ===============================
    const total = allProducts.length;

    const paginatedProducts = isSuggestionsRequest
      ? allProducts.slice(0, limit)
      : allProducts.slice(skip, skip + limit);

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

// ===============================
// SORT FUNCTIONS
// ===============================
function getOrderBy(sort: string) {
  const [field, direction] = sort.split("-");
  return {
    [field]: direction === "asc" ? "asc" : "desc",
  };
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