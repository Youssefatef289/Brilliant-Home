import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE, NAV_LINKS } from '@/data/site';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { Button } from '@/components/ui/Button';

/** من `image/logo_white.png` و `image/logo black.png` → `public/images/` */
const NAV_LOGO_WHITE = '/images/logo-white.png';
const NAV_LOGO_BLACK = '/images/logo-black.png';

function WhatsAppIcon({ className = 'h-100 w-100' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const SCROLL_SOLID_AFTER = 32;

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';
  const overHero = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_SOLID_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      setScrolled(window.scrollY > SCROLL_SOLID_AFTER);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navClass = ({ isActive }) => {
    if (overHero) {
      return `relative text-sm font-semibold transition ${
        isActive
          ? 'text-luxury-gold-light'
          : 'text-white/90 hover:text-white'
      }`;
    }
    return `relative text-sm font-semibold transition ${
      isActive
        ? 'text-luxury-gold-dark'
        : 'text-luxury-ink-secondary hover:text-luxury-ink'
    }`;
  };

  const underlineClass = overHero ? 'bg-luxury-gold-light' : 'bg-luxury-gold';

  const headerClass = overHero
    ? 'border-transparent bg-transparent shadow-none'
    : 'border-b border-luxury-border bg-white shadow-luxury backdrop-blur-xl';

  const logoSrc = overHero ? NAV_LOGO_WHITE : NAV_LOGO_BLACK;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerClass}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8 lg:px-10">
        <Link
          to="/"
          className="navbar-brand group flex shrink-0 items-center py-0.5"
          onClick={() => setOpen(false)}
        >
          <img
            src={logoSrc}
            alt={`${SITE.nameEn} | ${SITE.nameAr}`}
            width={220}
            height={56}
            decoding="async"
            fetchPriority="high"
            className="h-9 w-auto max-h-9 max-w-[min(220px,52vw)] object-contain object-center transition-opacity duration-300 sm:h-10 sm:max-h-10 md:h-11 md:max-h-11 md:max-w-[240px] lg:h-12 lg:max-h-12 lg:max-w-[260px]"
          />
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink to={link.href} className={navClass}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 ${underlineClass}`}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={
              overHero
                ? 'text-white/85 transition hover:text-luxury-gold-light'
                : 'text-luxury-ink-muted transition hover:text-luxury-gold-dark'
            }
          >
            <span className="sr-only">واتساب</span>
            <WhatsAppIcon />
          </a>
          <Button
            as="a"
            href={buildWhatsAppUrl('مرحبًا Brilliant Home، أرغب في الاستفسار عن منتجاتكم.')}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="!py-2.5 !px-5 !text-xs"
          >
            <WhatsAppIcon className="h-4 w-4" />
            تواصل واتساب
          </Button>
        </div>

        <button
          type="button"
          className={`flex h-11 w-11 items-center justify-center rounded-sm border md:hidden ${
            overHero
              ? 'border-white/35 text-white'
              : 'border-luxury-border text-luxury-ink'
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
        >
          <span className="sr-only">القائمة</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-luxury-border bg-white shadow-luxury md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.href}
                    className="block rounded-sm px-3 py-3 text-base font-medium text-luxury-ink-secondary hover:bg-luxury-surface hover:text-luxury-ink"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
              <li className="pt-2">
                <Button
                  as="a"
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  واتساب
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
