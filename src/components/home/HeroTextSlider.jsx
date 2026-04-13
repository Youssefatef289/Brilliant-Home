import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const SLIDE_MS = 5200;

/** عبارات الهيرو — أثاث خشبي فاخر */
export const HERO_SLIDES = [
  {
    id: 'luxury-durability',
    text: 'نصنع لك أثاثًا خشبيًا يجمع بين الفخامة والمتانة.',
  },
  {
    id: 'custom-design',
    text: 'تصميمات خشبية مخصصة تعكس ذوقك وتدوم لسنوات.',
  },
  {
    id: 'masterpiece',
    text: 'حوّل مساحتك إلى تحفة فنية مع أثاث خشبي فاخر.',
  },
  {
    id: 'natural-craft',
    text: 'جودة الخشب الطبيعي… ولمسة من الإبداع في كل تفصيلة.',
  },
];

export default function HeroTextSlider() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = window.setInterval(next, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [next, reduceMotion]);

  const slide = HERO_SLIDES[index];

  const transition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

  return (
    <div className="mt-6 w-full max-w-2xl" aria-live="polite">
      <div className="relative min-h-[7.5rem] md:min-h-[6.75rem] lg:min-h-[6rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={slide.id}
            initial={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 28, filter: 'blur(10px)' }
            }
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -20, filter: 'blur(8px)' }
            }
            transition={transition}
            className="text-pretty text-lg font-semibold leading-[1.85] text-white shadow-sm md:text-xl md:leading-[1.8]"
          >
            {slide.text}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2" aria-label="تبديل العبارات في الهيرو">
        {HERO_SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.id}
              type="button"
              aria-current={active ? 'true' : undefined}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxury-gold-light ${
                active ? 'w-9 bg-luxury-gold-light shadow-[0_0_12px_rgba(212,184,92,0.45)]' : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`عرض الجملة ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
