"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFE4E8] text-slate-900 font-sans flex relative overflow-hidden">
      {/* Background Ambience Layers - Adjusted opacity to play nicely with a light field canvas */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D90429]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Desktop Sidebar Column - Restructured border colors to split cleanly against light mode layout */}
      <aside className="hidden md:block w-64 border-r border-red-200/50 shrink-0 h-screen sticky top-0 z-20">
        <Sidebar />
      </aside>

      {/* Mobile Header Row */}
      <Header onOpenMobileSidebar={() => setSidebarOpen(true)} />

      {/* MOBILE SIDEBAR SLIDE-OVER DRAWER */}
      <div className={`fixed inset-0 z-50 flex md:hidden transition-opacity duration-300 ${
        sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        
        <div className={`relative flex flex-col w-full max-w-xs bg-[#820210] text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          <div className="absolute top-0 right-0 pt-2 -mr-12">
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex-1 min-h-0">
            <Sidebar onCloseMobile={() => setSidebarOpen(false)} />
          </div>
        </div>
      </div>

      {/* Main Content Workspace Frame */}
      <main className="flex-1 min-w-0 flex flex-col relative z-10 pt-16 md:pt-0 h-screen">
        <div className="flex-1 w-full max-w-[1600px] mx-auto overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
