import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { checkAuth } from "@/lib/auth-check";
import { handleApiError } from "@/lib/util/errorhandle";

// GET: Fetch all slider images
export async function GET(request: Request) {
  try {
    const sliders = await prisma.sliderImage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: sliders }, { status: 200 });
  } catch (error: any) {
    return handleApiError(error);
  }
}

// POST: Add new slider image(s)
export async function POST(request: Request) {
  try {
    await checkAuth();

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const formData = await request.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      throw new Error("No slider image file provided");
    }

    const createdSliders = [];
    for (const file of files) {
      if (file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "rujamaphone/sliders" },
            (error, result) => (error ? reject(error) : resolve(result))
          ).end(buffer);
        });

        if (uploadResult?.secure_url) {
          const newSlider = await prisma.sliderImage.create({
            data: {
              image: uploadResult.secure_url,
            },
          });
          createdSliders.push(newSlider);
        }
      }
    }

    return NextResponse.json({ success: true, data: createdSliders }, { status: 201 });
  } catch (error: any) {
    return handleApiError(error);
  }
}

// DELETE: Delete a slider image
export async function DELETE(request: Request) {
  try {
    await checkAuth();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) throw new Error("Missing id parameter");

    await prisma.sliderImage.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Slider image deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return handleApiError(error);
  }
}
