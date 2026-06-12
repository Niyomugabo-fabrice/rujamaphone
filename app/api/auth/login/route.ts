import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/password";
import { generateToken } from "@/lib/jwt";
import { loginSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);
    
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (!user || user.status !== "ACTIVE") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    
    const isPasswordValid = await comparePassword(validatedData.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    
    const token = generateToken({ userId: user.id, email: user.email, role: user.role });
    
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });
    
    const response = NextResponse.json({
      user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
    });

    // SET THE COOKIE
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    
    return response;
  } catch (error) {
    console.error("LOGIN_ERROR:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}