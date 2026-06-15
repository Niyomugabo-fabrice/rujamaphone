import { z } from "zod";
export const idSchema = z.object({
  id: z.string().uuid("Invalid id"),
});

export const conditionSchema = z.enum(["NEW", "USED"]);
export const smartphoneBrandSchema = z.enum(["APPLE", "SAMSUNG", "GOOGLE", "XIAOMI", "ONEPLUS"]);
export const speakerBrandSchema = z.enum(["JBL", "SONY", "BOSE", "APPLE", "ANKER"]);
export const accessoryBrandSchema = z.enum(["APPLE", "SAMSUNG", "ANKER", "BASEUS", "GENERIC"]);
export const storageSchema = z.enum(["GB64", "GB128", "GB256", "GB512", "TB1"]);
export const accessoryTypeSchema = z.enum(["Cable", "Case", "Charger", "Screen Protector", "Headphones", "Other"]);

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().trim().max(100).optional().default(""),
  brand: z.string().trim().max(40).optional().default(""),
  condition: z.string().trim().max(20).optional().default(""),
  minPrice: z.coerce.number().int().min(0).optional().default(0),
  maxPrice: z.coerce.number().int().min(0).optional().default(0),
});

export const deleteByIdQuerySchema = z.object({
  id: z.string().uuid("Invalid id"),
});

export const publicProductsQuerySchema = z.object({
  search: z.string().trim().max(100).optional().default(""),
  category: z.enum(["SMARTPHONE", "SPEAKER", "ACCESSORY"]).optional(),
  brand: z.string().trim().max(40).optional(),
  condition: conditionSchema.optional(),
  storage: storageSchema.optional(),
  batteryLife: z.string().trim().max(80).optional(),
  type: accessoryTypeSchema.optional(),
  sort: z.enum(["createdAt-desc", "createdAt-asc", "price-asc", "price-desc", "rating-desc", "rating-asc"]).optional().default("createdAt-desc"),
  suggestions: z.enum(["1"]).optional(),
  minPrice: z.coerce.number().int().min(0).optional().default(0),
  maxPrice: z.coerce.number().int().min(0).optional().default(999999999),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(12),
});

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters long"),

  price: z.coerce
    .number()
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1 RWF"),

  description: z.string().optional().or(z.literal("")),

  brand: smartphoneBrandSchema,
  condition: conditionSchema,
  storage: storageSchema.optional().nullable(),

  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one product image is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const smartphoneQuerySchema = paginationQuerySchema.extend({
  brand: smartphoneBrandSchema.optional().or(z.literal("")).default(""),
  condition: conditionSchema.optional().or(z.literal("")).default(""),
  storage: storageSchema.optional().or(z.literal("")).default(""),
});

export const speakerQuerySchema = paginationQuerySchema.extend({
  brand: speakerBrandSchema.optional().or(z.literal("")).default(""),
  condition: conditionSchema.optional().or(z.literal("")).default(""),
});

export const accessoryQuerySchema = paginationQuerySchema.extend({
  brand: accessoryBrandSchema.optional().or(z.literal("")).default(""),
  condition: conditionSchema.optional().or(z.literal("")).default(""),
  type: accessoryTypeSchema.optional().or(z.literal("")).default(""),
});

export const smartphoneFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  price: z.coerce.number().int().positive(),
  description: z.string().trim().max(2000).optional().nullable(),
  brand: smartphoneBrandSchema,
  storage: storageSchema,
  condition: conditionSchema,
});

export const speakerFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  price: z.coerce.number().int().positive(),
  description: z.string().trim().max(2000).optional().nullable(),
  brand: speakerBrandSchema,
  condition: conditionSchema,
  batteryLife: z.string().trim().max(80).optional().nullable(),
});

export const accessoryFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  price: z.coerce.number().int().positive(),
  description: z.string().trim().max(2000).optional().nullable(),
  brand: accessoryBrandSchema,
  condition: conditionSchema,
  type: accessoryTypeSchema,
});

export const productImagesSchema = z.array(z.string().url()).min(1).max(10);

// ==========================================
// AUTHENTICATION SCHEMAS
// ==========================================

export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters long").optional(),
  avatar: z.string().url("Invalid avatar URL").optional(),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: "New password must be different from current password",
  path: ["newPassword"],
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
