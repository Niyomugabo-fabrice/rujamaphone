import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Single item
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // console.log("GET params id:", id);

  const item = await prisma.smartphone.findUnique({
    where: { id },
  });

  // console.log("GET result:", item);

  return item
    ? NextResponse.json(item)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}



export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // console.log("PATCH BODY:", body);

    // ✅ whitelist only valid Prisma fields
    const data = {
      name: body.name,
      brand: body.brand,
      storage: body.storage,
      condition: body.condition,
      description: body.description,
      price: body.price,
      image: body.image,
    };

    const updated = await prisma.smartphone.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    // console.log("PATCH ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove item
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // console.log("DELETE params id:", id);

    await prisma.smartphone.delete({
      where: { id },
    });

    // console.log("DELETE success for id:", id);

    return NextResponse.json({
      message: "Deleted",
    });
  } catch (error) {
    // console.log("DELETE error:", error);

    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    );
  }
}