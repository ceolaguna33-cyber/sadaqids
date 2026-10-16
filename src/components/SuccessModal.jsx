import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MascotPohon } from './MascotPohon';
import { SimulationStamp } from './SimulationStamp';

export function SuccessModal({
  isOpen,
  onClose,
  title = 'Misi Berhasil Diselesaikan!',
  badgeTitle,
  badgeDescription,
  treeStage = 2,
  summaryLesson,
  primaryActionLabel = 'Kembali ke Peta Petualangan',
  onPrimaryAction,
  isReducedMotion = false,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop dengan blur lembut */}
        <motion.div
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Kartu Modal Pencapaian Utama */}
        <motion.div
          className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-4 border-warm-300 shadow-2xl text-center z-10 overflow-hidden"
          initial={isReducedMotion ? { opacity: 0 } : { scale: 0.85, y: 30, opacity: 0 }}
          animate={isReducedMotion ? { opacity: 1 } : { scale: 1, y: 0, opacity: 1 }}
          exit={isReducedMotion ? { opacity: 0 } : { scale: 0.85, y: 30, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Partikel Daun Emas Melayang (Hanya jika bukan reduced motion) */}
          {!isReducedMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute top-2 left-6 w-3 h-3 rounded-full bg-warm-300"
                animate={{ y: [0, 40, 80], opacity: [0, 1, 0], x: [0, 10, -10] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-4 right-10 w-2.5 h-2.5 rounded-full bg-forest-400"
                animate={{ y: [0, 50, 100], opacity: [0, 1, 0], x: [0, -15, 5] }}
                transition={{ duration: 3.0, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute top-12 left-1/4 w-2 h-2 rounded-full bg-warm-400"
                animate={{ y: [0, 60, 120], opacity: [0, 1, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 1.0 }}
              />
            </div>
          )}

          {/* Stempel Simulasi di Sudut Atas */}
          <div className="mb-2 flex justify-center">
            <SimulationStamp variant="compact" isReducedMotion={isReducedMotion} />
          </div>

          {/* Maskot Pohon Kebaikan Bertumbuh */}
          <div className="my-2 flex justify-center">
            <MascotPohon
              stage={treeStage}
              size={130}
              isCelebration={true}
              isReducedMotion={isReducedMotion}
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 text-forest-600" />
            <span>Pohon Kebaikan Tumbuh ke Fase {treeStage}!</span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 mb-2 leading-tight">
            {title}
          </h3>

          {/* Ringkasan Pelajaran Maksimal 2 Kalimat */}
          {summaryLesson && (
            <p className="font-sans text-stone-600 text-sm max-w-sm mx-auto leading-relaxed mb-4">
              {summaryLesson}
            </p>
          )}

          {/* Kotak Lencana Kompetensi */}
          {badgeTitle && (
            <div className="bg-warm-50 border-2 border-warm-300 rounded-2xl p-4 mb-6 text-left flex items-center gap-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-warm-200 border border-warm-400 flex items-center justify-center shrink-0">
                <Award className="w-7 h-7 text-warm-700" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-warm-800 uppercase tracking-wider block">
                  Lencana Baru Dibuka:
                </span>
                <h4 className="font-display font-bold text-base text-stone-900 leading-snug">
                  {badgeTitle}
                </h4>
                {badgeDescription && (
                  <p className="text-xs text-stone-600 mt-0.5 leading-snug">
                    {badgeDescription}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Tombol Aksi Utama */}
          <button
            onClick={onPrimaryAction || onClose}
            className="w-full py-3.5 px-6 rounded-full bg-forest-700 hover:bg-forest-800 text-white font-display font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-97 min-h-[50px] focus-visible:ring-4 focus-visible:ring-forest-400"
          >
            <span>{primaryActionLabel}</span>
            <ArrowRight className="w-5 h-5 text-emerald-200" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
