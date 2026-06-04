import { useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import LazyImage from '@/components/ui/LazyImage';
import { getAllProducts } from '@/utils/products';
import { formatProductBody, formatProductTitle } from '@/utils/productDisplay';
import { getProductDisplayHeadline, getProductMarketing } from '@/utils/productMarketing';
import { PRODUCT_CATEGORIES, SITE } from '@/data/site';

const ROW_SIZE = 3;

function ShowcaseCard({ product, index }) {
  const m = getProductMarketing(product);
  const headline = getProductDisplayHeadline(product, formatProductTitle);
  const blurb = m.hasCustom ? m.cardText : formatProductBody(product.shortDescription);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="min-w-0"
    >
      <Link
        to={`/products/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-gradient-to-b from-white/95 via-luxury-pearl/90 to-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.03] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-luxury-gold/30 hover:shadow-[0_28px_65px_rgba(184,149,46,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-gold-dark focus-visible:ring-offset-2 focus-visible:ring-offset-luxury-pearl"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.45rem] bg-luxury-mist shadow-[0_18px_45px_rgba(15,23,42,0.08)] ring-1 ring-white/70 transition duration-300 group-hover:shadow-[0_28px_60px_rgba(184,149,46,0.14)]">
          <LazyImage
            src={product.images[0]}
            alt={headline}
            className="absolute inset-0 h-full w-full min-h-[220px]"
            imgClassName="object-cover transition duration-700 group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-charcoal/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
          {product.collectionLabel && (
            <span className="absolute start-4 top-4 rounded-full border border-white/70 bg-white/88 px-3 py-1 text-[11px] font-bold text-luxury-gold-dark shadow-lg backdrop-blur-md">
              {product.collectionLabel}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4 px-1 pt-4 md:pt-5">
          <div className="space-y-2">
            <h3 className="font-display text-lg font-extrabold leading-snug text-luxury-ink transition group-hover:text-luxury-gold-dark md:text-xl">
              {headline}
            </h3>
            <p className="line-clamp-2 text-sm font-medium leading-[1.8] text-luxury-ink-muted">
              {blurb}
            </p>
          </div>

          <span className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-luxury-gold-dark">
            <span className="h-px w-8 bg-luxury-gold transition-all group-hover:w-10" aria-hidden />
            عرض التفاصيل والصور
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

export default function HomeProductsShowcase() {
  const allProducts = useMemo(() => getAllProducts(), []);

  const categories = useMemo(() => {
    const present = new Set(allProducts.map((p) => p.category));
    return PRODUCT_CATEGORIES.filter((c) => c.id === 'all' || present.has(c.id));
  }, [allProducts]);

  const [active, setActive] = useState('all');
  const tabRefs = useRef([]);
  const prevIndexRef = useRef(-1);

  const activeIndex = categories.findIndex((c) => c.id === active);

  useEffect(() => {
    if (activeIndex < 0) return;
    const prev = prevIndexRef.current;
    let targetIndex = activeIndex;
    if (prev !== -1 && activeIndex > prev) {
      targetIndex = Math.min(activeIndex + 1, categories.length - 1);
    } else if (prev !== -1 && activeIndex < prev) {
      targetIndex = Math.max(activeIndex - 1, 0);
    }
    const el = tabRefs.current[targetIndex] ?? tabRefs.current[activeIndex];
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
    prevIndexRef.current = activeIndex;
  }, [activeIndex, categories.length]);

  const picks = useMemo(() => {
    const list =
      active === 'all'
        ? allProducts
        : allProducts.filter((p) => p.category === active);
    return list.slice(0, ROW_SIZE);
  }, [allProducts, active]);

  return (
    <section
      className="section-home-products relative overflow-hidden border-t border-luxury-border bg-luxury-pearl py-20 md:py-28"
      aria-labelledby="home-products-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 20% 0%, rgba(184, 149, 46, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 85% 100%, rgba(184, 149, 46, 0.08) 0%, transparent 40%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="max-w-2xl border-s-4 border-luxury-gold-dark ps-6 md:ps-8">
          <SectionTitle
            align="start"
            eyebrow="المعرض"
            title="أعمالنا المختارة"
            subtitle={`لمحات منتقاة من ${SITE.activity} — اختر التصنيف لاستعراض القطع المناسبة.`}
            className="!mb-0 md:!mb-0"
          />
        </div>

        <h2 id="home-products-heading" className="sr-only">
          أعمالنا — {SITE.nameAr}
        </h2>

        {/* تابات التصنيفات */}
        <div
          className="mt-10 flex gap-1.5 overflow-x-auto rounded-2xl border border-luxury-border/70 bg-white/70 p-1.5 backdrop-blur-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="تصنيفات الأعمال"
        >
          {categories.map((c, idx) => {
            const isActive = active === c.id;
            return (
              <motion.button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(c.id)}
                whileTap={{ scale: 0.95 }}
                className={`relative flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-luxury-ink-secondary hover:text-luxury-gold-dark'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="home-showcase-pill"
                    className="absolute inset-0 -z-0 rounded-full bg-luxury-gold-dark shadow-md shadow-luxury-gold/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{c.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* صف واحد من المنتجات */}
        <AnimatePresence mode="popLayout">
          <motion.ul
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 grid list-none grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 xl:grid-cols-3 xl:gap-x-10"
          >
            {picks.map((p, i) => (
              <ShowcaseCard key={p.slug} product={p} index={i} />
            ))}
          </motion.ul>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-luxury-gold-dark px-9 py-3.5 text-sm font-bold text-white shadow-md shadow-luxury-gold/30 transition hover:bg-luxury-gold-dark/90 hover:shadow-lg sm:min-w-[240px]"
          >
            تصفّح كل المنتجات
            <span aria-hidden>←</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
