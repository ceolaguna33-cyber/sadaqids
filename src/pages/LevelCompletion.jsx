import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Sparkles, CheckCircle2, ArrowRight, Star, Heart, Trophy, MapPin } from 'lucide-react';
import { MascotPohon } from '../components/MascotPohon';
import { AnimatedTreeGrowth } from '../components/AnimatedTreeGrowth';
import { SimulationStamp } from '../components/SimulationStamp';
import { MISSIONS_DATA } from '../data/missions';
import { getAllLevels, getLevelById, getLevelNumberInWorld } from '../data/worldsData';

const TREE_STAGE_LABELS = {
  1: 'Tunas Mungil',
  2: 'Ranting Ceria',
  3: 'Pohon Rimbun',
  4: 'Pohon Lebat',
  5: 'Pohon Berbuah',
  6: 'Pohon Bersinar',
  7: 'Pohon Paripurna ✨',
};

// Palet warna perayaan tematik
const CELEBRATION_THEMES = {
  1: { badgeBg: 'bg-purple-100 text-purple-900 border-purple-300', glow: 'rgba(167, 139, 250, 0.4)' },
  2: { badgeBg: 'bg-sky-100 text-sky-900 border-sky-300', glow: 'rgba(56, 189, 248, 0.4)' },
  3: { badgeBg: 'bg-teal-100 text-teal-900 border-teal-300', glow: 'rgba(45, 212, 191, 0.4)' },
  4: { badgeBg: 'bg-amber-100 text-amber-900 border-amber-300', glow: 'rgba(251, 191, 36, 0.4)' },
  5: { badgeBg: 'bg-rose-100 text-rose-900 border-rose-300', glow: 'rgba(251, 113, 133, 0.4)' },
  6: { badgeBg: 'bg-emerald-100 text-forest-900 border-emerald-300', glow: 'rgba(52, 211, 153, 0.4)' },
};

