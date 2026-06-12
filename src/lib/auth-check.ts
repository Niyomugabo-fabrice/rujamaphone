import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

// lib/auth-check.ts
export async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized: No token provided");

  const payload = verifyToken(token);
  
  // ADD THIS LOG TO SEE WHAT IS COMING FROM YOUR TOKEN
  console.log("TOKEN_PAYLOAD_DEBUG:", payload);

  return payload;
}