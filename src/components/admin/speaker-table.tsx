"use client";

import { useState, useRef, useEffect } from "react";
import { Edit3, Trash2, Volume2, AlertTriangle, Eye, X, Layers, Image, Trash, Plus, CheckSquare, Square } from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";

interface SpeakerTableProps {
  data: any[];
  onViewProduct: (product: any) => void;
}
export default function SpeakerTable({ data, onViewProduct }: SpeakerTableProps) {
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [viewingItem, setViewingItem] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingImages, setIsEditingImages] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [brandFilter, setBrandFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");

  // States for Image Management within the Details Modal
  const [selectedDetailImages, setSelectedDetailImages] = useState<string[]>([]);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // Advanced media manipulation states for the Edit Modal
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [stagedDeletedImages, setStagedDeletedImages] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<{ id: string; file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localData, setLocalData] = useState<any[]>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Triggers the detailed viewing modal state
  const handleOpenDetailModal = (item: any) => {
    setViewingItem(item);
    setSelectedDetailImages([]);
    setIsEditingImages(false);
  };

  const buildQueryString = () => {
    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));

    if (brandFilter) params.set("brand", brandFilter);
    if (conditionFilter) params.set("condition", conditionFilter);

    return params.toString();
  };

  const fetchSpeakers = async () => {
    setIsLoading(true);
    try {
      const queryString = buildQueryString();
      const response = await adminFetch(`/api/speakers?${queryString}`);
      const payload = await response.json();

      if (!response.ok) {
        console.error("Failed fetching speakers", payload);
        return;
      }

      const result = payload?.success ? payload.data : payload;
      setLocalData(result?.data || []);
      setTotalItems(result?.total || 0);
      setTotalPages(result?.totalPages || 1);
      setPage(result?.page || 1);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, [page, limit, brandFilter, conditionFilter]);

  // Triggers the edit modal state and loads the item profile properties
  const handleOpenEditModal = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    setEditingItem(item);
    setExistingImages(item.image || []);
    setStagedDeletedImages([]);
    setNewImageFiles([]);

    setFormError(null);
  setFieldErrors(null);
  };

  // Trigger delete warning sequence safely without row-click collision
  const handleOpenDeleteModal = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
  };

  // Confirm delete action and execute API call
  const handleConfirmDelete = async () => {
    if (!deletingId) return;

    setIsSubmitting(true);
    try {
      const response = await adminFetch(`/api/speakers?id=${deletingId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setDeletingId(null);
        fetchSpeakers();
      } else {
        console.error("Failed to delete speaker");
      }
    } catch (error) {
      console.error("Delete error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle image file selection for edit modal
  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newFiles = filesArray.map((file) => ({
        id: Math.random().toString(36).substring(7),
        file,
        preview: URL.createObjectURL(file),
      }));
      setNewImageFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // Stage existing image for deletion
  const handleStageDeleteExisting = (imgUrl: string) => {
    setStagedDeletedImages((prev) => [...prev, imgUrl]);
    setExistingImages((prev) => prev.filter((url) => url !== imgUrl));
  };

  // Remove newly added image before submit
  const handleRemoveNewImage = (id: string) => {
    setNewImageFiles((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle edit form submission
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      
      // Add existing images to form data
      formData.append("existingImages", JSON.stringify(existingImages));
      
      // Add new image files
      for (const { file } of newImageFiles) {
        formData.append("images", file);
      }

      const response = await adminFetch(`/api/speakers/${editingItem.id}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
  setEditingItem(null);
  setFormError(null);
  setFieldErrors(null);
  fetchSpeakers();
} else {
  const errData = await response.json();

  setFormError(errData.error || "Validation error occurred");
  setFieldErrors(errData.fields || null);
}
    } catch (error) {
      console.error("Edit error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle removing selected images from detail modal
  const handleRemoveSelectedImagesFromDetail = async () => {
    if (!viewingItem || selectedDetailImages.length === 0) return;

    setIsSubmitting(true);
    try {
      const updatedImages = viewingItem.image.filter(
        (url: string) => !selectedDetailImages.includes(url)
      );

      const response = await adminFetch(`/api/speakers/${viewingItem.id}`, {
        method: "PATCH",

        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...viewingItem,
          image: updatedImages,
        }),
      });

      if (response.ok) {
        const payload = await response.json();
        const updated = payload?.success ? payload.data : payload;
        setViewingItem(updated);
        setSelectedDetailImages([]);
        setIsEditingImages(false);
        fetchSpeakers();
      }
    } catch (error) {
      console.error("Remove images error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-red-100 rounded-2xl shadow-xl overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-red-50 flex flex-wrap gap-3 items-center">
        <div>
          <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Brand</label>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="bg-slate-50 border border-red-100 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#D90429]"
          >
            <option value="">All Brands</option>
            <option value="JBL">JBL</option>
            <option value="SONY">SONY</option>
            <option value="BOSE">BOSE</option>
            <option value="APPLE">APPLE</option>
            <option value="ANKER">ANKER</option>
          </select>
        </div>

        <div>
          <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Condition</label>
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="bg-slate-50 border border-red-100 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#D90429]"
          >
            <option value="">All Conditions</option>
            <option value="NEW">NEW</option>
            <option value="USED">USED</option>
          </select>
        </div>

        <button
          onClick={() => {
            setBrandFilter("");
            setConditionFilter("");
          }}
          className="mt-4 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-red-100">
            <tr className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
              <th className="p-3">Speaker</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Condition</th>
              <th className="p-3">Battery Life</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-50">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="p-4">
                    <div className="h-12 bg-slate-100 animate-pulse rounded-lg" />
                  </td>
                </tr>
              ))
            ) : localData.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400 text-sm">
                  No speakers found
                </td>
              </tr>
            ) : (
              localData.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleOpenDetailModal(item)}
                  className="hover:bg-red-50/30 transition-colors cursor-pointer"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image?.[0] || "/placeholder.jpg"}
                        className="w-12 h-12 object-cover rounded-lg border border-red-100"
                      />
                      <span className="font-semibold text-slate-800 text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-slate-600">{item.brand}</td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        item.condition === "NEW"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {item.condition}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-slate-600">{item.batteryLife || "N/A"}</td>
                  <td className="p-3 font-bold text-slate-900 text-sm">
                    {parseInt(item.price || 0).toLocaleString()} RWF
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => handleOpenEditModal(e, item)}
                        className="p-1.5 hover:bg-red-100 text-slate-500 hover:text-[#D90429] rounded-lg transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleOpenDeleteModal(e, item.id)}
                        className="p-1.5 hover:bg-red-100 text-slate-500 hover:text-[#D90429] rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-red-50 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, totalItems)} of {totalItems}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-xs font-bold text-slate-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-red-100 rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#D90429]" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Delete Speaker</h3>
            </div>
            <p className="text-xs text-slate-600 mb-6">
              Are you sure you want to delete this speaker? This action cannot be undone.
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

      {/* MODAL ENGINE: SPECIFICATION DETAILS VIEW & DELETIONS */}
      {viewingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9999] flex items-center justify-center p-2">
          <div className="bg-white border border-red-100 rounded-xl max-w-4xl w-[min(100%-16px,500px)] p-3 text-slate-800 shadow-2xl animate-in zoom-in-95 duration-150 relative max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-red-100 flex items-center justify-between p-3 z-10">
              <h3 className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-[#D90429]" /> Details
              </h3>
              <button
                type="button"
                onClick={() => setViewingItem(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 p-3">
              <div className="grid grid-cols-2 gap-1 mb-2">
                <div className="p-1.5 bg-slate-50 border border-slate-100 rounded">
                  <span className="block text-[7px] uppercase font-bold text-slate-400 tracking-wider">Brand</span>
                  <span className="text-[10px] font-bold text-slate-800">{viewingItem.brand}</span>
                </div>
                <div className="p-1.5 bg-slate-50 border border-slate-100 rounded">
                  <span className="block text-[7px] uppercase font-bold text-slate-400 tracking-wider">Condition</span>
                  <span className="text-[10px] font-bold text-slate-800">{viewingItem.condition}</span>
                </div>
                <div className="p-1.5 bg-slate-50 border border-slate-100 rounded">
                  <span className="block text-[7px] uppercase font-bold text-slate-400 tracking-wider">Battery Life</span>
                  <span className="text-[10px] font-bold text-slate-800">{viewingItem.batteryLife || "N/A"}</span>
                </div>
                <div className="p-1.5 bg-slate-50 border border-slate-100 rounded">
                  <span className="block text-[7px] uppercase font-bold text-slate-400 tracking-wider">Price</span>
                  <span className="text-[10px] font-bold text-slate-900">{parseInt(viewingItem.price || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="mb-2">
                <span className="block text-[7px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Notes</span>
                <p className="bg-slate-50/50 p-1.5 rounded border border-slate-100 text-[9px] font-medium text-slate-600 leading-tight min-h-[25px] max-h-[40px] overflow-hidden">
                  {viewingItem.description || "-"}
                </p>
              </div>

              {/* Interactive Image Gallery Cluster Interface */}
              <div className="border-t border-slate-100 pt-1.5">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <label className="block text-[7px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                    <Image className="w-2.5 h-2.5 text-[#D90429]" /> Photos
                  </label>

                  {isEditingImages && selectedDetailImages.length > 0 && (
                    <button
                      type="button"
                      onClick={handleRemoveSelectedImagesFromDetail}
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-0.5 text-[7px] bg-red-50 text-[#D90429] hover:bg-[#D90429] hover:text-white border border-red-200 px-1.5 py-0.5 rounded font-bold transition-all disabled:opacity-50"
                    >
                      <Trash className="w-2 h-2" /> Del
                    </button>
                  )}
                </div>

                {(!viewingItem.image || viewingItem.image.length === 0) ? (
                  <div className="text-center p-2 border-2 border-dashed border-slate-100 rounded text-slate-400 text-[8px] font-medium">
                    No images
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-1 max-h-[100px] overflow-y-auto p-1 bg-slate-50/60 rounded border border-slate-100">
                    {viewingItem.image.map((imgUrl: string, idx: number) => {
                      const isChecked = selectedDetailImages.includes(imgUrl);
                      return (
                        <div
                          key={`detail-${idx}`}
                          onClick={() => {
                            if (isEditingImages) {
                              setSelectedDetailImages((prev) =>
                                prev.includes(imgUrl)
                                  ? prev.filter((url) => url !== imgUrl)
                                  : [...prev, imgUrl]
                              );
                            } else {
                              setEnlargedImage(imgUrl);
                            }
                          }}
                          className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer transition-all ${
                            isChecked
                              ? "border-[#D90429] ring-2 ring-[#D90429]/20"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <img src={imgUrl} className="w-full h-full object-cover" alt="Asset media node" />
                          {isEditingImages && isChecked && (
                            <div className="absolute top-0.5 right-0.5 bg-[#D90429] text-white rounded-full p-0.5">
                              <CheckSquare className="w-2 h-2" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2 mt-1 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setViewingItem(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-2 py-1 text-[8px] font-bold rounded transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- ENLARGED IMAGE VIEWER --- */}
      {enlargedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-9">
          <div className="relative w-full max-w-4xl">
            <img
              src={enlargedImage}
              className="w-full h-auto object-contain rounded-xl shadow-2xl"
              alt="Enlarged view"
            />
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-900 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL ENGINE: UPDATE SPEAKER CONFIGURATION --- */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9999] flex items-center justify-center p-2">
          <div className="bg-white border border-red-100 rounded-xl max-w-4xl h-100 w-[min(100%-16px,500px)] max-h-[95vh] overflow-y-auto text-slate-800 shadow-2xl shadow-red-950/10 animate-in zoom-in-95 duration-150 relative">
            <div className="sticky top-0 bg-white border-b border-red-100 flex items-center justify-between p-3 z-10">
              <h3 className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-[#D90429]" /> Edit
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-2 p-3">
              <div>
                <label className="block text-[7px] uppercase font-bold text-slate-500 mb-0.5 tracking-wider">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingItem.name}
                  className="w-full bg-slate-50 border border-red-100 rounded p-1 text-xs focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] font-medium text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <label className="block text-[7px] uppercase font-bold text-slate-500 mb-0.5 tracking-wider">Brand</label>
                  <select
                    name="brand"
                    defaultValue={editingItem.brand}
                    className="w-full bg-slate-50 border border-red-100 rounded p-1 text-xs focus:outline-none text-slate-900 font-medium"
                  >
                    <option value="JBL">JBL</option>
                    <option value="SONY">SONY</option>
                    <option value="BOSE">BOSE</option>
                    <option value="APPLE">APPLE</option>
                    <option value="ANKER">ANKER</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[7px] uppercase font-bold text-slate-500 mb-0.5 tracking-wider">Price</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingItem.price}
                    className="w-full bg-slate-50 border border-red-100 rounded p-1 text-xs focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] font-medium text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <label className="block text-[7px] uppercase font-bold text-slate-500 mb-0.5 tracking-wider">Condition</label>
                  <select
                    name="condition"
                    defaultValue={editingItem.condition}
                    className="w-full bg-slate-50 border border-red-100 rounded p-1 text-xs focus:outline-none text-slate-900 font-medium"
                  >
                    <option value="NEW">NEW</option>
                    <option value="USED">USED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[7px] uppercase font-bold text-slate-500 mb-0.5 tracking-wider">Battery Life</label>
                  <input
                    type="text"
                    name="batteryLife"
                    defaultValue={editingItem.batteryLife || ""}
                    className="w-full bg-slate-50 border border-red-100 rounded p-1 text-xs focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* --- IMAGE CLUSTER MANAGEMENT ENGINE (EDIT CONTEXT) --- */}
              <div className="border-t border-b border-red-50 py-1.5 my-1.5">
                <label className="block text-[7px] uppercase font-bold text-slate-500 mb-1 tracking-wider flex items-center gap-1">
                  <Image className="w-2.5 h-2.5 text-[#D90429]" /> Photos
                </label>

                <div className="grid grid-cols-6 gap-1 max-h-[80px] overflow-y-auto p-1 bg-slate-50 rounded border border-red-50">
                  {existingImages.map((imgUrl, idx) => (
                    <div key={`existing-${idx}`} className="relative group/img aspect-square rounded-md overflow-hidden border border-slate-200 bg-white shadow-sm">
                      <img src={imgUrl} className="w-full h-full object-cover" alt="Asset media node" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleStageDeleteExisting(imgUrl)}
                          className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-sm transition-colors shadow"
                        >
                          <Trash className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Images Preview */}
                {newImageFiles.length > 0 && (
                  <div className="mt-1.5 grid grid-cols-6 gap-1">
                    {newImageFiles.map(({ id, preview }) => (
                      <div key={id} className="relative aspect-square rounded-md overflow-hidden border border-slate-200 bg-white shadow-sm">
                        <img src={preview} className="w-full h-full object-cover" alt="New upload" />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(id)}
                          className="absolute top-0.5 right-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full p-0.5 shadow"
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-1.5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleEditFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-1.5 border-2 border-dashed border-red-200 hover:border-[#D90429]/60 rounded-lg text-[8px] font-medium text-slate-500 hover:text-slate-800 transition-all flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Images
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[7px] uppercase font-bold text-slate-500 mb-0.5 tracking-wider">Notes</label>
                <textarea
                  name="description"
                  defaultValue={editingItem.description || ""}
                  rows={2}
                  className="w-full bg-slate-50 border border-red-100 rounded p-1 text-xs focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] text-slate-900 font-medium resize-none"
                />
              </div>
              {(formError || fieldErrors) && (
                <div className="p-2 border border-red-200 bg-red-50 text-red-700 text-[8px] font-semibold rounded space-y-1">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                    <span>{formError || "Please fix the errors below"}</span>
                  </div>

                  {fieldErrors && (
                    <ul className="list-disc pl-4 text-[8px] text-red-600">
                      {Object.entries(fieldErrors).map(([field, messages]) =>
                        messages.map((msg, i) => (
                          <li key={`${field}-${i}`}>
                            <span className="font-bold">{field}:</span> {msg}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-1.5 pt-2 border-t border-red-50 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-2 py-1 text-[8px] font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#A60316] to-[#D90429] hover:from-[#D90429] hover:to-[#FB718A] text-white px-2 py-1 text-[8px] font-bold rounded shadow-sm transition-all disabled:opacity-50 flex items-center gap-1"
                >
                  {isSubmitting && <Layers className="w-2 h-2 animate-spin" />}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
