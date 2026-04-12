import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const reviews = [
  {
    name: 'سارة م.',
    role: 'عميلة — بني سويف',
    text: 'التزام في المواعيد وجودة التنجيد فاقت التوقعات. غرفة المعيشة أصبحت تبدو ككتالوج.',
  },
  {
    name: 'أحمد ك.',
    role: 'مهندس ديكور',
    text: 'تعامل احترافي وتفاصيل دقيقة في المقاسات. أنصح بهم لأي مشروع سكني فاخر.',
  },
  {
    name: 'نورا ح.',
    role: 'عميلة — القاهرة',
    text: 'استشارة ممتازة قبل الشراء، والأسعار واضحة بدون مفاجآت. خدمة واتساب سريعة.',
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-luxury-border bg-luxury-surface-2 py-20 md:py-28">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-luxury-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-luxury-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <SectionTitle
          eyebrow="آراء العملاء"
          title="ثقة تُبنى على تجربة حقيقية"
          subtitle="نفتخر بعلاقات طويلة مع عملائنا ونعمل كل يوم على تجاوز توقعاتهم."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.blockquote
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-sm border border-luxury-border bg-white p-8 shadow-luxury"
            >
              <span className="font-display text-5xl font-bold leading-none text-luxury-gold/40" aria-hidden>
                “
              </span>
              <p className="-mt-4 text-sm font-medium leading-[1.85] text-luxury-ink-secondary">
                {r.text}
              </p>
              <footer className="mt-6 border-t border-luxury-border pt-6">
                <cite className="not-italic">
                  <span className="block font-bold text-luxury-ink">{r.name}</span>
                  <span className="mt-1 block text-xs font-semibold text-luxury-ink-muted">
                    {r.role}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
