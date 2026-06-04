import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const SLIDE_MS = 4500;

const SLIDES = [
  { src: '/image/bedroom-ar-large.png', alt: 'غرفة النوم — شكل أحلى وراحة أكتر' },
  { src: '/image/living-room-ar-2-medium.png', alt: 'غرفة المعيشة — مساحتك تستاهل الأفضل' },
  { src: '/image/dining-room-ar-large.png', alt: 'سفرة تناسب كل بيت وتعيش معاك' },
  { src: '/image/outdoor-ar-large.png', alt: 'مساحة خارجية بطابع أحلى' },
];

export default function PromoSlider() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = window.setInterval(next, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [next, reduceMotion]);

  const slide = SLIDES[index];

  return (
    <section className="relative w-full overflow-hidden " aria-label="عروض وأقسام مميزة">
      <div className="relative aspect-[1024/256]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 md:bottom-5">
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={active ? 'true' : undefined}
              aria-label={`عرض الشريحة ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                active ? 'w-7 bg-luxury-gold-dark' : 'w-2 bg-white/70 hover:bg-white'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
