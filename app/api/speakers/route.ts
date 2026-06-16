import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { deleteByIdQuerySchema, speakerFormSchema, speakerQuerySchema } from "@/lib/schemas";
import { fail, handleApiError, ok, parseSearchParams, requireAdminAuth } from "@/lib/api";

const speakerSelect = {
  id: true,
  name: true,
  price: true,
  image: true,
  description: true,
  rating: true,
  reviews: true,
  condition: true,
  brand: true,
  batteryLife: true,
  createdAt: true,
  updatedAt: true,
};

function zodErrorResponse(error: ZodError) {
  const fieldErrors: Record<string, string[]> = {};

  error.issues.forEach((issue) => {
    const key = issue.path[0] as string;
    if (!fieldErrors[key]) fieldErrors[key] = [];
    fieldErrors[key].push(issue.message);
  });

  return Response.json(
    {
      success: false,
      error: "Validation error",
      fields: fieldErrors,
    },
    { status: 400 }
  );
}

function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

async function uploadImages(files: File[]) {
  return (await Promise.all(files.filter((file) => file.size > 0).map(async (file) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "rujamaphone/speakers" },
        (error, result) => (error ? reject(error) : resolve(result))
      ).end(buffer);
    });
    return uploadResult?.secure_url as string | undefined;
  }))).filter((url): url is string => Boolean(url));
}

export async function GET(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { page, limit, search, brand, condition, minPrice, maxPrice } =
      parseSearchParams(request, speakerQuerySchema);
    const AND: any[] = [];
    if (search) AND.push({ name: { contains: search, mode: "insensitive" } });
    if (brand) AND.push({ brand });
    if (condition) AND.push({ condition });
    if (minPrice > 0) AND.push({ price: { gte: minPrice } });
    if (maxPrice > 0) AND.push({ price: { lte: maxPrice } });

    const where = AND.length > 0 ? { AND } : undefined;
    const skip = (page - 1) * limit;
    const [total, speakers] = await Promise.all([
      prisma.speaker.count({ where }),
      prisma.speaker.findMany({
        where,
        select: speakerSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    return ok({ data: speakers, total, page, totalPages: Math.max(Math.ceil(total / limit), 1) });
  } catch (error) {
    return handleApiError("speakers.GET", error);
  }
}

import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    configureCloudinary();
    const formData = await request.formData();

    const validated = speakerFormSchema.parse({
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description") || null,
      brand: formData.get("brand"),
      condition: formData.get("condition"),
      batteryLife: formData.get("batteryLife") || null,
    });

    const image = await uploadImages(formData.getAll("images") as File[]);
    if (image.length === 0) return fail("At least one image is required", 400);

    const newSpeaker = await prisma.speaker.create({
      data: { ...validated, image },
      select: speakerSelect,
    });

    return ok(newSpeaker, 201);

  } catch (error: any) {
  // Zod validation error
  if (error instanceof ZodError) {
    return zodErrorResponse(error);
  }

  // Prisma known errors (important!)
  if (error?.name === "PrismaClientKnownRequestError") {
    return Response.json(
      {
        success: false,
        error: "Database error",
      },
      { status: 500 }
    );
  }

  // Cloudinary or other errors
  return Response.json(
    {
      success: false,
      error: error?.message || "Internal server error",
    },
    { status: 500 }
  );
}
}

export async function DELETE(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = parseSearchParams(request, deleteByIdQuerySchema);
    await prisma.speaker.delete({ where: { id }, select: { id: true } });
    return ok({ message: "Speaker tracking record deleted" });
  } catch (error) {
    return handleApiError("speakers.DELETE", error);
  }
}
