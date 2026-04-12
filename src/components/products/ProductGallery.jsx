import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LazyImage from '@/components/ui/LazyImage';

export default function ProductGallery({ images, productName }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-luxury-border bg-luxury-surface lg:aspect-square">
        <AnimatePresence mode="wait">
          <motion.div
            key={main}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="h-full w-full"
          >
            <LazyImage
              src={main}
              alt={`${productName} — صورة ${active + 1}`}
              className="h-full min-h-[280px] md:min-h-[400px]"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <ul className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-sm border-2 transition md:h-20 md:w-24 ${
                  i === active
                    ? 'border-luxury-gold-dark ring-2 ring-luxury-gold/25'
                    : 'border-luxury-border opacity-90 hover:opacity-100'
                }`}
                aria-label={`عرض صورة ${i + 1}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
