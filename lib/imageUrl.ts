/**
 * Some product images are saved as plain http:// URLs copied from manufacturer
 * sites. Browsers block those as mixed content on our https:// pages, so they
 * silently fail to load. Route http:// images through our own image proxy
 * (served over https) instead of hitting the insecure origin directly.
 */
export function getSafeImageSrc(src: string | null | undefined, fallback: string): string {
  if (!src) return fallback;
  if (src.startsWith("http://")) {
    return `/api/image-proxy?url=${encodeURIComponent(src)}`;
  }
  return src;
}
