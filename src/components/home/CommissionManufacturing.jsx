import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/data/site';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

const steps = [
  {
    title: 'استشارة وقياس',
    body: 'نستمع لفكرتك أو مخطط مساحتك، ونقترح خامات وتشطيبات تناسب ميزانيتك.',
  },
  {
    title: 'عرض سعر وموافقة',
    body: 'تفصيل واضح للتكلفة والمدة الزمنية قبل بدء التصنيع — بدون التزام حتى توافق.',
  },
  {
    title: 'تصنيع ومراجعة جودة',
    body: 'تنفيذ في الورش المعتمدة مع متابعة جودة التفاصيل قبل التسليم أو التركيب.',
  },
];

function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function CommissionManufacturing() {
  return (
    <section
      className="section-commission relative overflow-hidden border-t border-luxury-border bg-luxury-page py-20 md:py-28"
      aria-label="تصنيع بالعمولة"
    >
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-luxury-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-luxury-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle
              eyebrow="خدمة مخصصة"
              title="تصنيع بالعمولة"
              subtitle="نصنع الأثاث والديكور حسب طلبك: مقاساتك، خاماتك، وأسلوبك — من الفكرة حتى التسليم."
              align="start"
              className="!mb-10 !text-right [&_.font-display]:text-balance"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl text-base font-medium leading-[1.85] text-luxury-ink-secondary"
            >
              سواء غرفة كاملة أو قطعة واحدة، نعمل معك على تصميم يناسب مساحتك ونحدد معًا
              الجدول الزمني والتكلفة قبل البدء. مناسب للشقق، الفيلات، والمكاتب.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button
                as="a"
                href={buildWhatsAppUrl(
                  `مرحبًا ${SITE.nameEn}، أرغب في الاستفسار عن خدمة التصنيع بالعمولة.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                <WhatsAppIcon />
                اطلب استشارة تصنيع بالعمولة
              </Button>
            </motion.div>
          </div>

          <motion.ol
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="space-y-5"
          >
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-sm border border-luxury-border bg-white p-5 shadow-luxury md:p-6"
              >
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-luxury-gold/15 text-sm font-bold text-luxury-gold-dark"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-luxury-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-[1.8] text-luxury-ink-muted">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
