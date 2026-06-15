import type { Metadata } from 'next';
import { Home } from '@/resources/pages/Home';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Rujama Phones Shop | Smartphone Store in Kigali',
  description:
    'Rujama Phones Shop sells smartphones, speakers, phone accessories, and gadgets in Kigali with upgrade services, installment options, and WhatsApp support.',
  path: '/',
});

export default function HomePage() {
  return <Home />;
}
