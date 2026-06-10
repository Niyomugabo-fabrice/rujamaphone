import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/schemas";
import { Condition, Storage, Category, Brand } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Primary Structural Filters matching Enum scalar fields
    const brand = (searchParams.get("brand") as Brand) || undefined;
    const category = (searchParams.get("category") as Category) || undefined;
    const condition = (searchParams.get("condition") as Condition) || undefined;
    const storage = (searchParams.get("storage") as Storage) || undefined;
    
    // Explicit Range & Search Query Bounds
    const searchQuery = searchParams.get("q") || undefined;
    const minPrice = searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : undefined;

    // Server Pagination Anchors
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Dynamic Database Query Map Build
    const whereClause: any = {
      brand,
      category,
      condition,
      storage,
      name: searchQuery ? { contains: searchQuery, mode: "insensitive" } : undefined,
      price: {},
    };

    // Inject explicit bounds conditionally to avoid empty syntax evaluations
    if (minPrice !== undefined) whereClause.price.gte = minPrice;
    if (maxPrice !== undefined) whereClause.price.lte = maxPrice;

    // Safely remove redundant parameter objects or unused filters
    Object.keys(whereClause).forEach((key) => {
      if (whereClause[key] === undefined) {
        delete whereClause[key];
      }
      if (key === "price" && Object.keys(whereClause.price).length === 0) {
        delete whereClause.price;
      }
    });

    // Concurrent Production-Grade Transaction Execution
    const [products, total, dashboardStats] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),

      prisma.product.count({ where: whereClause }),

      prisma.$transaction([
        prisma.product.count(),
        prisma.product.aggregate({
          _sum: { price: true },
          _avg: { price: true }
        }),
        prisma.product.groupBy({
          by: ["condition"],
          _count: { _all: true }
        }),
        prisma.product.groupBy({
          by: ["storage"],
          _count: { _all: true }
        })
      ])
    ]);

    const summaryAnalytics = {
      totalSystemInventory: dashboardStats[0],
      totalFinancialValueRWF: dashboardStats[1]._sum.price || 0,
      averageProductValueRWF: Math.round(dashboardStats[1]._avg.price || 0),
      conditionDistribution: dashboardStats[2].map(group => ({
        condition: group.condition,
        count: group._count._all
      })),
      storageDistribution: dashboardStats[3].map(group => ({
        storage: group.storage || "STANDARD",
        count: group._count._all
      }))
    };

    return NextResponse.json({
      products,
      meta: {
        totalFilteredProducts: total,
        currentPage: page,
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
      analytics: summaryAnalytics
    });

  } catch (error) {
    console.error("❌ GET ERROR:", error);
    return NextResponse.json(
      { error: "Enterprise Query Engine failed processing filtering matrix components" }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📥 POST BODY RECEIVED:", JSON.stringify(body, null, 2));

    const validation = productSchema.safeParse(body);

    if (!validation.success) {
      console.warn("⚠️ ZOD VALIDATION FAILED:", JSON.stringify(validation.error.format(), null, 2));
      return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
    }

    const data = validation.data;
    console.log("✅ ZOD VALIDATION PASSED. PARSED DATA:", JSON.stringify(data, null, 2));

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description || null,
        image: data.images, 
        condition: data.condition,
        storage: data.storage || null,
        category: data.category,
        brand: data.brand,
      },
    });

    console.log("🚀 PRISMA CREATION SUCCESS:", JSON.stringify(newProduct, null, 2));
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ POST DATABASE CRASH ERROR:", error);
    return NextResponse.json({ error: "Product creation execution failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idsString = searchParams.get("ids");
    if (!idsString) {
      return NextResponse.json({ error: "No target IDs provided for transaction batch processing" }, { status: 400 });
    }

    const targetIds = idsString.split(",").filter((id) => id.trim() !== "");
    
    if (targetIds.length === 0) {
      return NextResponse.json({ error: "Provided ID parameters are corrupt or malformed" }, { status: 400 });
    }

    const deletionBatch = await prisma.product.deleteMany({
      where: { id: { in: targetIds } },
    });

    return NextResponse.json({ 
      message: "Bulk transactional clear operation complete", 
      count: deletionBatch.count 
    });
  } catch (error) {
    console.error("❌ DELETE ERROR:", error);
    return NextResponse.json({ error: "Bulk deletion transaction crashed" }, { status: 500 });
  }
}