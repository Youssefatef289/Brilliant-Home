import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const items = [
  {
    title: 'جودة تصنيع عالية',
    body: 'مواد مختارة بعناية وتشطيبات تتحمل الاستخدام اليومي مع ضمان جودة على التفاصيل.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'تصميمات مودرن',
    body: 'خطوط نظيفة وألوان راقية تناسب المساحات المعاصرة مع لمسات فاخرة تدوم مع الزمن.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: 'أسعار عادلة',
    body: 'قيمة حقيقية مقابل الجودة، مع خيارات تسليم وتركيب واضحة واستشارة قبل الشراء.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Features() {
  return (
    <section className="relative border-t border-luxury-border bg-luxury-surface py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-luxury-gold/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <SectionTitle
          eyebrow="لماذا نحن"
          title="تجربة شراء راقية من البداية للنهاية"
          subtitle="نؤمن أن الأثاث الجيد يشكّل أسلوب حياة. نقدّم لك منتجات مختارة بعناية وخدمة تضع راحتك أولًا."
        />
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 md:grid-cols-3"
        >
          {items.map((f) => (
            <motion.li
              key={f.title}
              variants={item}
              transition={{ duration: 0.45 }}
              className="group relative overflow-hidden rounded-sm border border-luxury-border bg-white p-8 shadow-luxury transition hover:border-luxury-gold/40"
            >
              <div className="mb-5 inline-flex rounded-full border border-luxury-gold/35 bg-luxury-surface p-3 text-luxury-gold-dark transition group-hover:bg-luxury-surface-2">
                {f.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-luxury-ink">{f.title}</h3>
              <p className="mt-3 text-sm font-medium leading-[1.8] text-luxury-ink-muted">
                {f.body}
              </p>
              <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-luxury-gold/10 blur-2xl transition group-hover:bg-luxury-gold/15" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
