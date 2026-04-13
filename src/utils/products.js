import productsData from '@/data/products.json';

/** @returns {typeof productsData} */
export function getAllProducts() {
  return productsData;
}

/** @param {string} slug
 * @returns {Product | undefined}
 */
export function getProductBySlug(slug) {
  return productsData.find((p) => p.slug === slug);
}

/** @returns {Product[]} */
export function getFeaturedProducts() {
  return productsData.filter((p) => p.featured);
}

/**
 * منتجات متنوعة للصفحة الرئيسية (تدوير حسب التصنيف ثم تعبئة حتى الحد).
 * @param {number} [limit]
 * @returns {Product[]}
 */
export function getHomeShowcaseProducts(limit = 6) {
  const all = [...productsData];
  const byCat = new Map();
  for (const p of all) {
    if (!byCat.has(p.category)) byCat.set(p.category, []);
    byCat.get(p.category).push(p);
  }
  const out = [];
  const seen = new Set();
  while (out.length < limit) {
    let progress = false;
    for (const [, list] of byCat) {
      if (out.length >= limit) break;
      const p = list.shift();
      if (p && !seen.has(p.slug)) {
        seen.add(p.slug);
        out.push(p);
        progress = true;
      }
    }
    if (!progress) break;
  }
  for (const p of all) {
    if (out.length >= limit) break;
    if (!seen.has(p.slug)) {
      seen.add(p.slug);
      out.push(p);
    }
  }
  return out.slice(0, limit);
}

/**
 * @param {string} slug
 * @param {string} [category]
 * @param {number} [limit]
 */
export function getRelatedProducts(slug, category, limit = 4) {
  const current = getProductBySlug(slug);
  const cat = category ?? current?.category;
  const sameCat = productsData.filter(
    (p) => p.slug !== slug && p.category === cat
  );
  const ids = new Set(sameCat.map((p) => p.id));
  const others = productsData.filter((p) => p.slug !== slug && !ids.has(p.id));
  return [...sameCat, ...others].slice(0, limit);
}
