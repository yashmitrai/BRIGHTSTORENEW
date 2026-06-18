import type { Server } from "socket.io";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../lib/errors.js";

type Input = { productId?: string; productName?: string; sku: string; pricePaise: number; mrpPaise: number; stock: number; lowStockAt: number; categoryId?: string; isAvailable: boolean };
export async function upsertInventory(storeId: string, input: Input, io: Server, inventoryId?: string) {
  const inventory = await prisma.$transaction(async (tx) => {
    let productId = input.productId;
    if (!productId) {
      if (!input.productName || !input.categoryId) throw new AppError(400, "PRODUCT_REQUIRED", "A product or product name and category are required");
      const slugBase = input.productName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const product = await tx.product.create({ data: { name: input.productName, slug: `${slugBase}-${Date.now()}`, categoryId: input.categoryId } });
      productId = product.id;
    }
    const data = { productId, storeId, sku: input.sku, pricePaise: input.pricePaise, mrpPaise: input.mrpPaise, stock: input.stock, lowStockAt: input.lowStockAt, isAvailable: input.isAvailable && input.stock > 0, version: { increment: 1 } };
    return inventoryId
      ? tx.inventory.update({ where: { id: inventoryId, storeId }, data, include: { product: true, store: true } })
      : tx.inventory.upsert({ where: { storeId_sku: { storeId, sku: input.sku } }, create: { ...data, version: 1 }, update: data, include: { product: true, store: true } });
  });
  io.to(`store:${storeId}`).to("catalog").emit("inventory:updated", inventory);
  if (inventory.stock <= inventory.lowStockAt) io.to(`store:${storeId}`).emit("inventory:low-stock", inventory);
  return inventory;
}
