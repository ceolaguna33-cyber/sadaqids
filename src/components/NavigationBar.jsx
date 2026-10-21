import React from 'react';
import { Sparkles, RotateCcw, Eye, ShieldCheck, Volume2, VolumeX, Music } from 'lucide-react';
import { SimulationStamp } from './SimulationStamp';

export function NavigationBar({
  currentScreen,
  onNavigateHome,
  onOpenResetModal,
  isReducedMotion,
  onToggleReducedMotion,
  isSoundEnabled,
  onToggleSound,
  isMusicEnabled,
  onToggleMusic,
  isPersistentStorage,
  treeStage = 1,
  onOpenTreeModal,
}) {
  const stageLabels = {
    1: 'Tunas Mungil',
    2: 'Ranting Ceria',
    3: 'Pohon Rimbun',
    4: 'Pohon Lebat',
    5: 'Pohon Berbuah',
    6: 'Pohon Bersinar',
    7: 'Pohon Paripurna ✨',
  };

  return (
    <header
      className="w-full sticky top-0 z-40 transition-all duration-300 border-b-2 border-amber-200/80 px-3 sm:px-6 py-2 bg-white/92 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
      style={{
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Logo Bulat Transparan */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50 rounded-2xl p-1 group transition-all duration-200 hover:-translate-y-0.5 active:scale-97 cursor-pointer"
          title="Kembali ke Beranda SADAQIDS"
        >
          <div className="relative shrink-0">
            {/* Halo glow berdenyut halus */}
            <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-md scale-110 pointer-events-none group-hover:scale-125 transition-transform duration-300" />
            <img
              src="/images/logo-sadaqids.png"
              alt="SADAQIDS"
              className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 object-contain rounded-full bg-white/85 p-1 border-2 border-amber-400/90 shadow-[0_4px_16px_rgba(217,119,6,0.25)] group-hover:rotate-3 transition-transform"
            />
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-black text-xl sm:text-2xl text-stone-900 tracking-tight block leading-none drop-shadow-2xs">
              SADAQIDS
            </span>
            <span className="text-[10px] sm:text-[11px] font-black text-amber-800/90 tracking-wider uppercase block mt-1">
              Petualangan Sedekah Semua Umur
            </span>
          </div>
        </button>

        {/* Status Pohon & Kontrol Aksesibilitas Modern Glass */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Glass Pill: Fase Pohon (Interaktif - Buka Galeri Pertumbuhan) */}
          <button
            onClick={onOpenTreeModal}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-emerald-400/60 text-xs shadow-xs hover:border-emerald-500 hover:scale-103 active:scale-97 transition-all cursor-pointer group"
            style={{
              background: 'rgba(16, 185, 129, 0.15)',
              backdropFilter: 'blur(12px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
            }}
            title="Sentuh untuk melihat Taman Pertumbuhan Pohon Kebaikanmu! 🌳"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse group-hover:scale-125 transition-transform" />
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-emerald-950/80 font-bold hidden md:inline">Pohon:</span>
            <span className="text-emerald-950 font-black">{stageLabels[treeStage] || 'Tunas Mungil'}</span>
          </button>

          {/* Sakelar Musik Latar (BGM Glass Toggle) */}
          <button
            onClick={onToggleMusic}
            className={`p-2 sm:px-3 sm:py-2 rounded-full text-xs font-black flex items-center gap-1.5 transition-all duration-200 cursor-pointer min-h-[42px] min-w-[42px] justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 hover:-translate-y-0.5 active:scale-95 ${
              isMusicEnabled
                ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-950 border border-emerald-500/40 shadow-xs'
                : 'bg-stone-500/10 hover:bg-stone-500/20 text-stone-600 border border-stone-300/50'
            }`}
            style={{
              backdropFilter: 'blur(12px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
            }}
            title={isMusicEnabled ? 'Musik Latar: Menyala' : 'Musik Latar: Mati'}
            aria-pressed={isMusicEnabled}
          >
            <Music className={`w-4 h-4 ${isMusicEnabled ? 'text-emerald-700 animate-pulse' : 'text-stone-400'}`} />
            <span className="hidden sm:inline">
              {isMusicEnabled ? 'Musik: ON' : 'Musik: OFF'}
            </span>
          </button>

          {/* Sakelar Suara Efek (SFX Glass Toggle) */}
          <button
            onClick={onToggleSound}
            className={`p-2 sm:px-3 sm:py-2 rounded-full text-xs font-black flex items-center gap-1.5 transition-all duration-200 cursor-pointer min-h-[42px] min-w-[42px] justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 hover:-translate-y-0.5 active:scale-95 ${
              isSoundEnabled
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-950 border border-amber-500/40 shadow-xs'
                : 'bg-stone-500/10 hover:bg-stone-500/20 text-stone-600 border border-stone-300/50'
            }`}
            style={{
              backdropFilter: 'blur(12px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
            }}
            title={isSoundEnabled ? 'Efek Suara: Menyala' : 'Efek Suara: Mati'}
            aria-pressed={isSoundEnabled}
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4 text-amber-700" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            <span className="hidden md:inline">
              {isSoundEnabled ? 'Suara' : 'Bisu'}
            </span>
          </button>

          {/* Sakelar Gerak Tenang (Reduced Motion Glass) */}
          <button
            onClick={onToggleReducedMotion}
            className={`px-3 py-2 rounded-full text-xs font-black flex items-center gap-1.5 transition-all duration-200 cursor-pointer min-h-[42px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 hover:-translate-y-0.5 active:scale-95 ${
              isReducedMotion
                ? 'bg-sky-600 text-white border border-sky-400 shadow-xs'
                : 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-950 border border-sky-300/50'
            }`}
            style={{
              backdropFilter: 'blur(12px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
            }}
            title="Nyalakan atau matikan animasi gerak dinamis"
            aria-pressed={isReducedMotion}
          >
            <Eye className="w-4 h-4 text-sky-700" />
            <span className="hidden md:inline">
              {isReducedMotion ? 'Gerak Tenang' : 'Gerak Lembut'}
            </span>
          </button>

          {/* Tombol Ulangi Cerita Glass */}
          {onOpenResetModal && (
            <button
              onClick={onOpenResetModal}
              className="p-2 sm:px-3 sm:py-2 rounded-full text-xs font-black text-stone-700 hover:text-stone-900 bg-stone-500/10 hover:bg-rose-500/15 border border-stone-300/60 hover:border-rose-400/50 flex items-center gap-1.5 transition-all duration-200 min-h-[42px] min-w-[42px] justify-center cursor-pointer shadow-2xs hover:-translate-y-0.5 active:scale-95"
              style={{
                backdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
              }}
              title="Mulai cerita dari awal"
            >
              <RotateCcw className="w-4 h-4 text-stone-600" />
              <span className="hidden xl:inline">Ulangi Cerita</span>
            </button>
          )}
        </div>
      </div>

      {/* Banner Ramah Jika localStorage Tidak Tersedia */}
      {!isPersistentStorage && (
        <div
          className="max-w-6xl mx-auto mt-2 px-3 py-1.5 rounded-2xl text-amber-950 text-xs flex items-center justify-between gap-2 border border-amber-400/40 shadow-xs"
          style={{
            background: 'rgba(254, 243, 199, 0.75)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Pemberitahuan Sesi:</strong> Progresmu aktif selama jendela ini dibuka. Jika ditutup, petualangan akan kembali ke awal.
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
