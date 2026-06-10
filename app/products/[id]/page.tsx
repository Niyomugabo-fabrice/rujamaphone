'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ProductDetail } from '@/resources/pages/ProductDetail';

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ProductDetail />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
