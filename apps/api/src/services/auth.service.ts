import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../lib/errors.js";
import { config } from "../config.js";

function tokenFor(user: { id: string; role: "CUSTOMER"|"RETAILER"|"ADMIN"; retailer?: { id: string } | null }) {
  return jwt.sign({ sub: user.id, role: user.role, retailerId: user.retailer?.id }, config.JWT_SECRET, { expiresIn: "15m" });
}
export async function register(input: { name: string; email: string; phone?: string; password: string }) {
  if (await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } })) throw new AppError(409, "EMAIL_EXISTS", "An account with this email already exists");
  const user = await prisma.user.create({ data: { name: input.name, email: input.email.toLowerCase(), phone: input.phone, passwordHash: await bcrypt.hash(input.password, 12) } });
  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken: tokenFor(user) };
}
export async function login(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() }, include: { retailer: true } });
  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) throw new AppError(401, "INVALID_CREDENTIALS", "Email or password is incorrect");
  if (!user.isActive) throw new AppError(403, "ACCOUNT_DISABLED", "This account has been disabled");
  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken: tokenFor(user) };
}
