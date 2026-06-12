import { z } from "zod";
import { 
  Condition, 
  StorageCapacity, 
  SmartphoneBrand 
} from "../../prisma/generated/client";

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