import prisma from "@/lib/prisma";
import { updateProfileSchema } from "@/lib/schemas";
import { handleApiError, ok, parseJson, requireUserAuth } from "@/lib/api";

export async function PUT(request: Request) {
  try {
    const session = await requireUserAuth(request);
    const validatedData = await parseJson(request, updateProfileSchema);

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(validatedData.fullName && { fullName: validatedData.fullName }),
        ...(validatedData.avatar && { avatar: validatedData.avatar }),
      },
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

    return ok({ user: updatedUser });
  } catch (error) {
    return handleApiError("auth.profile", error);
  }
}
