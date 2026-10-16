import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MascotPohon } from './MascotPohon';
import { RotateCcw, X } from 'lucide-react';

export function ModalConfirmReset({
  isOpen,
  onClose,
  onConfirmReset,
  isReducedMotion = false,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Kartu Dialog Ramah Anak */}
        <motion.div
          className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-4 border-parchment-200 shadow-2xl text-center z-10"
          initial={isReducedMotion ? { opacity: 0 } : { scale: 0.9, y: 20, opacity: 0 }}
          animate={isReducedMotion ? { opacity: 1 } : { scale: 1, y: 0, opacity: 1 }}
          exit={isReducedMotion ? { opacity: 0 } : { scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-modal-title"
        >
          {/* Tombol Tutup Silang di Sudut */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 focus-visible:ring-4 focus-visible:ring-stone-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Batal dan tutup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Maskot Tunas Kecil Tersenyum */}
          <div className="mb-2 flex justify-center">
            <MascotPohon stage={1} size={110} isReducedMotion={isReducedMotion} />
          </div>

          <h3 id="reset-modal-title" className="font-display font-bold text-2xl text-forest-900 mb-2">
            Mulai Cerita Dari Tunas Mungil?
          </h3>

          <p className="text-sm text-stone-600 leading-relaxed mb-6 font-sans">
            Pohon Kebaikan dan lencanamu akan mengulang dari awal ya. Kamu bisa mengumpulkan kebaikan dari langkah pertama lagi!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-1/2 py-3 px-5 rounded-full font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-all focus-visible:ring-4 focus-visible:ring-stone-400 min-h-[48px]"
            >
              Batal, Tetap Lanjut
            </button>

            <button
              onClick={onConfirmReset}
              className="w-full sm:w-1/2 py-3 px-5 rounded-full font-bold text-white bg-warm-600 hover:bg-warm-700 shadow-md transition-all focus-visible:ring-4 focus-visible:ring-warm-400 flex items-center justify-center gap-2 min-h-[48px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ya, Ulangi Cerita</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
