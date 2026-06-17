import type { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { getProductAbsoluteUrl } from '@/lib/product-url';

const baseUrl = 'https://www.rujamaphonesshop.com';

async function getProductRoutes() {
  try {
    const [smartphones, speakers, accessories] = await Promise.all([
      prisma.smartphone.findMany({ select: { id: true, slug: true, updatedAt: true } }),
      prisma.speaker.findMany({ select: { id: true, slug: true, updatedAt: true } }),
      prisma.accessory.findMany({ select: { id: true, slug: true, updatedAt: true } }),
    ]);

    return [...smartphones, ...speakers, ...accessories].map((product) => ({
      url: getProductAbsoluteUrl(product.slug ?? product.id),
      lastModified: product.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const routes = [
    { path: '/', priority: 1 },
    { path: '/products', priority: 0.95 },
    { path: '/accessories', priority: 0.9 },
    { path: '/services', priority: 0.85 },
    { path: '/upgrade', priority: 0.8 },
    { path: '/phone-upgrades', priority: 0.8 },
    { path: '/pay-in-parts', priority: 0.8 },
    { path: '/installment-plans', priority: 0.8 },
    { path: '/about', priority: 0.7 },
    { path: '/contact', priority: 0.7 },
  ];

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.path === '/products' ? ('daily' as const) : ('weekly' as const),
    priority: route.priority,
  }));

  return [...staticRoutes, ...(await getProductRoutes())];
}
