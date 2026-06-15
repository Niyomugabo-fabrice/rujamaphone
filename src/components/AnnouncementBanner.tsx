"use client";

import { useEffect, useMemo, useState } from "react";
import { Megaphone, PartyPopper, CalendarDays, X } from "lucide-react";

type AnnouncementKind = "GENERAL" | "PROMOTION" | "PUBLIC_HOLIDAY";

type Announcement = {
  id: string;
  title: string;
  message: string;
  kind: AnnouncementKind;
};

function unwrapApiData<T>(payload: any): T {
  return payload?.success && payload?.data !== undefined ? payload.data : payload;
}

function getAnnouncementIcon(kind: AnnouncementKind) {
  if (kind === "PROMOTION") return PartyPopper;
  if (kind === "PUBLIC_HOLIDAY") return CalendarDays;
  return Megaphone;
}

function getKindLabel(kind: AnnouncementKind) {
  if (kind === "PROMOTION") return "Promotion";
  if (kind === "PUBLIC_HOLIDAY") return "Public Holiday";
  return "Announcement";
}

export function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/announcements")
      .then((response) => response.json())
      .then((payload) => {
        if (!isMounted) return;
        setAnnouncements(unwrapApiData<Announcement[]>(payload) || []);
      })
      .catch(() => {
        if (isMounted) setAnnouncements([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleAnnouncements = useMemo(
    () => announcements.filter((item) => !dismissedIds.includes(item.id)),
    [announcements, dismissedIds]
  );

  if (visibleAnnouncements.length === 0) return null;

  const primary = visibleAnnouncements[0];
  const Icon = getAnnouncementIcon(primary.kind);

  return (
    <section className="border-b border-red-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D90429]/10 text-[#D90429]">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#820210] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              {getKindLabel(primary.kind)}
            </span>
            <h2 className="truncate text-sm font-extrabold text-slate-950">{primary.title}</h2>
          </div>
          <p className="mt-0.5 line-clamp-2 text-xs font-medium leading-5 text-slate-600 sm:line-clamp-1">
            {primary.message}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDismissedIds((current) => [...current, primary.id])}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
