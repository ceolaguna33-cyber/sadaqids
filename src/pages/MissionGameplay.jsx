import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Send,
  HelpCircle,
  CheckCircle2,
  Plus,
  Minus,
  Coins,
  Compass,
  Info,
  Check,
  AlertCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { IconKoinKebaikan } from '../components/CustomIllustrations';
import { SimulationStamp } from '../components/SimulationStamp';
import { normalizeAidOptions, getLevelNumberInWorld } from '../data/worldsData';

export function MissionGameplay({
  mission,
  onBackToMap,
  onSubmitAllocation,
  onPlaySound,
  onShowToast,
  isReducedMotion = false,
}) {
  const initialCoins = mission.virtualCurrency?.initialCoins || 100;
  const coinLabel = mission.virtualCurrency?.coinLabel || 'Koin Kebaikan';

  const aidOptions = useMemo(() => normalizeAidOptions(mission), [mission]);

  // Selected card for visual focus
  const [selectedOptId, setSelectedOptId] = useState(() => aidOptions[0]?.id || null);

  // State alokasi koin virtual: { [optionId]: jumlah_koin }
  const [allocations, setAllocations] = useState(() => {
    const init = {};
    aidOptions.forEach((opt) => {
      init[opt.id] = 0;
    });
    return init;
  });

  const totalSpent = useMemo(
    () => Object.values(allocations).reduce((a, b) => a + b, 0),
    [allocations]
  );
  const remaining = initialCoins - totalSpent;

  // Validasi: seluruh kebutuhan pokok (isEssential/isPriority) wajib teralokasi minimal minCost
  const canComplete = useMemo(() => {
    if (totalSpent <= 0 || totalSpent > initialCoins) return false;
    const essentials = aidOptions.filter((o) => o.isEssential);
    if (essentials.length === 0) return true;
    return essentials.every((o) => (allocations[o.id] || 0) >= (o.minCost || 10));
  }, [allocations, aidOptions, totalSpent, initialCoins]);

  const handleChange = useCallback(
    (optId, delta) => {
      if (onPlaySound) onPlaySound('tap');
      setAllocations((prev) => {
        const current = prev[optId] || 0;
        const min = 0;
        const newVal = Math.max(min, current + delta);
        const projectedTotal = totalSpent - current + newVal;
        if (projectedTotal > initialCoins) {
          if (onShowToast) onShowToast(`Koin tidak cukup! Sisa di kantong: ${remaining} ${coinLabel}`, 'warning');
          return prev;
        }
        return { ...prev, [optId]: newVal };
      });
    },
    [totalSpent, initialCoins, remaining, coinLabel, onPlaySound, onShowToast]
  );

  const handleFillTarget = useCallback(
    (optId) => {
      const opt = aidOptions.find((o) => o.id === optId);
      if (!opt) return;
      const target = opt.minCost || opt.targetCoins || 10;
      const current = allocations[optId] || 0;
      const diff = target - current;
      if (diff <= 0) return;
      if (remaining < diff) {
        if (onShowToast) onShowToast(`Koin tersisa (${remaining}) tidak mencukupi untuk penuhi target (${diff})!`, 'warning');
        return;
      }
      if (onPlaySound) onPlaySound('goalReached');
      setAllocations((prev) => ({
        ...prev,
        [optId]: target,
      }));
      if (onShowToast) onShowToast(`Target ${opt.label || opt.title} langsung terpenuhi! ⭐`, 'success');
    },
    [aidOptions, allocations, remaining, onPlaySound, onShowToast]
  );

  const handleReset = () => {
    if (onPlaySound) onPlaySound('tap');
    const init = {};
    aidOptions.forEach((opt) => { init[opt.id] = 0; });
    setAllocations(init);
    if (onShowToast) onShowToast('Alokasi koin direset ke awal', 'info');
  };

  const handleSubmit = () => {
    if (!canComplete) {
      if (onPlaySound) onPlaySound('whoosh');
      const missingEssentials = aidOptions
        .filter((o) => o.isEssential && (allocations[o.id] || 0) < (o.minCost || 10))
        .map((o) => o.label || o.title);
      if (missingEssentials.length > 0) {
        if (onShowToast) {
          onShowToast(`Kebutuhan pokok belum terpenuhi: ${missingEssentials.join(', ')}`, 'warning');
        }
      } else if (totalSpent <= 0) {
        if (onShowToast) onShowToast('Alokasikan minimal sebagian koin ke kebutuhan pokok!', 'warning');
      } else if (totalSpent > initialCoins) {
        if (onShowToast) onShowToast('Total alokasi melebihi anggaran koin yang tersedia!', 'warning');
      }
      return;
    }
    if (onPlaySound) onPlaySound('success');
    onSubmitAllocation(allocations);
  };

  // Progress bar calculation
  const pct = Math.min(100, (totalSpent / initialCoins) * 100);

  // Background per level
  const getMissionBannerImage = (m) => {
    const id = m?.id || 1;
    switch (id) {
      case 1: return '/images/level1_school_bg.jpg';
      case 2: return '/images/level2_kampung_sehat.jpg';
      case 3: return '/images/level3_pesisir_harapan.jpg';
      case 4: return '/images/level4_desa_bangkit.jpg';
      case 5: return '/images/level5_taman_amanah.jpg';
      case 6: return '/images/level_map_gerbang_kebaikan.jpg';
      default:
        return m?.worldId === 2 ? '/images/world_map_adventure.jpg' : '/images/level_map_gerbang_kebaikan.jpg';
    }
  };

  const bannerImage = getMissionBannerImage(mission);
  const isLevel1 = mission?.id === 1;

  return (
    <div className="relative min-h-[calc(100vh-68px)] w-full flex flex-col justify-between overflow-hidden bg-[#FDFBF7] font-sans select-none pb-32">
      
      {/* ── BACKGROUND LIGHTING & AMBIENT GLOW (Cahaya Hangat Bersih) ── */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('${bannerImage}')`,
          filter: 'blur(36px) brightness(1.12) saturate(1.2) opacity(0.18)',
          transform: 'scale(1.1)',
        }}
      />
      {/* Radiant Sunbeams & Magical Light Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[750px] h-[380px] rounded-full pointer-events-none opacity-50"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.35), transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/2 -right-20 w-[450px] h-[450px] rounded-full pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(52, 211, 153, 0.22), transparent 65%)',
          }}
        />
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto px-3.5 sm:px-6 py-4">
        
        {/* ── TOP HUD NAVIGATION & STAGE HEADER ── */}
        <header className="flex items-center justify-between gap-3 mb-4 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-3xl border-2 border-amber-300/80 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
          <button
            onClick={onBackToMap}
            className="px-4 py-2 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 text-amber-950 font-display font-extrabold text-xs sm:text-sm flex items-center gap-2 border-b-4 border-amber-300 active:translate-y-1 active:border-b-0 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-600" />
            <span>Kembali ke Peta</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 text-emerald-900 font-display font-black text-xs sm:text-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Level {getLevelNumberInWorld(mission)}: {mission?.conceptType} ({mission?.title})</span>
            </div>
            <SimulationStamp variant="badge" isReducedMotion={isReducedMotion} />
          </div>
        </header>

        {/* ── VISUAL QUEST DIORAMA BANNER (PANORAMA MISI CERIA) ── */}
        <div className="relative w-full rounded-3xl overflow-hidden border-[3px] border-amber-300/90 shadow-[0_12px_30px_rgba(245,158,11,0.18)] mb-5 bg-white">
          {isLevel1 ? (
            /* Khusus Level 1: Hotspot Interaktif Sekolah */
            <div className="relative w-full h-56 sm:h-72">
              <img
                src="/images/level1_school_bg.jpg"
                alt="SD Dusun Pelangi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />

              {/* Hotspot 1: Atap Bocor */}
              {(() => {
                const roofOpt = aidOptions.find((o) => o.id === 'opt_atap_bocor' || o.id === 'opt_renovasi_atap' || o.id === 'opt_buku');
                const roofAlloc = roofOpt ? (allocations[roofOpt.id] || 0) : 0;
                const roofDone = roofOpt && roofAlloc >= (roofOpt.minCost || roofOpt.targetCoins || 30);

                return (
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      if (onPlaySound) onPlaySound('tap');
                      roofOpt && setSelectedOptId(roofOpt.id);
                    }}
                    className={`absolute top-[24%] right-[22%] z-20 px-3.5 py-2 rounded-2xl border-b-4 shadow-xl flex items-center gap-2 text-xs font-display font-black transition-all cursor-pointer ${
                      roofDone
                        ? 'bg-emerald-500 text-white border-emerald-700 animate-pulse'
                        : 'bg-amber-400 text-stone-950 border-amber-600 animate-bounce'
                    }`}
                  >
                    <span className="text-sm">{roofDone ? '✅' : '🔨'}</span>
                    <span>{roofDone ? 'Atap Terperbaiki!' : `Bantu Atap (${roofAlloc}/${roofOpt?.minCost || roofOpt?.targetCoins || 30})`}</span>
                  </motion.button>
                );
              })()}

              {/* Hotspot 2: Perlengkapan Murid */}
              {(() => {
                const bookOpt = aidOptions.find((o) => o.id === 'opt_buku_tulis' || o.id === 'opt_seragam' || o.id === 'opt_buku_seragam');
                const bookAlloc = bookOpt ? (allocations[bookOpt.id] || 0) : 0;
                const bookDone = bookOpt && bookAlloc >= (bookOpt.minCost || bookOpt.targetCoins || 40);

                return (
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      if (onPlaySound) onPlaySound('tap');
                      bookOpt && setSelectedOptId(bookOpt.id);
                    }}
                    className={`absolute bottom-10 left-[20%] z-20 px-3.5 py-2 rounded-2xl border-b-4 shadow-xl flex items-center gap-2 text-xs font-display font-black transition-all cursor-pointer ${
                      bookDone
                        ? 'bg-emerald-500 text-white border-emerald-700 animate-pulse'
                        : 'bg-sky-400 text-sky-950 border-sky-600'
                    }`}
                  >
                    <span className="text-sm">{bookDone ? '📚' : '💧'}</span>
                    <span>{bookDone ? 'Buku Siap Belajar!' : `Buku & Seragam (${bookAlloc}/${bookOpt?.minCost || bookOpt?.targetCoins || 40})`}</span>
                  </motion.button>
                );
              })()}

              <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-white text-xs font-bold drop-shadow-md">
                <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <span>🏫</span>
                  <span>SD Dusun Pelangi — Sentuh penanda untuk mengarahkan alokasi bantuan!</span>
                </span>
                {canComplete && (
                  <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-500 text-white px-3.5 py-1 rounded-full text-xs font-black shadow-lg animate-bounce">
                    <Check className="w-4 h-4 stroke-[3]" />
                    Kebutuhan Pokok Terpenuhi!
                  </span>
                )}
              </div>
            </div>
          ) : (
            /* Level 2 s.d. 6: Panorama Quest Card Cerah */
            <div className="relative w-full h-40 sm:h-48 overflow-hidden flex items-center p-4 sm:p-6 bg-gradient-to-r from-amber-50 via-white to-amber-100/60">
              <img
                src={bannerImage}
                alt="Lokasi Petualangan"
                className="absolute right-0 top-0 w-2/3 h-full object-cover object-right opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none w-3/4 sm:w-2/3" />
              
              <div className="relative z-10 max-w-md">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full shadow-sm mb-2">
                  <span>📍</span>
                  <span>Lokasi: {mission?.story?.location || mission?.title}</span>
                </span>
                <h3 className="font-display font-extrabold text-base sm:text-xl text-stone-900 leading-snug">
                  {mission?.story?.urgencyNote || mission?.story?.narrative}
                </h3>
              </div>

              {/* Maskot Ceria Melambaikan Tangan di Kanan */}
              <motion.div
                animate={isReducedMotion ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-4 bottom-1 z-10 w-20 sm:w-28 pointer-events-none drop-shadow-lg hidden xs:block"
              >
                <img
                  src="/images/maskot_laki_cutout.png"
                  alt="Maskot Petualang"
                  className="w-full h-auto object-contain max-h-32"
                />
              </motion.div>
            </div>
          )}
        </div>

        {/* ── KANTONG KOIN SIMULASI (GAME 3D WALLET & PROGRESS) ── */}
        <div className="bg-white/95 rounded-[30px] border-[3px] border-amber-300/90 p-4 sm:p-5 mb-5 shadow-[0_10px_30px_rgba(245,158,11,0.12)] relative">
          
          <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
            {/* Ikon Koin 3D Besar & Jumlah Koin */}
            <div className="flex items-center gap-3.5">
              <motion.div
                animate={isReducedMotion ? {} : { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 border-2 border-amber-500 flex items-center justify-center shadow-[0_6px_0_#d97706] shrink-0"
              >
                <IconKoinKebaikan size={40} />
              </motion.div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-amber-800">
                  Kantong {coinLabel}
                </p>
                <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">
                  <span className="font-display font-black text-3xl sm:text-4xl text-amber-500 drop-shadow-sm">
                    {totalSpent}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-stone-500">
                    / {initialCoins} koin dialokasikan
                  </span>
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full border shadow-sm ml-1 ${
                      remaining > 0
                        ? 'text-emerald-800 bg-emerald-100 border-emerald-300'
                        : remaining === 0
                        ? 'text-amber-900 bg-amber-200 border-amber-400 animate-pulse'
                        : 'text-red-800 bg-red-100 border-red-300'
                    }`}
                  >
                    {remaining > 0 ? `Sisa di kantong: ${remaining}` : remaining === 0 ? '⭐ Koin Pas Tepat Sasaran!' : `Kelebihan: ${Math.abs(remaining)}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Tombol Reset Koin */}
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-display font-extrabold text-xs flex items-center gap-1.5 border-b-4 border-stone-300 active:translate-y-1 active:border-b-0 shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>Reset Koin</span>
            </button>
          </div>

          {/* Candy-style 3D Progress Bar */}
          <div className="w-full h-4 bg-amber-100/90 rounded-full overflow-hidden p-0.5 border-2 border-amber-200 shadow-inner">
            <motion.div
              className={`h-full rounded-full transition-all shadow-[0_0_8px_rgba(245,158,11,0.5)] ${
                remaining < 0
                  ? 'bg-gradient-to-r from-red-500 to-rose-500'
                  : remaining === 0
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500'
                  : 'bg-gradient-to-r from-amber-400 to-yellow-400'
              }`}
              animate={{ width: `${pct}%` }}
              transition={{ duration: isReducedMotion ? 0 : 0.3 }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-amber-900/80 mt-1.5 font-bold">
            <span>0 Koin Terpakai</span>
            <span>Batas Anggaran: {initialCoins} Koin</span>
          </div>

          {/* Maskot Pendamping Kebaikan Ceria */}
          <div className="mt-3 pt-3 border-t border-amber-100 flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50/60 p-3 rounded-2xl border border-amber-200/80">
            <div className="flex items-center -space-x-2 shrink-0">
              <img
                src="/images/maskot_laki_cutout.png?v=3"
                alt="Maskot Laki-laki"
                className="w-10 h-auto object-contain drop-shadow-sm z-10"
              />
              <img
                src="/images/maskot_perempuan_cutout.png?v=3"
                alt="Maskot Perempuan"
                className="w-10 h-auto object-contain drop-shadow-sm z-0"
              />
            </div>
            <div className="flex-1 text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                Sahabat SADAQIDS Menemani:
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-stone-800 leading-snug">
                {canComplete
                  ? '✨ "Alhamdulillah! Alokasi kebaikanmu tepat sasaran! Klik tombol Kirim Bantuan di bawah!"'
                  : remaining < 0
                  ? '⚠️ "Koin melebihi anggaran, yuk sesuaikan lagi agar seimbang!"'
                  : '💡 "Dahulukan kebutuhan pokok yang paling mendesak ya, teman-teman!"'}
              </p>
            </div>
          </div>
        </div>

        {/* ── KARTU OPSI BANTUAN (VIBRANT RPG GAME QUEST ITEMS) ── */}
        <div className="grid gap-4 mb-6">
          {aidOptions.map((opt, idx) => {
            const alloc = allocations[opt.id] || 0;
            const minVal = opt.minCost || opt.targetCoins || 0;
            const isAllocated = alloc > 0;
            const isEssential = opt.isEssential;
            const isFulfilled = isEssential ? alloc >= minVal : isAllocated;
            const isSelected = selectedOptId === opt.id;

            return (
              <motion.div
                key={opt.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isReducedMotion ? 0 : idx * 0.05, duration: 0.25 }}
                onClick={() => setSelectedOptId(opt.id)}
                className={`rounded-[26px] border-[3px] p-4 sm:p-5 shadow-[0_6px_20px_rgba(0,0,0,0.05)] transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'ring-4 ring-amber-400 border-amber-400 bg-amber-50/30'
                    : isFulfilled
                    ? 'border-emerald-400 bg-emerald-50/30'
                    : isEssential
                    ? 'border-amber-300 bg-white'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Info opsi bantuan */}
                  <div className="flex items-start gap-4 min-w-0">
                    <div
                      className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-md border-2 ${
                        isFulfilled
                          ? 'bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-300 text-emerald-800'
                          : isEssential
                          ? 'bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-300 text-amber-800'
                          : 'bg-stone-100 border-stone-200 text-stone-700'
                      }`}
                    >
                      {opt.emoji}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-black text-lg sm:text-xl text-stone-900 leading-tight">
                          {opt.label || opt.title}
                        </span>
                        {isEssential ? (
                          <span className="text-[10px] font-black uppercase tracking-wide bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-400 shadow-sm flex items-center gap-1">
                            <span>🔴</span>
                            <span>Kebutuhan Pokok</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-full border border-stone-300">
                            ⚪ Pelengkap
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                        {opt.description}
                      </p>

                      {isEssential && (
                        <div className="mt-2">
                          {isFulfilled ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-full shadow-xs">
                              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                              Syarat Terpenuhi: {alloc} koin dialokasikan (min: {minVal})
                            </span>
                          ) : (
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-black text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                                ⚠️ Wajib minimal {minVal} koin (saat ini: {alloc})
                              </span>
                              {remaining >= minVal - alloc && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFillTarget(opt.id);
                                  }}
                                  className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-2.5 py-0.5 rounded-full cursor-pointer transition-all active:scale-95 shadow-xs"
                                >
                                  <Zap className="w-3 h-3 text-emerald-600" />
                                  <span>Penuhi Langsung</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tombol Counter Koin 3D Taktil (+ / -) */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100 shrink-0">
                    <div className="flex items-center gap-2 bg-amber-50/70 p-1.5 rounded-2xl border border-amber-200 shadow-sm">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChange(opt.id, -10);
                        }}
                        disabled={alloc <= 0}
                        className="w-11 h-11 rounded-xl bg-stone-100 hover:bg-stone-200 active:translate-y-1 active:border-b-0 border-b-4 border-stone-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-stone-700 font-black shadow-sm cursor-pointer transition-all"
                        title="Kurang 10 koin"
                      >
                        <Minus className="w-5 h-5" />
                      </button>

                      <div className="w-18 text-center">
                        <span className="font-display font-black text-2xl text-amber-600 block leading-tight">
                          {alloc}
                        </span>
                        <span className="text-[10px] font-extrabold text-stone-500 uppercase tracking-wider">
                          Koin
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChange(opt.id, 10);
                        }}
                        disabled={remaining < 10}
                        className="w-11 h-11 rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:translate-y-1 active:border-b-0 border-b-4 border-amber-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-stone-950 font-black shadow-sm cursor-pointer transition-all"
                        title="Tambah 10 koin"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ── TOMBOL SUBMIT ALOKASI (STICKY BOTTOM ACTION BAR) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl p-3 sm:p-4 border-t-2 border-amber-200 shadow-[0_-8px_30px_rgba(245,158,11,0.15)]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left w-full sm:w-auto">
            <p className="text-xs sm:text-sm font-black text-amber-950 flex items-center gap-1.5">
              <span>{canComplete ? '🎉' : '⚠️'}</span>
              <span>
                {canComplete
                  ? 'Seluruh kebutuhan pokok telah terpenuhi dengan bijak!'
                  : 'Penuhi kebutuhan pokok terlebih dahulu sebelum menyalurkan!'}
              </span>
            </p>
            <p className="text-xs text-stone-600 mt-0.5">
              Koin dialokasikan: <strong className="text-amber-600 font-bold">{totalSpent}</strong> / {initialCoins} Koin
            </p>
          </div>

          <button
            id="btn-selesaikan-misi"
            onClick={handleSubmit}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-display font-black text-base sm:text-lg flex items-center justify-center gap-2 border-b-4 transition-all active:translate-y-1 active:border-b-0 cursor-pointer shadow-lg ${
              canComplete
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white border-emerald-800 shadow-[0_8px_20px_rgba(16,185,129,0.35)] animate-pulse'
                : 'bg-stone-200 text-stone-400 border-stone-300 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
            <span>Kirim Bantuan &amp; Selesaikan Misi! 🚀</span>
          </button>
        </div>
      </div>

    </div>
  );
}
