import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LazyImage from '@/components/ui/LazyImage';

function clampIndex(i, len) {
  if (!len) return 0;
  const n = Number(i);
  if (!Number.isFinite(n)) return 0;
  return Math.min(Math.max(0, Math.floor(n)), len - 1);
}

export default function ProductGallery({ images, productName, initialIndex = 0 }) {
  const [active, setActive] = useState(() => clampIndex(initialIndex, images.length));

  useEffect(() => {
    setActive(clampIndex(initialIndex, images.length));
  }, [initialIndex, images]);

  const main = images[active] ?? images[0];
  const label = productName || 'المنتج';

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-white via-luxury-pearl to-luxury-surface p-2 shadow-luxury ring-1 ring-luxury-border/50 sm:p-2.5">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-luxury-mist ring-1 ring-luxury-border/40 lg:aspect-[5/4]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={main}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <LazyImage
                src={main}
                alt={`${label} — صورة ${active + 1} من ${images.length}`}
                className="absolute inset-0 h-full w-full min-h-[240px] sm:min-h-[320px]"
                imgClassName="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {images.length > 1 && (
        <div className="relative">
          <ul
            className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:thin] md:gap-3 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-luxury-border"
            role="listbox"
            aria-label="معاينة صور إضافية"
          >
            {images.map((src, i) => (
              <li key={`${src}-${i}`} className="snap-start">
                <button
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`relative h-[4.5rem] w-[5.5rem] flex-shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-24 md:h-[5.25rem] md:w-[6.5rem] ${
                    i === active
                      ? 'border-luxury-gold-dark shadow-md ring-2 ring-luxury-gold/30'
                      : 'border-luxury-border/70 opacity-90 hover:border-luxury-gold/50 hover:opacity-100'
                  }`}
                  aria-label={`عرض الصورة ${i + 1}`}
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
        </div>
      )}
    </div>
  );
}
