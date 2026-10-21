import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Bookmark } from 'lucide-react';

export function SimulationStamp({
  variant = 'badge', // 'badge' | 'compact' | 'seal'
  isReducedMotion = false,
  className = '',
}) {
  const stampSpring = isReducedMotion
    ? {}
    : {
        initial: { scale: 1.35, rotate: -6, opacity: 0 },
        animate: { scale: 1, rotate: -1.5, opacity: 1 },
        transition: { type: 'spring', stiffness: 350, damping: 20 },
      };

  if (variant === 'compact') {
    return (
      <motion.span
        {...stampSpring}
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-100/90 border border-amber-400 text-amber-950 font-display font-extrabold text-[10px] tracking-wider uppercase shadow-xs select-none ${className}`}
        title="Cerita petualangan untuk semua umur belajar kebaikan dan berbagi"
      >
        <Sparkles className="w-3 h-3 text-amber-700 shrink-0" />
        <span>CERITA PETUALANGAN KEBAIKAN</span>
      </motion.span>
    );
  }

  if (variant === 'seal') {
    return (
      <motion.div
        {...stampSpring}
        className={`inline-flex flex-col items-center justify-center p-3 rounded-2xl bg-warm-50 border-3 border-dashed border-warm-600 shadow-md text-center select-none rotate-[-2deg] ${className}`}
      >
        <div className="flex items-center gap-1 text-forest-800 mb-0.5">
          <Shield className="w-4 h-4 text-forest-700 fill-forest-100" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-forest-900">
            PETUALANGAN SAHABAT HEBAT
          </span>
        </div>
        <span className="font-display font-black text-xs sm:text-sm text-warm-900 tracking-wide uppercase px-2 py-0.5 bg-warm-200/80 rounded-md border border-warm-400">
          CERITA KEBAIKAN
        </span>
        <span className="text-[9px] font-bold text-stone-500 mt-1">
          Belajar Berbagi &amp; Menjaga Amanah
        </span>
      </motion.div>
    );
  }

  // Default: 'badge' (pita stempel hangat)
  return (
    <motion.div
      {...stampSpring}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-warm-100 border-2 border-warm-400 text-warm-950 font-display font-extrabold text-xs tracking-wide uppercase shadow-sm select-none ${className}`}
      title="Cerita petualangan untuk semua umur belajar kebaikan dan berbagi"
    >
      <Bookmark className="w-3.5 h-3.5 text-warm-700 fill-warm-300 shrink-0" />
      <span>CERITA PETUALANGAN KEBAIKAN</span>
    </motion.div>
  );
}
