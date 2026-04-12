import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-gradient-to-l from-luxury-gold to-luxury-gold-dark text-luxury-black font-semibold shadow-gold hover:shadow-luxury hover:brightness-110',
  outline:
    'border border-luxury-gold/60 text-luxury-gold hover:bg-luxury-gold/10',
  ghost:
    'text-luxury-ink-secondary hover:text-luxury-gold-dark hover:bg-luxury-surface',
  whatsapp:
    'bg-[#25D366] text-white font-semibold hover:bg-[#20bd5a] shadow-lg shadow-black/20',
};

const MotionButton = motion.button;

export const Button = forwardRef(function Button(
  {
    as: Component = MotionButton,
    variant = 'primary',
    className = '',
    children,
    ...props
  },
  ref
) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-bold tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxury-gold disabled:pointer-events-none disabled:opacity-50';

  if (Component === MotionButton) {
    return (
      <MotionButton
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
        {...props}
      >
        {children}
      </MotionButton>
    );
  }

  return (
    <Component
      ref={ref}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});
