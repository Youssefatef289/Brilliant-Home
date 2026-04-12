import { useMemo, useState, useDeferredValue } from 'react';
import { getAllProducts } from '@/utils/products';

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
      return (
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
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
