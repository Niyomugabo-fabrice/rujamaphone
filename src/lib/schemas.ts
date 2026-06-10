// src/lib/schemas.ts
import { z } from "zod";
import { Condition, Storage, Category, Brand } from "@prisma/client";

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters long"),
  price: z.coerce
    .number()
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1 RWF"),
  description: z.string().optional().or(z.literal("")),
  category: z.nativeEnum(Category, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  brand: z.nativeEnum(Brand, {
    errorMap: () => ({ message: "Please select a valid brand" }),
  }),
  condition: z.nativeEnum(Condition, {
    errorMap: () => ({ message: "Please select a valid condition (NEW or USED)" }),
  }),
  storage: z.nativeEnum(Storage).nullable().optional(),
  images: z
    .array(z.string().url("Invalid image URL layout"))
    .min(1, "At least one product image is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;