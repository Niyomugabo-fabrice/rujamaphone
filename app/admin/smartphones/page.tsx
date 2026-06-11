"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Plus, Smartphone, Image as ImageIcon, X, Eye, AlertCircle, CheckCircle2 } from "lucide-react";
import SmartphoneTable from "@/components/admin/smartphone-table";

export default function SmartphonesPage() {
  const [itemsData, setItemsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detail view state allocation
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Inline Notification Engine State
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form image streaming states
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchSmartphones = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/smartphones");
      const payload = await res.json();
      setItemsData(Array.isArray(payload) ? payload : payload.data || []);
    } catch (err) {
      console.error("Failed to load smartphones:", err);
      triggerNotification("error", "Failed to retrieve live item catalog streams.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSmartphones();
  }, [fetchSmartphones]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
      const filesArray = Array.from(e.target.files);
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleCreateSmartphone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formElement = e.currentTarget;
      const nativeFormData = new FormData(formElement);
      nativeFormData.delete("images");

      if (selectedFiles) {
        Array.from(selectedFiles).forEach((file) => {
          nativeFormData.append("images", file);
        });
      }

      const response = await fetch("/api/smartphones", {
        method: "POST",
        body: nativeFormData,
      });

      if (response.ok) {
        setIsCreateOpen(false);
        setSelectedFiles(null);
        setImagePreviews([]);
        triggerNotification("success", "Hardware tracking matrix committed successfully.");
        fetchSmartphones();
      } else {
        const errData = await response.json();
        triggerNotification("error", errData.error || "Failed to commit smartphone configuration.");
      }
    } catch (err) {
      console.error("Submission processing fault:", err);
      triggerNotification("error", "An unexpected network execution fault occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 relative text-slate-800">
      
      {/* TOAST SYSTEM (High contrast floating cards) */}
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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">Smartphones Catalog</h1>
          <p className="text-xs text-red-900/60 mt-0.5 font-medium">Isolated Hardware Sub-schema Storage Records</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchSmartphones}
            className="p-2.5 bg-white border border-red-200/60 rounded-xl text-slate-700 hover:text-[#D90429] hover:bg-white/80 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D90429]/40"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#D90429]" : ""}`} />
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#A60316] to-[#D90429] hover:from-[#D90429] hover:to-[#FB718A] text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md"
          >
            <Plus className="w-3.5 h-3.5" /> Add Smartphone
          </button>
        </div>
      </div>

      {/* CONTENT BLOCK CONTAINER */}
      {isLoading ? (
        <div className="space-y-3 p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-white/40 animate-pulse rounded-xl border border-red-200/40" />
          ))}
        </div>
      ) : itemsData.length === 0 ? (
        <div className="p-16 border border-dashed border-red-200/80 rounded-2xl text-center text-red-900/40 text-sm font-semibold bg-white/20">
          No smartphones records discovered.
        </div>
      ) : (
        <SmartphoneTable 
          data={itemsData} 
          // onRefresh={fetchSmartphones} 
          onViewProduct={(product: any) => setSelectedProduct(product)} 
        />
      )}

      {/* MODAL: CREATE SMARTPHONE */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-red-100 rounded-2xl max-w-md w-full p-6 text-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#D90429]" /> Register New Phone
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

            <form onSubmit={handleCreateSmartphone} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Model Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className="w-full bg-slate-50 border border-red-100 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] font-medium" 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Brand</label>
                  <select 
                    name="brand" 
                    className="w-full bg-slate-50 border border-red-100 rounded-xl p-2.5 text-sm text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="APPLE">APPLE</option>
                    <option value="SAMSUNG">SAMSUNG</option>
                    <option value="GOOGLE">GOOGLE</option>
                    <option value="XIAOMI">XIAOMI</option>
                    <option value="ONEPLUS">ONEPLUS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Storage Matrix</label>
                  <select 
                    name="storage" 
                    className="w-full bg-slate-50 border border-red-100 rounded-xl p-2.5 text-sm text-slate-900 font-medium focus:outline-none"
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
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Price (RWF)</label>
                  <input 
                    type="number" 
                    name="price" 
                    className="w-full bg-slate-50 border border-red-100 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] font-medium" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Condition</label>
                  <select 
                    name="condition" 
                    className="w-full bg-slate-50 border border-red-100 rounded-xl p-2.5 text-sm text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="NEW">NEW</option>
                    <option value="USED">USED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Description</label>
                <textarea 
                  name="description" 
                  rows={2}
                  className="w-full bg-slate-50 border border-red-100 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] font-medium resize-none" 
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Media Assets</label>
                <div className="relative group flex flex-col items-center justify-center w-full min-h-[90px] bg-slate-50 border border-dashed border-red-200 hover:border-[#D90429]/60 rounded-xl p-4 transition-all cursor-pointer">
                  <input 
                    type="file" 
                    id="file-input"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-[#D90429] mb-1.5 transition-colors" />
                  <span className="text-xs text-slate-500 group-hover:text-slate-800 font-medium transition-colors">
                    {selectedFiles && selectedFiles.length > 0 
                      ? `${selectedFiles.length} files selected` 
                      : "Select product images"}
                  </span>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-3 p-2.5 bg-slate-50 border border-red-100 rounded-xl">
                    {imagePreviews.map((src, idx) => (
                      <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border border-red-200 shadow-sm bg-white">
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
                  {isSubmitting ? "Deploying Assets..." : "save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW FULL PRODUCT DETAIL BY ID */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-red-100 rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-red-50">
              <Eye className="w-5 h-5 text-[#D90429]" />
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-wide uppercase">{selectedProduct.name}</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">ID: {selectedProduct.id}</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Image Map Array Rollout */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-wider">Device Gallery Records</label>
                {selectedProduct.image && selectedProduct.image.length > 0 ? (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {selectedProduct.image.map((url: string, index: number) => (
                      <div key={index} className="relative w-32 h-32 rounded-xl overflow-hidden border border-red-100 shrink-0 bg-slate-50 shadow-inner">
                        <img src={url} alt={`${selectedProduct.name} view ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-slate-50 rounded-xl text-center text-xs text-slate-400 border border-red-100">
                    No physical display snapshots linked to asset.
                  </div>
                )}
              </div>

              {/* Technical Specifications Grid Layout */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-red-100">
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Brand Group</span>
                  <span className="text-sm font-bold text-slate-800">{selectedProduct.brand}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Storage Module</span>
                  <span className="text-sm font-bold text-slate-800">{selectedProduct.storage?.replace("GB", " GB").replace("TB", " TB")}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Asset Valuation</span>
                  <span className="text-sm font-extrabold text-slate-900">{parseInt(selectedProduct.price || 0).toLocaleString()} RWF</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Condition Matrix</span>
                  <div>
                    <span className={`inline-block mt-0.5 px-2 py-0.5 text-[10px] font-extrabold rounded-md ${
                      selectedProduct.condition === "NEW" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                    }`}>
                      {selectedProduct.condition}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Functional Description Log</label>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-red-100 leading-relaxed max-h-[120px] overflow-y-auto font-medium">
                  {selectedProduct.description || "No supplemental details cataloged for this asset package tracking reference."}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-5 mt-2 border-t border-red-50">
              <button 
                type="button" 
                onClick={() => setSelectedProduct(null)} 
                className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-red-100 px-5 py-2 text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}