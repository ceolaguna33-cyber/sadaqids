import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Info, CheckCircle2 } from 'lucide-react';

export function FeedbackToast({
  message,
  type = 'success', // 'success' | 'info' | 'coins'
  onClose,
  isReducedMotion = false,
}) {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={isReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0, scale: 0.95 }}
        animate={isReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1, scale: 1 }}
        exit={isReducedMotion ? { opacity: 0 } : { y: -20, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] pointer-events-none"
      >
        <div
          className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border-2 pointer-events-auto ${
            type === 'coins'
              ? 'bg-warm-50 border-warm-400 text-warm-900'
              : type === 'success'
              ? 'bg-forest-50 border-forest-500 text-forest-900'
              : 'bg-white border-stone-300 text-stone-800'
          }`}
        >
          {type === 'coins' && <Sparkles className="w-5 h-5 text-warm-600 shrink-0" />}
          {type === 'success' && <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0" />}
          {type === 'info' && <Info className="w-5 h-5 text-stone-600 shrink-0" />}

          <span className="font-display font-bold text-xs sm:text-sm leading-snug flex-1">
            {message}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
