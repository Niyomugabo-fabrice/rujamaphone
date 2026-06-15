"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { RefreshCw, Plus, Image as ImageIcon, X, Eye, AlertCircle, CheckCircle2, Edit3, Trash2, AlertTriangle } from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";

export default function SlidersAdminPage() {
  const [itemsData, setItemsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // Notifications
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // File uploads
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  // File uploads for editing
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const readApiData = async (response: Response) => {
    const payload = await response.json();
    return payload?.success ? payload.data : payload?.data;
  };

  const fetchSliders = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminFetch("/api/sliders", { cache: "no-store" });
      const payload = await res.json();
      setItemsData(payload?.success ? payload.data || [] : payload.data || []);
    } catch (err) {
      console.error("Failed to load sliders:", err);
      triggerNotification("error", "Failed to retrieve live slider records.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSliders();
  }, [fetchSliders]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
      const filesArray = Array.from(e.target.files);
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditFile(file);
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateSlider = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      triggerNotification("error", "Please select at least one image file.");
      return;
    }

    setIsSubmitting(true);
    try {
      const nativeFormData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        nativeFormData.append("images", file);
      });

      const response = await adminFetch("/api/sliders", {
        method: "POST",
        body: nativeFormData,
      });

      if (response.ok) {
        const createdSliders = await readApiData(response);
        setIsCreateOpen(false);
        setSelectedFiles(null);
        setImagePreviews([]);
        if (Array.isArray(createdSliders) && createdSliders.length > 0) {
          setItemsData((current) => [...createdSliders, ...current]);
        }
        triggerNotification("success", "Slider image(s) uploaded successfully.");
      } else {
        const errData = await response.json();
        triggerNotification("error", errData.error || "Failed to upload slider image.");
      }
    } catch (err) {
      console.error("Slider upload error:", err);
      triggerNotification("error", "An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;
    if (!editFile) {
      triggerNotification("error", "Please select a new image file to replace the current one.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("images", editFile);

      const response = await adminFetch(`/api/sliders/${editingItem.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        const updatedSlider = await readApiData(response);
        setEditingItem(null);
        setEditFile(null);
        setEditPreview(null);
        if (updatedSlider?.id) {
          setItemsData((current) =>
            current.map((item) => (item.id === updatedSlider.id ? updatedSlider : item))
          );
        }
        triggerNotification("success", "Slider image updated successfully.");
      } else {
        const errData = await response.json();
        triggerNotification("error", errData.error || "Failed to update slider image.");
      }
    } catch (error) {
      console.error("Edit slider error:", error);
      triggerNotification("error", "An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;

    setIsSubmitting(true);
    try {
      const response = await adminFetch(`/api/sliders/${deletingId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const deletedId = deletingId;
        setDeletingId(null);
        setItemsData((current) => current.filter((item) => item.id !== deletedId));
        triggerNotification("success", "Slider image deleted successfully.");
      } else {
        const errData = await response.json().catch(() => null);
        triggerNotification("error", errData?.error || "Failed to delete slider image.");
      }
    } catch (error) {
      console.error("Delete slider error:", error);
      triggerNotification("error", "An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 relative text-slate-800">
      {/* TOAST SYSTEM */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 max-w-md p-4 rounded-xl border backdrop-blur-md shadow-xl transition-all animate-in fade-in slide-in-from-top-4 bg-white/95 text-slate-900 border-red-200">
          {notification.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#D90429] shrink-0" />
          )}
          <p className="text-xs font-semibold tracking-wide">{notification.message}</p>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600 ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex items-center justify-between border-b border-red-200/60 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">Slider Images</h1>
          <p className="text-xs text-red-900/60 mt-0.5 font-medium">Homepage Hero Carousel Slide Management</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSliders}
            className="p-2.5 bg-white border border-red-200/60 rounded-xl text-slate-700 hover:text-[#D90429] hover:bg-white/80 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D90429]/40"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#D90429]" : ""}`} />
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#A60316] to-[#D90429] hover:from-[#D90429] hover:to-[#FB718A] text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md"
          >
            <Plus className="w-3.5 h-3.5" /> Upload Slider
          </button>
        </div>
      </div>

      {/* CONTENT BLOCK CONTAINER */}
      {isLoading ? (
        <div className="space-y-3 p-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-white/40 animate-pulse rounded-xl border border-red-200/40" />
          ))}
        </div>
      ) : itemsData.length === 0 ? (
        <div className="p-16 border border-dashed border-red-200/80 rounded-2xl text-center text-red-900/40 text-sm font-semibold bg-white/20">
          No custom slider images uploaded. Default static placeholders will be displayed on the homepage.
        </div>
      ) : (
        <div className="bg-white border border-red-100 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-red-100">
                <tr className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  <th className="p-4 w-1/3">Slide Preview</th>
                  <th className="p-4">Upload Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-50">
                {itemsData.map((item) => (
                  <tr key={item.id} className="hover:bg-red-50/20 transition-colors">
                    <td className="p-4">
                      <div
                        onClick={() => setEnlargedImage(item.image)}
                        className="relative w-40 h-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden cursor-pointer shadow-sm group"
                      >
                        <img src={item.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" alt="Slider thumbnail" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 font-medium">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setEditPreview(item.image);
                            setEditFile(null);
                          }}
                          className="p-2 hover:bg-red-50 text-slate-500 hover:text-[#D90429] rounded-lg transition-colors border border-transparent hover:border-red-100"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(item.id)}
                          className="p-2 hover:bg-red-50 text-slate-500 hover:text-[#D90429] rounded-lg transition-colors border border-transparent hover:border-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: CREATE SLIDER */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-red-100 rounded-2xl max-w-md w-full p-6 text-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#D90429]" /> Upload New Slide
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsCreateOpen(false);
                  setImagePreviews([]);
                  setSelectedFiles(null);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSlider} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Slide Image File</label>
                <div className="relative group flex flex-col items-center justify-center w-full min-h-[140px] bg-slate-50 border border-dashed border-red-200 hover:border-[#D90429]/60 rounded-xl p-4 transition-all cursor-pointer">
                  <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                  />
                  <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-[#D90429] mb-2 transition-colors" />
                  <span className="text-xs text-slate-600 group-hover:text-slate-800 font-semibold transition-colors">
                    {selectedFiles && selectedFiles.length > 0
                      ? `${selectedFiles.length} file(s) selected`
                      : "Drag & drop or click to upload"}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 font-medium">Recommended aspect ratio: 16:9 or 21:9</span>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-4 p-3 bg-slate-50 border border-red-100 rounded-xl">
                    {imagePreviews.map((src, idx) => (
                      <div key={idx} className="relative w-20 h-12 rounded-lg overflow-hidden border border-red-200 shadow-sm bg-white">
                        <img src={src} alt="Upload selector" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 inset-x-0 bg-[#A60316] text-[9px] text-white font-bold text-center py-0.5 opacity-90">
                          {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-red-50">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setIsCreateOpen(false);
                    setImagePreviews([]);
                    setSelectedFiles(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#A60316] to-[#D90429] hover:from-[#D90429] hover:to-[#FB718A] text-white px-5 py-2.5 text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting && <RefreshCw className="w-3 h-3 animate-spin" />}
                  {isSubmitting ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT SLIDER */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-red-100 rounded-2xl max-w-md w-full p-6 text-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#D90429]" /> Replace Slide Image
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setEditFile(null);
                  setEditPreview(null);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-wider">Current Slide</label>
                {editPreview && (
                  <div className="w-full h-40 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-inner mb-4">
                    <img src={editPreview} className="w-full h-full object-cover" alt="Current slider slide" />
                  </div>
                )}

                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Upload Replacement</label>
                <div className="relative group flex flex-col items-center justify-center w-full min-h-[100px] bg-slate-50 border border-dashed border-red-200 hover:border-[#D90429]/60 rounded-xl p-3 transition-all cursor-pointer">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleEditFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                  />
                  <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-[#D90429] mb-1.5 transition-colors" />
                  <span className="text-xs text-slate-600 group-hover:text-slate-800 font-semibold transition-colors">
                    {editFile ? editFile.name : "Select replacement image"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-red-50">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setEditFile(null);
                    setEditPreview(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !editFile}
                  className="bg-gradient-to-r from-[#A60316] to-[#D90429] hover:from-[#D90429] hover:to-[#FB718A] text-white px-5 py-2.5 text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting && <RefreshCw className="w-3 h-3 animate-spin" />}
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-red-100 rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#D90429]" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Delete Slide</h3>
            </div>
            <p className="text-xs text-slate-600 mb-6">
              Are you sure you want to delete this hero slider image? This action cannot be undone and it will be removed from the homepage carousel.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletingId(null)}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isSubmitting}
                className="bg-[#D90429] hover:bg-[#A60316] text-white px-4 py-2 text-xs font-bold rounded-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX VIEWER */}
      {enlargedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-8">
          <div className="relative w-full max-w-4xl max-h-[90vh]">
            <img src={enlargedImage} className="w-full h-auto max-h-[90vh] object-contain rounded-xl shadow-2xl mx-auto" alt="Slider lightbox view" />
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-900 p-2 rounded-full transition-colors shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
