import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { Product, ProductCategory } from "@/types/product";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page") || "1"), 1);
    const limit = Math.max(Number(searchParams.get("limit") || "12"), 1);
    const search = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category") as ProductCategory | null;
    const brand = searchParams.get("brand")?.trim() || "";
    const condition = searchParams.get("condition")?.trim() || "";
    const minPrice = Number(searchParams.get("minPrice") || "0");
    const maxPrice = Number(searchParams.get("maxPrice") || "0");
    const storage = searchParams.get("storage")?.trim() || "";
    const batteryLife = searchParams.get("batteryLife")?.trim() || "";
    const type = searchParams.get("type")?.trim() || "";
    const sort = searchParams.get("sort") || "createdAt-desc";

    // Build where clauses for each model
    const buildWhereClause = (model: "smartphone" | "speaker" | "accessory") => {
      const where: any = {};
      
      // Category filter
      if (category) {
        if (model === "smartphone" && category !== "SMARTPHONE") {
          return { id: "never-match" };
        }
        if (model === "speaker" && category !== "SPEAKER") {
          return { id: "never-match" };
        }
        if (model === "accessory" && category !== "ACCESSORY") {
          return { id: "never-match" };
        }
      }
      
      // Brand filter
      if (brand) {
        where.brand = brand;
      }
      
      // Condition filter
      if (condition) {
        where.condition = condition;
      }
      
      // Price range filter
      if (minPrice > 0 || maxPrice > 0) {
        where.price = {};
        if (minPrice > 0) where.price.gte = minPrice;
        if (maxPrice > 0) where.price.lte = maxPrice;
      }
      
      // Search filter
      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { brand: { contains: search, mode: "insensitive" } },
        ];
      }
      
      // Model-specific filters
      if (model === "smartphone" && storage) {
        where.storage = storage;
      }
      
      if (model === "speaker" && batteryLife) {
        where.batteryLife = { contains: batteryLife, mode: "insensitive" };
      }
      
      if (model === "accessory" && type) {
        where.type = { contains: type, mode: "insensitive" };
      }
      
      return where;
    };

    // Fetch data from all three models with filters
    const [smartphones, speakers, accessories] = await Promise.all([
      prisma.smartphone.findMany({
        where: buildWhereClause("smartphone"),
      }),
      prisma.speaker.findMany({
        where: buildWhereClause("speaker"),
      }),
      prisma.accessory.findMany({
        where: buildWhereClause("accessory"),
      }),
    ]);

    // Transform to unified product format
    const allProducts: Product[] = [
      ...smartphones.map((s) => ({
        id: s.id,
        name: s.name,
        price: s.price,
        image: s.image,
        brand: s.brand,
        category: "SMARTPHONE" as const,
        condition: s.condition,
        rating: s.rating,
        reviews: s.reviews,
        storage: s.storage,
        description: s.description,
      })),
      ...speakers.map((s) => ({
        id: s.id,
        name: s.name,
        price: s.price,
        image: s.image,
        brand: s.brand,
        category: "SPEAKER" as const,
        condition: s.condition,
        rating: s.rating,
        reviews: s.reviews,
        batteryLife: s.batteryLife,
        description: s.description,
      })),
      ...accessories.map((a) => ({
        id: a.id,
        name: a.name,
        price: a.price,
        image: a.image,
        brand: a.brand,
        category: "ACCESSORY" as const,
        condition: a.condition,
        rating: a.rating,
        reviews: a.reviews,
        type: a.type,
        description: a.description,
      })),
    ];

    // Apply sorting
    const [sortField, sortOrder] = sort.split("-");
    allProducts.sort((a, b) => {
      const aVal = a[sortField as keyof Product];
      const bVal = b[sortField as keyof Product];
      
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      return 0;
    });

    // Pagination
    const total = allProducts.length;
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    return NextResponse.json({
      data: paginatedProducts,
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error) {
    console.error("GET_PRODUCTS_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
