import prisma from "@/lib/prisma";
import {
  announcementFormSchema,
  announcementQuerySchema,
  announcementUpdateSchema,
  deleteByIdQuerySchema,
} from "@/lib/schemas";
import {
  fail,
  handleApiError,
  ok,
  parseJson,
  parseSearchParams,
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

function activeAnnouncementWhere(now = new Date()) {
  return {
    isPublished: true,
    AND: [
      { OR: [{ startsAt: null }, { startsAt: { lte: now } }] },
      { OR: [{ endsAt: null }, { endsAt: { gte: now } }] },
    ],
  };
}

export async function GET(request: Request) {
  try {
    const { scope, page, limit } = parseSearchParams(request, announcementQuerySchema);

    if (scope === "admin") {
      const session = await requireAdminAuth(request);
      if (!session) return fail("Unauthorized", 401);

      const skip = (page - 1) * limit;
      const [total, announcements] = await Promise.all([
        prisma.announcement.count(),
        prisma.announcement.findMany({
          select: announcementSelect,
          orderBy: [{ createdAt: "desc" }],
          skip,
          take: limit,
        }),
      ]);

      return ok({
        data: announcements,
        total,
        page,
        totalPages: Math.max(Math.ceil(total / limit), 1),
      });
    }

    const announcements = await prisma.announcement.findMany({
      where: activeAnnouncementWhere(),
      select: announcementSelect,
      orderBy: [{ createdAt: "desc" }],
      take: 3,
    });

    return ok(announcements, 200, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    return handleApiError("announcements.GET", error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const validated = await parseJson(request, announcementFormSchema);
    const announcement = await prisma.announcement.create({
      data: validated,
      select: announcementSelect,
    });

    return ok(announcement, 201);
  } catch (error) {
    return handleApiError("announcements.POST", error);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id, ...data } = await parseJson(request, announcementUpdateSchema);
    const updated = await prisma.announcement.update({
      where: { id },
      data,
      select: announcementSelect,
    });

    return ok(updated);
  } catch (error) {
    return handleApiError("announcements.PATCH", error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requireAdminAuth(request);
    if (!session) return fail("Unauthorized", 401);

    const { id } = parseSearchParams(request, deleteByIdQuerySchema);
    await prisma.announcement.delete({ where: { id }, select: { id: true } });

    return ok({ message: "Announcement deleted successfully" });
  } catch (error) {
    return handleApiError("announcements.DELETE", error);
  }
}
