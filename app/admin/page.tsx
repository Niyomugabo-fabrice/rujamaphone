"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPageRoot() {
  const router = useRouter();

  useEffect(() => {
    // Standard secure structural push directly onto static endpoint array
    router.replace("/admin/smartphones");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#090D16] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-t-transparent border-rose-600 rounded-full animate-spin" />
    </div>
  );
}