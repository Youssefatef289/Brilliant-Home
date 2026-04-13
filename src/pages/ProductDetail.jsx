import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Seo from '@/components/seo/Seo';
import ProductGallery from '@/components/products/ProductGallery';
import RelatedProducts from '@/components/products/RelatedProducts';
import { getProductBySlug } from '@/utils/products';
import { formatProductBody, formatProductTitle } from '@/utils/productDisplay';
import { buildWhatsAppUrl, orderMessageForProduct } from '@/utils/whatsapp';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/data/site';
import './ProductDetail.css';

function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const displayTitle = formatProductTitle(product.name);
  const displayDesc = formatProductBody(product.description);
  const displayShort = formatProductBody(product.shortDescription);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: displayTitle,
    description: displayDesc,
    image: product.images,
    sku: product.id,
    offers: product.price
      ? {
          '@type': 'Offer',
          priceCurrency: product.currency,
          price: product.price,
          availability: 'https://schema.org/InStock',
          url: typeof window !== 'undefined' ? window.location.href : '',
        }
      : undefined,
  };

  return (
    <>
      <Seo
        title={`${displayTitle} — ${SITE.nameEn}`}
        description={displayShort}
        path={`/products/${product.slug}`}
        image={product.images[0]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
      </Helmet>

      <div className="page-product-detail min-h-screen bg-luxury-page">
        <div className="border-b border-luxury-border/80 bg-luxury-surface/90 py-6 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
            <nav
              className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-luxury-border/50 bg-white/70 px-4 py-3 text-xs font-semibold text-luxury-ink-muted shadow-sm"
              aria-label="مسار التنقل"
            >
              <Link to="/" className="transition hover:text-luxury-gold-dark">
                الرئيسية
              </Link>
              <span className="opacity-40" aria-hidden>
                /
              </span>
              <Link to="/products" className="transition hover:text-luxury-gold-dark">
                المنتجات
              </Link>
              <span className="opacity-40" aria-hidden>
                /
              </span>
              <span className="line-clamp-1 text-luxury-ink">{displayTitle}</span>
            </nav>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {product.collectionLabel && (
                <span className="rounded-full border border-luxury-gold/35 bg-luxury-gold/10 px-3 py-1 text-[11px] font-bold text-luxury-gold-dark">
                  {product.collectionLabel}
                  {product.subfolderLabel ? ` · ${product.subfolderLabel}` : ''}
                </span>
              )}
              <span className="rounded-full bg-luxury-charcoal/90 px-3 py-1 text-[11px] font-bold text-white">
                كود: {product.id}
              </span>
              {product.photoCount != null && (
                <span className="text-xs font-semibold text-luxury-ink-muted">
                  {product.photoCount} صورة في المعرض
                </span>
              )}
            </div>
          </div>
        </div>

        <article className="py-10 md:py-14 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="lg:col-span-7"
              >
                <ProductGallery images={product.images} productName={displayTitle} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 }}
                className="lg:col-span-5 lg:sticky lg:top-28"
              >
                <div className="rounded-2xl border border-luxury-border/60 bg-white/90 p-6 shadow-luxury ring-1 ring-black/[0.03] md:p-8">
                  <h1 className="font-display text-2xl font-extrabold leading-snug text-luxury-charcoal md:text-3xl lg:text-[1.85rem]">
                    {displayTitle}
                  </h1>

                  {product.images?.length > 1 && (
                    <p className="mt-3 text-sm font-medium leading-relaxed text-luxury-ink-muted">
                      مرّ على الصور المصغّرة أدناه لتشاهد كل الزوايا. للمقاسات والخامات والسعر النهائي راسلنا
                      على واتساب.
                    </p>
                  )}

                  {product.price != null && (
                    <p className="mt-5 text-2xl font-bold text-luxury-gold-dark md:text-3xl">
                      {product.price.toLocaleString('ar-EG')} {product.currency}
                      <span className="mr-2 text-sm font-semibold text-luxury-ink-muted">(إرشادي)</span>
                    </p>
                  )}

                  <div className="mt-6 border-t border-luxury-border/60 pt-6">
                    <p className="text-base font-medium leading-[1.9] text-luxury-ink-secondary md:text-[1.05rem]">
                      {displayDesc}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button
                      as="a"
                      href={buildWhatsAppUrl(orderMessageForProduct(product))}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="whatsapp"
                      className="flex-1 sm:min-w-[200px] sm:flex-none"
                    >
                      <WhatsAppIcon />
                      اطلب عبر واتساب
                    </Button>
                    <Button
                      as="a"
                      href={buildWhatsAppUrl(`استفسار عن: ${displayTitle} (${product.id})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      className="flex-1 sm:flex-none"
                    >
                      استفسار سريع
                    </Button>
                  </div>

                  <Link
                    to="/products"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-luxury-gold-dark transition hover:text-luxury-gold"
                  >
                    ← العودة إلى المنتجات
                  </Link>
                </div>
              </motion.div>
            </div>

            <RelatedProducts slug={product.slug} category={product.category} />
          </div>
        </article>
      </div>
    </>
  );
}
