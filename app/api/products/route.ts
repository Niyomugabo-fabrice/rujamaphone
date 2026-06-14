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
    // 2. Build the WHERE clause dynamically
    const conditions: string[] = [];
    const params: any[] = [];
    
    conditions.push(`price >= $${params.push(minPrice)}`);
    conditions.push(`price <= $${params.push(maxPrice)}`);
    
    if (category) {
      conditions.push(`category = $${params.push(category)}`);
    }
    if (brand) {
      conditions.push(`brand = $${params.push(brand)}`);
    }
    if (condition) {
      conditions.push(`condition = $${params.push(condition)}`);
    }
    if (storage) {
      conditions.push(`storage = $${params.push(storage)}`);
    }
    if (batteryLife) {
      conditions.push(`"batteryLife" ILIKE $${params.push('%' + batteryLife + '%')}`);
    }
    if (type) {
      conditions.push(`type = $${params.push(type)}`);
    }
    
    // Handle search parameter
    let rankSelect = "0 as rank";
    if (search) {
      const searchParamIdx = params.push(search);
      const searchLikeIdx = params.push('%' + search + '%');
      
      conditions.push(`(
        name % $${searchParamIdx} OR 
        name ILIKE $${searchLikeIdx} OR 
        brand ILIKE $${searchLikeIdx} OR 
        CAST(price AS TEXT) = $${searchParamIdx}
      )`);
      
      rankSelect = `similarity(name, $${searchParamIdx}) as rank`;
    }
    
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    
    // Construct search result order
    let orderByClause = "";
    const allowedSorts = {
      "price-asc": `sub.price ASC, sub.name ASC`,
      "price-desc": `sub.price DESC, sub.name ASC`,
      "rating-desc": `sub.rating DESC, sub.name ASC`,
      "createdAt-asc": `sub."createdAt" ASC, sub.name ASC`,
      "createdAt-desc": `sub."createdAt" DESC, sub.name ASC`,
    };
    
    if (sort && sort in allowedSorts) {
      orderByClause = allowedSorts[sort as keyof typeof allowedSorts];
    } else {
      if (search) {
        orderByClause = `CASE WHEN CAST(sub.price AS TEXT) = $${params.indexOf(search) + 1} THEN 1 ELSE 0 END DESC, sub.rank DESC, sub.name ASC`;
      } else {
        orderByClause = `sub."createdAt" DESC, sub.name ASC`;
      }
    }
    
    // Pagination parameters
    const limitParamIdx = params.push(limit);
    const skipParamIdx = params.push(skip);
    
    const query = `
      SELECT * FROM (
        SELECT *, ${rankSelect}
        FROM "SearchableProducts"
        ${whereClause}
      ) AS sub
      ORDER BY ${orderByClause}
      LIMIT $${limitParamIdx} OFFSET $${skipParamIdx}
    `;
    
    const countQuery = `
      SELECT COUNT(*)::integer as total
      FROM "SearchableProducts"
      ${whereClause}
    `;
    
    // Parameters for count do not include pagination limit/skip
    const countParams = params.slice(0, params.length - 2);
    
    // 3. Execute both queries in parallel for performance
    const [data, countResult] = await Promise.all([
      prisma.$queryRawUnsafe(query, ...params),
      prisma.$queryRawUnsafe(countQuery, ...countParams)
    ]) as [any[], any[]];

    // 4. Extract count safely
    const total = Number(countResult[0]?.total || 0);

    return NextResponse.json({ 
      success: true, 
      data, 
      total, 
      totalPages: Math.ceil(total / limit) 
    });
  } catch (error) {
    console.error("SEARCH_API_ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}