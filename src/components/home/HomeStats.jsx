import { motion } from 'framer-motion';

const STATS = [
  { value: '+10', label: 'سنوات خبرة' },
  { value: '+1500', label: 'عميل سعيد' },
  { value: '+2000', label: 'قطعة منفّذة' },
  { value: '100%', label: 'تفصيل حسب الطلب' },
];

const item = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HomeStats() {
  return (
    <section className="border-y border-luxury-border/70 bg-white py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <ul className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.li
              key={s.label}
              custom={i}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="flex flex-col items-center text-center"
            >
              <span className="font-display text-3xl font-extrabold text-luxury-gold-dark md:text-4xl lg:text-5xl">
                {s.value}
              </span>
              <span className="mt-2 text-sm font-semibold text-luxury-ink-muted md:text-base">
                {s.label}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
