'use client';

import { Suspense } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Products } from '@/resources/pages/Products';

/**
 * Loading fallback component displayed while search parameters resolve.
 */
function ProductsLoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center bg-secondary min-h-[50vh]">
      <div className="text-center space-y-2">
        <div className="text-4xl animate-pulse">📱</div>
        <p className="text-muted-foreground animate-pulse">Loading products listing...</p>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Suspense fallback={<ProductsLoadingFallback />}>
          <Products />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}