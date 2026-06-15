"use client";

import { useEffect, useMemo, useState } from "react";
import { Megaphone, PartyPopper, CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";

type AnnouncementKind = "GENERAL" | "PROMOTION" | "PUBLIC_HOLIDAY";

type Announcement = {
  id: string;
  title: string;
  message: string;
  kind: AnnouncementKind;
  updatedAt: string;
};

const DISMISSED_ANNOUNCEMENTS_KEY = "rujama:dismissed-announcements";

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

function getAnnouncementDismissKey(announcement: Announcement) {
  return `${announcement.id}:${announcement.updatedAt}`;
}

function readDismissedAnnouncements() {
  try {
    const stored = window.localStorage.getItem(DISMISSED_ANNOUNCEMENTS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeDismissedAnnouncements(keys: string[]) {
  try {
    window.localStorage.setItem(DISMISSED_ANNOUNCEMENTS_KEY, JSON.stringify(keys));
  } catch {
    // Ignore storage failures so announcements still work in private browsing.
  }
}

export function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissedKeys, setDismissedKeys] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setDismissedKeys(readDismissedAnnouncements());
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/announcements", { cache: "no-store" })
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

  useEffect(() => {
    if (announcements.length === 0) return;

    const activeDismissKeys = new Set(announcements.map(getAnnouncementDismissKey));
    setDismissedKeys((current) => {
      const next = current.filter((key) => activeDismissKeys.has(key));
      if (next.length !== current.length) {
        writeDismissedAnnouncements(next);
      }
      return next;
    });
  }, [announcements]);

  const visibleAnnouncements = useMemo(
    () => announcements.filter((item) => !dismissedKeys.includes(getAnnouncementDismissKey(item))),
    [announcements, dismissedKeys]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [visibleAnnouncements.length]);

  useEffect(() => {
    if (visibleAnnouncements.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % visibleAnnouncements.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [visibleAnnouncements.length]);

  if (visibleAnnouncements.length === 0) return null;

  const primary = visibleAnnouncements[activeIndex] || visibleAnnouncements[0];
  const Icon = getAnnouncementIcon(primary.kind);
  const hasMultipleAnnouncements = visibleAnnouncements.length > 1;

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? visibleAnnouncements.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % visibleAnnouncements.length);
  };

  return (
    <section className="relative z-[60] border-b border-[#D90429]/30 bg-[#fff7f8] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D90429] text-white shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#820210] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              {getKindLabel(primary.kind)}
            </span>
            {hasMultipleAnnouncements && (
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#820210]/70">
                {activeIndex + 1} / {visibleAnnouncements.length}
              </span>
            )}
            <h2 key={primary.id} className="truncate text-sm font-extrabold text-slate-950 sm:text-base">
              {primary.title}
            </h2>
          </div>
          <p className="mt-0.5 line-clamp-2 text-xs font-semibold leading-5 text-slate-700 sm:line-clamp-1">
            {primary.message}
          </p>
        </div>
        {hasMultipleAnnouncements && (
          <div className="hidden shrink-0 items-center gap-1 sm:flex">
            <button
              type="button"
              onClick={goToPrevious}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D90429]/20 bg-white text-[#820210] transition-colors hover:bg-red-50"
              aria-label="Previous announcement"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D90429]/20 bg-white text-[#820210] transition-colors hover:bg-red-50"
              aria-label="Next announcement"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => {
            const dismissKey = getAnnouncementDismissKey(primary);
            setDismissedKeys((current) => {
              const next = Array.from(new Set([...current, dismissKey]));
              writeDismissedAnnouncements(next);
              return next;
            });
            setActiveIndex(0);
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#820210]/60 transition-colors hover:bg-white hover:text-[#820210]"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {hasMultipleAnnouncements && (
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#D90429]/10">
          <div
            className="h-full bg-[#D90429] transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / visibleAnnouncements.length) * 100}%` }}
          />
        </div>
      )}
    </section>
  );
}
