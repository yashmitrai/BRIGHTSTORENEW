import type { ErrorRequestHandler } from "express";
import { AppError } from "../lib/errors.js";
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const appError = error instanceof AppError ? error : new AppError(500, "INTERNAL_ERROR", "Something went wrong");
  if (!(error instanceof AppError)) console.error(error);
  res.status(appError.status).json({ error: { code: appError.code, message: appError.message, details: appError.details } });
};
