import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import LazyImage from '@/components/ui/LazyImage';
import { getHomeShowcaseProducts } from '@/utils/products';
import { formatProductBody, formatProductTitle } from '@/utils/productDisplay';
import { SITE } from '@/data/site';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 420, damping: 30 },
  },
};

export default function HomeProductsShowcase() {
  const picks = getHomeShowcaseProducts(6);

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
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl border-s-4 border-luxury-gold-dark ps-6 md:ps-8">
            <SectionTitle
              align="start"
              eyebrow="المعرض"
              title="أعمالنا"
              subtitle={`لمسات من ${SITE.activity} — تصفّح المجموعات وافتح التفاصيل لرؤية كل الصور.`}
              className="!mb-0 md:!mb-0"
            />
          </div>
        </div>

        <h2 id="home-products-heading" className="sr-only">
          أعمالنا — {SITE.nameAr}
        </h2>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-14 grid list-none grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 xl:grid-cols-3 xl:gap-x-10 xl:gap-y-14"
        >
          {picks.map((p) => (
            <motion.li key={p.slug} variants={item} className="min-w-0">
              <Link
                to={`/products/${p.slug}`}
                className="group flex h-full flex-col bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-gold-dark focus-visible:ring-offset-2 focus-visible:ring-offset-luxury-pearl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-luxury-mist shadow-md ring-1 ring-luxury-border/55 transition duration-300 group-hover:shadow-xl group-hover:ring-luxury-gold/30">
                  <LazyImage
                    src={p.images[0]}
                    alt={formatProductTitle(p.name)}
                    className="absolute inset-0 h-full w-full min-h-[200px]"
                    imgClassName="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-ink/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  {p.photoCount != null && p.photoCount > 1 && (
                    <span className="absolute end-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold text-luxury-ink shadow-sm backdrop-blur-sm md:end-4 md:top-4 md:text-xs">
                      {p.photoCount} صور
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col bg-transparent pt-4 md:pt-5">
                  <span className="inline-flex w-fit rounded-full border border-luxury-border/70 bg-transparent px-3 py-1 text-[11px] font-bold text-luxury-gold-dark">
                    {p.collectionLabel}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-extrabold leading-snug text-luxury-ink transition group-hover:text-luxury-gold-dark md:text-xl">
                    {formatProductTitle(p.name)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm font-medium leading-[1.75] text-luxury-ink-muted line-clamp-3">
                    {formatProductBody(p.shortDescription)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-luxury-gold-dark">
                    <span className="h-px w-8 bg-luxury-gold transition-all group-hover:w-10" aria-hidden />
                    عرض التفاصيل والصور
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-16 flex flex-col items-stretch justify-between gap-6 border-t border-luxury-border/80 pt-12 sm:flex-row sm:items-center"
        >
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-sm border border-luxury-gold-dark bg-transparent px-8 py-3.5 text-sm font-bold text-luxury-gold-dark transition hover:bg-luxury-gold-dark hover:text-white sm:min-w-[220px]"
          >
            تصفح كل المجموعات
          </Link>
          <p className="text-center text-sm font-medium text-luxury-ink-muted sm:max-w-lg sm:text-start">
            في صفحة المنتجات تجد التصنيفات والبحث لتصل بسرعة لأي مجموعة.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
