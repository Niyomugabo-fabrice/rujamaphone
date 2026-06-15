import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/password";
import { generateToken } from "@/lib/jwt";
import { loginSchema } from "@/lib/schemas";
import { fail, handleApiError, ok, parseJson } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const validatedData = await parseJson(request, loginSchema);

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: {
        id: true,
        fullName: true,
        email: true,
        password: true,
        avatar: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
      },
    });

    if (!user) {
      return fail("Invalid credentials", 401);
    }

    const isPasswordValid = await comparePassword(validatedData.password, user.password);
    if (!isPasswordValid) {
      return fail("Invalid credentials", 401);
    }

    const token = generateToken({ userId: user.id, email: user.email });
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
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

    const response = ok({ user: updatedUser, token });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return handleApiError("auth.login", error);
  }
}
