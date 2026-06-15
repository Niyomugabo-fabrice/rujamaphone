CREATE TYPE "AnnouncementKind" AS ENUM ('GENERAL', 'PROMOTION', 'PUBLIC_HOLIDAY');

CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "kind" "AnnouncementKind" NOT NULL DEFAULT 'GENERAL',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Announcement_isPublished_idx" ON "Announcement"("isPublished");
CREATE INDEX "Announcement_startsAt_idx" ON "Announcement"("startsAt");
CREATE INDEX "Announcement_endsAt_idx" ON "Announcement"("endsAt");
CREATE INDEX "Announcement_createdAt_idx" ON "Announcement"("createdAt");
