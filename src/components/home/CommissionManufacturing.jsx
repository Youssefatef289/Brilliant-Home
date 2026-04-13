import { motion } from 'framer-motion';
import LazyImage from '@/components/ui/LazyImage';
import { SITE } from '@/data/site';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

const SUBTITLE = 'مصنعنا الخاص جاهز لتحويل أفكارك إلى واقع ملموس';

const INTRO_HEADING = 'لماذا تختارنا للتصنيع بالعمولة؟';

const INTRO_BODY = `في ${SITE.nameAr} نجمع بين الخبرة والورشة والتصميم لتقديم تصنيع بالعمولة يلبي مقاساتك وذوقك. نتابع معك من الفكرة حتى التسليم بجودة ثابتة ومواعيد واضحة.`;

const FEATURES = [
  {
    id: 'custom',
    title: 'تصنيع بالعمولة',
    body: 'نفّذ أفكارك على مقاساتك: مطابخ، غرف، وحدات، وتشطيبات حسب المخطط والخامة التي تختارها.',
    icon: IconTools,
  },
  {
    id: 'factory',
    title: 'مصنعنا الخاص',
    body: 'إنتاج تحت إشرافنا مباشرة — رقابة على الجودة ومرونة في التعديل أثناء التنفيذ.',
    icon: IconFactory,
  },
  {
    id: 'quality',
    title: 'ضمان الجودة',
    body: 'اختيار خامات موثوقة وتشطيب دقيق قبل التسليم، لأن قطعتك تبقى معك لسنوات.',
    icon: IconQuality,
  },
  {
    id: 'team',
    title: 'فريق محترف',
    body: 'فنّيون ومصممون يعملون معك خطوة بخطوة لضمان نتيجة قريبة مما تتخيّله.',
    icon: IconTeam,
  },
];

/** معرض منظم: صف علوي عريض + مربّعان + صف سفلي بانورامي — بدون فراغات */
const GALLERY = [
  {
    id: 'hero',
    src: `/image/${['Living Room', ' living room (1).jpeg'].map(encodeURIComponent).join('/')}`,
    layout: 'col-span-2 aspect-[16/10] sm:aspect-[2.05/1] lg:aspect-[2.15/1]',
  },
  {
    id: 'dining',
    src: `/image/${['dining table', 'dining table (1).jpeg'].map(encodeURIComponent).join('/')}`,
    layout: 'aspect-square min-h-[152px] sm:min-h-[168px] lg:min-h-[180px]',
  },
  {
    id: 'table',
    src: `/image/${['table', 'table (1).jpg'].map(encodeURIComponent).join('/')}`,
    layout: 'aspect-square min-h-[152px] sm:min-h-[168px] lg:min-h-[180px]',
  },
  {
    id: 'closet',
    src: `/image/${['Dressing Room', 'Dressing Room (1).jpeg'].map(encodeURIComponent).join('/')}`,
    layout: 'col-span-2 aspect-[5/3] max-h-[240px] sm:max-h-[280px] lg:max-h-[300px]',
  },
];

function IconTools({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 00-3.586-.189l-.83.83a2.25 2.25 0 000 3.182l5.653 4.655z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l1.5-1.5" />
    </svg>
  );
}

function IconFactory({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 21h19.5M4.5 3h15M5.25 3v4.5m13.5-4.5v4.5m-16.5 4.5h18v10.5h-18V12zM9 8.25h.008v.008H9V8.25zm0 3h.008v.008H9v-.008zm0 3h.008v.008H9V14.25z"
      />
    </svg>
  );
}

function IconQuality({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function IconTeam({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  );
}

const cardReveal = {
  hidden: { opacity: 0, y: 14 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.4 },
  }),
};

export default function CommissionManufacturing() {
  const waHref = buildWhatsAppUrl(
    `مرحبًا ${SITE.nameEn}، أرغب في طلب تصنيع مخصص بالعمولة.`
  );

  return (
    <section
      className="section-commission border-t border-luxury-border bg-luxury-pearl py-16 md:py-24 lg:py-28"
      aria-labelledby="commission-section-title"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        {/* عنوان مركزي + خط ذهبي تحت أول كلمة */}
        <header className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <h2
            id="commission-section-title"
            className="font-display text-3xl font-extrabold text-luxury-charcoal md:text-4xl lg:text-[2.35rem]"
          >
            <span className="relative inline-block pb-2">
              التصنيع
              <span
                className="absolute bottom-0 left-1/2 h-0.5 w-[2.25rem] -translate-x-1/2 rounded-full bg-luxury-gold md:w-12"
                aria-hidden
              />
            </span>{' '}
            <span className="text-luxury-charcoal">بالعمولة</span>
          </h2>
          <p className="mt-5 text-base font-medium leading-[1.85] text-luxury-ink-muted md:text-lg">
            {SUBTITLE}
          </p>
        </header>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* نص + بطاقات + زر — في RTL يظهر يمينًا */}
          <div className="order-2 text-start lg:order-1">
            <h3 className="font-display text-xl font-extrabold text-luxury-charcoal md:text-2xl">
              {INTRO_HEADING}
            </h3>
            <p className="mt-4 max-w-xl text-sm font-medium leading-[1.9] text-luxury-ink-muted md:text-base">
              {INTRO_BODY}
            </p>

            <ul className="mt-10 grid list-none grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5">
              {FEATURES.map((f, i) => (
                <motion.li
                  key={f.id}
                  custom={i}
                  variants={cardReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-20px' }}
                  className="rounded-xl border border-luxury-border/60 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-luxury-gold/12 text-luxury-gold-dark">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-center font-display text-base font-extrabold text-luxury-charcoal md:text-lg">
                    {f.title}
                  </h4>
                  <p className="mt-2 text-center text-xs font-medium leading-[1.8] text-luxury-ink-muted md:text-sm">
                    {f.body}
                  </p>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 flex justify-start lg:justify-end"
            >
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-[200px] items-center justify-center rounded-lg bg-[#5c4d3d] px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#4a3f32] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxury-gold"
              >
                اطلب تصنيع مخصص
              </a>
            </motion.div>
          </div>

          {/* معرض صور — شبكة متوازنة + إطار ناعم */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-2xl bg-gradient-to-br from-white/90 via-luxury-pearl to-luxury-surface p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-luxury-border/40 sm:p-3">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                {GALLERY.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * idx, duration: 0.45 }}
                    className={`group relative overflow-hidden rounded-xl bg-luxury-mist shadow-md ring-1 ring-luxury-border/45 transition duration-500 hover:shadow-xl hover:ring-luxury-gold/25 ${item.layout}`}
                  >
                    <LazyImage
                      src={item.src}
                      alt={`مثال أعمال ${SITE.nameAr} — ${idx + 1}`}
                      className="h-full w-full min-h-0"
                      imgClassName="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/25"
                      aria-hidden
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
