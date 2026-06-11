'use client';

import { Suspense } from 'react';
import ProductsGrid from '@/components/ProductsGrid';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Suspense boundary fixes the build error */}
        <Suspense fallback={<div className="p-16 text-center">ℛujama Shop...</div>}>
          <ProductsGrid />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}