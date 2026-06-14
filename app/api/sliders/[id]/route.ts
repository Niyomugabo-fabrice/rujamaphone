import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { checkAuth } from "@/lib/auth-check";
import { handleApiError } from "@/lib/util/errorhandle";

export const runtime = "nodejs";

// PATCH: Update/Replace a slider image
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await checkAuth();
    const { id } = await params;
    const formData = await request.formData();
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const files = formData.getAll("images") as File[];
    
    if (!files || files.length === 0 || files[0].size === 0) {
      throw new Error("No image file provided for editing");
    }

    const file = files[0];
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "rujamaphone/sliders" },
        (error, result) => (error ? reject(error) : resolve(result))
      ).end(buffer);
    });

    if (!uploadResult?.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    const updated = await prisma.sliderImage.update({
      where: { id },
      data: {
        image: uploadResult.secure_url,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return handleApiError(error);
  }
}
