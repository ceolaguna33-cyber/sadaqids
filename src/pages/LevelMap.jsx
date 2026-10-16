import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  CheckCircle2,
  Sparkles,
  Award,
  ArrowRight,
  Play,
  RotateCcw,
  Compass,
  Star,
  Shield,
  HelpCircle,
  ChevronLeft,
  Coins,
  MapPin,
  X,
} from 'lucide-react';
import { MascotPohon } from '../components/MascotPohon';
import { SimulationStamp } from '../components/SimulationStamp';
import { isLevelUnlocked, getLevelNumberInWorld } from '../data/worldsData';

// Coordinates on the 2.5D illustrated map for each world:
// Dunia 1: Gerbang Kebaikan (Jalur Dusun Hijau)
// Dunia 2: Perancang Kebaikan (Dusun Apung & Bengkel Kebaikan)
// Dunia 3: Penjaga Amanah (Kubah Agung & Benteng Amanah)
const WORLD_PINS = {
  1: [
    { id: 1, x: '24%', y: '82%', name: 'Dusun Pelangi', concept: 'Sedekah Pendidikan' },
    { id: 2, x: '38%', y: '65%', name: 'Kampung Sehat', concept: 'Infak Posko' },
    { id: 3, x: '55%', y: '70%', name: 'Pesisir Harapan', concept: 'Sedekah Darurat' },
    { id: 4, x: '22%', y: '52%', name: 'Desa Bangkit', concept: 'Prioritas Pangan' },
    { id: 5, x: '82%', y: '64%', name: 'Taman Amanah', concept: 'Wakaf Fasilitas' },
    { id: 6, x: '68%', y: '36%', name: 'Negeri Kebaikan', concept: 'Puncak Kebaikan' },
  ],
  2: [
    { id: 7, x: '24%', y: '74%', name: 'Pasar Kebutuhan', concept: 'Kebutuhan vs Keinginan' },
    { id: 8, x: '36%', y: '56%', name: 'Balai Desa Harapan', concept: 'Matching Bantuan' },
    { id: 9, x: '46%', y: '38%', name: 'Bendahara Kecil', concept: 'Alokasi Berimbang' },
    { id: 10, x: '55%', y: '58%', name: 'Tim Gotong Royong', concept: 'Kolaborasi Warga' },
    { id: 11, x: '47%', y: '82%', name: 'Taman Wakaf Abadi', concept: 'Wakaf Produktif' },
    { id: 12, x: '65%', y: '72%', name: 'Rapat Prioritas', concept: 'Prioritas Darurat' },
    { id: 13, x: '74%', y: '50%', name: 'Proyek Impian', concept: 'Perancang Kebaikan' },
  ],
  3: [
    { id: 14, x: '22%', y: '75%', name: 'Buku Catatan Amanah', concept: 'Akuntansi Dasar' },
    { id: 15, x: '35%', y: '58%', name: 'Detektif Bukti', concept: 'Verifikasi Nota' },
    { id: 16, x: '48%', y: '72%', name: 'Jembatan Rencana-Nyata', concept: 'Akses Informasi' },
    { id: 17, x: '60%', y: '52%', name: 'Pemeriksa Klaim', concept: 'Integritas Kas' },
    { id: 18, x: '52%', y: '32%', name: 'Benteng Aset Wakaf', concept: 'Umpan Balik' },
    { id: 19, x: '72%', y: '38%', name: 'Laporan Dampak', concept: 'Audit Komprehensif' },
    { id: 20, x: '85%', y: '26%', name: 'Misi Akhir Terpadu', concept: 'Refleksi Puncak' },
  ],
};

