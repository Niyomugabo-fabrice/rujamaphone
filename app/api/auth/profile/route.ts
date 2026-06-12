import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { updateProfileSchema } from "@/lib/schemas";
import type { User } from "@/types/auth";

export async function PUT(request: Request) {
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
    
    const body = await request.json();
    
    // Validate input
    const validatedData = updateProfileSchema.parse(body);
    
    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        ...(validatedData.fullName && { fullName: validatedData.fullName }),
        ...(validatedData.avatar && { avatar: validatedData.avatar }),
      },
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
    
    const userResponse: User = updatedUser as User;
    
    return NextResponse.json({ user: userResponse });
  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);
    
    if (error instanceof Error && error.message === "Invalid or expired token") {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
