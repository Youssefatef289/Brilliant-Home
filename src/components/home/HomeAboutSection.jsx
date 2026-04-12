import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { SITE } from '@/data/site';

const paragraphs = [
  `${SITE.nameEn} (${SITE.nameAr}) علامة مصرية متخصصة في ${SITE.activity}، نجمع بين الجودة العالية والتصميم العصري لنمنح منزلك أو مكتبك إطلالة راقية تدوم.`,
  'نؤمن أن كل مساحة تستحق أثاثًا يعكس شخصية أصحابها. لذلك نختار الخامات بعناية، ونتابع التفاصيل من المرحلة الأولى حتى التسليم، مع التزام بالمواعيد وشفافية في التواصل.',
  `نعمل من مقرنا في ${SITE.address}، ونخدم عملاءنا في بني سويف والمحافظات المجاورة عبر قنوات واضحة، أبرزها واتساب للاستفسارات السريعة وطلبات العرض والتخصيص.`,
  `${SITE.tagline} — هذا وعدنا لك في كل تعامل: جودة لا تتنازل عنها، تصاميم تناسب العصر، وأسعار منطقية تعكس القيمة الحقيقية لما تحصل عليه.`,
];

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.45 },
  }),
};

export default function HomeAboutSection() {
  return (
    <section
      className="section-home-about border-t border-luxury-border bg-white py-20 md:py-28"
      aria-labelledby="home-about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <SectionTitle
          eyebrow="تعرّف علينا"
          title="من نحن"
          subtitle={`${SITE.nameAr} — شريكك في اختيار الأثاث والديكور بثقة وراحة بال.`}
        />
        <div className="mx-auto mt-2 max-w-3xl">
          <h2 id="home-about-heading" className="sr-only">
            من نحن — {SITE.nameEn}
          </h2>
          <div className="space-y-6">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                className="text-base font-medium leading-[1.9] text-luxury-ink-secondary md:text-lg"
              >
                {text}
              </motion.p>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-10"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-bold text-luxury-gold-dark transition hover:text-luxury-gold md:text-base"
            >
              اقرأ المزيد عن رؤيتنا ورسالتنا
              <span aria-hidden className="text-lg leading-none">
                ←
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
