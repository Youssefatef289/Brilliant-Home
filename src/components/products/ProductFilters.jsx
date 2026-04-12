import { motion } from 'framer-motion';
import { PRODUCT_CATEGORIES } from '@/data/site';

export default function ProductFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
}) {
  return (
    <div className="mb-10 space-y-6">
      <div className="relative max-w-xl">
        <label htmlFor="product-search" className="sr-only">
          بحث في المنتجات
        </label>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-luxury-ink-muted">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </span>
        <input
          id="product-search"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="ابحث بالاسم، الوصف، أو كود المنتج..."
          className="w-full rounded-sm border border-luxury-border bg-white py-3.5 pl-4 pr-12 text-sm font-medium text-luxury-ink placeholder:text-luxury-ink-muted/70 focus:border-luxury-gold/60 focus:outline-none focus:ring-2 focus:ring-luxury-gold/20"
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {PRODUCT_CATEGORIES.map((c) => {
          const active = category === c.id;
          return (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => onCategoryChange(c.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                active
                  ? 'border-luxury-gold-dark bg-luxury-gold/15 text-luxury-gold-dark'
                  : 'border-luxury-border bg-white text-luxury-ink-secondary hover:border-luxury-gold/40 hover:text-luxury-ink'
              }`}
            >
              {c.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
