import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { Role } from "@prisma/client";
import { config } from "../config.js";
import { AppError } from "../lib/errors.js";

type TokenPayload = { sub: string; role: Role; retailerId?: string };

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) return next(new AppError(401, "UNAUTHORIZED", "Authentication required"));
  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as TokenPayload;
    req.user = { id: payload.sub, role: payload.role, retailerId: payload.retailerId };
    next();
  } catch {
    next(new AppError(401, "INVALID_TOKEN", "Token is invalid or expired"));
  }
}

export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) return next(new AppError(403, "FORBIDDEN", "Insufficient permissions"));
    next();
  };
}
