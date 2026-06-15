export const runtime = "nodejs";

import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { accessoryFormSchema, idSchema, productImagesSchema } from "@/lib/schemas";
import { fail, handleApiError, ok, parseJson, parseRouteParams, requireAdminAuth } from "@/lib/api";
import { z } from "zod";

const accessorySelect = {
  id: true,
  name: true,
  price: true,
  image: true,
  description: true,
  rating: true,
  reviews: true,
  condition: true,
  brand: true,
  type: true,
  createdAt: true,
  updatedAt: true,
};

function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

function parseExistingImages(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") return [];
  const parsed = JSON.parse(value);
  return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
}

async function uploadImages(files: File[]) {
  return (await Promise.all(files.filter((file) => file.size > 0).map(async (file) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "rujamaphone/accessories" },
        (error, result) => (error ? reject(error) : resolve(result))
      ).end(buffer);
    });
    return uploadResult?.secure_url as string | undefined;
  }))).filter((url): url is string => Boolean(url));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = await parseRouteParams(params, idSchema);
    const item = await prisma.accessory.findUnique({ where: { id }, select: accessorySelect });
    return item ? ok(item) : fail("Accessory not found", 404);
  } catch (error) {
    return handleApiError("accessories.id.GET", error);
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
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await parseJson(
        request,
        accessoryFormSchema.partial().extend({ image: productImagesSchema.optional() }).refine(
          (value) => Object.keys(value).length > 0,
          "At least one field is required"
        ) as z.ZodTypeAny
      );
      const updated = await prisma.accessory.update({
        where: { id },
        data: data as any,
        select: accessorySelect,
      });
      return ok(updated);
    }

    configureCloudinary();
    const formData = await request.formData();
    const validated = accessoryFormSchema.parse({
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description") || null,
      brand: formData.get("brand"),
      condition: formData.get("condition"),
      type: formData.get("type"),
    });
    const existingImages = parseExistingImages(formData.get("existingImages"));
    const uploadedImageUrls = await uploadImages(formData.getAll("images") as File[]);
    const image = [...existingImages, ...uploadedImageUrls];
    if (image.length === 0) return fail("At least one image is required", 400);

    const updated = await prisma.accessory.update({
      where: { id },
      data: { ...validated, image },
      select: accessorySelect,
    });

    return ok(updated);
  } catch (error) {
    return handleApiError("accessories.id.PATCH", error);
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
    await prisma.accessory.delete({ where: { id }, select: { id: true } });
    return ok({ message: "Accessory record deleted" });
  } catch (error) {
    return handleApiError("accessories.id.DELETE", error);
  }
}
