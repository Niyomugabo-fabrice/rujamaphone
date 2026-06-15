import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsGrid from "@/components/ProductsGrid";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Products",
  description:
    "Browse smartphones, speakers, accessories, and gadgets available from Rujama Phones Shop in Kigali, Rwanda.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<ProductsPageSkeleton />}>
          <ProductsGrid />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function ProductsPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="h-9 w-48 rounded bg-gray-200 animate-pulse" />
          <div className="mt-3 h-5 w-32 rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="h-11 w-40 rounded-lg bg-gray-200 animate-pulse" />
      </div>
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="hidden lg:block rounded-xl border border-gray-200 bg-white p-6">
          <div className="h-6 w-28 rounded bg-gray-200 animate-pulse" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-5 rounded bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
                <div className="h-6 w-1/2 rounded bg-gray-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
