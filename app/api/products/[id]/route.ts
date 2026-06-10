import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/schemas";

interface RouteParams {
  params: { id: string };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true, brand: true },
    });
    if (!product) return NextResponse.json({ error: "Product matrix record missing" }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed tracking product payload" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();
    const validation = productSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
    }

    const data = validation.data;
    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        image: JSON.stringify(data.images),
        condition: data.condition,
        storage: data.storage || null,
        categoryId: data.categoryId,
        brandId: data.brandId,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: "Patch synchronization failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Product asset completely purged" });
  } catch (error) {
    return NextResponse.json({ error: "Target operational execution error" }, { status: 500 });
  }
}