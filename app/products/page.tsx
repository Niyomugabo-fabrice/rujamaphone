'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import ProductsGrid from '@/components/ProductsGrid';

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <ProductsGrid />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}