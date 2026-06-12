import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { resetPasswordSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = resetPasswordSchema.parse(body);
    
    // Find user by reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: validatedData.token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(validatedData.password);
    
    // Update user password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });
    
    return NextResponse.json({
      message: "Password reset successfully. Please login with your new password.",
    });
  } catch (error) {
    console.error("RESET_PASSWORD_ERROR:", error);
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
