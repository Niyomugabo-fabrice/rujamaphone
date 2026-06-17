import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { generateProductSlug } from "@/lib/slug";
import {
  accessoryFormSchema,
  accessoryQuerySchema,
  deleteByIdQuerySchema,
} from "@/lib/schemas";
import {
  fail,
  handleApiError,
  ok,
  parseSearchParams,
  requireAdminAuth,
} from "@/lib/api";

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

async function uploadImages(files: File[]) {
  return (
    await Promise.all(
      files
        .filter((file) => file && file.size > 0)
        .map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());

          const uploadResult = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                { folder: "rujamaphone/accessories" },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              )
              .end(buffer);
          });

          return uploadResult?.secure_url;
        })
    )
  ).filter((url): url is string => Boolean(url));
}

export async function POST(request: Request) {
  try {
   

    const session = await requireAdminAuth(request);
    if (!session) {
      
      return fail("Unauthorized", 401);
    }

    configureCloudinary();

    const formData = await request.formData();

    
    

    
    const input = {
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description") || null,
      brand: formData.get("brand"),
      condition: formData.get("condition"),
      type: formData.get("type") || null,
    };

   

   
    const validated = accessoryFormSchema.parse(input);

   

    // 📸 FILES
    const files = formData.getAll("images") as File[];

    

    const image = await uploadImages(files);

    

    if (!image.length) {
      return fail("At least one image is required", 400);
    }

    // 🔥 FIX: SAFE DB PAYLOAD (NO NULL CRASH)
    const newAccessory = await prisma.accessory.create({
      data: {
        name: validated.name,
        price: validated.price,
        description: validated.description ?? "",
        brand: validated.brand,
        condition: validated.condition,
        type: validated.type ?? "UNKNOWN",
        image,
        slug: generateProductSlug(validated.name),
      },
    });

    

    return ok(newAccessory, 201);
  } catch (error: any) {
    

    return handleApiError("accessories.POST", error);
  }
}

export async function GET(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const {
      page,
      limit,
      search,
      brand,
      condition,
      type,
      minPrice,
      maxPrice,
    } = parseSearchParams(request, accessoryQuerySchema);

    const AND: any[] = [];

    if (search)
      AND.push({ name: { contains: search, mode: "insensitive" } });

    if (brand) AND.push({ brand });
    if (condition) AND.push({ condition });
    if (type) AND.push({ type });

    if (minPrice > 0) AND.push({ price: { gte: minPrice } });
    if (maxPrice > 0) AND.push({ price: { lte: maxPrice } });

    const where = AND.length > 0 ? { AND } : undefined;
    const skip = (page - 1) * limit;

    const [total, accessories] = await Promise.all([
      prisma.accessory.count({ where }),
      prisma.accessory.findMany({
        where,
        select: accessorySelect,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    return ok({
      data: accessories,
      total,
      page,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    });
  } catch (error) {
    return handleApiError("accessories.GET", error);
  }
}



export async function DELETE(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = parseSearchParams(request, deleteByIdQuerySchema);

    await prisma.accessory.delete({
      where: { id },
      select: { id: true },
    });

    return ok({ message: "Accessory tracking record deleted" });
  } catch (error) {
    return handleApiError("accessories.DELETE", error);
  }
}