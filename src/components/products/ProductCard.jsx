import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '@/components/ui/LazyImage';
import { formatProductBody, formatProductTitle } from '@/utils/productDisplay';
import { Button } from '@/components/ui/Button';
import { buildWhatsAppUrl, orderMessageForProduct } from '@/utils/whatsapp';

function WhatsAppIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group flex flex-col overflow-hidden rounded-sm border border-luxury-border bg-white shadow-luxury transition hover:border-luxury-gold/35"
    >
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-luxury-mist"
      >
        <LazyImage
          src={product.images[0]}
          alt={formatProductTitle(product.name)}
          className="absolute inset-0 h-full w-full min-h-[200px]"
          imgClassName="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Link to={`/products/${product.slug}`}>
          <h2 className="font-display text-lg font-bold text-luxury-ink transition group-hover:text-luxury-gold-dark md:text-xl">
            {formatProductTitle(product.name)}
          </h2>
        </Link>
        <p className="mt-2 line-clamp-3 flex-1 text-sm font-medium leading-[1.75] text-luxury-ink-muted">
          {formatProductBody(product.shortDescription)}
        </p>
        {product.images?.length > 1 && (
          <p className="mt-2 text-xs font-bold text-luxury-gold-dark">
            {product.images.length} صور — المعاينة الكاملة من «عرض التفاصيل»
          </p>
        )}
        {product.price != null && (
          <p className="mt-3 text-sm font-bold text-luxury-gold-dark">
            {product.price.toLocaleString('ar-EG')} {product.currency}
          </p>
        )}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            to={`/products/${product.slug}`}
            className="inline-flex flex-1 items-center justify-center rounded-sm border border-luxury-gold/50 px-4 py-2.5 text-center text-xs font-bold text-luxury-gold-dark transition hover:bg-luxury-gold/10"
          >
            عرض التفاصيل
          </Link>
          <Button
            as="a"
            href={buildWhatsAppUrl(orderMessageForProduct(product))}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            className="flex-1 !py-2.5 !text-xs"
          >
            <WhatsAppIcon />
            طلب واتساب
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
