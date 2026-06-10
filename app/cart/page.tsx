'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Cart } from '@/resources/pages/Cart';

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Cart />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
