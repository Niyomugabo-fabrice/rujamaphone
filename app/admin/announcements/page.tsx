"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Edit3,
  Megaphone,
  PartyPopper,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";

type AnnouncementKind = "GENERAL" | "PROMOTION" | "PUBLIC_HOLIDAY";

type Announcement = {
  id: string;
  title: string;
  message: string;
  kind: AnnouncementKind;
  isPublished: boolean;
  startsAt: string | null;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type AnnouncementFormState = {
  title: string;
  message: string;
  kind: AnnouncementKind;
  isPublished: boolean;
  startsAt: string;
  endsAt: string;
};

const emptyForm: AnnouncementFormState = {
  title: "",
  message: "",
  kind: "GENERAL",
  isPublished: false,
  startsAt: "",
  endsAt: "",
};

function unwrapApiData<T>(payload: any): T {
  return payload?.success && payload?.data !== undefined ? payload.data : payload;
}

function toDateInput(value: string | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function formatDate(value: string | null) {
  if (!value) return "Any time";
  return new Intl.DateTimeFormat("en-RW", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function kindLabel(kind: AnnouncementKind) {
  if (kind === "PROMOTION") return "Promotion";
  if (kind === "PUBLIC_HOLIDAY") return "Public Holiday";
  return "General";
}

function kindIcon(kind: AnnouncementKind) {
  if (kind === "PROMOTION") return PartyPopper;
  if (kind === "PUBLIC_HOLIDAY") return CalendarDays;
  return Megaphone;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<AnnouncementFormState>(emptyForm);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const publishedCount = useMemo(
    () => announcements.filter((announcement) => announcement.isPublished).length,
    [announcements]
  );

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchAnnouncements = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/announcements?scope=admin&limit=50");
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || "Failed to load announcements");

      const data = unwrapApiData<{ data: Announcement[] }>(payload);
      setAnnouncements(data.data || []);
    } catch (error) {
      console.error("Failed to load announcements:", error);
      triggerNotification("error", "Failed to load announcements.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const openCreateModal = () => {
    setEditingAnnouncement(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setForm({
      title: announcement.title,
      message: announcement.message,
      kind: announcement.kind,
      isPublished: announcement.isPublished,
      startsAt: toDateInput(announcement.startsAt),
      endsAt: toDateInput(announcement.endsAt),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setEditingAnnouncement(null);
    setForm(emptyForm);
  };

  const saveAnnouncement = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/announcements", {
        method: editingAnnouncement ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingAnnouncement ? { id: editingAnnouncement.id, ...form } : form),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || "Failed to save announcement");

      triggerNotification("success", editingAnnouncement ? "Announcement updated." : "Announcement created.");
      setIsModalOpen(false);
      setEditingAnnouncement(null);
      setForm(emptyForm);
      fetchAnnouncements();
    } catch (error) {
      triggerNotification("error", error instanceof Error ? error.message : "Failed to save announcement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePublished = async (announcement: Announcement) => {
    try {
      const response = await fetch("/api/announcements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: announcement.id, isPublished: !announcement.isPublished }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || "Failed to update publish status");

      setAnnouncements((current) =>
        current.map((item) =>
          item.id === announcement.id ? { ...item, isPublished: !item.isPublished } : item
        )
      );
      triggerNotification("success", !announcement.isPublished ? "Announcement published." : "Announcement unpublished.");
    } catch (error) {
      triggerNotification("error", error instanceof Error ? error.message : "Failed to update publish status.");
    }
  };

  const deleteAnnouncement = async (announcement: Announcement) => {
    if (!window.confirm(`Delete "${announcement.title}"?`)) return;

    try {
      const response = await fetch(`/api/announcements?id=${announcement.id}`, {
        method: "DELETE",
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || "Failed to delete announcement");

      setAnnouncements((current) => current.filter((item) => item.id !== announcement.id));
      triggerNotification("success", "Announcement deleted.");
    } catch (error) {
      triggerNotification("error", error instanceof Error ? error.message : "Failed to delete announcement.");
    }
  };

  return (
    <div className="relative space-y-6 p-4 text-slate-800 sm:p-8">
      {notification && (
        <div className="fixed right-6 top-6 z-50 flex max-w-md items-center gap-3 rounded-xl border border-red-200 bg-white/95 p-4 text-slate-900 shadow-xl backdrop-blur-md">
          {notification.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-[#D90429]" />
          )}
          <p className="text-xs font-semibold tracking-wide">{notification.message}</p>
          <button onClick={() => setNotification(null)} className="ml-2 text-slate-400 hover:text-slate-600">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 border-b border-red-200/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold uppercase tracking-tight text-slate-900">Announcements</h1>
          <p className="mt-0.5 text-xs font-medium text-red-900/60">
            Manage promotions, public holiday notices, and shop-wide messages
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-xl border border-red-200/70 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm sm:block">
            {publishedCount} published
          </div>
          <button
            onClick={fetchAnnouncements}
            className="rounded-xl border border-red-200/60 bg-white p-2.5 text-slate-700 shadow-sm transition-all hover:bg-white/80 hover:text-[#D90429] focus:outline-none focus:ring-2 focus:ring-[#D90429]/40"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin text-[#D90429]" : ""}`} />
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#A60316] to-[#D90429] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:from-[#D90429] hover:to-[#FB718A]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Announcement
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3 p-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-xl border border-red-200/40 bg-white/40" />
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-red-200/80 bg-white/20 p-16 text-center text-sm font-semibold text-red-900/40">
          No announcements yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {announcements.map((announcement) => {
            const Icon = kindIcon(announcement.kind);

            return (
              <article
                key={announcement.id}
                className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex min-w-0 gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D90429]/10 text-[#D90429]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#A60316]">
                          {kindLabel(announcement.kind)}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
                            announcement.isPublished
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {announcement.isPublished ? "Published" : "Unpublished"}
                        </span>
                      </div>
                      <h2 className="mt-2 text-base font-extrabold text-slate-950">{announcement.title}</h2>
                      <p className="mt-1 max-w-4xl text-sm font-medium leading-6 text-slate-600">
                        {announcement.message}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                        <span>Starts: {formatDate(announcement.startsAt)}</span>
                        <span>Ends: {formatDate(announcement.endsAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => togglePublished(announcement)}
                      className={`relative h-7 w-12 rounded-full transition-colors ${
                        announcement.isPublished ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                      aria-label={announcement.isPublished ? "Unpublish announcement" : "Publish announcement"}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          announcement.isPublished ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => openEditModal(announcement)}
                      className="rounded-lg border border-red-100 bg-white p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-[#D90429]"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteAnnouncement(announcement)}
                      className="rounded-lg border border-red-100 bg-white p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-[#D90429]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-red-100 bg-white p-6 text-slate-800 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Megaphone className="h-4 w-4 text-[#D90429]" />
                {editingAnnouncement ? "Edit Announcement" : "Create Announcement"}
              </h3>
              <button type="button" onClick={closeModal} className="text-slate-400 transition-colors hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={saveAnnouncement} className="space-y-4">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Title</label>
                <input
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="w-full rounded-xl border border-red-100 bg-slate-50 p-2.5 text-sm font-medium text-slate-900 focus:border-[#D90429] focus:outline-none focus:ring-1 focus:ring-[#D90429]"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Message</label>
                <textarea
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-red-100 bg-slate-50 p-2.5 text-sm font-medium text-slate-900 focus:border-[#D90429] focus:outline-none focus:ring-1 focus:ring-[#D90429]"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Type</label>
                  <select
                    value={form.kind}
                    onChange={(event) => setForm((current) => ({ ...current, kind: event.target.value as AnnouncementKind }))}
                    className="w-full rounded-xl border border-red-100 bg-slate-50 p-2.5 text-sm font-medium text-slate-900 focus:outline-none"
                  >
                    <option value="GENERAL">General</option>
                    <option value="PROMOTION">Promotion</option>
                    <option value="PUBLIC_HOLIDAY">Public Holiday</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Published</label>
                  <button
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, isPublished: !current.isPublished }))}
                    className={`flex h-[42px] w-full items-center justify-between rounded-xl border px-3 text-sm font-bold transition-colors ${
                      form.isPublished
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-50 text-slate-500"
                    }`}
                  >
                    <span>{form.isPublished ? "On" : "Off"}</span>
                    <span className={`relative h-6 w-11 rounded-full ${form.isPublished ? "bg-emerald-500" : "bg-slate-300"}`}>
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                          form.isPublished ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Start Date</label>
                  <input
                    type="date"
                    value={form.startsAt}
                    onChange={(event) => setForm((current) => ({ ...current, startsAt: event.target.value }))}
                    className="w-full rounded-xl border border-red-100 bg-slate-50 p-2.5 text-sm font-medium text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">End Date</label>
                  <input
                    type="date"
                    value={form.endsAt}
                    onChange={(event) => setForm((current) => ({ ...current, endsAt: event.target.value }))}
                    className="w-full rounded-xl border border-red-100 bg-slate-50 p-2.5 text-sm font-medium text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 border-t border-red-50 pt-4">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={closeModal}
                  className="px-4 py-2 text-xs font-bold text-slate-500 transition-colors hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#A60316] to-[#D90429] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:from-[#D90429] hover:to-[#FB718A] disabled:opacity-50"
                >
                  {isSubmitting && <RefreshCw className="h-3 w-3 animate-spin" />}
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
