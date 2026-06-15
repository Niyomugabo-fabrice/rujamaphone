import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.rujamaphonesshop.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/login', '/signup', '/cart', '/profile'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
