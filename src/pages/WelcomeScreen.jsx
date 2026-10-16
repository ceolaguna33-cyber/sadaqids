import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Globe2,
  Lock,
  Play,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { SimulationStamp } from '../components/SimulationStamp';
import { WORLDS_CONFIG, isWorldUnlocked } from '../data/worldsData';


// Ambient Falling Leaves & Sparkles for Living World Feeling
function AmbientFloatingParticles({ isReducedMotion }) {
  if (isReducedMotion) return null;

  const particles = [
    { id: 1, x: '12%', delay: 0, duration: 6, size: 14, rotate: 45 },
    { id: 2, x: '28%', delay: 2, duration: 7.5, size: 18, rotate: -30 },
    { id: 3, x: '45%', delay: 1, duration: 6.8, size: 12, rotate: 60 },
    { id: 4, x: '72%', delay: 3.5, duration: 8, size: 16, rotate: -15 },
    { id: 5, x: '88%', delay: 0.5, duration: 7, size: 14, rotate: 30 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-emerald-400/80 drop-shadow-sm select-none"
          style={{ left: p.x, top: '-20px' }}
          animate={{
            y: ['0vh', '105vh'],
            x: ['0px', '25px', '-20px', '10px'],
            rotate: [0, p.rotate * 2, p.rotate * 4],
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
}

export function WelcomeScreen({
  onStartAdventure,
  onSelectWorld,
  completedLevels = [],
  treeStage = 1,
  isReducedMotion = false,
}) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isReducedMotion) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 12;
    const y = (e.clientY / innerHeight - 0.5) * 8;
    setMouseOffset({ x, y });
  };

  const safeCompleted = Array.isArray(completedLevels) ? completedLevels : [];
  const hasProgress = safeCompleted.length > 0;
  const world1Completed = safeCompleted.filter((id) => id >= 1 && id <= 6).length;
  const world2Completed = safeCompleted.filter((id) => id >= 7 && id <= 13).length;
  const world3Completed = safeCompleted.filter((id) => id >= 14 && id <= 20).length;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-[calc(100vh-68px)] w-full flex flex-col justify-between overflow-x-hidden bg-emerald-950 font-sans"
    >
      {/* ── AMBIENT PARTICLES ── */}
      <AmbientFloatingParticles isReducedMotion={isReducedMotion} />

      {/* ── MAIN PANORAMIC GAME WORLD HERO (2.5D NUSANTARA) ── */}
      <div className="relative w-full flex-1 min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden">
        {/* Layer 1: Stylized High-Definition Indonesian Village Panorama (Clean BG) */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-cover bg-center select-none"
          style={{
            backgroundImage: "url('/images/bg_welcome.png')",
            backgroundPosition: 'center 42%',
            transform: isReducedMotion
              ? 'scale(1.02)'
              : `scale(1.04) translate(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px)`,
            transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* Subtle soft vignette & sunbeam overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-black/10 pointer-events-none" />
        </motion.div>

        {/* Mascot Pohon Kebaikan Cutout Living in the Landscape (Sisi Kanan) */}
        <motion.div
          animate={isReducedMotion ? {} : { y: [0, -8, 0], rotate: [-1, 1, -1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden sm:block absolute right-4 sm:right-8 md:right-16 bottom-4 sm:bottom-8 z-10 w-44 sm:w-56 md:w-64 pointer-events-none select-none"
        >
          <img
            src="/images/pohon_kebaikan_cutout.png"
            alt="Pohon Kebaikan"
            className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(6,78,59,0.5)]"
          />
        </motion.div>

        {/* Maskot Anak Petualang SADAQIDS (Laki-laki & Perempuan) Berdiri di Sisi Kiri Lanskap */}
        <motion.div
          animate={isReducedMotion ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden sm:flex absolute left-4 sm:left-8 md:left-14 bottom-3 sm:bottom-6 z-10 items-end -space-x-4 pointer-events-none select-none"
        >
          {/* Maskot Laki-laki */}
          <motion.div
            animate={isReducedMotion ? {} : { rotate: [-1, 1, -1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <img
              src="/images/maskot_laki_cutout.png?v=3"
              alt="Maskot Laki-laki SADAQIDS"
              className="w-20 sm:w-26 md:w-32 h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          {/* Maskot Perempuan */}
          <motion.div
            animate={isReducedMotion ? {} : { rotate: [1, -1, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="relative"
          >
            <img
              src="/images/maskot_perempuan_cutout.png?v=3"
              alt="Maskot Perempuan SADAQIDS"
              className="w-24 sm:w-30 md:w-36 h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          {/* Balon Kata Pendamping Petualangan */}
          <motion.div
            animate={isReducedMotion ? {} : { y: [0, -3, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-50/95 border-2 border-amber-300 rounded-2xl px-3 py-1.5 text-xs font-black text-amber-950 shadow-xl whitespace-nowrap flex items-center gap-1.5"
          >
            <span>🎒</span>
            <span>Yuk berpetualang kebaikan!</span>
          </motion.div>
        </motion.div>

        {/* ── FLOATING GAMEPLAY HUD & HERO CONTENT ── */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center justify-between h-full text-center">
          
          {/* Top Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-amber-300/80 shadow-lg text-forest-900 text-xs sm:text-sm font-black tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
              Petualangan Edukasi Literasi Keuangan Sosial Syariah
            </span>
          </motion.div>

          {/* Hero Centerpiece: SADAQIDS Title + Floating Speech Bubble + Wooden Sign */}
          <div className="w-full flex flex-col items-center my-auto py-4">
            
            {/* Title Block with 3D Cartoon Aesthetic */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
              className="relative flex flex-col items-center"
            >
              {/* Main 3D Title */}
              <h1
                className="font-display font-black text-6xl sm:text-8xl lg:text-9xl text-amber-300 tracking-tight leading-none drop-shadow-2xl select-none"
                style={{
                  textShadow:
                    '0 4px 0 #D97706, 0 8px 0 #92400E, 0 12px 0 #78350F, 0 16px 28px rgba(0,0,0,0.5)',
                  WebkitTextStroke: '3px #451A03',
                }}
              >
                SADAQIDS
              </h1>

              {/* Wooden Sub-Banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative -mt-2 sm:-mt-3 px-6 sm:px-8 py-1.5 sm:py-2 rounded-2xl bg-amber-900 border-2 border-amber-500 shadow-xl"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, #92400E, #78350F)',
                  boxShadow: '0 4px 12px rgba(69, 26, 3, 0.4), inset 0 2px 0 rgba(254, 243, 199, 0.3)',
                }}
              >
                <span className="font-display font-black text-sm sm:text-lg lg:text-xl text-amber-100 uppercase tracking-widest drop-shadow-sm">
                  PETUALANGAN SEDEKAH ANAK
                </span>
              </motion.div>

              {/* Parchment Tagline Ribbon */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-3 px-5 py-1.5 rounded-full bg-amber-100/95 border border-amber-300 shadow-md backdrop-blur-xs"
              >
                <p className="font-display font-bold text-xs sm:text-sm text-amber-950">
                  ✨ Tumbuhkan Pohon Kebaikan di 3 Dunia Nusantara! ✨
                </p>
              </motion.div>
            </motion.div>


            {/* Central Main CTA: Big Golden Game Adventure Button */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', bounce: 0.45 }}
              className="mt-8 sm:mt-10 relative group"
            >
              {/* Golden Ambient Glow */}
              <div className="absolute -inset-2 rounded-full bg-amber-400/40 blur-xl group-hover:bg-amber-300/60 transition-all duration-300 animate-pulse" />

              <button
                id="btn-mulai-petualangan"
                onClick={onStartAdventure}
                className="relative px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:via-amber-300 hover:to-amber-400 active:translate-y-1 rounded-full border-4 border-amber-100 flex items-center justify-center gap-3 sm:gap-4 shadow-2xl transition-all cursor-pointer select-none group"
                style={{
                  boxShadow:
                    '0 8px 0 0 #B45309, 0 16px 30px rgba(0, 0, 0, 0.45), inset 0 2px 0 rgba(255, 255, 255, 0.6)',
                }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-900/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-amber-950 fill-amber-950 ml-0.5" />
                </div>
                <span className="font-display font-black text-xl sm:text-3xl text-amber-950 tracking-wide drop-shadow-xs">
                  {hasProgress ? 'Lanjutkan Petualangan!' : 'Mulai Petualangan!'}
                </span>
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-amber-950 stroke-[3] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>

            {/* Sub-tagline Kebaikan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-200 text-xs font-bold backdrop-blur-xs shadow-md"
            >
              <span>🌱</span>
              <span>Setiap koin kebaikan yang kamu salurkan menumbuhkan senyuman sesama!</span>
            </motion.div>

          </div>

          {/* Bottom Security / Age Appropriate Tag */}
          <div className="flex items-center justify-center gap-2 text-white/80 text-[11px] sm:text-xs font-bold bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dirancang khusus anak usia 8–10 tahun • 100% Edukatif &amp; Simulasi Aman</span>
          </div>

        </div>
      </div>

      {/* ── 3 DUNIA NUSANTARA ADVENTURE PORTAL (BOTTOM EXPEDITION DOCK) ── */}
      <section className="relative z-30 bg-gradient-to-b from-amber-50 to-amber-100/90 border-t-4 border-amber-300/80 rounded-t-3xl sm:rounded-t-[40px] px-4 sm:px-8 py-6 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <Globe2 className="w-6 h-6 text-emerald-100" />
              </div>
              <div>
                <h2 className="font-display font-black text-xl sm:text-2xl text-stone-900 leading-tight">
                  3 Dunia Nusantara
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  Jelajahi tiga dunia penuh cerita, selesaikan 20 level, dan tumbuhkan Pohon Kebaikan!
                </p>
              </div>
            </div>

            {/* Overall Progress Badge */}
            <div className="flex items-center gap-2 bg-emerald-100/90 border border-emerald-300 px-4 py-1.5 rounded-full text-emerald-900 text-xs sm:text-sm font-extrabold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{completedLevels.length} / 20 Level Selesai</span>
            </div>
          </div>

          {/* 3 World Preview Cards Matching Reference */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* DUNIA 1: Gerbang Kebaikan */}
            <motion.button
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectWorld ? onSelectWorld(1) : onStartAdventure()}
              className="text-left relative overflow-hidden rounded-2xl border-3 border-emerald-500 bg-gradient-to-b from-emerald-900/90 to-emerald-950 p-4 text-white shadow-xl cursor-pointer group transition-all"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-55 transition-opacity"
                style={{ backgroundImage: "url('/images/level_map_gerbang_kebaikan.jpg')" }}
              />
              <div className="relative z-10 flex flex-col justify-between h-28">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-emerald-300 block">
                    DUNIA 1
                  </span>
                  <h3 className="font-display font-black text-lg text-white group-hover:text-amber-200 transition-colors">
                    Gerbang Kebaikan
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-xs shadow-md">
                    <span>🌱</span>
                    <span>{world1Completed} / 6 Level</span>
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-emerald-900 text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.button>

            {/* DUNIA 2: Perancang Kebaikan */}
            {(() => {
              const unlocked = isWorldUnlocked(2, completedLevels);
              return (
                <motion.button
                  whileHover={unlocked ? { scale: 1.02, y: -3 } : {}}
                  whileTap={unlocked ? { scale: 0.98 } : {}}
                  onClick={() => unlocked && onSelectWorld ? onSelectWorld(2) : (!unlocked && onStartAdventure())}
                  className={`text-left relative overflow-hidden rounded-2xl border-3 ${
                    unlocked ? 'border-amber-500 cursor-pointer' : 'border-stone-400/50 cursor-not-allowed opacity-85'
                  } bg-gradient-to-b from-amber-900/90 to-amber-950 p-4 text-white shadow-xl group transition-all`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity filter"
                    style={{ backgroundImage: "url('/images/world_map_adventure.jpg')" }}
                  />
                  <div className="relative z-10 flex flex-col justify-between h-28">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-amber-300 block">
                          DUNIA 2
                        </span>
                        <h3 className="font-display font-black text-lg text-white">
                          Perancang Kebaikan
                        </h3>
                      </div>
                      {!unlocked && (
                        <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-amber-200" />
                        </div>
                      )}
                    </div>

                    <div>
                      {unlocked ? (
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-xs shadow-md">
                            <span>🔨</span>
                            <span>{world2Completed} / 7 Level</span>
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-amber-900 text-white transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-amber-200/90 font-bold flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg">
                          <Lock className="w-3 h-3" />
                          <span>Selesaikan semua 6 level Dunia 1</span>
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })()}

            {/* DUNIA 3: Penjaga Amanah */}
            {(() => {
              const unlocked = isWorldUnlocked(3, completedLevels);
              return (
                <motion.button
                  whileHover={unlocked ? { scale: 1.02, y: -3 } : {}}
                  whileTap={unlocked ? { scale: 0.98 } : {}}
                  onClick={() => unlocked && onSelectWorld ? onSelectWorld(3) : (!unlocked && onStartAdventure())}
                  className={`text-left relative overflow-hidden rounded-2xl border-3 ${
                    unlocked ? 'border-violet-500 cursor-pointer' : 'border-stone-400/50 cursor-not-allowed opacity-85'
                  } bg-gradient-to-b from-purple-950 to-indigo-950 p-4 text-white shadow-xl group transition-all`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity"
                    style={{ backgroundImage: "url('/images/world_map_adventure.jpg')" }}
                  />
                  <div className="relative z-10 flex flex-col justify-between h-28">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-purple-300 block">
                          DUNIA 3
                        </span>
                        <h3 className="font-display font-black text-lg text-white">
                          Penjaga Amanah
                        </h3>
                      </div>
                      {!unlocked && (
                        <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-purple-200" />
                        </div>
                      )}
                    </div>

                    <div>
                      {unlocked ? (
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-400 text-purple-950 font-black text-xs shadow-md">
                            <span>🛡️</span>
                            <span>{world3Completed} / 7 Level</span>
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-purple-900 text-white transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-purple-200/90 font-bold flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg">
                          <Lock className="w-3 h-3" />
                          <span>Selesaikan semua 7 level Dunia 2</span>
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })()}

          </div>
        </div>
      </section>
    </div>
  );
}
