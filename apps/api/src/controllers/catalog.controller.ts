import type { Request, Response } from "express";
import * as catalog from "../services/catalog.service.js";
export const search = async (req: Request, res: Response) => res.json(await catalog.searchProducts(req.query as unknown as { q?: string; category?: string; page: number; limit: number }));
