import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PRODUCT_CATEGORIES } from '@/data/site';

export default function ProductFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
}) {
  const scrollRef = useRef(null);
  const tabRefs = useRef([]);
  const prevIndexRef = useRef(-1);

  const activeIndex = PRODUCT_CATEGORIES.findIndex((c) => c.id === category);

  useEffect(() => {
    if (activeIndex < 0) return;
    const prev = prevIndexRef.current;
    // كشف التاب المجاور في اتجاه الحركة ليتقلّب الشريط للأمام أو للخلف
    let targetIndex = activeIndex;
    if (prev !== -1 && activeIndex > prev) {
      targetIndex = Math.min(activeIndex + 1, PRODUCT_CATEGORIES.length - 1);
    } else if (prev !== -1 && activeIndex < prev) {
      targetIndex = Math.max(activeIndex - 1, 0);
    }
    const el = tabRefs.current[targetIndex] ?? tabRefs.current[activeIndex];
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  return (
    <div className="mb-10 space-y-5">
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
          placeholder="ابحث بالاسم أو التصنيف..."
          className="w-full rounded-2xl border border-luxury-border/80 bg-white/90 py-3.5 pl-4 pr-12 text-sm font-medium text-luxury-ink shadow-sm backdrop-blur-xl transition placeholder:text-luxury-ink-muted/70 focus:border-luxury-gold/60 focus:outline-none focus:ring-2 focus:ring-luxury-gold/20"
          autoComplete="off"
        />
      </div>

      <div
        ref={scrollRef}
        className="flex gap-1.5 overflow-x-auto rounded-2xl border border-luxury-border/70 bg-white/70 p-1.5 backdrop-blur-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="تصنيفات المنتجات"
      >
        {PRODUCT_CATEGORIES.map((c, idx) => {
          const active = category === c.id;
          return (
            <motion.button
              key={c.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onCategoryChange(c.id)}
              whileTap={{ scale: 0.95 }}
              className={`relative flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-colors duration-300 ${
                active
                  ? 'text-white'
                  : 'text-luxury-ink-secondary hover:text-luxury-gold-dark'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-0 rounded-full bg-luxury-gold-dark shadow-md shadow-luxury-gold/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{c.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
