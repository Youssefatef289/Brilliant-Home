import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: '/image/truck.svg',
    title: 'شحن سريع ومجاني',
    body: 'نوصّل طلبك بأسرع وقت وبأعلى معايير العناية أثناء النقل.',
  },
  {
    icon: '/image/bag.svg',
    title: 'تسوق بسهولة',
    body: 'واجهة واضحة وخطوات بسيطة لاختيار المنتجات وإتمام الطلب.',
  },
  {
    icon: '/image/support.svg',
    title: 'دعم على مدار الساعة',
    body: 'فريقنا جاهز للإجابة عن استفساراتك في أي وقت.',
  },
  {
    icon: '/image/return.svg',
    title: 'إرجاع بلا تعقيد',
    body: 'سياسة إرجاع واضحة لراحتك وثقتك في شرائك.',
  },
];

const item = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function WhyChooseUs() {
  return (
    <section
      className="section-why-choose-us bg-white py-16 md:py-24"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* عمود الصورة */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2"
          >
            <img
              src="/image/dots-yellow.svg"
              alt=""
              aria-hidden
              className="absolute -top-10 right-6 z-0 h-32 w-64 object-contain opacity-90 md:right-10 lg:h-36 lg:w-72"
            />
            <div className="relative z-10 overflow-hidden rounded-[1.75rem] bg-luxury-mist shadow-[0_24px_60px_rgba(15,23,42,0.10)]">
              <img
                src="/image/why-choose-us-img.jpg"
                alt="ركن معيشة أنيق من أعمالنا"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* عمود النص والمميزات */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                id="why-choose-us-heading"
                className="font-display text-3xl font-extrabold text-luxury-ink md:text-4xl lg:text-[2.5rem]"
              >
                لماذا تختارنا
              </h2>
              <p className="mt-4 max-w-xl text-base font-medium leading-[1.85] text-luxury-ink-muted">
                نلتزم بجودة التصنيع وخدمة ما بعد البيع لنمنحك تجربة تسوّق مريحة وثقة تدوم.
              </p>
            </motion.div>

            <ul className="mt-10 grid list-none gap-x-8 gap-y-10 sm:grid-cols-2">
              {FEATURES.map((f, i) => (
                <motion.li
                  key={f.title}
                  custom={i}
                  variants={item}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                  className="flex flex-col"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-luxury-surface ring-1 ring-luxury-border/60">
                    <img src={f.icon} alt="" aria-hidden className="h-6 w-6 object-contain" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-luxury-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-[1.8] text-luxury-ink-muted">
                    {f.body}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
