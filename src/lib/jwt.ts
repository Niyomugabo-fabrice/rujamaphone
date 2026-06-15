import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import type { JWTPayload } from "@/types/auth";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const JWT_SECRET: string = process.env.JWT_SECRET;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "7d";

// -------------------------
// GENERATE TOKEN
// -------------------------
export function generateToken(
  payload: Omit<JWTPayload, "iat" | "exp">
): string {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as any, // safest TS fix
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

// -------------------------
// VERIFY TOKEN
// -------------------------
export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    throw new Error("Unauthorized");
  }
}

// -------------------------
// DECODE TOKEN
// -------------------------
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}

// -------------------------
// CHECK EXPIRY
// -------------------------
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);

  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}
