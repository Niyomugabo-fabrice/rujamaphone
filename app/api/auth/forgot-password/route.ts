import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/schemas";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = forgotPasswordSchema.parse(body);
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    // Always return success to prevent email enumeration
    // Even if user doesn't exist, we return success
    if (!user) {
      return NextResponse.json({
        message: "If an account with this email exists, a password reset link has been sent.",
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now
    
    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpires,
      },
    });
    
    // In a real application, you would send an email here
    // with the reset link containing the token
    // Example: await sendResetEmail(user.email, resetToken);
    
    console.log(`Password reset token for ${user.email}: ${resetToken}`);
    
    return NextResponse.json({
      message: "If an account with this email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR:", error);
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
