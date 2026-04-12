import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '@/components/seo/Seo';
import { SITE } from '@/data/site';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <Seo
        title={`الصفحة غير موجودة — ${SITE.nameEn}`}
        description="الصفحة المطلوبة غير متوفرة."
        noindex
      />
      <section className="page-not-found flex min-h-[70vh] flex-col items-center justify-center bg-luxury-page px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md"
        >
          <p className="font-display text-8xl font-extrabold text-luxury-gold/50 md:text-9xl">
            404
          </p>
          <h1 className="mt-4 font-display text-2xl font-bold text-luxury-ink md:text-3xl">
            الصفحة غير موجودة
          </h1>
          <p className="mt-3 text-sm font-medium leading-[1.8] text-luxury-ink-muted">
            ربما تم نقل الرابط أو حذفه. يمكنك العودة للرئيسية أو تصفح المنتجات.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="rounded-sm bg-luxury-gold px-6 py-3 text-sm font-bold text-luxury-black transition hover:brightness-105"
            >
              الرئيسية
            </Link>
            <Link
              to="/products"
              className="rounded-sm border border-luxury-border bg-white px-6 py-3 text-sm font-bold text-luxury-ink transition hover:border-luxury-gold/50"
            >
              المنتجات
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
