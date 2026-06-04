import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LazyImage from '@/components/ui/LazyImage';
import { Button } from '@/components/ui/Button';
import { formatProductBody, formatProductTitle } from '@/utils/productDisplay';
import { getProductDisplayHeadline, getProductMarketing } from '@/utils/productMarketing';
import { buildWhatsAppUrl, orderMessageForProduct } from '@/utils/whatsapp';

function CloseIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function clampIndex(index, length) {
  if (!length) return 0;
  const parsed = Number(index);
  if (!Number.isFinite(parsed)) return 0;
  return Math.min(Math.max(0, Math.floor(parsed)), length - 1);
}

export default function ProductQuickViewModal({
  product,
  open,
  initialImageIndex = 0,
  onClose,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = product?.images ?? [];

  useEffect(() => {
    if (!open || !product) return undefined;
    setActiveIndex(clampIndex(initialImageIndex, images.length));

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [initialImageIndex, images.length, onClose, open, product]);

  const marketing = useMemo(
    () => (product ? getProductMarketing(product) : null),
    [product]
  );

  const headline = product ? getProductDisplayHeadline(product, formatProductTitle) : '';
  const blurb = product
    ? marketing?.hasCustom
      ? marketing.cardText
      : formatProductBody(product.shortDescription)
    : '';
  const imageIndex = clampIndex(activeIndex, images.length);
  const activeImage = images[imageIndex] ?? images[0];
  const detailTo =
    product && imageIndex > 0
      ? `/products/${product.slug}?img=${imageIndex}`
      : product
        ? `/products/${product.slug}`
        : '#';

  if (!product || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="quick-view"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="presentation"
        >
          <div className="absolute inset-0 bg-luxury-ink/55 backdrop-blur-sm" aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`quick-view-title-${product.slug}`}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative z-10 flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق المعاينة"
              className="absolute end-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-luxury-ink shadow-md ring-1 ring-luxury-border/60 transition hover:bg-white hover:text-luxury-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxury-gold"
            >
              <CloseIcon />
            </button>

            <div className="relative aspect-[4/3] w-full bg-luxury-mist">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <LazyImage
                    src={activeImage}
                    alt={headline}
                    className="absolute inset-0 h-full w-full"
                    imgClassName="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              {product.collectionLabel && (
                <span className="absolute start-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-luxury-gold-dark shadow-sm backdrop-blur-sm">
                  {product.collectionLabel}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto p-5 md:p-6">
              {images.length > 1 && (
                <ul className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {images.map((src, index) => (
                    <li key={`${src}-${index}`}>
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`عرض الصورة ${index + 1}`}
                        className={`h-12 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                          index === imageIndex
                            ? 'border-luxury-gold-dark'
                            : 'border-luxury-border/60 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={src}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <h2
                id={`quick-view-title-${product.slug}`}
                className="font-display text-xl font-extrabold leading-snug text-luxury-charcoal md:text-2xl"
              >
                {headline}
              </h2>
              <p className="mt-2 text-sm font-medium leading-[1.85] text-luxury-ink-muted">
                {blurb}
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Button
                  as="a"
                  href={buildWhatsAppUrl(orderMessageForProduct(product))}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  className="flex-1 !rounded-sm !py-2.5 !text-xs"
                >
                  <WhatsAppIcon />
                  اطلب الآن
                </Button>
                <Link
                  to={detailTo}
                  onClick={onClose}
                  className="inline-flex flex-1 items-center justify-center rounded-sm border border-luxury-gold/50 px-4 py-2.5 text-center text-xs font-bold text-luxury-gold-dark transition hover:bg-luxury-gold/10"
                >
                  عرض التفاصيل والصور
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
