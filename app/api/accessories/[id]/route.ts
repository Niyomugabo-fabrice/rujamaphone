export const runtime = "nodejs";

import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { accessoryFormSchema, idSchema, productImagesSchema } from "@/lib/schemas";
import { fail, handleApiError, ok, parseJson, parseRouteParams, requireAdminAuth } from "@/lib/api";
import { z } from "zod";
import {ApiStatus } from '@/lib/api'

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

    let updateData: any;

    // 1. Handle JSON
    if (contentType.includes("application/json")) {
      const body = await request.json();
      updateData = accessoryFormSchema.partial().parse(body);
    } 
    // 2. Handle FormData
    else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      configureCloudinary();
      
      const files = formData.getAll("images") as File[];
      const existingImages = parseExistingImages(formData.get("existingImages"));
      const uploadedImageUrls = await uploadImages(files);
      
      // Construct raw input
      const rawInput = {
        name: formData.get("name"),
        price: formData.get("price") ? parseFloat(formData.get("price") as string) : undefined,
        description: formData.get("description") || undefined,
        brand: formData.get("brand"),
        condition: formData.get("condition"),
        type: formData.get("type") || "UNKNOWN",
        image: [...existingImages, ...uploadedImageUrls],
      };

      // Validate against schema to ensure data integrity
      updateData = accessoryFormSchema.partial().parse(rawInput);
    } else {
      // Ensure 415 is added to your ApiStatus type in @/lib/api.ts
      return fail("Unsupported Content-Type", 415 as any);
    }

    // Remove undefined fields so Prisma ignores them
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updated = await prisma.accessory.update({
      where: { id },
      data: updateData,
      select: accessorySelect,
    });

    return ok(updated);
  } catch (error: any) {
    console.error("PATCH ERROR:", error);
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
