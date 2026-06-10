"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import SpeakerTable from "@/components/admin/speaker-table";

export default function SpeakersPage() {
  const [itemsData, setItemsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSpeakers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/speakers");
      const data = await res.json();
      setItemsData(data.items || []);
    } catch (err) {
      console.error("Failed to load speakers:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpeakers();
  }, [fetchSpeakers]);

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-900 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight uppercase">Speakers Catalog</h1>
          <p className="text-xs text-slate-400 mt-0.5">Acoustic Audio Systems Data</p>
        </div>
        
        <button 
          onClick={fetchSpeakers}
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
          No acoustic speaker units discovered.
        </div>
      ) : (
        <SpeakerTable data={itemsData} onRefresh={fetchSpeakers} />
      )}
    </div>
  );
}