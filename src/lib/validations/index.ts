import { z } from "zod";

/**
 * Customer Authentication Schemas
 */
export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
    email: z.string().trim().email("Please enter a valid email address"),
    phone: z.string().trim().optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Checkout & Shipping Address Schemas
 */
export const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  phone: z.string().trim().min(7, "Valid phone number is required"),
  addressLine1: z.string().trim().min(5, "Street address is required"),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().min(2, "City is required"),
  state: z.string().trim().min(2, "State / Province is required"),
  postalCode: z.string().trim().min(4, "Valid postal code is required"),
  country: z.string().trim().min(2, "Country is required"),
  isDefault: z.boolean().optional().default(false),
});

export type AddressInput = z.infer<typeof addressSchema>;

export const checkoutSchema = z.object({
  email: z.string().trim().email("Valid email is required"),
  fullName: z.string().trim().min(2, "Full name is required"),
  phone: z.string().trim().min(7, "Valid contact number is required"),
  shippingAddress: addressSchema,
  billingSameAsShipping: z.boolean().default(true),
  billingAddress: addressSchema.optional(),
  paymentMethod: z.enum(["razorpay", "cod"]),
  notes: z.string().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

/**
 * Client Product Review Schema
 */
export const reviewSchema = z.object({
  productId: z.string(),
  userName: z.string().trim().min(2, "Your name is required"),
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().min(2, "Review headline is required"),
  comment: z.string().trim().min(10, "Review comment must be at least 10 characters"),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

/**
 * Newsletter Subscription Schema
 */
export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

/**
 * Admin Product Management Schema
 */
export const productSchema = z.object({
  name: z.string().trim().min(2, "Product name is required"),
  slug: z.string().trim().min(2, "Product slug is required"),
  sku: z.string().trim().min(2, "SKU is required"),
  description: z.string().trim().min(10, "Description is required"),
  details: z.array(z.string()).default([]),
  price: z.number().positive("Price must be greater than zero"),
  salePrice: z.number().positive().nullable().optional(),
  categoryId: z.string().min(1, "Category is required"),
  collectionId: z.string().min(1, "Collection is required"),
  gender: z.enum(["men", "women", "unisex"]),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
  colors: z.array(z.object({ name: z.string(), hex: z.string() })).min(1),
  images: z.array(z.string()).min(1, "At least one product image is required"),
  isFeatured: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;
