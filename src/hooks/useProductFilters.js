import { useMemo, useState, useDeferredValue } from 'react';
import { getAllProducts } from '@/utils/products';
import { formatProductTitle } from '@/utils/productDisplay';
import { getProductDisplayHeadline, getProductMarketing } from '@/utils/productMarketing';

const ALL = 'all';

/**
 * @param {{ initialCategory?: string }} [opts]
 */
export function useProductFilters(opts = {}) {
  const { initialCategory = ALL } = opts;
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const products = useMemo(() => getAllProducts(), []);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = category === ALL || p.category === category;
      if (!matchCat) return false;
      if (!q) return true;
      const m = getProductMarketing(p);
      const headline = getProductDisplayHeadline(p, formatProductTitle);
      const hay = [
        headline,
        m.hasCustom ? m.cardText : '',
        p.name,
        p.shortDescription,
        p.id,
        p.imagePath,
        p.collectionLabel,
        p.subfolderLabel,
        p.folderPath,
        p.photoCount != null ? String(p.photoCount) : '',
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [products, category, deferredQuery]);

  return {
    category,
    setCategory,
    query,
    setQuery,
    filtered,
    isStale: query !== deferredQuery,
  };
}
