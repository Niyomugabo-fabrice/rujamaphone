const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rujamaphonesshop.com";

export function getProductUrl(slugOrId: string) {
  return `/products/${slugOrId}`;
}

export function getProductAbsoluteUrl(slugOrId: string) {
  return `${SITE_URL}${getProductUrl(slugOrId)}`;
}
