import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { resetPasswordSchema } from "@/lib/schemas";
import { fail, handleApiError, ok, parseJson } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const validatedData = await parseJson(request, resetPasswordSchema);

    const user = await prisma.user.findFirst({
      where: {
        resetToken: validatedData.token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
      select: { id: true },
    });

    if (!user) {
      return fail("Invalid or expired reset token", 400);
    }

    const hashedPassword = await hashPassword(validatedData.password);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
      select: { id: true },
    });

    return ok({ message: "Password reset successfully. Please login with your new password." });
  } catch (error) {
    return handleApiError("auth.resetPassword", error);
  }
}
