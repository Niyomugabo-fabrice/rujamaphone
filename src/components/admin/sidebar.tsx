"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Smartphone, Speaker, Layers, LogOut } from "lucide-react";
import Image from "next/image";


interface SidebarProps {
  onCloseMobile?: () => void;
}

export const navigationOptions = [
  { name: "SMART PHONE", href: "/admin/smartphones", icon: Smartphone },
  { name: "ACCESSORY", href: "/admin/accessories", icon: Layers },
  { name: "SPEAKER", href: "/admin/speakers", icon: Speaker },
];

const handleLogout = async () => {
  try {
    // No headers needed! The browser automatically sends the cookie
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export default function Sidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-full bg-[#820210] text-white pt-5 pb-4">
      {/* Brand Identity Header */}
      <div className="flex items-center flex-shrink-0 px-6 space-x-3">
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <div className="hidden sm:flex w-12 h-12 rounded-lg items-center justify-center shadow-md shrink-0">
                         <Image
                           src="/image/logo.jpeg"
                           alt="logo"
                           width={48}
                           height={48}
                           className="rounded-full object-cover"
                         />
            </div>
        </div>
        <div>
          <h2 className="font-serif text-sm  leading-tight tracking-wide">Rujama Phones Shop </h2>
        </div>
      </div>

      {/* Navigation Stack */}
      <div className="mt-8 flex-1 h-0 overflow-y-auto px-3 space-y-1">
        {navigationOptions.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onCloseMobile}
              className={`group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                isActive 
                  ? "bg-white text-[#820210] shadow-md shadow-black/10" 
                  : "text-red-100 hover:bg-white/10"
              }`}
            >
              <Icon className={`mr-3.5 h-5 w-5 flex-shrink-0 ${
                isActive ? "text-[#820210]" : "text-red-200 group-hover:text-white"
              }`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Workspace Footer */}
      <div className="flex-shrink-0 flex border-t border-red-800/60 p-4 mx-2">
          <button 
  onClick={handleLogout}
  className="group flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-red-200 hover:bg-white hover:text-[#820210]"
>
  <LogOut className="mr-3 h-5 w-5 text-red-300 group-hover:text-[#820210]" />
  Logout
</button>
        </div>
    </div>
  );
}