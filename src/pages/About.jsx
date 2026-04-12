import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '@/components/seo/Seo';
import SectionTitle from '@/components/ui/SectionTitle';
import { SITE } from '@/data/site';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { Button } from '@/components/ui/Button';
import './About.css';

const vision = [
  {
    title: 'رؤيتنا',
    body: 'أن نكون الوجهة الأولى في مصر لمن يبحث عن أثاث فاخر بروح عصرية، مع خدمة تليق بتوقعات عملائنا.',
  },
  {
    title: 'رسالتنا',
    body: 'تقديم تصاميم مدروسة، وجودة مثبتة، وشفافية في التسعير والمواعيد — لأن الثقة جزء من التجربة.',
  },
];

const strengths = [
  {
    title: 'توريد وتصنيع موثوق',
    body: 'شراكات مع ورش ومصانع مختارة، وجودة خامات قابلة للتتبع.',
  },
  {
    title: 'تخصيص حسب المساحة',
    body: 'قياسات وخيارات ألوان وتشطيبات تناسب منزلك أو مشروعك.',
  },
  {
    title: 'متابعة ما بعد البيع',
    body: 'دعم عبر واتساب واستجابة سريعة لأي استفسار أو تعديل مطلوب.',
  },
  {
    title: 'تجربة عرض واضحة',
    body: 'صور عالية الدقة وتفاصيل منتج منظمة لتسهيل قرار الشراء.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45 },
  }),
};

export default function About() {
  return (
    <>
      <Seo
        title={`من نحن — ${SITE.nameEn} | ${SITE.nameAr}`}
        description={`تعرّف على ${SITE.nameAr}: ${SITE.activity} في ${SITE.address}. ${SITE.tagline}`}
        path="/about"
      />

      <div className="page-about">
      <section className="relative overflow-hidden border-b border-luxury-border bg-luxury-surface py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-luxury-gold/15 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-extrabold text-luxury-ink md:text-5xl lg:text-6xl"
          >
            من نحن
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg font-medium leading-[1.85] text-luxury-ink-secondary"
          >
            {SITE.nameEn} — {SITE.nameAr}، علامة مصرية متخصصة في{' '}
            <span className="font-bold text-luxury-gold-dark">{SITE.activity}</span>{' '}
            بمعايير عالمية ولمسة محلية تناسب ذوق عملائنا.
          </motion.p>
        </div>
      </section>

      <section className="border-b border-luxury-border bg-luxury-page py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-base font-medium leading-[1.85] text-luxury-ink-secondary"
            >
              <p>
                نؤمن أن المنزل امتداد للشخصية. لذلك نختار كل قطعة بعناية: من أقمشة
                التنجيد إلى تفاصيل المقابض والإضاءة، مع التزام صارم بالمواعيد
                والوضوح في التسعير.
              </p>
              <p>
                مقرنا في <strong className="font-bold text-luxury-ink">{SITE.address}</strong>،
                ونوفر التواصل المباشر عبر واتساب لتسريع الاستفسارات والطلبات.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  as="a"
                  href={buildWhatsAppUrl('مرحبًا، أود حجز استشارة من Brilliant Home.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  تواصل معنا
                </Button>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-sm border border-luxury-border bg-white px-6 py-3 text-sm font-bold text-luxury-ink transition hover:border-luxury-gold/50 hover:bg-luxury-surface"
                >
                  تصفح المنتجات
                </Link>
              </div>
            </motion.div>
            <div className="grid gap-6">
              {vision.map((block, i) => (
                <motion.div
                  key={block.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="rounded-sm border border-luxury-border bg-white p-8 shadow-luxury"
                >
                  <h2 className="font-display text-2xl font-bold text-luxury-gold-dark">
                    {block.title}
                  </h2>
                  <p className="mt-3 text-sm font-medium leading-[1.8] text-luxury-ink-muted">
                    {block.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-luxury-border bg-luxury-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <SectionTitle
            eyebrow="لماذا تختارنا"
            title="نقاط قوة تدعم قرارك"
            subtitle="نبني علاقات طويلة مع عملائنا عبر الجودة والمصداقية — وليس عبر وعود فارغة."
            align="start"
            className="!text-right"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {strengths.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="rounded-sm border border-luxury-border bg-white p-8 shadow-luxury transition hover:border-luxury-gold/40"
              >
                <div className="mb-4 h-1 w-12 bg-luxury-gold" />
                <h3 className="font-display text-xl font-bold text-luxury-ink">{s.title}</h3>
                <p className="mt-3 text-sm font-medium leading-[1.85] text-luxury-ink-muted">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
