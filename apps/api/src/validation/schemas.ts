import { z } from "zod";

export const registerSchema = z.object({ body: z.object({
  name: z.string().min(2).max(100), email: z.string().email(), phone: z.string().min(8).optional(), password: z.string().min(8)
}), query: z.object({}), params: z.object({}) });
export const loginSchema = z.object({ body: z.object({ email: z.string().email(), password: z.string().min(1) }), query: z.object({}), params: z.object({}) });
export const searchSchema = z.object({ body: z.object({}).optional(), query: z.object({
  q: z.string().max(120).optional(), category: z.string().optional(), lat: z.coerce.number().optional(), lng: z.coerce.number().optional(),
  page: z.coerce.number().int().positive().default(1), limit: z.coerce.number().int().min(1).max(100).default(24)
}), params: z.object({}) });
export const inventorySchema = z.object({ body: z.object({
  productId: z.string().cuid().optional(), productName: z.string().min(2).optional(), sku: z.string().min(1),
  pricePaise: z.number().int().nonnegative(), mrpPaise: z.number().int().positive(), stock: z.number().int().nonnegative(),
  lowStockAt: z.number().int().nonnegative().default(10), categoryId: z.string().cuid().optional(), isAvailable: z.boolean().default(true)
}), query: z.object({}), params: z.object({ id: z.string().cuid().optional() }) });
export const orderStatusSchema = z.object({ body: z.object({ status: z.enum(["CONFIRMED","PACKING","READY","OUT_FOR_DELIVERY","DELIVERED","CANCELLED"]) }), query: z.object({}), params: z.object({ id: z.string().cuid() }) });
export const optimizeSchema = z.object({ body: z.object({
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })).min(1).max(50),
  offers: z.array(z.object({ storeId: z.string(), storeName: z.string(), productId: z.string(), unitPricePaise: z.number().int().nonnegative(), availableStock: z.number().int().nonnegative(), deliveryFeePaise: z.number().int().nonnegative().default(0) })),
  maxStores: z.number().int().min(1).max(5).default(3)
}), query: z.object({}), params: z.object({}) });
