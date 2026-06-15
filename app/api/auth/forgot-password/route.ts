import crypto from "crypto";
import prisma from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/schemas";
import { handleApiError, ok, parseJson } from "@/lib/api";

const resetResponse = {
  message: "If an account with this email exists, a password reset link has been sent.",
};

export async function POST(request: Request) {
  try {
    const validatedData = await parseJson(request, forgotPasswordSchema);

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: { id: true },
    });

    if (!user) return ok(resetResponse);

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 3600000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpires,
      },
      select: { id: true },
    });

    return ok(resetResponse);
  } catch (error) {
    return handleApiError("auth.forgotPassword", error);
  }
}
