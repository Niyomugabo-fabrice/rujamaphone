export const runtime = "nodejs";

import prisma from "@/lib/prisma";
import { announcementPatchSchema, idSchema } from "@/lib/schemas";
import {
  fail,
  handleApiError,
  ok,
  parseJson,
  parseRouteParams,
  requireAdminAuth,
} from "@/lib/api";

const announcementSelect = {
  id: true,
  title: true,
  message: true,
  kind: true,
  isPublished: true,
  startsAt: true,
  endsAt: true,
  createdAt: true,
  updatedAt: true,
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = await parseRouteParams(params, idSchema);
    const announcement = await prisma.announcement.findUnique({
      where: { id },
      select: announcementSelect,
    });

    return announcement ? ok(announcement) : fail("Announcement not found", 404);
  } catch (error) {
    return handleApiError("announcements.id.GET", error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = await parseRouteParams(params, idSchema);
    const validated = await parseJson(request, announcementPatchSchema);
    const updated = await prisma.announcement.update({
      where: { id },
      data: validated,
      select: announcementSelect,
    });

    return ok(updated);
  } catch (error) {
    return handleApiError("announcements.id.PATCH", error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = await parseRouteParams(params, idSchema);
    await prisma.announcement.delete({ where: { id }, select: { id: true } });

    return ok({ message: "Announcement deleted successfully" });
  } catch (error) {
    return handleApiError("announcements.id.DELETE", error);
  }
}
