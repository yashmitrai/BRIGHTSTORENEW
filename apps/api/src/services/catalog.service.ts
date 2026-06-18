import { prisma } from "../lib/prisma.js";
export async function searchProducts(input: { q?: string; category?: string; page: number; limit: number }) {
  const where = { isActive: true, ...(input.q ? { OR: [{ name: { contains: input.q, mode: "insensitive" as const } }, { brand: { contains: input.q, mode: "insensitive" as const } }] } : {}), ...(input.category ? { category: { slug: input.category } } : {}) };
  const [items, total] = await prisma.$transaction([
    prisma.product.findMany({ where, include: { category: true, inventories: { where: { isAvailable: true, stock: { gt: 0 } }, orderBy: { pricePaise: "asc" }, take: 5, include: { store: true } } }, skip: (input.page-1)*input.limit, take: input.limit, orderBy: { name: "asc" } }),
    prisma.product.count({ where })
  ]);
  return { items, page: input.page, limit: input.limit, total };
}
