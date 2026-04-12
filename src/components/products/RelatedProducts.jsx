import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '@/components/ui/LazyImage';
import { getRelatedProducts } from '@/utils/products';

export default function RelatedProducts({ slug, category }) {
  const related = getRelatedProducts(slug, category, 4);
  if (!related.length) return null;

  return (
    <section className="mt-20 border-t border-luxury-border pt-16">
      <h2 className="font-display text-2xl font-bold text-luxury-ink md:text-3xl">
        منتجات مشابهة
      </h2>
      <p className="mt-2 text-sm font-semibold text-luxury-ink-muted">
        من نفس التصنيف قد تعجبك أيضًا
      </p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/products/${p.slug}`}
              className="group block overflow-hidden rounded-sm border border-luxury-border bg-white shadow-luxury transition hover:border-luxury-gold/35"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <LazyImage
                  src={p.images[0]}
                  alt={p.name}
                  className="h-full transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-bold text-luxury-ink group-hover:text-luxury-gold-dark">
                  {p.name}
                </h3>
                {p.price != null && (
                  <p className="mt-1 text-xs font-bold text-luxury-gold-dark">
                    {p.price.toLocaleString('ar-EG')} {p.currency}
                  </p>
                )}
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
