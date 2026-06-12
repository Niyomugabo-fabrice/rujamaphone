export const runtime = "nodejs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAuth } from "@/lib/auth-check";
import { handleApiError } from "@/lib/util/errorhandle";

// GET: Single item
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await checkAuth();
    const { id } = await params;

    const item = await prisma.smartphone.findUnique({
      where: { id },
    });

    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Item not found" }, { status: 404 });
  } catch (error: any) {
    return handleApiError(error);
  }
}

// PATCH: Update item
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await checkAuth();
    const { id } = await params;
    const body = await request.json();

    // Whitelist only valid fields
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
    return handleApiError(error);
  }
}

// DELETE: Remove item
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await checkAuth();
    const { id } = await params;

    await prisma.smartphone.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return handleApiError(error);
  }
}