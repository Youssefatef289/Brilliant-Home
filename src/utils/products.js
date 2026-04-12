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
