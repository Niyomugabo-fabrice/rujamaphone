import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { About } from '@/components/About';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description:
    'Learn about Rujama Phones Shop, a trusted phone and electronics shop serving customers in Kigali, Rwanda since 2012.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <About />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
