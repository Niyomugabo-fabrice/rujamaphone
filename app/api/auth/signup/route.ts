import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { generateToken } from "@/lib/jwt";
import { signupSchema } from "@/lib/schemas";
import { handleApiError, ok, parseJson, fail } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const validatedData = await parseJson(request, signupSchema);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: { id: true },
    });

    if (existingUser) {
      return fail("Email already registered", 409);
    }

    const hashedPassword = await hashPassword(validatedData.password);
    const now = new Date();

    const user = await prisma.user.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        password: hashedPassword,
        lastLogin: now,
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

    const token = generateToken({ userId: user.id, email: user.email });
    return ok({ user, token }, 201);
  } catch (error) {
    return handleApiError("auth.signup", error);
  }
}
