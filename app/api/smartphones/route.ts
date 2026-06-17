import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { ZodError } from "zod";

// 
import {
  deleteByIdQuerySchema,
  smartphoneFormSchema,
  smartphoneQuerySchema,
} from "@/lib/schemas";
import {
  fail,
  handleApiError,
  ok,
  parseSearchParams,
  requireAdminAuth,
} from "@/lib/api";

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

function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

async function uploadImages(files: File[]) {
  const uploads = files
    .filter((file) => file.size > 0)
    .map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "rujamaphone/products" },
          (error, result) => (error ? reject(error) : resolve(result))
        ).end(buffer);
      });

      return uploadResult?.secure_url as string | undefined;
    });

  return (await Promise.all(uploads)).filter((url): url is string => Boolean(url));
}

export async function GET(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { page, limit, search, brand, condition, storage, minPrice, maxPrice } =
      parseSearchParams(request, smartphoneQuerySchema);

    const AND: any[] = [];
    if (search) {
      AND.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { brand: { equals: brand || undefined } },
        ].filter((item) => JSON.stringify(item) !== "{}"),
      });
    }
    if (brand) AND.push({ brand });
    if (condition) AND.push({ condition });
    if (storage) AND.push({ storage });
    if (minPrice > 0) AND.push({ price: { gte: minPrice } });
    if (maxPrice > 0) AND.push({ price: { lte: maxPrice } });

    const where = AND.length > 0 ? { AND } : undefined;
    const skip = (page - 1) * limit;

    const [total, smartphones] = await Promise.all([
      prisma.smartphone.count({ where }),
      prisma.smartphone.findMany({
        where,
        select: smartphoneSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    return ok({
      data: smartphones,
      total,
      page,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    });
  } catch (error) {
    return handleApiError("smartphones.GET", error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    configureCloudinary();
    const formData = await request.formData();
    const validated = smartphoneFormSchema.parse({
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description") || null,
      brand: formData.get("brand"),
      storage: formData.get("storage"),
      condition: formData.get("condition"),
    });
    const files = formData.getAll("images") as File[];
    const image = await uploadImages(files);

    if (image.length === 0) return fail("At least one image is required", 400);

    const newSmartphone = await prisma.smartphone.create({
      data: {
        ...validated,
        image,
      },
      select: smartphoneSelect,
    });

    return ok(newSmartphone, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return fail("Validation failed", 400, {
        errors: error.flatten().fieldErrors,
      });
    }

    return handleApiError("smartphones.POST", error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = parseSearchParams(request, deleteByIdQuerySchema);
    await prisma.smartphone.delete({
      where: { id },
      select: { id: true },
    });

    return ok({ message: "Smartphone tracking record deleted" });
  } catch (error) {
    return handleApiError("smartphones.DELETE", error);
  }
}
