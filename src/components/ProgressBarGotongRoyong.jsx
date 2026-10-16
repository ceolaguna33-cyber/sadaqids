import React from 'react';
import { motion } from 'motion/react';
import { Users, Sparkles } from 'lucide-react';
import { SimulationStamp } from './SimulationStamp';

export function ProgressBarGotongRoyong({
  targetTotalCoins = 150,
  communityCoins = 50,
  playerCoins = 0,
  isReducedMotion = false,
}) {
  const currentTotal = communityCoins + playerCoins;
  const percentage = Math.min(100, Math.round((currentTotal / targetTotalCoins) * 100));
  const communityPercent = Math.min(100, Math.round((communityCoins / targetTotalCoins) * 100));
  const playerPercent = Math.min(100 - communityPercent, Math.round((playerCoins / targetTotalCoins) * 100));

  return (
    <div className="w-full bg-white/95 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-[0_8px_24px_rgba(217,119,6,0.1),0_4px_0_0_#fcd34d] text-left">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-warm-100 border border-warm-300 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-warm-700" />
          </div>
          <div className="text-left">
            <h4 className="font-display font-extrabold text-forest-900 text-lg leading-tight flex items-center gap-1.5">
              <span>Gotong Royong Warga &amp; Kamu</span>
              <span>🤝</span>
            </h4>
            <span className="text-xs text-stone-500 font-bold block">
              Bersama-sama kumpulkan target {targetTotalCoins} Koin Kebaikan! 🎯
            </span>
          </div>
        </div>

        {/* Lencana Stempel Simulasi Edukasi */}
        <SimulationStamp variant="compact" isReducedMotion={isReducedMotion} />
      </div>

      {/* Batang Kemajuan Relatif */}
      <div className="relative w-full h-9 bg-stone-100 rounded-full overflow-hidden p-1 border-2 border-stone-200 mb-3 shadow-inner">
        <div className="flex h-full rounded-full overflow-hidden w-full bg-stone-200/70">
          {/* Segmen 1: Kebaikan Bersama Warga */}
          <motion.div
            className="h-full bg-warm-400 border-r-2 border-warm-500 flex items-center justify-center text-[11px] font-black text-warm-950 select-none overflow-hidden"
            initial={isReducedMotion ? { width: `${communityPercent}%` } : { width: 0 }}
            animate={{ width: `${communityPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            title={`Kebaikan Warga: ${communityCoins} Koin`}
          >
            {communityPercent >= 15 && <span>Warga ({communityCoins} 🪙)</span>}
          </motion.div>

          {/* Segmen 2: Koin Pilihanmu */}
          <motion.div
            className="h-full bg-forest-500 flex items-center justify-center text-[11px] font-black text-white select-none overflow-hidden"
            initial={isReducedMotion ? { width: `${playerPercent}%` } : { width: 0 }}
            animate={{ width: `${playerPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            title={`Koin Pilihanmu: ${playerCoins} Koin`}
          >
            {playerPercent >= 15 && <span>Kamu ({playerCoins} ⭐)</span>}
          </motion.div>
        </div>
      </div>

      {/* Rincian Angka & Keterangan Rantai Bantuan */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2 border-t-2 border-stone-100 text-left">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-warm-400 border border-warm-500 shrink-0" />
          <span className="text-stone-700 font-semibold">
            Warga Desa: <strong>{communityCoins} Koin</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-forest-500 border border-forest-600 shrink-0" />
          <span className="text-stone-700 font-semibold">
            Koin Dari Kamu: <strong>{playerCoins} Koin</strong>
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 justify-start sm:justify-end">
          <Sparkles className="w-4 h-4 text-forest-600 shrink-0" />
          <span className="text-forest-900 font-display font-black text-xs sm:text-sm">
            Terkumpul: {percentage}% ({currentTotal}/{targetTotalCoins} Koin) 🎉
          </span>
        </div>
      </div>
    </div>
  );
}
