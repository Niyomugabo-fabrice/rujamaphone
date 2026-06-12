import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { comparePassword, hashPassword } from "@/lib/password";
import { changePasswordSchema } from "@/lib/schemas";

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
    const validatedData = changePasswordSchema.parse(body);
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Verify current password
    const isCurrentPasswordValid = await comparePassword(
      validatedData.currentPassword,
      user.password
    );
    
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(validatedData.newPassword);
    
    // Update user password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    
    return NextResponse.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("CHANGE_PASSWORD_ERROR:", error);
    
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
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}
