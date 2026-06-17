import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';
import { GlobalNavbar } from '@/components/GlobalNavbar';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rujamaphonesshop.com'),
  title: {
    default: 'Rujama Phones Shop | Phones, Accessories & Gadgets in Kigali',
    template: '%s | Rujama Phones Shop',
  },
  description:
    'Rujama Phones Shop is a trusted phone shop in Kigali, Rwanda for smartphones, speakers, accessories, phone upgrades, installment plans, and gadget support.',
  keywords: [
    'Rujama',
    'Rujama Phones',
    'Rujama Phones Shop',
    'Rujama phone shop',
    'phones in Kigali',
    'phone shop in Rwanda',
    'smartphones Kigali',
    'phone accessories Kigali',
    'buy phones Rwanda',
  ],
  applicationName: 'Rujama Phones Shop',
  authors: [{ name: 'Rujama Phones Shop' }],
  creator: 'Rujama Phones Shop',
  publisher: 'Rujama Phones Shop',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_RW',
    url: 'https://www.rujamaphonesshop.com',
    siteName: 'Rujama Phones Shop',
    title: 'Rujama Phones Shop | Phones, Accessories & Gadgets in Kigali',
    description:
      'Shop smartphones, speakers, accessories, phone upgrade services, and pay-in-parts plans from Rujama Phones Shop in Kigali, Rwanda.',
    images: [
      {
        url: 'https://www.rujamaphonesshop.com/image/rujamashop.jpeg',
        width: 1200,
        height: 630,
        alt: 'Rujama Phones Shop in Kigali, Rwanda',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rujama Phones Shop | Phones, Accessories & Gadgets in Kigali',
    description:
      'Trusted phone shop in Kigali for smartphones, accessories, upgrades, and pay-in-parts plans.',
    images: ['https://www.rujamaphonesshop.com/image/rujamashop.jpeg'],
  },
  category: 'technology retail',
  icons: {
    icon: '/image/logo.jpeg',
    apple: '/image/logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    name: 'Rujama Phones Shop',
    alternateName: ['Rujama', 'Rujama Phones'],
    url: 'https://www.rujamaphonesshop.com',
    logo: 'https://www.rujamaphonesshop.com/image/logo.jpeg',
    image: 'https://www.rujamaphonesshop.com/image/rujamashop.jpeg',
    description:
      'Phone shop in Kigali, Rwanda selling smartphones, speakers, accessories, and offering phone upgrade and installment services.',
    telephone: '+250788773754',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kigali',
      addressCountry: 'RW',
    },
    areaServed: ['Kigali', 'Rwanda'],
    sameAs: [
      'https://www.instagram.com/rujama_phones_shop/',
      'https://www.tiktok.com/@rujamaphones',
      'https://web.facebook.com/search/top?q=rujama_phones_shop',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </head>
      <body className="font-sans">
        <AuthProvider>
          <CartProvider>
            <GlobalNavbar />
            {children}
            <Toaster position="top-right" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
