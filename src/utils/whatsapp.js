import { SITE } from '@/data/site';
import { formatProductTitle } from '@/utils/productDisplay';

/**
 * @param {string} [message]
 * @returns {string}
 */
export function buildWhatsAppUrl(message) {
  const base = SITE.whatsappUrl;
  if (!message?.trim()) return base;
  const separator = base.includes('?') ? '&' : '?';
  return `${base}${separator}text=${encodeURIComponent(message.trim())}`;
}

/**
 * @param {{ name: string; slug: string; id: string }} product
 * @returns {string}
 */
export function orderMessageForProduct(product) {
  const title = formatProductTitle(product.name);
  return `مرحبًا Brilliant Home، أرغب في الاستفسار عن الطلب:\nالمنتج: ${title}\nالكود: ${product.id}\nالرابط: ${typeof window !== 'undefined' ? window.location.origin : ''}/products/${product.slug}`;
}
