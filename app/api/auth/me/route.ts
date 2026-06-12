import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import type { User } from "@/types/auth";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    
    // Verify token
    const decoded = verifyToken(token);
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        avatar: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
        status: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    const userResponse: User = user as User;
    
    return NextResponse.json({ user: userResponse });
  } catch (error) {
    console.error("GET_USER_ERROR:", error);
    
    if (error instanceof Error && error.message === "Invalid or expired token") {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
