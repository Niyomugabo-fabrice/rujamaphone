import { z } from "zod";
export const idSchema = z.object({
  id: z.string().uuid("Invalid id"),
});

export const conditionSchema = z.enum(["NEW", "USED"]);
export const brandSchema = z.string().trim().min(1, "Brand is required").max(50, "Brand name too long");
export const storageSchema = z.string().trim().min(1, "Storage is required").max(20, "Storage value too long");
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
  storage: z.string().trim().max(20).optional(),
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

  brand: brandSchema,
  condition: conditionSchema,
  storage: storageSchema.optional().nullable(),

  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one product image is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const smartphoneQuerySchema = paginationQuerySchema.extend({
  brand: brandSchema.optional().or(z.literal("")).default(""),
  condition: conditionSchema.optional().or(z.literal("")).default(""),
  storage: storageSchema.optional().or(z.literal("")).default(""),
});

export const speakerQuerySchema = paginationQuerySchema.extend({
  brand: brandSchema.optional().or(z.literal("")).default(""),
  condition: conditionSchema.optional().or(z.literal("")).default(""),
});

export const accessoryQuerySchema = paginationQuerySchema.extend({
  brand: brandSchema.optional().or(z.literal("")).default(""),
  condition: conditionSchema.optional().or(z.literal("")).default(""),
  type: accessoryTypeSchema.optional().or(z.literal("")).default(""),
});

export const smartphoneFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  price: z.coerce.number().int().positive(),
  description: z.string().trim().max(2000).optional().nullable(),
  brand: brandSchema,
  storage: storageSchema,
  condition: conditionSchema,
});

export const speakerFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  price: z.coerce.number().int().positive(),
  description: z.string().trim().max(2000).optional().nullable(),
  brand: brandSchema,
  condition: conditionSchema,
  batteryLife: z.string().trim().max(80).optional().nullable(),
});

export const accessoryFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  price: z.coerce.number().int().positive(),
  description: z.string().trim().max(2000).optional().nullable(),
  brand: brandSchema,
  condition: conditionSchema,
  type: z.string().trim().max(50).optional(),
});

export const productImagesSchema = z.array(z.string().url()).min(1).max(10);

export const announcementKindSchema = z.enum(["GENERAL", "PROMOTION", "PUBLIC_HOLIDAY"]);

const nullableDateInput = z
  .union([z.string().datetime(), z.string().date(), z.literal(""), z.null()])
  .optional()
  .transform((value) => {
    if (!value) return null;
    return new Date(value);
  });

export const announcementQuerySchema = z.object({
  scope: z.enum(["public", "admin"]).optional().default("public"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

const announcementBaseSchema = z.object({
  title: z.string().trim().min(2).max(120),
  message: z.string().trim().min(2).max(500),
  kind: announcementKindSchema.default("GENERAL"),
  isPublished: z.coerce.boolean().optional().default(false),
  startsAt: nullableDateInput,
  endsAt: nullableDateInput,
});

export const announcementFormSchema = announcementBaseSchema.refine(
  (value) => !value.startsAt || !value.endsAt || value.startsAt <= value.endsAt,
  {
    message: "Start date must be before end date",
    path: ["endsAt"],
  }
);

export const announcementPatchSchema = announcementBaseSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: "At least one field is required" }
).refine(
  (value) => !value.startsAt || !value.endsAt || value.startsAt <= value.endsAt,
  {
    message: "Start date must be before end date",
    path: ["endsAt"],
  }
);

export const announcementUpdateSchema = announcementPatchSchema.and(idSchema);

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
