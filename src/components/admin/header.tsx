"use client";

import { Menu } from "lucide-react";

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

export default function Header({ onOpenMobileSidebar }: HeaderProps) {
  return (
    <header className="md:hidden absolute top-0 left-0 right-0 h-16 bg-[#820210] border-b border-red-800/40 flex items-center justify-between px-4 z-30 shadow-md">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span className="text-[#820210] text-sm font-bold">R</span>
        </div>
        <span className="font-bold text-white tracking-wide text-sm">Rujama Phones Shop</span>
      </div>
      
      <button
        onClick={onOpenMobileSidebar}
        className="p-2 text-red-100 hover:text-white bg-white/10 rounded-lg transition-all focus:outline-none"
      >
        <Menu className="w-5 h-5" />
      </button>
    </header>
  );
}