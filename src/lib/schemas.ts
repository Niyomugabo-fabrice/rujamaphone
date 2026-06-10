import { z } from "zod";
import {
  Condition,
  StorageCapacity,
  SmartphoneBrand,
} from "@prisma/client";

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters long"),

  price: z.coerce
    .number()
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1 RWF"),

  description: z.string().optional().or(z.literal("")),

  brand: z.nativeEnum(SmartphoneBrand, {
    message: "Please select a valid smartphone brand",
  }),

  condition: z.nativeEnum(Condition, {
    message: "Please select a valid condition (NEW or USED)",
  }),

  storage: z.nativeEnum(StorageCapacity).optional().nullable(),

  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one product image is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;