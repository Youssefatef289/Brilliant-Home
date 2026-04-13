import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '@/components/ui/LazyImage';
import { SITE } from '@/data/site';

/** صور من `public/image` — شبكة 2×2 كالمرجع */
const GRID_IMAGES = [
  ['Living Room', ' living room (1).jpeg'],
  ['table', 'table (1).jpg'],
  ['dining table', 'dining table (1).jpeg'],
  ['Dressing Room', 'Dressing Room (1).jpeg'],
].map((parts) => `/image/${parts.map((s) => encodeURIComponent(s)).join('/')}`);

const GRID_ALTS = [
  'معيشة عصرية من أعمالنا',
  'طاولة من مجموعة أعمالنا',
  'طاولة سفرة — أعمالنا',
  'غرفة لبس — أعمالنا',
];

const INTRO =
  'شغفنا بالحرفية الاستثنائية يدفعنا لاختيار أفضل القطع لكل غرفة في منزلك.';

const BLOCKS = [
  {
    n: 1,
    title: 'من نحن',
    body: `نحن في ${SITE.nameAr} متخصصون في تقديم أثاث وتحف فاخرة تجمع بين الأناقة الكلاسيكية والتصميم العصري. كل قطعة تم اختيارها بعناية.`,
  },
  {
    n: 2,
    title: 'ماذا نفعل',
    body: 'نقدم لك مجموعة واسعة من القطع الفريدة التي تحمل قصة وتضفي لمسة من الفخامة على مساحتك.',
  },
  {
    n: 3,
    title: 'كيف نساعدك',
    body: 'نوفر لك استشارات في التصميم والديكور لمساعدتك في اختيار القطع المثالية لمنزلك — بما يتناسب مع ميزانيتك.',
  },
  {
    n: 4,
    title: 'نصنع قصة نجاح',
    body: 'مع وصولك إلى مجموعتنا المتنوعة، يمكنك تحويل مساحتك إلى مكان أنيق وفاخر يعكس ذوقك.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.45 },
  }),
};

export default function HomeAboutSection() {
  return (
    <section
      className="section-home-about border-t border-luxury-border bg-white py-16 md:py-24 lg:py-28"
      aria-labelledby="home-about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* عمود النص — يظهر أولًا في RTL (جهة اليمين) */}
          <div className="order-2 text-start lg:order-1">
            <h2
              id="home-about-heading"
              className="font-display text-4xl font-extrabold tracking-tight text-luxury-charcoal md:text-5xl"
            >
              من نحن
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-[1.9] text-luxury-ink-muted md:text-lg">
              {INTRO}
            </p>

            <ul className="mt-10 grid list-none grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10">
              {BLOCKS.map((b, i) => (
                <motion.li
                  key={b.n}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-30px' }}
                  className="relative pt-1"
                >
                  <span
                    className="mb-3 block font-display text-5xl font-bold leading-none text-luxury-gold md:text-6xl"
                    aria-hidden
                  >
                    {b.n}
                  </span>
                  <h3 className="text-lg font-extrabold text-luxury-charcoal md:text-xl">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-[1.85] text-luxury-ink-muted md:text-base">
                    {b.body}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* عمود الصور — في RTL يظهر يسار الصفحة */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <Link
                to="/about"
                className="inline-flex w-fit items-center justify-center rounded-md bg-luxury-charcoal px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-luxury-graphite hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxury-gold"
              >
                اعرف المزيد
              </Link>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {GRID_IMAGES.map((src, idx) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 * idx, duration: 0.4 }}
                    className="overflow-hidden rounded-lg bg-luxury-mist ring-1 ring-luxury-border/80"
                  >
                    <div className="aspect-[4/3]">
                      <LazyImage
                        src={src}
                        alt={GRID_ALTS[idx] ?? 'من أعمالنا'}
                        className="h-full w-full"
                        imgClassName="object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
