import type { Metadata } from 'next';

const siteName = 'Rujama Phones Shop';
const defaultImage = '/image/rujamashop.jpeg';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = defaultImage,
}: PageMetadataOptions): Metadata {
  const url = path.startsWith('http') ? path : `https://www.rujamaphonesshop.com${path}`;
  const shareTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      locale: 'en_RW',
      url,
      siteName,
      title: shareTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: shareTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [image],
    },
  };
}
