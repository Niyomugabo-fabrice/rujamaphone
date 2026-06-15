import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ZodError, type ZodSchema } from "zod";
import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export type ApiStatus = 200 | 201 | 400 | 401 | 403 | 404 | 409 | 422 | 500;

export class ApiError extends Error {
  status: ApiStatus;

  constructor(message: string, status: ApiStatus = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function ok<T>(data: T, status: 200 | 201 = 200, init?: ResponseInit) {
  return NextResponse.json({ success: true, data }, { ...init, status });
}

export function fail(message: string, status: ApiStatus = 500, init?: ResponseInit) {
  return NextResponse.json({ success: false, error: message }, { ...init, status });
}

export function logApiError(scope: string, error: unknown, context?: Record<string, unknown>) {
  const safeError = error instanceof Error
    ? { name: error.name, message: error.message }
    : { message: "Unknown error" };

  console.error(JSON.stringify({
    level: "error",
    scope,
    ...safeError,
    context,
    at: new Date().toISOString(),
  }));
}

function getPrismaErrorCode(error: unknown) {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return null;
  }

  const code = (error as { code?: unknown }).code;
  return typeof code === "string" ? code : null;
}

export function handleApiError(scope: string, error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401 || error.status === 403) {
      logApiError(scope, error);
    }
    return fail(error.message, error.status);
  }

  if (error instanceof ZodError) {
    return fail("Validation error", 422);
  }

  if (error instanceof SyntaxError) {
    return fail("Malformed JSON request body", 400);
  }

  const prismaErrorCode = getPrismaErrorCode(error);
  if (prismaErrorCode === "P2002") return fail("Resource already exists", 409);
  if (prismaErrorCode === "P2025") return fail("Resource not found", 404);

  logApiError(scope, error);
  return fail("Internal Server Error", 500);
}

export async function parseJson<T>(request: Request, schema: ZodSchema<T>): Promise<T> {
  const body = await request.json();
  return schema.parse(body);
}

export function parseSearchParams<T>(request: Request, schema: ZodSchema<T>): T {
  const { searchParams } = new URL(request.url);
  return schema.parse(Object.fromEntries(searchParams.entries()));
}

export async function parseRouteParams<T>(
  params: Promise<unknown>,
  schema: ZodSchema<T>
): Promise<T> {
  return schema.parse(await params);
}

export async function getAuthToken(request?: Request) {
  const authHeader = request?.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}

export async function requireAdminAuth(request?: Request) {
  const token = await getAuthToken(request);
  if (!token) return null;

  try {
    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
      },
    });

    return user ? { user, token, payload } : null;
  } catch (error) {
    logApiError("auth.requireAdminAuth", error);
    return null;
  }
}

export async function requireUserAuth(request?: Request) {
  const session = await requireAdminAuth(request);
  if (!session) {
    throw new ApiError("Unauthorized", 401);
  }
  return session;
}
