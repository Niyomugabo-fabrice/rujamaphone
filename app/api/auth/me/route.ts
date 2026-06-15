import prisma from "@/lib/prisma";
import { fail, handleApiError, requireUserAuth, ok } from "@/lib/api";

export async function GET(request: Request) {
  try {
    const session = await requireUserAuth(request);
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        avatar: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
      },
    });

    if (!user) {
      return fail("User not found", 404);
    }

    return ok({ user });
  } catch (error) {
    return handleApiError("auth.me", error);
  }
}
