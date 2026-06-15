import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { deleteByIdQuerySchema } from "@/lib/schemas";
import { fail, handleApiError, ok, parseSearchParams, requireAdminAuth } from "@/lib/api";

const sliderSelect = {
  id: true,
  image: true,
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

async function uploadSlider(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadResult = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "rujamaphone/sliders" },
      (error, result) => (error ? reject(error) : resolve(result))
    ).end(buffer);
  });
  return uploadResult?.secure_url as string | undefined;
}

export async function GET() {
  try {
    const sliders = await prisma.sliderImage.findMany({
      select: sliderSelect,
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return ok(sliders, 200, {
      headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" },
    });
  } catch (error) {
    return handleApiError("sliders.GET", error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    configureCloudinary();
    const formData = await request.formData();
    const files = (formData.getAll("images") as File[]).filter((file) => file.size > 0);

    if (files.length === 0) return fail("No slider image file provided", 400);
    if (files.length > 10) return fail("A maximum of 10 images can be uploaded at once", 400);

    const urls = (await Promise.all(files.map(uploadSlider))).filter((url): url is string => Boolean(url));
    const createdSliders = await prisma.$transaction(
      urls.map((image) =>
        prisma.sliderImage.create({
          data: { image },
          select: sliderSelect,
        })
      )
    );

    return ok(createdSliders, 201);
  } catch (error) {
    return handleApiError("sliders.POST", error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = parseSearchParams(request, deleteByIdQuerySchema);
    await prisma.sliderImage.delete({ where: { id }, select: { id: true } });
    return ok({ message: "Slider image deleted successfully" });
  } catch (error) {
    return handleApiError("sliders.DELETE", error);
  }
}
