import { motion } from 'framer-motion';
import LazyImage from '@/components/ui/LazyImage';
import { formatProductBody, formatProductTitle } from '@/utils/productDisplay';
import { getProductDisplayHeadline, getProductMarketing } from '@/utils/productMarketing';
import { buildWhatsAppUrl, orderMessageForProduct } from '@/utils/whatsapp';

function WhatsAppIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ProductCard({
  product,
  index = 0,
  coverSrc,
  imageIndex = 0,
  onQuickView,
}) {
  const marketing = getProductMarketing(product);
  const headline = getProductDisplayHeadline(product, formatProductTitle);
  const blurb = marketing.hasCustom
    ? marketing.cardText
    : formatProductBody(product.shortDescription);
  const mainSrc = coverSrc ?? product.images[0];
  const imageLabel =
    imageIndex > 0 ? `${headline} — صورة ${imageIndex + 1}` : headline;
  const openModal = () => onQuickView?.(product, imageIndex);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-luxury-border/60 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:border-luxury-gold/35 hover:shadow-[0_24px_55px_rgba(184,149,46,0.16)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-luxury-mist">
        <button
          type="button"
          onClick={openModal}
          aria-label={`معاينة ${headline}`}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer"
        >
          <LazyImage
            src={mainSrc}
            alt={imageLabel}
            className="absolute inset-0 h-full w-full"
            imgClassName="object-cover transition duration-700 group-hover:scale-[1.06]"
          />
        </button>

        {product.collectionLabel && (
          <span className="pointer-events-none absolute start-3 top-3 z-20 rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold text-luxury-gold-dark shadow-sm backdrop-blur-sm">
            {product.collectionLabel}
          </span>
        )}

        <div
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-luxury-ink/70 via-luxury-ink/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
          aria-hidden
        />

        <div className="absolute inset-x-0 bottom-0 z-30 flex translate-y-4 items-center gap-2.5 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <button
            type="button"
            onClick={openModal}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-white/95 px-4 py-2.5 text-xs font-bold text-luxury-ink shadow-md backdrop-blur-sm transition hover:bg-white hover:text-luxury-gold-dark"
          >
            عرض التفاصيل
          </button>
          <a
            href={buildWhatsAppUrl(orderMessageForProduct(product))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="اطلب عبر واتساب"
            className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:bg-[#1ebe57]"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <button type="button" onClick={openModal} className="text-start">
          <h2 className="font-display text-lg font-extrabold leading-snug text-luxury-ink transition group-hover:text-luxury-gold-dark md:text-xl">
            {headline}
          </h2>
        </button>
        <p className="mt-2 line-clamp-2 text-sm font-medium leading-[1.8] text-luxury-ink-muted">
          {blurb}
        </p>
      </div>
    </motion.article>
  );
}
