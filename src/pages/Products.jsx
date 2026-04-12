import { motion } from 'framer-motion';
import Seo from '@/components/seo/Seo';
import SectionTitle from '@/components/ui/SectionTitle';
import ProductFilters from '@/components/products/ProductFilters';
import ProductCard from '@/components/products/ProductCard';
import { useProductFilters } from '@/hooks/useProductFilters';
import { SITE } from '@/data/site';
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

  return (
    <>
      <Seo
        title={`المنتجات — ${SITE.nameEn} | ${SITE.nameAr}`}
        description={`تصفح تشكيلة ${SITE.activity}: معيشة، نوم، سفرة، ديكور وأثاث مكتبي. ${SITE.tagline}`}
        path="/products"
      />

      <div className="page-products">
      <section className="border-b border-luxury-border bg-luxury-surface py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-extrabold text-luxury-ink md:text-5xl"
          >
            المنتجات
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-3 max-w-2xl text-base font-medium leading-[1.8] text-luxury-ink-muted"
          >
            استخدم البحث والتصنيفات لاستكشاف المجموعة. الأسعار إرشادية — للتأكيد
            النهائي راسلنا على واتساب.
          </motion.p>
        </div>
      </section>

      <section className="bg-luxury-page py-12 md:py-16">
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <SectionTitle
            eyebrow="المتجر"
            title="جميع المنتجات"
            subtitle="واجهة بحث وتصفية قابلة للتوسعة لاحقًا مع API أو لوحة إدارة."
            align="start"
            className="!mb-10 !text-right"
          />

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
            {filtered.length === 0 ? (
              <p className="rounded-sm border border-dashed border-luxury-border bg-luxury-surface py-16 text-center text-sm font-semibold text-luxury-ink-muted">
                لا توجد منتجات مطابقة. جرّب تغيير البحث أو التصنيف.
              </p>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p, i) => (
                  <li key={p.id} className="list-none">
                    <ProductCard product={p} index={i} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
