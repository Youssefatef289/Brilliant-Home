import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '@/components/seo/Seo';
import ProductFilters from '@/components/products/ProductFilters';
import ProductCard from '@/components/products/ProductCard';
import ProductQuickViewModal from '@/components/products/ProductQuickViewModal';
import { useProductFilters } from '@/hooks/useProductFilters';
import { expandProductsForListing } from '@/utils/productGrid';
import { PRODUCT_CATEGORIES, SITE } from '@/data/site';
import './Products.css';

export default function Products() {
  const {
    category,
    setCategory,
    query,
    setQuery,
    filtered,
    isStale,
  } = useProductFilters();

  const gridItems = useMemo(() => expandProductsForListing(filtered), [filtered]);
  const [previewItem, setPreviewItem] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleQuickView = (product, imageIndex = 0) => {
    setPreviewItem({ product, imageIndex });
    setIsPreviewOpen(true);
  };

  const activeLabel =
    PRODUCT_CATEGORIES.find((c) => c.id === category)?.label ?? 'الكل';

  return (
    <>
      <Seo
        title={`المنتجات — ${SITE.nameEn} | ${SITE.nameAr}`}
        description={`تصفح تشكيلة ${SITE.activity}: معيشة، نوم، سفرة، ديكور وأثاث مكتبي. ${SITE.tagline}`}
        path="/products"
      />

      <div className="page-products">
        <section className="relative overflow-hidden border-b border-luxury-border/70 bg-gradient-to-b from-luxury-surface to-luxury-page py-12 md:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            aria-hidden
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 0%, rgba(184,149,46,0.10) 0%, transparent 45%), radial-gradient(circle at 90% 100%, rgba(184,149,46,0.07) 0%, transparent 40%)',
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8 lg:px-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-luxury-gold-dark"
            >
              المعرض
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-3 font-display text-3xl font-extrabold text-luxury-ink md:text-5xl"
            >
              منتجاتنا
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-[1.85] text-luxury-ink-muted md:text-base"
            >
              تشكيلة من {SITE.activity} بتصاميم عصرية وخامات تدوم. اختر التصنيف أو ابحث، ثم اطلب ما يناسبك.
            </motion.p>
          </div>
        </section>

        <section className="bg-luxury-page py-10 md:py-14">
          <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
            <ProductFilters
              query={query}
              onQueryChange={setQuery}
              category={category}
              onCategoryChange={setCategory}
            />

            <div
              className={`transition-opacity duration-200 ${isStale ? 'opacity-60' : 'opacity-100'}`}
              aria-busy={isStale}
            >
              <p className="mb-6 text-sm font-semibold text-luxury-ink-muted">
                <span className="text-luxury-gold-dark">{activeLabel}</span>
                {' · '}
                {gridItems.length} عنصر
              </p>

              {filtered.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-luxury-border py-16 text-center text-sm font-semibold text-luxury-ink-muted">
                  لا توجد منتجات مطابقة. جرّب تغيير البحث أو التصنيف.
                </p>
              ) : (
                <AnimatePresence mode="popLayout">
                  <motion.ul
                    key={`${category}-${query}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {gridItems.map((item, i) => (
                      <motion.li
                        key={item.key}
                        layout
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="list-none"
                      >
                        <ProductCard
                          product={item.product}
                          index={0}
                          coverSrc={item.coverSrc}
                          imageIndex={item.imageIndex}
                          onQuickView={handleQuickView}
                        />
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              )}
            </div>
          </div>
        </section>
        <ProductQuickViewModal
          product={previewItem?.product ?? null}
          initialImageIndex={previewItem?.imageIndex ?? 0}
          open={isPreviewOpen && previewItem != null}
          onClose={() => setIsPreviewOpen(false)}
        />
      </div>
    </>
  );
}
