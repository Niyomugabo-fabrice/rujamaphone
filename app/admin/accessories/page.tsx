"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Layers } from "lucide-react";
import AccessoryTable from "@/components/admin/accessory-table";

export default function AccessoriesPage() {
  const [itemsData, setItemsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAccessories = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/accessories");
      const data = await res.json();
      setItemsData(data.items || []);
    } catch (err) {
      console.error("Failed to load accessories:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccessories();
  }, [fetchAccessories]);

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-900 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight uppercase">Accessories Catalog</h1>
          <p className="text-xs text-slate-400 mt-0.5">Hardware Matrix Components</p>
        </div>
        
        <button 
          onClick={fetchAccessories}
          className="p-2.5 bg-[#131B2E]/60 hover:bg-[#131B2E] border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-rose-500" : ""}`} />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3 p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-[#131B2E]/20 animate-pulse rounded-xl border border-slate-800/40" />
          ))}
        </div>
      ) : itemsData.length === 0 ? (
        <div className="p-16 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500 text-sm">
          No accessories profiles discovered.
        </div>
      ) : (
        <AccessoryTable data={itemsData} onRefresh={fetchAccessories} />
      )}
    </div>
  );
}