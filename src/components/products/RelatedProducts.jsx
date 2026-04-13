import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '@/components/ui/LazyImage';
import { getRelatedProducts } from '@/utils/products';
import { formatProductTitle } from '@/utils/productDisplay';
import { getProductDisplayHeadline, getProductMarketing } from '@/utils/productMarketing';

export default function RelatedProducts({ slug, category }) {
  const related = getRelatedProducts(slug, category, 4);
  if (!related.length) return null;

  return (
    <section className="mt-16 border-t border-luxury-border/80 pt-12 md:mt-20 md:pt-16">
      <div className="mb-8 text-center md:text-start">
        <h2 className="font-display text-2xl font-extrabold text-luxury-charcoal md:text-3xl">
          مجموعات أخرى قد تعجبك
        </h2>
        <p className="mt-2 text-sm font-medium text-luxury-ink-muted">
          من نفس التصنيف أو تشكيلات قريبة — اضغط للتفاصيل والصور الكاملة
        </p>
      </div>
      <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p, i) => {
          const m = getProductMarketing(p);
          const headline = getProductDisplayHeadline(p, formatProductTitle);
          return (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="min-w-0"
          >
            <Link
              to={`/products/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-luxury-border/70 bg-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:border-luxury-gold/35 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-luxury-mist">
                <LazyImage
                  src={p.images[0]}
                  alt={headline}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-base font-extrabold leading-snug text-luxury-ink transition group-hover:text-luxury-gold-dark">
                  {headline}
                </h3>
                {m.hasCustom && (
                  <p className="mt-2 line-clamp-2 text-xs font-medium leading-relaxed text-luxury-ink-muted">
                    {m.cardText}
                  </p>
                )}
                {p.price != null && (
                  <p className="mt-2 text-xs font-bold text-luxury-gold-dark">
                    {p.price.toLocaleString('ar-EG')} {p.currency}
                  </p>
                )}
                <span className="mt-3 text-xs font-bold text-luxury-gold-dark">عرض التفاصيل ←</span>
              </div>
            </Link>
          </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
