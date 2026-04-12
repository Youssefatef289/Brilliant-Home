import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LazyImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  ...imgProps
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-luxury-surface-2 ${className}`}>
      <AnimatePresence>
        {!loaded && !error && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 animate-shimmer bg-gradient-to-l from-luxury-surface-2 via-luxury-border/40 to-luxury-surface-2"
            aria-hidden
          />
        )}
      </AnimatePresence>
      {error ? (
        <div className="flex h-full min-h-[200px] items-center justify-center text-sm font-medium text-luxury-ink-muted">
          تعذر تحميل الصورة
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`h-full w-full object-cover transition duration-500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'} ${imgClassName}`}
          {...imgProps}
        />
      )}
    </div>
  );
}