export function LevelMap({
  worldId = 1,
  levelsData = [],
  unlockedLevel = 1,
  completedLevels = [],
  treeStage = 1,
  earnedBadges = [],
  onSelectMission,
  onBackToWorlds,
  onOpenResetModal,
  onOpenTreeModal,
  isReducedMotion = false,
}) {
  const [activeModalMission, setActiveModalMission] = useState(null);

  // Background per world
  const mapBackground =
    worldId === 1
      ? '/images/level_map_gerbang_kebaikan.jpg'
      : '/images/world_map_adventure.jpg';

  const worldTitles = {
    1: 'Dunia 1: Gerbang Kebaikan',
    2: 'Dunia 2: Perancang Kebaikan',
    3: 'Dunia 3: Penjaga Amanah',
  };

  const worldDescriptions = {
    1: 'Telusuri jalan setapak desa, pelajari sedekah pokok dan utamakan kebutuhan mendesak.',
    2: 'Bantu warga merancang program kebaikan, wakaf produktif, dan gotong royong.',
    3: 'Audit catatan kas, periksa bukti nota jujur, dan tuntaskan misi akuntabilitas.',
  };

  return (
    <div className="relative min-h-[calc(100vh-68px)] w-full flex flex-col justify-between overflow-hidden bg-slate-950 font-sans select-none">
      
      {/* ── BACKGROUND 2.5D MAP ── */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${mapBackground}')`,
          filter: 'brightness(0.92) contrast(1.05)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* ── TOP HUD NAVIGATION ── */}
      <header className="relative z-30 w-full max-w-6xl mx-auto px-4 pt-4 sm:pt-6">
        <div className="bg-white/90 backdrop-blur-md border-2 border-emerald-300/80 rounded-3xl p-3 sm:p-4 shadow-2xl flex flex-wrap items-center justify-between gap-3">
          
          {/* Back button & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWorlds}
              className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-forest-100 hover:bg-forest-200 text-forest-900 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 border border-forest-300 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-forest-700" />
              <span className="hidden sm:inline">Peta Dunia</span>
            </button>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Jalur Petualangan
              </span>
              <h1 className="font-display font-black text-xl sm:text-2xl text-stone-900 leading-tight">
                {worldTitles[worldId] || 'Peta Misi'}
              </h1>
            </div>
          </div>

          {/* Right Status Badges */}
          <div className="flex items-center gap-2">
            {onOpenTreeModal ? (
              <button
                onClick={onOpenTreeModal}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-950 text-xs font-black shadow-xs transition-transform active:scale-95 cursor-pointer"
                title="Sentuh untuk melihat Taman Pertumbuhan Pohon Kebaikan!"
              >
                <span>🌳 Pohon:</span>
                <span className="text-forest-900 font-black">Fase {treeStage}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black shadow-xs">
                <span>🌳 Pohon:</span>
                <span className="text-forest-900 font-black">Fase {treeStage}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-black shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>
                {completedLevels.filter((id) => levelsData.some((m) => m.id === id)).length} /{' '}
                {levelsData.length} Misi Selesai
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── INTERACTIVE 2.5D LEVEL MILESTONES ── */}
      <main className="relative z-20 flex-1 w-full max-w-6xl mx-auto px-4 my-auto min-h-[460px] sm:min-h-[520px]">
        
        {/* Level Pins along the illustrated trail */}
        <div className="relative w-full h-[480px] sm:h-[540px]">
          {levelsData.map((mission, idx) => {
            const levelNumber = getLevelNumberInWorld(mission);
            const safeCompleted = Array.isArray(completedLevels) ? completedLevels : [];
            const isCompleted = safeCompleted.includes(mission.id);
            const isUnlocked = isLevelUnlocked(mission.id, safeCompleted) || (mission.id <= unlockedLevel);
            const isCurrent = isUnlocked && !isCompleted;
            
            // Spatial coordinates lookup per world (tanpa tumpang tindih)
            const currentPins = WORLD_PINS[worldId] || WORLD_PINS[1];
            const pinCoord = currentPins.find((p) => p.id === mission.id) || currentPins[idx] || {
              x: `${18 + idx * 10}%`,
              y: `${72 - idx * 6}%`,
            };

            return (
              <div
                key={mission.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  left: pinCoord.x,
                  top: pinCoord.y,
                }}
              >
                <motion.div
                  whileHover={isUnlocked ? { scale: 1.12, y: -4 } : {}}
                  whileTap={isUnlocked ? { scale: 0.94 } : {}}
                  onClick={() => {
                    if (isUnlocked) {
                      setActiveModalMission(mission);
                    }
                  }}
                  className={`group relative flex flex-col items-center ${
                    isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'
                  }`}
                >
                  {/* Bouncing beacon for Current Mission */}
                  {isCurrent && (
                    <motion.div
                      animate={isReducedMotion ? {} : { y: [0, -6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-9 z-30 px-2.5 py-0.5 rounded-full bg-amber-400 border-2 border-white text-amber-950 font-black text-[10px] shadow-lg whitespace-nowrap animate-bounce"
                    >
                      Mulai Sini! ⭐
                    </motion.div>
                  )}

                  {/* Pulsing ring for current mission */}
                  {isCurrent && (
                    <div className="absolute -inset-3 rounded-full bg-amber-400/40 blur-md animate-ping pointer-events-none" />
                  )}

                  {/* Pin Orb */}
                  <div
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-3 flex items-center justify-center shadow-xl transition-all ${
                      isCompleted
                        ? 'bg-emerald-600 border-emerald-300 text-white'
                        : isCurrent
                        ? 'bg-amber-400 border-white text-stone-900 shadow-amber-300/50'
                        : 'bg-stone-800 border-stone-500 text-stone-400'
                    }`}
                    style={{
                      boxShadow: isCurrent
                        ? '0 8px 20px rgba(245, 158, 11, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.8)'
                        : isCompleted
                        ? '0 8px 16px rgba(5, 150, 105, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.6)'
                        : '0 6px 12px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-white stroke-[2.5]" />
                    ) : isCurrent ? (
                      <span className="font-display font-black text-2xl text-amber-950">
                        {levelNumber}
                      </span>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Lock className="w-5 h-5 text-stone-400 mb-0.5" />
                        <span className="text-[10px] font-black text-stone-400 leading-none">
                          {levelNumber}
                        </span>
                      </div>
                    )}

                    {/* Level Number Badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-stone-900 border border-white flex items-center justify-center text-[10px] font-black text-white shadow-xs">
                      {levelNumber}
                    </div>
                  </div>

                  {/* Pin Title Label */}
                  <div
                    className={`mt-1.5 px-3 py-1 rounded-xl border shadow-md backdrop-blur-md flex flex-col items-center text-center max-w-[130px] transition-all ${
                      isCurrent
                        ? 'bg-white/95 border-amber-400 text-stone-900 scale-105'
                        : isCompleted
                        ? 'bg-emerald-950/85 border-emerald-400 text-emerald-100'
                        : 'bg-stone-900/85 border-stone-600 text-stone-400'
                    }`}
                  >
                    <span className="font-display font-black text-xs leading-tight truncate w-full">
                      {mission.title || `Level ${levelNumber}`}
                    </span>
                    <span className="text-[9px] font-bold opacity-80 truncate w-full">
                      {mission.subtitle || mission.tagline || 'Misi Edukasi'}
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ── LEVEL PREVIEW MODAL ── */}
      <AnimatePresence>
        {activeModalMission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-gradient-to-b from-amber-50 to-amber-100/95 border-4 border-amber-400 rounded-3xl p-6 shadow-2xl text-stone-900"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalMission(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-amber-200/80 hover:bg-amber-300 flex items-center justify-center text-amber-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs uppercase tracking-wider">
                  Level {getLevelNumberInWorld(activeModalMission)} • Dunia {worldId}
                </span>
                <span className="text-xs font-bold text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                  {activeModalMission.conceptType || 'Simulasi Kebaikan'}
                </span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-stone-950 mb-1">
                {activeModalMission.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-bold mb-4">
                {activeModalMission.tagline}
              </p>

              {/* Story Teaser */}
              <div className="p-3.5 bg-white/90 rounded-2xl border-2 border-amber-200 mb-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p>
                  <strong>Lokasi:</strong> {activeModalMission.story?.location || 'Dusun Nusantara'}
                </p>
                <p className="mt-1 text-stone-600">
                  {activeModalMission.story?.urgencyNote || activeModalMission.story?.narrative}
                </p>
              </div>

              {/* Virtual Coin Budget */}
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200 mb-5 text-xs font-extrabold text-emerald-950">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-500" />
                  <span>Anggaran Koin Simulasi:</span>
                </div>
                <span className="text-emerald-800 bg-white px-3 py-1 rounded-full shadow-xs">
                  {activeModalMission.virtualCurrency?.initialCoins || 100} Koin
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveModalMission(null)}
                  className="flex-1 py-3 bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-black text-sm rounded-2xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  id="btn-mulai-misi-modal"
                  onClick={() => {
                    const mId = activeModalMission.id;
                    setActiveModalMission(null);
                    onSelectMission(mId);
                  }}
                  className="flex-[2] py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Mulai Misi Kebaikan!</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── FOOTER HINT ── */}
      <footer className="relative z-30 w-full max-w-6xl mx-auto px-4 pb-4">
        <div className="bg-amber-950/85 backdrop-blur-md border border-amber-600/80 rounded-2xl p-3 text-amber-200 text-xs font-semibold flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Pilih tonggak dusun yang bercahaya untuk memulai alur cerita dan misi simulasi koin!</span>
          </div>

          {onOpenTreeModal && (
            <button
              onClick={onOpenTreeModal}
              className="px-3.5 py-1.5 rounded-xl bg-forest-600 hover:bg-forest-500 text-white font-display font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span>🌳 Galeri Pohon Kebaikan</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
