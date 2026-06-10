'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Contact } from '../../src/resources/pages/Contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
