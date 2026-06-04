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
    body:
      'أن نكون الوجهة الأولى في مصر لكل من يبحث عن أثاث فاخر بلمسة عصرية، وجودة تدوم، وتجربة شراء مريحة وواضحة.',
  },
  {
    title: 'رسالتنا',
    body:
      'أن نقدّم تصاميم مدروسة، خامات موثوقة، وتسعيرًا شفافًا، مع متابعة حقيقية تجعل كل مرحلة من التعامل أسهل وأسرع.',
  },
];

const strengths = [
  {
    title: 'توريد وتنفيذ موثوق',
    body: 'نعمل مع شركاء تصنيع مختارين بعناية لضمان خامات ثابتة وجودة يمكن الاعتماد عليها في كل قطعة.',
  },
  {
    title: 'تخصيص حسب المساحة',
    body: 'نساعدك على اختيار القياسات والتشطيبات والألوان المناسبة لمساحتك، سواء للمنزل أو المشروع.',
  },
  {
    title: 'متابعة ما بعد البيع',
    body: 'يبقى فريقنا على تواصل عبر واتساب للإجابة عن أي استفسار أو تنسيق أي تعديل مطلوب بعد الشراء.',
  },
  {
    title: 'تجربة عرض واضحة',
    body: 'نقدّم صورًا واضحة وتفاصيل منظمة وسهلة الفهم لتساعدك على اتخاذ قرار شراء أكثر راحة وثقة.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function About() {
  return (
    <>
      <Seo
        title={`من نحن — ${SITE.nameEn} | ${SITE.nameAr}`}
        description={`تعرف على ${SITE.nameAr}: ${SITE.activity} في ${SITE.address}. ${SITE.tagline}`}
        path="/about"
      />

      <div className="page-about relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(184,149,46,0.14)_0%,_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.95)_0%,_transparent_30%)]"
          aria-hidden
        />

        <section className="relative border-b border-luxury-border/80 bg-luxury-surface/85 py-16 backdrop-blur-sm md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.03] backdrop-blur-xl md:p-10"
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(184,149,46,0.14),transparent_40%)]"
                  aria-hidden
                />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-luxury-gold-dark">
                    من نحن
                  </p>
                  <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-luxury-ink md:text-5xl lg:text-6xl">
                    Brilliant Home
                  </h1>
                  <p className="mt-5 text-lg font-medium leading-[1.95] text-luxury-ink-secondary">
                    نؤمن أن كل منزل يستحق تفاصيل راقية تعكس ذوق أصحابه. لذلك نصنع تجربة متكاملة
                    تبدأ من اختيار القطعة المناسبة، وتستمر حتى ما بعد التسليم.
                  </p>
                  <p className="mt-4 text-base font-medium leading-[1.9] text-luxury-ink-muted">
                    {SITE.nameEn} — {SITE.nameAr}، علامة مصرية متخصصة في {SITE.activity}، تجمع بين
                    الجودة الهادئة، التخصيص الذكي، والتواصل السريع مع العملاء.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      as="a"
                      href={buildWhatsAppUrl('مرحبًا، أود حجز استشارة أو معرفة تفاصيل أكثر عن Brilliant Home.')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      تواصل معنا
                    </Button>
                    <Link
                      to="/products"
                      className="inline-flex items-center justify-center rounded-2xl border border-luxury-border bg-white px-6 py-3 text-sm font-bold text-luxury-ink transition duration-300 hover:border-luxury-gold/50 hover:bg-luxury-surface hover:text-luxury-gold-dark"
                    >
                      تصفح المنتجات
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.08,
                    },
                  },
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="grid gap-6"
              >
                {vision.map((block, index) => (
                  <motion.div
                    key={block.title}
                    custom={index * 0.08}
                    variants={fadeUp}
                    whileHover={{ y: -10, scale: 1.01 }}
                    className="group relative overflow-hidden rounded-[1.7rem] border border-white/70 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.03] backdrop-blur-xl transition duration-300 hover:border-luxury-gold/30 hover:shadow-[0_28px_70px_rgba(184,149,46,0.14)]"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                    <div className="relative">
                      <span className="inline-flex rounded-full border border-luxury-gold/20 bg-luxury-gold/10 px-3 py-1 text-[11px] font-bold text-luxury-gold-dark">
                        محور
                      </span>
                      <h2 className="mt-4 font-display text-2xl font-bold text-luxury-ink">
                        {block.title}
                      </h2>
                      <p className="mt-3 text-sm font-medium leading-[1.9] text-luxury-ink-muted">
                        {block.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-t border-luxury-border bg-luxury-page py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
            <SectionTitle
              eyebrow="لماذا تختارنا"
              title="نقاط قوة تدعم قرارك"
              subtitle="نبني علاقة طويلة مع عملائنا عبر الجودة والمصداقية، مع تصميم هادئ وتجربة عرض واضحة ومريحة."
              align="start"
              className="!text-right"
            />

            <motion.div
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.04,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="grid gap-6 sm:grid-cols-2"
            >
              {strengths.map((s, index) => (
                <motion.div
                  key={s.title}
                  custom={index * 0.08}
                  variants={fadeUp}
                  whileHover={{ y: -10, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-[1.7rem] border border-white/70 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.03] backdrop-blur-xl transition duration-300 hover:border-luxury-gold/30 hover:shadow-[0_28px_70px_rgba(184,149,46,0.14)]"
                >
                  <div
                    className="mb-5 h-1 w-14 rounded-full bg-luxury-gold transition duration-300 group-hover:w-20"
                    aria-hidden
                  />
                  <h3 className="font-display text-xl font-bold text-luxury-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-[1.9] text-luxury-ink-muted">
                    {s.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
