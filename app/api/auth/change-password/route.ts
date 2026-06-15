import prisma from "@/lib/prisma";
import { comparePassword, hashPassword } from "@/lib/password";
import { changePasswordSchema } from "@/lib/schemas";
import { fail, handleApiError, ok, parseJson, requireUserAuth } from "@/lib/api";

export async function PUT(request: Request) {
  try {
    const session = await requireUserAuth(request);
    const validatedData = await parseJson(request, changePasswordSchema);

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, password: true },
    });

    if (!user) return fail("User not found", 404);

    const isCurrentPasswordValid = await comparePassword(
      validatedData.currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return fail("Current password is incorrect", 400);
    }

    const hashedPassword = await hashPassword(validatedData.newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
      select: { id: true },
    });

    return ok({ message: "Password changed successfully" });
  } catch (error) {
    return handleApiError("auth.changePassword", error);
  }
}
