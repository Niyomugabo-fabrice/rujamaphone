import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // 1. Sanitize and Extract Inputs
  const search = searchParams.get("search")?.trim() || "";
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const condition = searchParams.get("condition");
  const storage = searchParams.get("storage");
  const batteryLife = searchParams.get("batteryLife");
  const type = searchParams.get("type");
  const sort = searchParams.get("sort") || "createdAt-desc";
  
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 999999999;
  
  const page = Math.max(Number(searchParams.get("page") || "1"), 1);
  const limit = 12;
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

    // Search filter
    if (search) {
      const searchCondition = {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { brand: { contains: search, mode: "insensitive" } },
        ],
      };
      smartphoneWhere.OR = searchCondition.OR;
      speakerWhere.OR = searchCondition.OR;
      accessoryWhere.OR = searchCondition.OR;
    }

    // 3. Fetch from each table in parallel
    const [smartphones, speakers, accessories] = await Promise.all([
      category === "SMARTPHONE" || !category
        ? prisma.smartphone.findMany({
            where: smartphoneWhere,
            orderBy: getOrderBy(sort),
            take: category ? limit : limit * 3,
            skip: category ? skip : 0,
          })
        : [],
      category === "SPEAKER" || !category
        ? prisma.speaker.findMany({
            where: speakerWhere,
            orderBy: getOrderBy(sort),
            take: category ? limit : limit * 3,
            skip: category ? skip : 0,
          })
        : [],
      category === "ACCESSORY" || !category
        ? prisma.accessory.findMany({
            where: accessoryWhere,
            orderBy: getOrderBy(sort),
            take: category ? limit : limit * 3,
            skip: category ? skip : 0,
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
    let sortedProducts = allProducts;
    if (!category) {
      sortedProducts = allProducts.sort((a, b) => {
        const sortFn = getSortFunction(sort);
        return sortFn(a, b);
      });
    }

    // 6. Apply pagination
    const total = sortedProducts.length;
    const paginatedProducts = category
      ? sortedProducts
      : sortedProducts.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      data: paginatedProducts,
      total,
      totalPages: Math.ceil(total / limit),
    });
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