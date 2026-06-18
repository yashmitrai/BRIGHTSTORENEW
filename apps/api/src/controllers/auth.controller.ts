import type { Request, Response } from "express";
import * as auth from "../services/auth.service.js";
export const register = async (req: Request, res: Response) => res.status(201).json(await auth.register(req.body));
export const login = async (req: Request, res: Response) => res.json(await auth.login(req.body));
