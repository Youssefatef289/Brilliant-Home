import { motion } from 'framer-motion';

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignClass =
    align === 'center'
      ? 'text-center mx-auto'
      : align === 'start'
        ? 'text-right mr-0 ml-auto max-w-2xl'
        : 'text-left';

  return (
    <div className={`mb-12 md:mb-16 ${alignClass} ${className}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-luxury-gold-dark"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="font-display text-3xl font-bold leading-snug text-luxury-ink md:text-4xl lg:text-[2.5rem] text-balance"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl text-base font-medium leading-[1.8] text-luxury-ink-muted md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
