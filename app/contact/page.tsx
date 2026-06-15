import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Contact } from '../../src/resources/pages/Contact';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact',
  description:
    'Contact Rujama Phones Shop in Kigali by phone, WhatsApp, or social media for product questions, phone support, directions, and service requests.',
  path: '/contact',
});

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
