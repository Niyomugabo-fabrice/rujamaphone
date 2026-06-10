"use client";

import { useState } from "react";
import { Edit3, Layers } from "lucide-react";

export default function AccessoryTable({ data, onRefresh }: { data: any[]; onRefresh: () => void }) {
  const [editingItem, setEditingItem] = useState<any | null>(null);

  return (
    <div className="bg-[#131B2E]/30 border border-slate-800 rounded-[20px] backdrop-blur-md overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-900/40 text-[11px] uppercase font-bold tracking-wider text-slate-400">
            <th className="p-4">Accessory Component</th>
            <th className="p-4">Brand</th>
            <th className="p-4">Condition</th>
            <th className="p-4">Type</th>
            <th className="p-4">Price</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900/60 text-sm">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-900/20 text-slate-300">
              <td className="p-4 font-semibold text-white flex items-center gap-3">
                <img src={item.image?.[0] || "/placeholder.jpg"} className="w-10 h-10 object-cover rounded-lg border border-slate-800" />
                {item.name}
              </td>
              <td className="p-4">{item.brand}</td>
              <td className="p-4">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.condition === "NEW" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>{item.condition}</span>
              </td>
              <td className="p-4 text-purple-400 font-medium">{item.type}</td>
              <td className="p-4 font-bold text-white">{item.price?.toLocaleString()} RWF</td>
              <td className="p-4 text-right">
                <button onClick={() => setEditingItem(item)} className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-md"><Edit3 className="w-4 h-4" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingItem && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0F1D] border border-slate-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-md font-bold text-white mb-4 flex items-center gap-2"><Layers className="w-4 h-4 text-rose-500" /> Edit Accessory</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setEditingItem(null)} className="px-4 py-2 text-xs text-slate-400 hover:text-white">Cancel</button>
              <button onClick={() => setEditingItem(null)} className="bg-rose-600 text-white px-4 py-2 text-xs rounded-xl">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}