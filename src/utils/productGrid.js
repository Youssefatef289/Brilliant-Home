/**
 * توسيع قائمة المنتجات لصفحة المنتجات: بطاقة لكل صورة، ما عدا المطابخ وغرف النوم/الأسِرّة.
 */

/**
 * @param {{ category: string; slug: string }} product
 * @returns {boolean}
 */
export function isKitchenOrBedroomAlbum(product) {
  const { category, slug } = product;
  const s = slug || '';
  if (category === 'kitchen' || s.startsWith('kitchen-')) return true;
  if (category === 'bed' || category === 'bedrooms' || s.startsWith('bedrooms')) return true;
  return false;
}

/**
 * @param {Array<{ id: string; slug: string; images: string[] }>} products
 * @returns {{ key: string; product: typeof products[0]; coverSrc: string; imageIndex: number }[]}
 */
export function expandProductsForListing(products) {
  const out = [];
  for (const p of products) {
    const imgs = p.images?.length ? p.images : [];
    if (!imgs.length) continue;
    if (isKitchenOrBedroomAlbum(p)) {
      out.push({
        key: p.id,
        product: p,
        coverSrc: imgs[0],
        imageIndex: 0,
      });
    } else {
      imgs.forEach((src, i) => {
        out.push({
          key: `${p.id}-img-${i}`,
          product: p,
          coverSrc: src,
          imageIndex: i,
        });
      });
    }
  }
  return out;
}
