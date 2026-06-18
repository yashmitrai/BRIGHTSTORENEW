import type { Request, Response } from "express";
import { parse } from "csv-parse/sync";
import type { Server } from "socket.io";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../lib/errors.js";
import { upsertInventory } from "../services/inventory.service.js";
export const list = async (req: Request, res: Response) => {
  if (!req.user?.retailerId) throw new AppError(403, "RETAILER_REQUIRED", "Retailer profile required");
  const stores = await prisma.store.findMany({ where: { retailerId: req.user.retailerId }, select: { id: true } });
  res.json(await prisma.inventory.findMany({ where: { storeId: { in: stores.map(s=>s.id) } }, include: { product: true, store: true } }));
};
export const save = (io: Server) => async (req: Request, res: Response) => {
  const store = await prisma.store.findFirst({ where: { retailerId: req.user?.retailerId } });
  if (!store) throw new AppError(403, "STORE_REQUIRED", "An active store is required");
  const inventoryId = req.params.id ? String(req.params.id) : undefined;
  res.status(inventoryId ? 200 : 201).json(await upsertInventory(store.id, req.body, io, inventoryId));
};
export const bulk = (io: Server) => async (req: Request, res: Response) => {
  if (!req.file) throw new AppError(400, "CSV_REQUIRED", "CSV file is required");
  const store = await prisma.store.findFirst({ where: { retailerId: req.user?.retailerId } });
  if (!store) throw new AppError(403, "STORE_REQUIRED", "An active store is required");
  const rows = parse(req.file.buffer, { columns: true, skip_empty_lines: true, trim: true }) as Record<string,string>[];
  if (rows.length > 5000) throw new AppError(400, "CSV_TOO_LARGE", "CSV can contain at most 5,000 rows");
  const results = [];
  for (const row of rows) results.push(await upsertInventory(store.id, { productId: row.productId, productName: row.productName, categoryId: row.categoryId, sku: row.sku, pricePaise: Number(row.pricePaise), mrpPaise: Number(row.mrpPaise), stock: Number(row.stock), lowStockAt: Number(row.lowStockAt||10), isAvailable: row.isAvailable !== "false" }, io));
  res.status(201).json({ imported: results.length, items: results });
};
