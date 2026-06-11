"use client";

import { useState, useRef, useEffect } from "react";
import { Edit3, Trash2, Smartphone, AlertTriangle, Eye, X, Layers, Image, Trash, Plus, CheckSquare, Square } from "lucide-react";

interface SmartphoneTableProps {
  data: any[];
  onViewProduct: (product: any) => void;
  

}
export default function SmartphoneTable({ data, onViewProduct }: SmartphoneTableProps) {
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [viewingItem, setViewingItem] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingImages, setIsEditingImages] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [brandFilter, setBrandFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [storageFilter, setStorageFilter] = useState("");

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
    if (storageFilter) params.set("storage", storageFilter);

    return params.toString();
  };

  const fetchSmartphones = async () => {
    setIsLoading(true);
    try {
      const queryString = buildQueryString();
      const response = await fetch(`/api/smartphones?${queryString}`);
      const payload = await response.json();

      if (!response.ok) {
        console.error("Failed fetching smartphones", payload);
        return;
      }

      setLocalData(payload.data || []);
      setTotalItems(payload.total || 0);
      setTotalPages(payload.totalPages || 1);
      setPage(payload.page || 1);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSmartphones();
  }, [page, limit, brandFilter, conditionFilter, storageFilter]);

  // Triggers the edit modal state and loads the item profile properties
  const handleOpenEditModal = (e: React.MouseEvent, item: any) => {
    e.stopPropagation(); // Avoid triggering row-click viewing modal
    setEditingItem(item);
    setExistingImages(item.image || []);
    setStagedDeletedImages([]);
    setNewImageFiles([]);
  };

  // Trigger delete warning sequence safely without row-click collision
  const handleOpenDeleteModal = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
  };

  // Toggle image selection inside the Details Modal for batch actions
  const toggleDetailImageSelection = (imgUrl: string) => {
    setSelectedDetailImages((prev) =>
      prev.includes(imgUrl) ? prev.filter((url) => url !== imgUrl) : [...prev, imgUrl]
    );
  };

  // Direct singular image removal from within the Details Modal
  const handleRemoveSingleImageFromDetail = async (imgUrl: string) => {
    if (!viewingItem) return;
    setIsSubmitting(true);
    try {
      const remainingImages = (viewingItem.image || []).filter((url: string) => url !== imgUrl);
      const response = await fetch(`/api/smartphones/${viewingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: remainingImages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update");
      }

      const updatedItem = { ...viewingItem, image: remainingImages };
      setViewingItem(updatedItem);
      setSelectedDetailImages((prev) => prev.filter((url) => url !== imgUrl));
      setLocalData((prev) =>
        prev.map((p) =>
          p.id === viewingItem.id ? updatedItem : p
        )
      );
    } catch (err) {
      console.error("Failed removing image from detail asset payload:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Batch selection removal from within the Details Modal
  const handleRemoveSelectedImagesFromDetail = async () => {
    if (!viewingItem || selectedDetailImages.length === 0) return;
    setIsSubmitting(true);
    try {
      const remainingImages = (viewingItem.image || []).filter(
        (url: string) => !selectedDetailImages.includes(url)
      );

      const response = await fetch(`/api/smartphones/${viewingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: remainingImages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update");
      }

      const updatedItem = { ...viewingItem, image: remainingImages };
      setViewingItem(updatedItem);
      setSelectedDetailImages([]);
      setLocalData((prev) =>
        prev.map((p) =>
          p.id === viewingItem.id ? updatedItem : p
        )
      );
    } catch (err) {
      console.error("Failed executing batch image drops from detail asset node:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Stage an existing server-hosted database image for removal (In Edit Modal)
  const handleStageDeleteExisting = (imgUrl: string) => {
    setStagedDeletedImages((prev) => [...prev, imgUrl]);
    setExistingImages((prev) => prev.filter((url) => url !== imgUrl));
  };

  // Discard a newly queued local file upload stream (In Edit Modal)
  const handleRemoveNewFile = (id: string) => {
    setNewImageFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((item) => item.id !== id);
    });
  };

  // Process incoming image selections through file input streaming reader
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    
    const structuredFiles = filesArray.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewImageFiles((prev) => [...prev, ...structuredFiles]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Submit handler for editing/updating an asset via partial modification (PATCH)
const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const formPayload = Object.fromEntries(formData);
      
      // 1. Start with the current state (after user removed items)
      const finalImages = [...existingImages];

      // 2. Process new files
      if (newImageFiles.length > 0) {
        const base64Promises = newImageFiles.map((fileObj) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(fileObj.file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
          });
        });
        const convertedBase64Images = await Promise.all(base64Promises);
        finalImages.push(...convertedBase64Images);
      }

      // 3. Construct Payload
      const payload = {
        name: formPayload.name,
        brand: formPayload.brand,
        storage: formPayload.storage,
        condition: formPayload.condition,
        description: formPayload.description,
        price: formPayload.price ? parseInt(formPayload.price as string, 10) : 0,
        // The API should receive the absolute state of the images
        image: finalImages,
      };

      const response = await fetch(`/api/smartphones/${editingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update asset registry");
      }

      const updatedItem = {
        ...editingItem,
        ...payload,
        image: finalImages,
      };
      setLocalData((prev) =>
        prev.map((p) =>
          p.id === editingItem.id ? updatedItem : p
        )
      );
      if (viewingItem?.id === editingItem.id) {
        setViewingItem(updatedItem);
      }

      newImageFiles.forEach((f) => URL.revokeObjectURL(f.preview));
      setEditingItem(null);
    } catch (err) {
      console.error("Update synchronization failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit handler for deleting an asset
  const handleDeleteSubmit = async () => {
    if (!deletingId) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/smartphones?id=${deletingId}`, { method: "DELETE" });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete asset");
      }
      setLocalData((prev) => prev.filter((item) => item.id !== deletingId));
      if (viewingItem?.id === deletingId) {
        setViewingItem(null);
      }
      setDeletingId(null);
    } catch (err) {
      console.error("Purge failure:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-full min-w-0 bg-white/60 border border-red-200/60 rounded-[24px] backdrop-blur-md shadow-sm">
        <div className="p-4 flex flex-wrap items-center gap-2">
          <select
            value={brandFilter}
            onChange={(e) => {
              setPage(1);
              setBrandFilter(e.target.value);
            }}
            className="rounded-2xl border border-red-100 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429]/20 cursor-pointer"
          >
            <option value="">Brand: All</option>
            <option value="APPLE">Brand: APPLE</option>
            <option value="SAMSUNG">Brand: SAMSUNG</option>
            <option value="GOOGLE">Brand: GOOGLE</option>
            <option value="XIAOMI">Brand: XIAOMI</option>
            <option value="ONEPLUS">Brand: ONEPLUS</option>
          </select>

          <select
            value={conditionFilter}
            onChange={(e) => {
              setPage(1);
              setConditionFilter(e.target.value);
            }}
            className="rounded-2xl border border-red-100 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429]/20 cursor-pointer"
          >
            <option value="">Condition: All</option>
            <option value="NEW">Condition: NEW</option>
            <option value="USED">Condition: USED</option>
          </select>

          <select
            value={storageFilter}
            onChange={(e) => {
              setPage(1);
              setStorageFilter(e.target.value);
            }}
            className="rounded-2xl border border-red-100 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429]/20 cursor-pointer"
          >
            <option value="">Storage: All</option>
            <option value="GB64">Storage: 64 GB</option>
            <option value="GB128">Storage: 128 GB</option>
            <option value="GB256">Storage: 256 GB</option>
            <option value="GB512">Storage: 512 GB</option>
            <option value="TB1">Storage: 1 TB</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setPage(1);
              setBrandFilter("");
              setConditionFilter("");
              setStorageFilter("");
            }}
            className="rounded-2xl border border-red-100 bg-white px-3 py-2 text-xs font-bold text-[#D90429] hover:bg-[#FFE4E8]/80 transition-colors whitespace-nowrap ml-auto"
          >
            Reset
          </button>
        </div>

        <div className="overflow-x-auto w-full rounded-[24px] min-w-0">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-b border-red-100 bg-red-50/50 text-[10px] uppercase font-bold tracking-wider text-red-900/60">
                <th className="p-3 pl-4 min-w-[180px]">Smartphone</th>
                <th className="p-3 min-w-[90px]">Brand</th>
                <th className="p-3 min-w-[90px]">Condition</th>
                <th className="p-3 min-w-[85px]">Storage</th>
                <th className="p-3 min-w-[90px]">Price</th>
                <th className="p-3 pr-4 text-right min-w-[80px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100/60 text-sm text-slate-800">
              {localData.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => handleOpenDetailModal(item)}
                  className="hover:bg-white/80 cursor-pointer transition-colors group"
                >
                  <td className="p-3 pl-4 font-semibold text-slate-900 truncate">
                    <div className="flex items-center gap-2">
                      <img 
                        src={item.image?.[0] || "/placeholder.jpg"} 
                        className="w-10 h-10 object-cover rounded-xl border border-red-100 shadow-inner bg-white" 
                        alt="" 
                      />
                      <div>
                        <span className="block leading-tight text-sm font-bold group-hover:text-[#D90429] transition-colors">{item.name}</span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-medium mt-0.5">
                          <Eye className="w-2.5 h-2.5" /> Row click views specifications
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-xs font-semibold tracking-wide text-slate-600 truncate">{item.brand}</td>
                  <td className="p-3 truncate">
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold tracking-wide whitespace-nowrap ${
                      item.condition === "NEW" 
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/10" 
                        : "bg-amber-500/10 text-amber-600 border border-amber-500/10"
                    }`}>
                      {item.condition}
                    </span>
                  </td>
                  <td className="p-3 text-[#A60316] font-semibold truncate">{item.storage?.replace("GB", "")} GB</td>
                  <td className="p-3 font-extrabold text-slate-900 truncate">{parseInt(item.price || 0).toLocaleString()} RWF</td>
                  <td className="p-3 pr-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">                 <button 
                        onClick={(e) => handleOpenEditModal(e, item)} 
                        className="p-2 bg-white border border-red-100 hover:bg-[#FFE4E8]/40 text-slate-600 hover:text-[#D90429] rounded-xl transition-all shadow-sm"
                        title="Edit Profile Config"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={(e) => handleOpenDeleteModal(e, item.id)} 
                        className="p-2 bg-white border border-red-100 hover:bg-rose-50 text-slate-400 hover:text-red-600 rounded-xl transition-all shadow-sm"
                        title="Drop Tracking Frame"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 border-t border-red-100 bg-red-50/30 rounded-b-[24px]">
          <div className="text-xs text-slate-600">
            Showing {localData.length} of {totalItems} items • Page {page} of {totalPages}
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-end">
            <label className="text-[10px] uppercase tracking-wider text-slate-500">
              Per page
              <select
                value={limit}
                onChange={(e) => {
                  setPage(1);
                  setLimit(Number(e.target.value));
                }}
                className="ml-2 rounded-2xl border border-red-100 bg-white px-2 py-1 text-[11px] text-slate-900 outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </label>
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
              disabled={page <= 1}
              className="rounded-2xl border border-red-100 bg-white px-4 py-2 text-xs font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#FFE4E8]/80 transition-colors"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(current + 1, totalPages))}
              disabled={page >= totalPages}
              className="rounded-2xl border border-red-100 bg-white px-4 py-2 text-xs font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#FFE4E8]/80 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL ENGINE: SPECIFICATION DETAILS VIEW & DELETIONS --- */}
      {viewingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9999] flex items-center justify-center p-2">
          <div className="bg-white border border-red-100 rounded-xl max-w-4xl w-[min(100%-16px,500px)] p-3 text-slate-800 shadow-2xl animate-in zoom-in-95 duration-150 relative max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-1 mb-2 pb-1 border-b border-slate-100">
              <div>
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#D90429] bg-red-50 px-1.5 py-0.5 rounded">Details</span>
                <h3 className="text-xs font-bold text-slate-900 mt-0.5 truncate">{viewingItem.name}</h3>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingImages((prev) => !prev);
                    setSelectedDetailImages([]);
                  }}
                  className="px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  {isEditingImages ? "Stop" : "Img"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(viewingItem);
                    setExistingImages(viewingItem.image || []);
                    setStagedDeletedImages([]);
                    setNewImageFiles([]);
                  }}
                  className="px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded border border-red-100 bg-white text-[#D90429] hover:bg-[#FFE4E8]/80 transition-colors"
                >
                  Edit
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setViewingItem(null);
                    setIsEditingImages(false);
                  }}
                  className="text-slate-400 hover:text-slate-600 p-0.5 hover:bg-slate-50 rounded transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 mb-2">
              <div className="p-1.5 bg-slate-50 border border-slate-100 rounded">
                <span className="block text-[7px] uppercase font-bold text-slate-400 tracking-wider">Brand</span>
                <span className="text-[10px] font-bold text-slate-800">{viewingItem.brand}</span>
              </div>
              <div className="p-1.5 bg-slate-50 border border-slate-100 rounded">
                <span className="block text-[7px] uppercase font-bold text-slate-400 tracking-wider">Storage</span>
                <span className="text-[10px] font-bold text-[#A60316]">{viewingItem.storage?.replace("GB", "")} GB</span>
              </div>
              <div className="p-1.5 bg-slate-50 border border-slate-100 rounded">
                <span className="block text-[7px] uppercase font-bold text-slate-400 tracking-wider">Condition</span>
                <span className="text-[10px] font-bold text-slate-800">{viewingItem.condition}</span>
              </div>
              <div className="p-1.5 bg-slate-50 border border-slate-100 rounded">
                <span className="block text-[7px] uppercase font-bold text-slate-400 tracking-wider">Price</span>
                <span className="text-[10px] font-bold text-slate-900">{parseInt(viewingItem.price || 0).toLocaleString()}</span>
              </div>
            </div>

            {/* Functional Description Block */}
            <div className="mb-2">
              <span className="block text-[7px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Notes</span>
              <p className="bg-slate-50/50 p-1.5 rounded border border-slate-100 text-[9px] font-medium text-slate-600 leading-tight min-h-[25px] max-h-[40px] overflow-hidden">
                {viewingItem.description || "-"}
              </p>
            </div>

            {/* Interactive Image Gallery Cluster Interface */}
            <div className="border-t border-slate-100 pt-1.5">
              <div className="flex items-center justify-between gap-1 mb-1">
                <label className="block text-[7px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-0.5">
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
                        key={`detail-img-${idx}`} 
                        className={`relative group/detailimg aspect-square rounded overflow-hidden border bg-white shadow-sm transition-all cursor-pointer hover:opacity-80 ${
                          isChecked ? 'border-[#D90429] ring-1 ring-[#D90429]/30' : 'border-slate-200'
                        }`}
                        onClick={() => !isEditingImages && setEnlargedImage(imgUrl)}
                      >
                        <img src={imgUrl} className="w-full h-full object-cover" alt="Phone documentation asset" />
                        
                        {isEditingImages && (
                          <button
                            type="button"
                            onClick={() => toggleDetailImageSelection(imgUrl)}
                            className="absolute top-0.5 left-0.5 p-0.5 bg-white/90 backdrop-blur-sm text-slate-600 rounded transition-all border border-slate-100 hover:scale-105"
                          >
                            {isChecked ? (
                              <CheckSquare className="w-2.5 h-2.5 text-[#D90429]" />
                            ) : (
                              <Square className="w-2.5 h-2.5 text-slate-400" />
                            )}
                          </button>
                        )}

                        {isEditingImages && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/detailimg:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleRemoveSingleImageFromDetail(imgUrl)}
                              disabled={isSubmitting}
                              className="p-0.5 bg-red-600 hover:bg-red-700 text-white rounded transition-colors shadow-md"
                              title="Remove"
                            >
                              <Trash className="w-2 h-2" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
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
          <div className="relative w-full   max-w-4xl">
            <img 
              src={enlargedImage} 
              className="w-full h-auto object-contain rounded-xl shadow-2xl"
              alt="Enlarged view"
            />
            <button 
              type="button"
              onClick={() => setEnlargedImage(null)}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-slate-900 rounded-lg shadow-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute top-3 left-3 bg-white/90 px-3 py-1.5 rounded-lg shadow-lg">
              <p className="text-xs font-bold text-slate-900">{viewingItem?.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL ENGINE: UPDATE SMARTPHONE CONFIGURATION --- */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md  z-[9999] flex items-center justify-center p-2">
          <div className="bg-white border border-red-100 rounded-xl max-w-4xl h-100 w-[min(100%-16px,500px)] max-h-[95vh] overflow-y-auto text-slate-800 shadow-2xl shadow-red-950/10 animate-in zoom-in-95 duration-150 relative">
            <div className="sticky top-0 bg-white border-b border-red-100 flex items-center justify-between p-3 z-10">
              <h3 className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-[#D90429]" /> Edit
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
                    <option value="APPLE">APPLE</option>
                    <option value="SAMSUNG">SAMSUNG</option>
                    <option value="GOOGLE">GOOGLE</option>
                    <option value="XIAOMI">XIAOMI</option>
                    <option value="ONEPLUS">ONEPLUS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[7px] uppercase font-bold text-slate-500 mb-0.5 tracking-wider">Storage</label>
                  <select 
                    name="storage" 
                    defaultValue={editingItem.storage} 
                    className="w-full bg-slate-50 border border-red-100 rounded p-1 text-xs focus:outline-none text-slate-900 font-medium"
                  >
                    <option value="GB64">64 GB</option>
                    <option value="GB128">128 GB</option>
                    <option value="GB256">256 GB</option>
                    <option value="GB512">512 GB</option>
                    <option value="TB1">1 TB</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
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

                  {newImageFiles.map((fileObj) => (
                    <div key={fileObj.id} className="relative group/img aspect-square rounded-md overflow-hidden border border-emerald-200 bg-white shadow-sm">
                      <img src={fileObj.preview} className="w-full h-full object-cover" alt="New upload stream" />
                      <span className="absolute top-0.5 left-0.5 bg-emerald-500 text-[7px] text-white px-0.5 font-extrabold rounded">NEW</span>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveNewFile(fileObj.id)}
                          className="p-1 bg-slate-800 hover:bg-slate-900 text-white rounded-sm transition-colors shadow"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-red-200 hover:border-[#D90429] bg-white rounded-md transition-colors group/btn text-slate-400 hover:text-[#D90429]"
                  >
                    <Plus className="w-3 h-3 mb-0.5 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-[7px] font-bold uppercase tracking-wider">Add</span>
                  </button>
                </div>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  multiple 
                  accept="image/*" 
                />
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

      {/* --- MODAL ENGINE: SYSTEM PURGE DELETE --- */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-red-100 rounded-2xl max-w-sm w-full p-6 text-slate-800 shadow-2xl relative animate-in scale-in duration-100">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 border border-red-100 mb-4">
              <AlertTriangle className="h-5 w-5 text-[#D90429]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 text-center mb-1">Destructive Sync Warning</h3>
            <p className="text-xs text-slate-500 text-center mb-6 leading-relaxed px-2">
              Are you absolute about removing this phone mapping registry completely? The physical data tree will drop permanently.
            </p>
            <div className="flex items-center gap-3 w-full">
              <button 
                type="button" 
                onClick={() => setDeletingId(null)} 
                className="flex-1 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 border border-red-100 rounded-xl transition-colors"
              >
                Abort
              </button>
              <button 
                type="button" 
                onClick={handleDeleteSubmit} 
                className="flex-1 bg-[#D90429] hover:bg-[#A60316] text-white px-4 py-2.5 text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Purge Record
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}