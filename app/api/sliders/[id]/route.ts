export const runtime = "nodejs";

import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { idSchema } from "@/lib/schemas";
import { fail, handleApiError, ok, parseRouteParams, requireAdminAuth } from "@/lib/api";

function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = await parseRouteParams(params, idSchema);
    configureCloudinary();
    const formData = await request.formData();
    const files = (formData.getAll("images") as File[]).filter((file) => file.size > 0);
    if (files.length === 0) return fail("No image file provided for editing", 400);

    const buffer = Buffer.from(await files[0].arrayBuffer());
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "rujamaphone/sliders" },
        (error, result) => (error ? reject(error) : resolve(result))
      ).end(buffer);
    });

    if (!uploadResult?.secure_url) return fail("Cloudinary upload failed", 500);

    const updated = await prisma.sliderImage.update({
      where: { id },
      data: { image: uploadResult.secure_url },
      select: {
        id: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return ok(updated);
  } catch (error) {
    return handleApiError("sliders.id.PATCH", error);
  }
}
