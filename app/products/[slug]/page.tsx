import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ProductDetail } from '@/resources/pages/ProductDetail';
import prisma from '@/lib/prisma';

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const siteUrl = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://www.rujamaphonesshop.com';
})();

const baseUrl = siteUrl.replace(/\/$/, '');

const metadataProductSelect = {
  name: true,
  price: true,
  image: true,
  description: true,
  brand: true,
  condition: true,
};

function absoluteUrl(value?: string | null) {
  if (!value) return `${baseUrl}/image/logo.jpeg`;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return `${baseUrl}${value.startsWith('/') ? value : `/${value}`}`;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
  }).format(price);
}

function buildDescription(product: {
  name: string;
  brand: string;
  condition: string;
  price: number;
  description?: string | null;
}) {
  const fallback = `${product.brand} ${product.name} available at Rujama Phones Shop for ${formatPrice(product.price)}. Condition: ${product.condition}.`;
  return (product.description?.trim() || fallback).slice(0, 180);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

function buildWhereClause(identifier: string) {
  if (isUuid(identifier)) {
    return { id: identifier };
  }
  return { slug: identifier };
}

async function getProductForMetadata(identifier: string) {
  const where = buildWhereClause(identifier);
  const [smartphone, speaker, accessory] = await Promise.all([
    prisma.smartphone.findUnique({ where, select: metadataProductSelect }),
    prisma.speaker.findUnique({ where, select: metadataProductSelect }),
    prisma.accessory.findUnique({ where, select: metadataProductSelect }),
  ]);

  return smartphone || speaker || accessory;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductForMetadata(slug);

  if (!product) {
    return {
      title: 'Product not found | Rujama Phones Shop',
      description: 'This product is no longer available at Rujama Phones Shop.',
    };
  }

  const title = `${product.name} | Rujama Phones Shop`;
  const description = buildDescription(product);
  const productUrl = `${baseUrl}/products/${slug}`;
  const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;
  const imageUrl = absoluteUrl(firstImage);

  return {
    title,
    description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: productUrl,
      siteName: 'Rujama Phones Shop',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

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