export function LevelCompletion({
  mission,
  onReturnToMap,
  onPlaySound,
  isReducedMotion = false,
  prevTreeStage = 1,
  newTreeStage = 2,
  onOpenTreeModal,
}) {
  const allLevels = getAllLevels(MISSIONS_DATA);
  const totalLevels = allLevels.length; // 20 levels
  const isLastLevel = mission?.id === totalLevels;
  const nextMission = getLevelById((mission?.id || 0) + 1, MISSIONS_DATA);
  const theme = CELEBRATION_THEMES[mission?.id] || CELEBRATION_THEMES[2];

  useEffect(() => {
    if (onPlaySound) {
      setTimeout(() => onPlaySound('badgeFanfare'), 200);
    }
  }, [onPlaySound]);

  // Partikel konfeti ceria
  const confettiParticles = [
    { id: 1, color: '#F43F5E', x: '10%', delay: 0.1, size: 8 },
    { id: 2, color: '#FBBF24', x: '22%', delay: 0.4, size: 10 },
    { id: 3, color: '#38BDF8', x: '35%', delay: 0.2, size: 9 },
    { id: 4, color: '#10B981', x: '48%', delay: 0.5, size: 11 },
    { id: 5, color: '#A855F7', x: '62%', delay: 0.15, size: 8 },
    { id: 6, color: '#F97316', x: '75%', delay: 0.35, size: 10 },
    { id: 7, color: '#EC4899', x: '88%', delay: 0.25, size: 9 },
    { id: 8, color: '#F59E0B', x: '15%', delay: 0.6, size: 12 },
    { id: 9, color: '#34D399', x: '82%', delay: 0.45, size: 10 },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 sm:py-6 pb-20 text-center relative select-none">
      {/* ── PARTIKEL KONFETI MERIAH ── */}
      {!isReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
          {confettiParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full shadow-xs"
              style={{
                left: p.x,
                top: '-15px',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
              animate={{
                y: ['0vh', '95vh'],
                x: ['0px', p.id % 2 === 0 ? '25px' : '-25px', '0px'],
                rotate: [0, 360],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
          {/* Bintang Berkelip Mengambang */}
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute top-12 left-8 text-amber-400 text-2xl select-none"
          >
            ⭐
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="absolute top-20 right-10 text-yellow-400 text-xl select-none"
          >
            ✨
          </motion.div>
        </div>
      )}

      {/* ── TOP BADGE & SIMULATION STAMP ── */}
      <div className="flex items-center justify-center gap-3 mb-3 relative z-10">
        <SimulationStamp variant="compact" isReducedMotion={isReducedMotion} />
      </div>

      {/* ── VICTORY HEADER ── */}
      <motion.div
        initial={isReducedMotion ? {} : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        className="mb-3 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-amber-950 font-display font-black text-xs sm:text-sm border-2 border-amber-500 shadow-sm mb-2 uppercase tracking-wide">
          <Trophy className="w-4 h-4 text-amber-800" />
          <span>Misi Berhasil Dituntaskan!</span>
          <Sparkles className="w-4 h-4 text-amber-800" />
        </div>

        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-forest-900 leading-tight tracking-tight drop-shadow-xs">
          {isLastLevel ? '🎉 Seluruh Petualangan Tuntas!' : `Misi ${mission?.title || 'Kebaikan'} Berhasil!`}
        </h1>

        <p className="font-sans text-stone-600 text-xs sm:text-sm md:text-base max-w-lg mx-auto mt-1 leading-relaxed">
          {mission?.summaryLesson || 'Kamu belajar pentingnya berbagi dan menjaga amanah kebaikan untuk sesama!'}
        </p>
      </motion.div>

      {/* ── PANGGUNG PODIUM MASKOT & POHON KEBAIKAN ── */}
      <div className="relative my-4 sm:my-6 flex items-end justify-center z-10">
        {/* Glow Halo di belakang pohon */}
        <div
          className="absolute inset-0 max-w-sm mx-auto rounded-full blur-3xl pointer-events-none -z-10"
          style={{ background: theme.glow }}
        />

        {/* Container Panggung 3 Karakter dengan Ketinggian Proporsional */}
        <div className="flex items-end justify-center gap-2 sm:gap-5 md:gap-8">
          
          {/* Maskot Laki-laki Merayakan (Ukuran Terkendali, Anti-Overflow) */}
          <motion.div
            animate={isReducedMotion ? {} : { y: [0, -8, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="shrink-0 flex flex-col items-center"
          >
            <img
              src="/images/maskot_laki_cutout.png"
              alt="Sahabat Kebaikan"
              className="h-28 sm:h-36 md:h-42 w-auto max-w-[110px] sm:max-w-[140px] md:max-w-[160px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] select-none pointer-events-none"
            />
            <span className="text-[10px] sm:text-xs font-black text-emerald-800 bg-white/90 px-2 py-0.5 rounded-full border border-emerald-300 shadow-2xs mt-1">
              Hebat! 👏
            </span>
          </motion.div>

          {/* Maskot Pohon Kebaikan Pusat (Pohon Tumbuh Subur dengan Animasi Organik) */}
          <div className="flex flex-col items-center shrink-0">
            <AnimatedTreeGrowth
              fromStage={prevTreeStage}
              toStage={newTreeStage}
              onPlaySound={onPlaySound}
              isReducedMotion={isReducedMotion}
              size={210}
            />

            {/* Tombol Buka Galeri Taman Pohon */}
            {onOpenTreeModal && (
              <button
                onClick={onOpenTreeModal}
                className="mt-1.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 hover:bg-emerald-50 text-emerald-900 border border-emerald-300 text-[11px] font-black shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <span>🌳</span>
                <span>Buka Galeri Taman Pohon</span>
                <Sparkles className="w-3 h-3 text-emerald-600" />
              </button>
            )}
          </div>

          {/* Maskot Perempuan Merayakan (Ukuran Terkendali, Anti-Overflow) */}
          <motion.div
            animate={isReducedMotion ? {} : { y: [0, -8, 0], rotate: [2, -2, 2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
            className="shrink-0 flex flex-col items-center"
          >
            <img
              src="/images/maskot_perempuan_cutout.png"
              alt="Sahabat Kebaikan"
              className="h-32 sm:h-40 md:h-46 w-auto max-w-[120px] sm:max-w-[155px] md:max-w-[175px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] select-none pointer-events-none"
            />
            <span className="text-[10px] sm:text-xs font-black text-amber-800 bg-white/90 px-2 py-0.5 rounded-full border border-amber-300 shadow-2xs mt-1">
              Alhamdulillah! ✨
            </span>
          </motion.div>

        </div>
      </div>

      {/* ── KARTU TROFI LENCANA PENGHARGAAN (3D GAMIFIED ACHIEVEMENT CARD) ── */}
      <motion.div
        initial={isReducedMotion ? { opacity: 0 } : { y: 20, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-[0_12px_28px_rgba(217,119,6,0.14),0_4px_0_0_#fcd34d] mb-6 max-w-lg mx-auto text-left relative z-10 overflow-hidden"
      >
        {/* Kilau sudut kartu */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-amber-200/40 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex items-center gap-4">
          {/* Trophy Avatar Box */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400 border-3 border-amber-500 flex items-center justify-center text-3xl sm:text-4xl shadow-md">
              {mission?.badgeEmoji || '🏅'}
            </div>
            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-forest-600 border-2 border-white flex items-center justify-center text-white text-[10px] shadow-xs">
              ✓
            </div>
          </div>

          {/* Badge Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-[10px] sm:text-[11px] font-black text-amber-800 uppercase tracking-wider">
                Lencana Kompetensi Diraih:
              </span>
            </div>
            <h3 className="font-display font-black text-lg sm:text-xl text-stone-900 leading-snug">
              {mission?.badgeTitle || 'Lencana Penjaga Amanah'}
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed font-sans line-clamp-2">
              "{mission?.badgeDescription || 'Kamu berhasil memilih kebutuhan utama dan menjaga amanah kebaikan!'}"
            </p>
          </div>
        </div>

        {/* Level Berikutnya yang Terbuka */}
        <div className="mt-4 pt-3.5 border-t-2 border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          {isLastLevel ? (
            <div className="flex items-center gap-1.5 text-amber-800 font-bold">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Seluruh 20 Level Petualangan Nusantara Tuntas Sempurna! 🌟</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-forest-800 font-extrabold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-forest-600" />
              <span>
                {nextMission
                  ? `Level ${getLevelNumberInWorld(nextMission)}: ${nextMission.title} Terbuka di Peta!`
                  : 'Level berikutnya terbuka!'}
              </span>
            </div>
          )}

          <span className="text-stone-400 font-sans font-bold text-[11px]">
            Tersimpan Otomatis ✓
          </span>
        </div>
      </motion.div>

      {/* ── TOMBOL CTA 3D JUMBO KEMBALI KE PETA PETUALANGAN ── */}
      <motion.div
        initial={isReducedMotion ? { opacity: 0 } : { y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <button
          onClick={() => {
            if (onPlaySound) onPlaySound('tap');
            onReturnToMap();
          }}
          className="w-full sm:w-auto px-10 py-5 bg-forest-700 hover:bg-forest-600 text-white font-display font-black text-lg sm:text-xl rounded-2xl border-2 border-forest-600 flex items-center justify-center gap-3 mx-auto transition-all cursor-pointer shadow-[0_6px_0_0_#064E3B,0_12px_28px_rgba(4,120,87,0.3)] active:translate-y-1 active:shadow-[0_2px_0_0_#064E3B] active:scale-99"
        >
          <span>{isLastLevel ? 'Lihat Peta Petualangan Nusantara 🗺️' : 'Lanjut ke Peta Petualangan! 🗺️✨'}</span>
          <ArrowRight className="w-6 h-6 text-emerald-200 animate-pulse stroke-[3]" />
        </button>
      </motion.div>
    </div>
  );
}
