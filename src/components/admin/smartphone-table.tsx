"use client";

import { useState, useRef } from "react";
import { Edit3, Trash2, Smartphone, AlertTriangle, Eye, X, Layers, Image, Trash, Plus, CheckSquare, Square } from "lucide-react";

interface SmartphoneTableProps {
  data: any[];
  onRefresh: () => void;
  onViewProduct: (product: any) => void;
}
export default function SmartphoneTable({ data, onRefresh ,onViewProduct,}: SmartphoneTableProps) {
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [viewingItem, setViewingItem] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States for Image Management within the Details Modal
  const [selectedDetailImages, setSelectedDetailImages] = useState<string[]>([]);

  // Advanced media manipulation states for the Edit Modal
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [stagedDeletedImages, setStagedDeletedImages] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<{ id: string; file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Triggers the detailed viewing modal state
  const handleOpenDetailModal = (item: any) => {
    setViewingItem(item);
    setSelectedDetailImages([]);
  };

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
  headers: { 
    "Content-Type": "application/json" 
  },
  body: JSON.stringify({ image: remainingImages }),
});

if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.error || "Failed to update");
}

      if (response.ok) {
        const updatedItem = { ...viewingItem, image: remainingImages };
        setViewingItem(updatedItem);
        setSelectedDetailImages((prev) => prev.filter((url) => url !== imgUrl));
        onRefresh();
      }
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

      if (response.ok) {
        setViewingItem({ ...viewingItem, image: remainingImages });
        setSelectedDetailImages([]);
        onRefresh();
      }
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

    const finalImages = [...existingImages];

    // Convert new files → base64 (still your current approach)
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

    // ✅ ONLY REAL DATABASE FIELDS
    const payload = {
      name: formPayload.name,
      brand: formPayload.brand,
      storage: formPayload.storage,
      condition: formPayload.condition,
      description: formPayload.description,
      price: formPayload.price ? parseInt(formPayload.price as string, 10) : 0,
      image: finalImages,
    };

    const response = await fetch(`/api/smartphones/${editingItem.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      newImageFiles.forEach((f) => URL.revokeObjectURL(f.preview));
      setEditingItem(null);
      onRefresh();
    }
  } catch (err) {
    console.error("Update failed:", err);
  } finally {
    setIsSubmitting(false);
  }
};

  // Submit handler for deleting an asset
  const handleDeleteSubmit = async () => {
    if (!deletingId) return;
    try {
      await fetch(`/api/smartphones?id=${deletingId}`, { method: "DELETE" });
      setDeletingId(null);
      onRefresh();
    } catch (err) {
      console.error("Purge failure:", err);
    }
  };

  return (
    <>
      <div className="bg-white/60 border border-red-200/60 rounded-[24px] backdrop-blur-md shadow-sm">
        <div className="overflow-x-auto w-full rounded-[24px]">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-b border-red-100 bg-red-50/50 text-[11px] uppercase font-bold tracking-wider text-red-900/60">
                <th className="p-4 pl-6">Smartphone</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Condition</th>
                <th className="p-4">Storage</th>
                <th className="p-4">Price</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100/60 text-sm text-slate-800">
              {data.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => handleOpenDetailModal(item)}
                  className="hover:bg-white/80 cursor-pointer transition-colors group"
                >
                  <td className="p-4 pl-6 font-semibold text-slate-900">
                    <div className="flex items-center gap-3">
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
                  <td className="p-4 text-xs font-semibold tracking-wide text-slate-600">{item.brand}</td>
                  <td className="p-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold tracking-wide ${
                      item.condition === "NEW" 
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/10" 
                        : "bg-amber-500/10 text-amber-600 border border-amber-500/10"
                    }`}>
                      {item.condition}
                    </span>
                  </td>
                  <td className="p-4 text-[#A60316] font-semibold">{item.storage?.replace("GB", "")} GB</td>
                  <td className="p-4 font-extrabold text-slate-900">{parseInt(item.price || 0).toLocaleString()} RWF</td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button 
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
      </div>

      {/* --- MODAL ENGINE: SPECIFICATION DETAILS VIEW & DELETIONS --- */}
      {viewingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-red-100 rounded-2xl max-w-xl w-full p-6 text-slate-800 shadow-2xl animate-in zoom-in-95 duration-150 my-auto relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#D90429] bg-red-50 px-2 py-0.5 rounded-md">Blueprint Specifications</span>
                <h3 className="text-base font-black text-slate-900 mt-1">{viewingItem.name}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setViewingItem(null)} 
                className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Core Specs Grid layout */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Brand Matrix</span>
                <span className="text-xs font-bold text-slate-800">{viewingItem.brand}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Storage Tier</span>
                <span className="text-xs font-bold text-[#A60316]">{viewingItem.storage?.replace("GB", "")} GB Storage</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Physical Status</span>
                <span className="text-xs font-bold text-slate-800">{viewingItem.condition}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Valuation Tree</span>
                <span className="text-xs font-black text-slate-900">{parseInt(viewingItem.price || 0).toLocaleString()} RWF</span>
              </div>
            </div>

            {/* Functional Description Block */}
            <div className="mb-5">
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Functional Log Notes</span>
              <p className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 text-xs font-medium text-slate-600 leading-relaxed min-h-[50px]">
                {viewingItem.description || "No customized descriptor mapping applied to this smartphone deployment asset."}
              </p>
            </div>

            {/* Interactive Image Gallery Cluster Interface */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Image className="w-3.5 h-3.5 text-[#D90429]" /> Media File Architecture ({viewingItem.image?.length || 0})
                </label>

                {selectedDetailImages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleRemoveSelectedImagesFromDetail}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 text-[10px] bg-red-50 text-[#D90429] hover:bg-[#D90429] hover:text-white border border-red-200 px-2.5 py-1 rounded-lg font-bold transition-all disabled:opacity-50"
                  >
                    <Trash className="w-3 h-3" /> Delete Selected ({selectedDetailImages.length})
                  </button>
                )}
              </div>

              {(!viewingItem.image || viewingItem.image.length === 0) ? (
                <div className="text-center p-6 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-xs font-medium">
                  No images loaded inside this structural smartphone array registry.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[220px] overflow-y-auto p-1 bg-slate-50/60 rounded-xl border border-slate-100">
                  {viewingItem.image.map((imgUrl: string, idx: number) => {
                    const isChecked = selectedDetailImages.includes(imgUrl);
                    return (
                      <div 
                        key={`detail-img-${idx}`} 
                        className={`relative group/detailimg aspect-square rounded-xl overflow-hidden border bg-white shadow-sm transition-all ${
                          isChecked ? 'border-[#D90429] ring-2 ring-[#D90429]/20' : 'border-slate-200'
                        }`}
                      >
                        <img src={imgUrl} className="w-full h-full object-cover" alt="Phone documentation asset" />
                        
                        {/* Selector checkbox target */}
                        <button
                          type="button"
                          onClick={() => toggleDetailImageSelection(imgUrl)}
                          className="absolute top-1.5 left-1.5 p-1 bg-white/90 backdrop-blur-sm text-slate-600 rounded-md transition-all border border-slate-100 hover:scale-105"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-3.5 h-3.5 text-[#D90429]" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </button>

                        {/* Singular target instant delete action */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/detailimg:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleRemoveSingleImageFromDetail(imgUrl)}
                            disabled={isSubmitting}
                            className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md"
                            title="Remove individual picture node"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-5 mt-4 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => setViewingItem(null)} 
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Close Specification Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL ENGINE: UPDATE SMARTPHONE CONFIGURATION --- */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-red-100 rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-2xl shadow-red-950/10 animate-in zoom-in-95 duration-150 my-auto relative">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#D90429]" /> Adjust Asset Configuration Tree
              </h3>
              <button 
                type="button" 
                onClick={() => setEditingItem(null)} 
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Asset Designation</label>
                <input 
                  type="text" 
                  name="name" 
                  defaultValue={editingItem.name} 
                  className="w-full bg-slate-50 border border-red-100 rounded-xl p-2.5 text-sm focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] font-medium text-slate-900" 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Brand Matrix</label>
                  <select 
                    name="brand" 
                    defaultValue={editingItem.brand} 
                    className="w-full bg-slate-50 border border-red-100 rounded-xl p-2.5 text-sm focus:outline-none text-slate-900 font-medium"
                  >
                    <option value="APPLE">APPLE</option>
                    <option value="SAMSUNG">SAMSUNG</option>
                    <option value="GOOGLE">GOOGLE</option>
                    <option value="XIAOMI">XIAOMI</option>
                    <option value="ONEPLUS">ONEPLUS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Storage Spec</label>
                  <select 
                    name="storage" 
                    defaultValue={editingItem.storage} 
                    className="w-full bg-slate-50 border border-red-100 rounded-xl p-2.5 text-sm focus:outline-none text-slate-900 font-medium"
                  >
                    <option value="GB64">64 GB</option>
                    <option value="GB128">128 GB</option>
                    <option value="GB256">256 GB</option>
                    <option value="GB512">512 GB</option>
                    <option value="TB1">1 TB</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Valuation (RWF)</label>
                  <input 
                    type="number" 
                    name="price" 
                    defaultValue={editingItem.price} 
                    className="w-full bg-slate-50 border border-red-100 rounded-xl p-2.5 text-sm focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] font-medium text-slate-900" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Condition Matrix</label>
                  <select 
                    name="condition" 
                    defaultValue={editingItem.condition} 
                    className="w-full bg-slate-50 border border-red-100 rounded-xl p-2.5 text-sm focus:outline-none text-slate-900 font-medium"
                  >
                    <option value="NEW">NEW</option>
                    <option value="USED">USED</option>
                  </select>
                </div>
              </div>

              {/* --- IMAGE CLUSTER MANAGEMENT ENGINE (EDIT CONTEXT) --- */}
              <div className="border-t border-b border-red-50 py-3.5 my-2">
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-wider flex items-center gap-1.5">
                  <Image className="w-3.5 h-3.5 text-[#D90429]" /> Media Cluster Storage Matrix
                </label>
                
                <div className="grid grid-cols-4 gap-2.5 max-h-[160px] overflow-y-auto p-1 bg-slate-50 rounded-xl border border-red-50">
                  {existingImages.map((imgUrl, idx) => (
                    <div key={`existing-${idx}`} className="relative group/img aspect-square rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm">
                      <img src={imgUrl} className="w-full h-full object-cover" alt="Asset media node" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleStageDeleteExisting(imgUrl)}
                          className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors shadow"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {newImageFiles.map((fileObj) => (
                    <div key={fileObj.id} className="relative group/img aspect-square rounded-lg overflow-hidden border border-emerald-200 bg-white shadow-sm">
                      <img src={fileObj.preview} className="w-full h-full object-cover" alt="New upload stream" />
                      <span className="absolute top-1 left-1 bg-emerald-500 text-[8px] text-white px-1 font-extrabold rounded">NEW</span>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveNewFile(fileObj.id)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-md transition-colors shadow"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-red-200 hover:border-[#D90429] bg-white rounded-lg transition-colors group/btn text-slate-400 hover:text-[#D90429]"
                  >
                    <Plus className="w-4 h-4 mb-0.5 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Add Node</span>
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
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Functional Notes</label>
                <textarea 
                  name="description" 
                  defaultValue={editingItem.description || ""} 
                  rows={2}
                  className="w-full bg-slate-50 border border-red-100 rounded-xl p-2.5 text-sm focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] text-slate-900 font-medium resize-none" 
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-red-50">
                <button 
                  type="button" 
                  onClick={() => setEditingItem(null)} 
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#A60316] to-[#D90429] hover:from-[#D90429] hover:to-[#FB718A] text-white px-5 py-2.5 text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting && <Layers className="w-3 h-3 animate-spin" />}
                  Save Blueprint Changes
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