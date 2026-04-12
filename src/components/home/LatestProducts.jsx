import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import LazyImage from '@/components/ui/LazyImage';
import { getFeaturedProducts } from '@/utils/products';
import { buildWhatsAppUrl, orderMessageForProduct } from '@/utils/whatsapp';
import { Button } from '@/components/ui/Button';

function WhatsAppIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function LatestProducts() {
  const featured = getFeaturedProducts().slice(0, 6);

  return (
    <section className="border-t border-luxury-border bg-luxury-page py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <SectionTitle
          eyebrow="المجموعة"
          title="أحدث المنتجات المختارة"
          subtitle="لمسات مختارة من معيشة، نوم، سفرة وديكور — جاهزة للطلب والتخصيص حسب مساحتك."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-sm border border-luxury-border bg-white shadow-luxury transition hover:border-luxury-gold/35"
            >
              <Link to={`/products/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden">
                <LazyImage
                  src={p.images[0]}
                  alt={p.name}
                  className="h-full transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-ink/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <Link to={`/products/${p.slug}`}>
                  <h3 className="font-display text-lg font-bold text-luxury-ink transition group-hover:text-luxury-gold-dark">
                    {p.name}
                  </h3>
                </Link>
                <p className="mt-2 flex-1 text-sm font-medium leading-[1.75] text-luxury-ink-muted line-clamp-2">
                  {p.shortDescription}
                </p>
                {p.price != null && (
                  <p className="mt-3 text-sm font-bold text-luxury-gold-dark">
                    {p.price.toLocaleString('ar-EG')} {p.currency}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    to={`/products/${p.slug}`}
                    className="inline-flex flex-1 items-center justify-center rounded-sm border border-luxury-border px-4 py-2.5 text-xs font-bold text-luxury-ink transition hover:border-luxury-gold/50 hover:text-luxury-gold-dark"
                  >
                    التفاصيل
                  </Link>
                  <Button
                    as="a"
                    href={buildWhatsAppUrl(orderMessageForProduct(p))}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    className="flex-1 !py-2.5 !text-xs"
                  >
                    <WhatsAppIcon />
                    اطلب
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-luxury-gold-dark transition hover:text-luxury-gold"
          >
            عرض كامل المنتجات
            <span aria-hidden>←</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
