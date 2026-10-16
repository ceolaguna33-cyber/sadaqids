import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  Star,
  ChevronRight,
  Globe,
  Sparkles,
  Trophy,
  ArrowLeft,
  Compass,
  CheckCircle2,
  TreeDeciduous,
  ShieldAlert,
} from 'lucide-react';
import { WORLDS_CONFIG, isWorldUnlocked } from '../data/worldsData';
import { MascotPohon } from '../components/MascotPohon';

export function WorldMap({
  completedLevels = [],
  onSelectWorld,
  onNavigateHome,
  treeStage = 1,
  isReducedMotion = false,
}) {
  const [selectedWorldPreview, setSelectedWorldPreview] = useState(1);

  const safeCompleted = Array.isArray(completedLevels) ? completedLevels : [];

  const getWorldProgress = (world) => {
    const worldLevels = world.levelIds;
    const completed = worldLevels.filter((id) => safeCompleted.includes(id)).length;
    return {
      completed,
      total: worldLevels.length,
      pct: Math.round((completed / worldLevels.length) * 100),
      isCompleted: completed === worldLevels.length,
    };
  };

  const totalCompleted = safeCompleted.length;
  const totalLevels = 20;

  // Node spatial coordinates on the 2.5D illustrated map
  const WORLD_NODES = [
    {
      worldId: 1,
      title: 'Gerbang Kebaikan',
      subtitle: 'Dusun Hijau & Sedekah Pokok',
      tagline: 'Mengenal Kebutuhan Pokok & Nilai Berbagi',
      coords: { x: '24%', y: '68%' },
      color: 'emerald',
      icon: '🌱',
      themeImg: '/images/level_map_gerbang_kebaikan.jpg',
      levelsText: '6 Level Edukatif (Level 1–6)',
    },
    {
      worldId: 2,
      title: 'Perancang Kebaikan',
      subtitle: 'Dusun Pengrajin & Program Sosial',
      tagline: 'Perencanaan Infak, Wakaf, & Gotong Royong',
      coords: { x: '53%', y: '62%' },
      color: 'amber',
      icon: '🔨',
      themeImg: '/images/world_map_adventure.jpg',
      levelsText: '7 Level Edukatif (Level 1–7)',
    },
    {
      worldId: 3,
      title: 'Penjaga Amanah',
      subtitle: 'Kota Amanah & Audit Transparan',
      tagline: 'Verifikasi Bukti, Laporan Kas, & Misi Terpadu',
      coords: { x: '82%', y: '50%' },
      color: 'purple',
      icon: '🛡️',
      themeImg: '/images/world_map_adventure.jpg',
      levelsText: '7 Level Edukatif (Level 1–7)',
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-68px)] w-full flex flex-col justify-between overflow-hidden bg-slate-950 font-sans select-none">
      
      {/* ── BACKGROUND 2.5D NUSANTARA ADVENTURE MAP ── */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/world_map_adventure.jpg')",
          filter: 'brightness(0.92) contrast(1.05)',
        }}
      >
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* ── TOP ADVENTURE HUD (NAVIGATION & PROGRESS) ── */}
      <header className="relative z-30 w-full max-w-6xl mx-auto px-4 pt-4 sm:pt-6">
        <div className="bg-white/90 backdrop-blur-md border-2 border-amber-300/80 rounded-3xl p-3 sm:p-4 shadow-2xl flex flex-wrap items-center justify-between gap-3">
          
          {/* Left Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-md">
              <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-amber-950 animate-spin" style={{ animationDuration: '18s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Peta Petualangan
                </span>
                <span className="text-xs text-stone-500 font-bold hidden sm:inline">3 Alam Nusantara</span>
              </div>
              <h1 className="font-display font-black text-xl sm:text-2xl text-stone-900 leading-tight">
                Pilih Dunia Misi
              </h1>
            </div>
          </div>

          {/* Center / Right Global Progress */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-black text-stone-700">
                Total Progres Nusantara
              </span>
              <span className="text-xs text-stone-500 font-bold">
                {totalCompleted} dari {totalLevels} Level Selesai
              </span>
            </div>

            <div className="w-32 sm:w-44 h-3.5 bg-stone-200 rounded-full overflow-hidden p-0.5 border border-stone-300">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.round((totalCompleted / totalLevels) * 100)}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-black text-xs">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>{Math.round((totalCompleted / totalLevels) * 100)}%</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── SPATIAL INTERACTIVE MAP SURFACE (DESKTOP / TABLET) ── */}
      <main className="relative z-20 flex-1 w-full max-w-6xl mx-auto px-4 my-auto min-h-[460px] sm:min-h-[520px] flex items-center justify-center">
        
        {/* Spatial Pins container */}
        <div className="relative w-full h-[480px] sm:h-[540px]">
          {WORLD_NODES.map((node, idx) => {
            const worldConfig = WORLDS_CONFIG.find((w) => w.worldId === node.worldId);
            const unlocked = isWorldUnlocked(node.worldId, completedLevels);
            const progress = getWorldProgress(worldConfig);
            const isHovered = selectedWorldPreview === node.worldId;

            return (
              <div
                key={node.worldId}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  left: node.coords.x,
                  top: node.coords.y,
                }}
              >
                {/* Visual Node Pin */}
                <motion.div
                  whileHover={{ scale: unlocked ? 1.08 : 1.02, y: -4 }}
                  whileTap={unlocked ? { scale: 0.96 } : {}}
                  onClick={() => {
                    setSelectedWorldPreview(node.worldId);
                    if (unlocked) onSelectWorld(node.worldId);
                  }}
                  className={`group relative flex flex-col items-center cursor-pointer ${
                    !unlocked ? 'opacity-90' : ''
                  }`}
                >
                  {/* Glowing Radar Pulse for Unlocked Worlds */}
                  {unlocked && (
                    <div className="absolute -inset-4 rounded-full bg-amber-400/30 blur-lg animate-ping opacity-60 pointer-events-none" />
                  )}

                  {/* World Icon Orb */}
                  <div
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 flex items-center justify-center shadow-2xl transition-all ${
                      unlocked
                        ? 'bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border-white text-stone-900'
                        : 'bg-stone-800 border-stone-500 text-stone-400'
                    }`}
                    style={{
                      boxShadow: unlocked
                        ? '0 12px 24px rgba(217, 119, 6, 0.4), inset 0 3px 0 rgba(255, 255, 255, 0.7)'
                        : '0 8px 16px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    <span className="text-3xl sm:text-4xl filter drop-shadow-md">{node.icon}</span>

                    {/* Padlock Overlay for locked world */}
                    {!unlocked && (
                      <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-xs">
                        <Lock className="w-8 h-8 text-amber-300 drop-shadow-md" />
                      </div>
                    )}

                    {/* Completion Star Badge */}
                    {progress.isCompleted && (
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-md">
                        <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* World Title Card Banner */}
                  <div
                    className={`mt-2 px-4 py-2 rounded-2xl border-2 shadow-xl backdrop-blur-md flex flex-col items-center text-center max-w-[210px] transition-all ${
                      unlocked
                        ? 'bg-white/95 border-amber-400 text-stone-900 group-hover:border-amber-500 group-hover:scale-105'
                        : 'bg-stone-900/90 border-stone-600 text-stone-300'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                      DUNIA {node.worldId}
                    </span>
                    <span className="font-display font-black text-sm sm:text-base leading-tight">
                      {node.title}
                    </span>

                    {/* Progress Pill */}
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] font-extrabold">
                      {unlocked ? (
                        <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                          {progress.completed} / {progress.total} Level Selesai
                        </span>
                      ) : (
                        <span className="text-stone-300 bg-stone-800 px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px]">
                          <Lock className="w-3 h-3 text-amber-400" />
                          <span>Terkunci</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Play Action Badge when hovered or active */}
                  {unlocked && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectWorld(node.worldId);
                        }}
                        className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1 shadow-lg cursor-pointer"
                      >
                        <span>Jelajahi Dunia</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ── BOTTOM DIALOGUE / INSPIRATION BANNER ── */}
      <footer className="relative z-30 w-full max-w-6xl mx-auto px-4 pb-4">
        <div className="bg-amber-950/85 backdrop-blur-md border-2 border-amber-600/80 rounded-3xl p-3.5 sm:p-4 text-amber-100 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-xl">
              🌳
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-200">
              <strong className="text-amber-300">Pesan Pohon Kebaikan:</strong> "Setiap langkah di dunia petualangan ini membantumu memahami berkah sedekah dan menjaga amanah secara nyata."
            </p>
          </div>

          <button
            onClick={() => onSelectWorld(1)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer shrink-0"
          >
            <span>Mulai dari Dunia 1 (Dusun Hijau)</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>

        </div>
      </footer>
    </div>
  );
}
