import { motion } from 'framer-motion';
import Seo from '@/components/seo/Seo';
import ProductFilters from '@/components/products/ProductFilters';
import ProductCard from '@/components/products/ProductCard';
import LazyImage from '@/components/ui/LazyImage';
import { useProductFilters } from '@/hooks/useProductFilters';
import { SITE } from '@/data/site';
import './Products.css';

/** صورة من `public/image` — غلاف صفحة المنتجات */
const PRODUCTS_HERO_IMAGE = `/image/${['bed', 'bed (1).jpg'].map((s) => encodeURIComponent(s)).join('/')}`;

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
      <section className="border-b border-luxury-border bg-luxury-surface py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-2 overflow-hidden rounded-sm shadow-luxury ring-1 ring-luxury-border/80 lg:order-1"
            >
              <div className="aspect-[4/3] md:aspect-[5/4] lg:aspect-[3/4]">
                <LazyImage
                  src={PRODUCTS_HERO_IMAGE}
                  alt={`معرض ${SITE.nameAr} — أثاث وديكور`}
                  className="h-full w-full"
                  imgClassName="object-cover"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-white/20"
                aria-hidden
              />
            </motion.div>
            <div className="order-1 lg:order-2">
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
                className="mt-4 max-w-xl text-base font-medium leading-[1.85] text-luxury-ink-muted md:text-lg"
              >
                كل مجلد صور = بطاقة واحدة في القائمة (صورة غلاف)، وباقي اللقطات تظهر داخل
                صفحة التفاصيل مع معاينة مصغّرة. اختر التصنيف أو ابحث، ثم «عرض التفاصيل».
                للسعر والخامات راسلنا على واتساب.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-luxury-page py-12 md:py-16">
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
