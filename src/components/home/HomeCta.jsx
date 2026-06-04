import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { SITE } from '@/data/site';

function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function HomeCta() {
  return (
    <section className="bg-luxury-page py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-luxury-charcoal via-luxury-graphite to-luxury-charcoal px-6 py-12 text-center shadow-2xl md:px-12 md:py-16"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            aria-hidden
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 20%, rgba(212,184,92,0.35) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(212,184,92,0.22) 0%, transparent 40%)',
            }}
          />
          <div className="relative">
            <h2 className="font-display text-2xl font-extrabold leading-snug text-white md:text-4xl">
              جاهز تحوّل بيتك إلى تحفة فنية؟
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-[1.9] text-white/80 md:text-base">
              تواصل معنا الآن واحصل على استشارة مجانية وعرض سعر يناسب ميزانيتك. نصمّم
              ونصنع أثاثك بالمقاس الذي تحلم به.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                as="a"
                href={buildWhatsAppUrl('مرحبًا Brilliant Home، أرغب في استشارة مجانية وعرض سعر.')}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="w-full sm:w-auto sm:min-w-[220px]"
              >
                <WhatsAppIcon />
                احجز استشارتك المجانية
              </Button>
              <Link
                to="/products"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:border-luxury-gold-light/60 hover:bg-white/10 sm:w-auto sm:min-w-[200px]"
              >
                تصفّح المنتجات
              </Link>
            </div>
            <p className="mt-6 text-xs font-semibold text-white/60">
              {SITE.address}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
