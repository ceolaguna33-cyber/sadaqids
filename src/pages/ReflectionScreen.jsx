import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check, ArrowRight, RotateCcw, Sparkles, Star,
  Brain, ThumbsUp, AlertCircle, ChevronRight
} from 'lucide-react';
import { MascotPohon } from '../components/MascotPohon';
import { SimulationStamp } from '../components/SimulationStamp';

export function ReflectionScreen({
  mission,
  onCompleteReflection,
  onPlaySound,
  onShowToast,
  isReducedMotion = false,
  treeStage = 1,
}) {
  const reflectionData = mission?.reflection;

  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [selectedReasonId, setSelectedReasonId] = useState(null);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const feedbackRef = useRef(null);

  // Pastikan saat masuk ruang refleksi, POV langsung tertuju ke pertanyaan di paling atas
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  // Saat evaluasi selesai, otomatis fokuskan POV ke kotak feedback dan tombol lanjut
  useEffect(() => {
    if (hasEvaluated && feedbackRef.current) {
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [hasEvaluated]);

  // Guard: jika data refleksi tidak ada, skip dan lanjut
  if (!reflectionData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 pb-24 text-center">
        <p className="text-stone-500 font-sans">Memuat refleksi...</p>
        <button
          onClick={onCompleteReflection}
          className="mt-6 px-8 py-4 rounded-2xl bg-forest-700 text-white font-display font-black text-base cursor-pointer"
        >
          Lanjutkan →
        </button>
      </div>
    );
  }

  const selectedOption = reflectionData.options?.find((o) => o.id === selectedOptionId) ?? null;
  const canEvaluate = !!selectedOptionId && !hasEvaluated;
  const isAnsweredCorrectly = hasEvaluated && selectedOption?.isOptimal;

  const handleSelectOption = (optId) => {
    if (isAnsweredCorrectly) return; // kunci setelah jawab benar
    setSelectedOptionId(optId);
    setHasEvaluated(false);
    if (onPlaySound) onPlaySound('tap');
  };

  const handleEvaluate = () => {
    if (!selectedOptionId) return;
    setHasEvaluated(true);
    if (selectedOption?.isOptimal) {
      if (onPlaySound) onPlaySound('goalReached');
      if (onShowToast) onShowToast('Pemikiranmu sangat bijak dan penuh kasih! 🌟', 'success');
    } else {
      if (onPlaySound) onPlaySound('tap');
    }
  };

  const handleRetry = () => {
    setSelectedOptionId(null);
    setSelectedReasonId(null);
    setHasEvaluated(false);
    if (onPlaySound) onPlaySound('tap');
  };

  // warna badge per opsi
  const optionColors = [
    { idle: 'bg-violet-50 border-violet-200', selected: 'bg-violet-600', border: 'border-violet-600', badge: 'bg-violet-600 text-white border-violet-700', shadow: '#5B21B6' },
    { idle: 'bg-sky-50 border-sky-200', selected: 'bg-sky-500', border: 'border-sky-500', badge: 'bg-sky-500 text-white border-sky-600', shadow: '#0369A1' },
    { idle: 'bg-pink-50 border-pink-200', selected: 'bg-pink-500', border: 'border-pink-500', badge: 'bg-pink-500 text-white border-pink-600', shadow: '#9D174D' },
    { idle: 'bg-amber-50 border-amber-200', selected: 'bg-amber-500', border: 'border-amber-500', badge: 'bg-amber-500 text-white border-amber-600', shadow: '#92400E' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 pb-24">

      {/* ── Header & Stamp ── */}
      <motion.div
        initial={isReducedMotion ? {} : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center mb-6"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <SimulationStamp variant="compact" isReducedMotion={isReducedMotion} />
          {mission?.title && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-forest-800 text-xs font-black shadow-xs">
              <span>{mission.conceptEmoji || '✨'}</span>
              <span>Misi Selesai: {mission.title}</span>
            </span>
          )}
        </div>

        {/* Judul besar bergaya anak */}
        <div className="relative inline-block">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight"
            style={{ color: '#1E1B4B' }}>
            🌟 Yuk, Renungkan Bersama!
          </h2>
          {/* underline dekoratif */}
          <div className="absolute -bottom-1 left-0 right-0 h-1.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899, #F59E0B)' }} />
        </div>

        <p className="text-stone-600 text-xs sm:text-sm mt-3 font-sans max-w-md mx-auto leading-relaxed">
          Kebaikanmu telah membantu warga <strong>{mission.title}</strong>! Sekarang, mari kita petik hikmah dan apa yang kamu <strong>pelajari</strong> hari ini 💛
        </p>
      </motion.div>

      {/* ── Kartu Pertanyaan Pohon Kebaikan ── */}
      <motion.div
        initial={isReducedMotion ? {} : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="relative mb-7 rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 50%, #D1FAE5 100%)',
          border: '3px solid #6EE7B7',
          boxShadow: '0 6px 0 0 #6EE7B7, 0 12px 30px -4px rgba(16,185,129,0.2)',
        }}
      >
        {/* Dekorasi bintang kecil */}
        {!isReducedMotion && (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute top-3 right-4 text-emerald-300 text-xl pointer-events-none select-none">✦</motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-3 left-4 text-yellow-300 text-lg pointer-events-none select-none">★</motion.div>
          </>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4 p-5 sm:p-6">
          {/* Maskot */}
          <div className="shrink-0 relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.7)', border: '2px solid #A7F3D0' }}>
              <MascotPohon stage={treeStage} size={90} isReducedMotion={isReducedMotion} />
            </div>
            {/* badge "Pohon Kebaikan" */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md border border-emerald-400">
              🌳 Pohon Kebaikan
            </div>
          </div>

          {/* Pertanyaan */}
          <div className="flex-1 text-left">
            <div className="flex items-center gap-1.5 mb-2">
              <Brain className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">
                Pertanyaan Refleksi
              </span>
            </div>
            <p className="font-display font-bold text-lg sm:text-xl text-emerald-900 leading-snug">
              "{reflectionData.question}"
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Label pilihan ── */}
      <motion.div
        initial={isReducedMotion ? {} : { opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 mb-3"
      >
        <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #7C3AED44, transparent)' }} />
        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ background: '#EDE9FE', color: '#5B21B6' }}>
          Pilih Jawabanmu
        </span>
        <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #7C3AED44)' }} />
      </motion.div>

      {/* ── Pilihan Jawaban ── */}
      <div className="space-y-3 mb-7">
        {(reflectionData.options ?? []).map((opt, idx) => {
          const isSelected = selectedOptionId === opt.id;
          const colors = optionColors[idx % optionColors.length];

          // state setelah evaluasi
          let cardStyle = {};
          let borderColor = '';
          let bgColor = '';

          if (hasEvaluated) {
            if (isSelected && opt.isOptimal) {
              // benar ✅
              bgColor = 'bg-emerald-50';
              borderColor = 'border-emerald-500';
              cardStyle = { boxShadow: '0 5px 0 0 #059669', background: '#ECFDF5' };
            } else if (isSelected && !opt.isOptimal) {
              // salah ❌
              bgColor = 'bg-red-50';
              borderColor = 'border-red-400';
              cardStyle = { boxShadow: '0 5px 0 0 #DC2626', background: '#FEF2F2' };
            } else {
              // tidak dipilih — redup
              bgColor = 'bg-stone-50';
              borderColor = 'border-stone-200';
              cardStyle = { opacity: 0.5 };
            }
          } else if (isSelected) {
            cardStyle = { boxShadow: `0 5px 0 0 ${colors.shadow}`, background: 'white' };
            borderColor = colors.border;
          } else {
            cardStyle = { boxShadow: '0 3px 0 0 #E5E7EB', background: 'white' };
            borderColor = 'border-stone-200';
          }

          return (
            <motion.button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              disabled={isAnsweredCorrectly}
              whileHover={!isAnsweredCorrectly && !isReducedMotion ? { y: -2 } : {}}
              whileTap={!isAnsweredCorrectly && !isReducedMotion ? { scale: 0.985 } : {}}
              className={`w-full p-4 sm:p-5 rounded-2xl border-3 text-left flex items-start gap-4 transition-all cursor-pointer
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-400
                ${borderColor} ${bgColor}
                ${isAnsweredCorrectly ? 'cursor-default' : ''}`}
              style={cardStyle}
            >
              {/* Badge huruf */}
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-base border-2 transition-all ${
                isSelected && !hasEvaluated
                  ? colors.badge
                  : hasEvaluated && isSelected && opt.isOptimal
                    ? 'bg-emerald-500 text-white border-emerald-600'
                    : hasEvaluated && isSelected && !opt.isOptimal
                      ? 'bg-red-500 text-white border-red-600'
                      : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}>
                {hasEvaluated && isSelected
                  ? (opt.isOptimal ? <Check className="w-5 h-5" /> : <span>✕</span>)
                  : String.fromCharCode(65 + idx)
                }
              </div>

              {/* Teks pilihan */}
              <div className="flex-1 min-w-0">
                <p className={`font-sans font-semibold text-sm sm:text-base leading-snug ${
                  hasEvaluated && isSelected && opt.isOptimal ? 'text-emerald-900' :
                  hasEvaluated && isSelected && !opt.isOptimal ? 'text-red-900' :
                  hasEvaluated && !isSelected ? 'text-stone-400' :
                  'text-stone-800'
                }`}>
                  {opt.text}
                </p>
              </div>

              {/* Ikon status setelah evaluasi */}
              {hasEvaluated && isSelected && (
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                  opt.isOptimal ? 'bg-emerald-500 text-white' : 'bg-red-100 text-red-500'
                }`}>
                  {opt.isOptimal
                    ? <Star className="w-4 h-4 fill-white text-white" />
                    : <AlertCircle className="w-4 h-4" />
                  }
                </div>
              )}

              {/* Centang kecil saat dipilih sebelum evaluasi */}
              {isSelected && !hasEvaluated && (
                <div className="shrink-0 w-7 h-7 rounded-full bg-violet-600 text-white flex items-center justify-center shadow">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ── Bagian B: Alasan Tambahan ── */}
      <AnimatePresence>
        {selectedOptionId && (reflectionData.reasonOptions ?? []).length > 0 && !hasEvaluated && (
          <motion.div
            key="reason-section"
            initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mb-6 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
              border: '2px solid #FDE68A',
              boxShadow: '0 4px 0 0 #FCD34D',
            }}
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💭</span>
                <span className="text-xs font-black text-amber-800 uppercase tracking-widest">
                  {reflectionData.reasonQuestion || 'Apa alasan paling kuat bagimu?'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {reflectionData.reasonOptions.map((reason) => {
                  const isReasonSelected = selectedReasonId === reason.id;
                  return (
                    <motion.button
                      key={reason.id}
                      whileTap={!isReducedMotion ? { scale: 0.97 } : {}}
                      onClick={() => {
                        setSelectedReasonId(reason.id);
                        if (onPlaySound) onPlaySound('tap');
                      }}
                      className={`p-3.5 rounded-xl border-2 text-left font-sans text-sm transition-all cursor-pointer leading-snug ${
                        isReasonSelected
                          ? 'bg-amber-400 border-amber-500 text-amber-950 font-bold'
                          : 'bg-white border-amber-200 text-stone-700 hover:border-amber-400 hover:bg-amber-50'
                      }`}
                      style={isReasonSelected ? { boxShadow: '0 3px 0 0 #B45309' } : {}}
                    >
                      {isReasonSelected && <span className="mr-1">✓ </span>}
                      {reason.text}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Kotak Feedback Setelah Evaluasi ── */}
      <AnimatePresence mode="wait">
        {hasEvaluated && selectedOption && (
          <motion.div
            ref={feedbackRef}
            key="feedback"
            initial={isReducedMotion ? { opacity: 0 } : { scale: 0.93, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="mb-6 rounded-3xl overflow-hidden"
            style={selectedOption.isOptimal ? {
              background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
              border: '3px solid #34D399',
              boxShadow: '0 6px 0 0 #059669, 0 16px 32px -8px rgba(16,185,129,0.3)',
            } : {
              background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
              border: '3px solid #FCD34D',
              boxShadow: '0 6px 0 0 #D97706, 0 16px 32px -8px rgba(217,119,6,0.3)',
            }}
          >
            <div className="p-5 sm:p-6">
              {/* Header feedback */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md ${
                  selectedOption.isOptimal ? 'bg-emerald-500' : 'bg-amber-400'
                }`}>
                  {selectedOption.isOptimal ? '🌟' : '🌱'}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl leading-tight"
                    style={{ color: selectedOption.isOptimal ? '#065F46' : '#78350F' }}>
                    {selectedOption.isOptimal ? 'Luar biasa! Pilihanmu sangat bijak!' : 'Ayo renungkan lagi, yuk!'}
                  </h3>
                  <p className="text-xs font-semibold"
                    style={{ color: selectedOption.isOptimal ? '#059669' : '#B45309' }}>
                    {selectedOption.isOptimal ? '✅ Jawaban paling tepat!' : '🔄 Coba pikirkan lagi'}
                  </p>
                </div>
              </div>

              {/* Teks feedback */}
              <p className={`font-sans text-sm sm:text-base leading-relaxed rounded-2xl p-4 ${
                selectedOption.isOptimal ? 'bg-white/70 text-emerald-950 font-medium' : 'bg-white/70 text-amber-950'
              }`}>
                {selectedOption.feedbackText}
              </p>

              {/* Hikmah Pelajaran Berharga */}
              {selectedOption.isOptimal && mission?.summaryLesson && (
                <div className="mt-3 p-3.5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-400/50 flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950 font-medium">
                  <span className="text-xl shrink-0">🌱</span>
                  <div>
                    <strong className="block font-display font-black text-emerald-900 text-xs sm:text-sm uppercase tracking-wide">
                      Hikmah Kebaikan Hari Ini:
                    </strong>
                    <span className="leading-relaxed">"{mission.summaryLesson}"</span>
                  </div>
                </div>
              )}

              {/* Tombol aksi */}
              <div className="mt-4 flex justify-end gap-3">
                {!selectedOption.isOptimal ? (
                  <motion.button
                    whileHover={!isReducedMotion ? { y: -2 } : {}}
                    whileTap={!isReducedMotion ? { scale: 0.96 } : {}}
                    onClick={handleRetry}
                    className="px-6 py-3.5 rounded-2xl text-white font-display font-bold text-sm flex items-center gap-2 cursor-pointer"
                    style={{
                      background: '#D97706',
                      border: '2px solid #B45309',
                      boxShadow: '0 4px 0 0 #92400E',
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Coba Lagi!</span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={!isReducedMotion ? { y: -3, scale: 1.02 } : {}}
                    whileTap={!isReducedMotion ? { scale: 0.97 } : {}}
                    onClick={onCompleteReflection}
                    className="px-7 py-4 rounded-2xl text-white font-display font-black text-base flex items-center gap-2.5 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #047857, #059669)',
                      border: '2px solid #065F46',
                      boxShadow: '0 5px 0 0 #064E3B, 0 12px 24px -4px rgba(4,120,87,0.4)',
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-emerald-200" />
                    <span>Selesaikan & Tumbuhkan Pohon!</span>
                    <ChevronRight className="w-5 h-5 text-emerald-200" />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Tombol Periksa Jawaban ── */}
      <AnimatePresence>
        {!hasEvaluated && (
          <motion.div
            key="evaluate-btn"
            initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.button
              onClick={handleEvaluate}
              disabled={!selectedOptionId}
              whileHover={selectedOptionId && !isReducedMotion ? { y: -3, scale: 1.01 } : {}}
              whileTap={selectedOptionId && !isReducedMotion ? { scale: 0.97 } : {}}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl text-white font-display font-black text-lg flex items-center justify-center gap-3 mx-auto cursor-pointer transition-all"
              style={selectedOptionId ? {
                background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                border: '2px solid #5B21B6',
                boxShadow: '0 6px 0 0 #4C1D95, 0 14px 28px -4px rgba(124,58,237,0.4)',
              } : {
                background: '#E5E7EB',
                border: '2px solid #D1D5DB',
                color: '#9CA3AF',
                boxShadow: '0 3px 0 0 #D1D5DB',
                cursor: 'not-allowed',
              }}
            >
              <ThumbsUp className={`w-5 h-5 ${selectedOptionId ? 'text-violet-200' : 'text-stone-400'}`} />
              <span>Periksa Jawabanku!</span>
              {selectedOptionId && <ChevronRight className="w-5 h-5 text-violet-200" />}
            </motion.button>

            {!selectedOptionId && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-xs text-stone-400 font-sans"
              >
                👆 Pilih salah satu jawaban di atas dulu, ya!
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
