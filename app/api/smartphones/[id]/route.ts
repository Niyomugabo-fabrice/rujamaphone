export const runtime = "nodejs";

import prisma from "@/lib/prisma";
import { idSchema, productImagesSchema, smartphoneFormSchema } from "@/lib/schemas";
import {
  fail,
  handleApiError,
  ok,
  parseJson,
  parseRouteParams,
  requireAdminAuth,
} from "@/lib/api";
import { z } from "zod";

const smartphoneSelect = {
  id: true,
  name: true,
  price: true,
  image: true,
  description: true,
  rating: true,
  reviews: true,
  storage: true,
  condition: true,
  brand: true,
  createdAt: true,
  updatedAt: true,
};

const smartphonePatchSchema = smartphoneFormSchema.partial().extend({
  image: productImagesSchema.optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required",
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = await parseRouteParams(params, idSchema);
    const item = await prisma.smartphone.findUnique({
      where: { id },
      select: smartphoneSelect,
    });

    return item ? ok(item) : fail("Item not found", 404);
  } catch (error) {
    return handleApiError("smartphones.id.GET", error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = await parseRouteParams(params, idSchema);
    const data = await parseJson(request, smartphonePatchSchema as z.ZodTypeAny);

    const updated = await prisma.smartphone.update({
      where: { id },
      data: data as any,
      select: smartphoneSelect,
    });

    return ok(updated);
  } catch (error) {
    return handleApiError("smartphones.id.PATCH", error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = await parseRouteParams(params, idSchema);
    await prisma.smartphone.delete({ where: { id }, select: { id: true } });

    return ok({ message: "Deleted successfully" });
  } catch (error) {
    return handleApiError("smartphones.id.DELETE", error);
  }
}
