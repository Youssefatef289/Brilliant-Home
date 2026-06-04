import { useState } from 'react';
import { motion } from 'framer-motion';
import Seo from '@/components/seo/Seo';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/data/site';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function PinIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const composedMessage = [
    'مرحبًا Brilliant Home،',
    name && `الاسم: ${name}`,
    phone && `رقم التواصل: ${phone}`,
    message && `الرسالة: ${message}`,
  ]
    .filter(Boolean)
    .join('\n');

  const cards = [
    {
      icon: <WhatsAppIcon className="h-6 w-6" />,
      title: 'واتساب',
      value: SITE.phoneDisplay,
      href: buildWhatsAppUrl('مرحبًا Brilliant Home، أرغب في الاستفسار.'),
      accent: 'text-[#25D366]',
    },
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: 'اتصال هاتفي',
      value: SITE.phoneDisplay,
      href: `tel:${SITE.phoneDisplay}`,
      accent: 'text-luxury-gold-dark',
    },
    {
      icon: <MailIcon className="h-6 w-6" />,
      title: 'البريد الإلكتروني',
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      accent: 'text-luxury-gold-dark',
    },
    {
      icon: <PinIcon className="h-6 w-6" />,
      title: 'العنوان',
      value: SITE.address,
      href: null,
      accent: 'text-luxury-gold-dark',
    },
  ];

  return (
    <>
      <Seo
        title={`تواصل معنا — ${SITE.nameEn} | ${SITE.nameAr}`}
        description={`تواصل مع ${SITE.nameAr} عبر واتساب ${SITE.phoneDisplay} أو البريد ${SITE.email}. ${SITE.address}`}
        path="/contact"
      />

      <div className="page-contact relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(184,149,46,0.14)_0%,_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.95)_0%,_transparent_30%)]"
          aria-hidden
        />

        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
            <SectionTitle
              eyebrow="تواصل معنا"
              title="نحن هنا لمساعدتك"
              subtitle="عندك سؤال عن منتج أو تحتاج تصميمًا مخصصًا؟ راسلنا وسنرد عليك بأسرع وقت."
              align="center"
            />

            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <motion.div
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {cards.map((c, i) => {
                  const inner = (
                    <>
                      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-luxury-surface ${c.accent}`}>
                        {c.icon}
                      </span>
                      <h3 className="mt-4 font-display text-base font-bold text-luxury-ink">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-luxury-ink-muted" dir={c.title === 'العنوان' ? 'rtl' : 'auto'}>
                        {c.value}
                      </p>
                    </>
                  );
                  const cls =
                    'group relative block h-full overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] ring-1 ring-black/[0.03] backdrop-blur-xl transition duration-300 hover:border-luxury-gold/30 hover:shadow-[0_24px_60px_rgba(184,149,46,0.14)]';
                  return (
                    <motion.div key={c.title} custom={i * 0.08} variants={fadeUp}>
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.href.startsWith('http') ? '_blank' : undefined}
                          rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={cls}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className={cls}>{inner}</div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.03] backdrop-blur-xl md:p-9"
              >
                <h2 className="font-display text-2xl font-extrabold text-luxury-ink md:text-3xl">
                  أرسل رسالتك
                </h2>
                <p className="mt-2 text-sm font-medium leading-relaxed text-luxury-ink-muted">
                  اكتب بياناتك ورسالتك، وسيتم تحويلها مباشرة إلى واتساب لنرد عليك بسرعة.
                </p>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.open(buildWhatsAppUrl(composedMessage), '_blank', 'noopener,noreferrer');
                  }}
                >
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-bold text-luxury-ink">
                      الاسم
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="اكتب اسمك"
                      className="w-full rounded-xl border border-luxury-border bg-white px-4 py-3 text-sm font-medium text-luxury-ink outline-none transition focus:border-luxury-gold/60 focus:ring-2 focus:ring-luxury-gold/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-bold text-luxury-ink">
                      رقم التواصل
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01xxxxxxxxx"
                      className="w-full rounded-xl border border-luxury-border bg-white px-4 py-3 text-sm font-medium text-luxury-ink outline-none transition focus:border-luxury-gold/60 focus:ring-2 focus:ring-luxury-gold/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-sm font-bold text-luxury-ink">
                      الرسالة
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب استفسارك أو تفاصيل ما تبحث عنه"
                      className="w-full resize-none rounded-xl border border-luxury-border bg-white px-4 py-3 text-sm font-medium text-luxury-ink outline-none transition focus:border-luxury-gold/60 focus:ring-2 focus:ring-luxury-gold/20"
                    />
                  </div>
                  <Button type="submit" variant="whatsapp" className="w-full">
                    <WhatsAppIcon />
                    إرسال عبر واتساب
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
